"use client";
import { memo, useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import PropertyCard from "@/components/common/PropertyCard";

// In-memory cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache utility functions
const getCacheKey = (areaId) => `projects_${areaId}`;

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Shimmer loading component
const ShimmerCard = memo(() => (
  <div className="item">
    <div className="listing-style1">
      <div className="list-thumb">
        <div className="w-100 h-100 bg-light animate-pulse" style={{ height: '248px' }}>
          <div className="shimmer-effect"></div>
        </div>
      </div>
      <div className="list-content">
        <div className="shimmer-line mb-2" style={{ height: '20px', width: '80%' }}></div>
        <div className="list-meta d-flex flex-column align-items-start">
          <div className="shimmer-line mb-1" style={{ height: '16px', width: '60%' }}></div>
          <div className="shimmer-line mb-1" style={{ height: '16px', width: '70%' }}></div>
          <div className="shimmer-line mb-1" style={{ height: '16px', width: '50%' }}></div>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="list-meta2 d-flex justify-content-between align-items-center">
          <div className="shimmer-line" style={{ height: '36px', width: '80px' }}></div>
          <div className="d-flex align-items-center gap-2">
            <div className="shimmer-circle" style={{ width: '24px', height: '24px' }}></div>
            <div className="shimmer-circle" style={{ width: '24px', height: '24px' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

ShimmerCard.displayName = 'ShimmerCard';

// Error fallback component
const ErrorFallback = memo(() => (
  <div className="d-flex justify-content-center align-items-center py-5">
    <div className="text-center">
      <div className="mb-3">
        <i className="flaticon-sad" style={{ fontSize: '48px', color: '#ccc' }}></i>
      </div>
      <p className="text-muted">Unable to load properties</p>
    </div>
  </div>
));

ErrorFallback.displayName = 'ErrorFallback';

// Custom hook for API fetching with caching
const useProjects = (areaId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchProjects = useCallback(async (areaId, useCache = true) => {
    if (!areaId) {
      setLoading(false);
      return;
    }

    const cacheKey = getCacheKey(areaId);
    
    // Check cache first
    if (useCache) {
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        setError(null);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      const response = await fetch(
        `https://backend.thetopmasters.com/api/v1/projects?area_id=${areaId}`,
        {
          signal: abortControllerRef.current.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Cache the response
      setCachedData(cacheKey, result);
      
      setData(result);
      setError(null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error fetching projects:', err);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects(areaId);

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [areaId, fetchProjects]);

  const retry = useCallback(() => {
    fetchProjects(areaId, false); // Skip cache on retry
  }, [areaId, fetchProjects]);

  const mutate = useCallback(() => {
    const cacheKey = getCacheKey(areaId);
    cache.delete(cacheKey); // Clear cache
    fetchProjects(areaId, false); // Fetch fresh data
  }, [areaId, fetchProjects]);

  return { data, loading, error, retry, mutate };
};

const AreaSimilarProjects = memo(({ areaId }) => {
  const { data, loading, error, retry } = useProjects(areaId);

  // Memoize swiper configuration
  const swiperConfig = useMemo(() => ({
    spaceBetween: 30,
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".area-projects-next",
      prevEl: ".area-projects-prev",
    },
    pagination: {
      el: ".area-projects-pagination",
      clickable: true,
    },
    slidesPerView: 1,
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  }), []);

  // Memoize projects data
  const projects = useMemo(() => {
    return data?.data || [];
  }, [data]);

  // Early return if no areaId
  if (!areaId) {
    return null;
  }

  // Error state
  if (error) {
    return (
      <div className="area-similar-projects-container">
        <ErrorFallback />
        <div className="text-center mt-3">
          <button 
            className="btn btn-outline-primary btn-sm" 
            onClick={retry}
            disabled={loading}
          >
            {loading ? 'Retrying...' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="area-similar-projects-container">
        <Swiper {...swiperConfig}>
          {[...Array(3)].map((_, index) => (
            <SwiperSlide key={`shimmer-${index}`}>
              <ShimmerCard />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Navigation and pagination elements */}
        <div className="area-projects-navigation">
          <button className="area-projects-prev opacity-50" disabled>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="area-projects-next opacity-50" disabled>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="area-projects-pagination"></div>
      </div>
    );
  }

  // No data state
  if (!projects.length) {
    return (
      <div className="area-similar-projects-container">
        <div className="text-center py-5">
          <div className="mb-3">
            <i className="flaticon-home" style={{ fontSize: '48px', color: '#ccc' }}></i>
          </div>
          <p className="text-muted">No projects found in this area</p>
        </div>
      </div>
    );
  }

  return (
    <div className="area-similar-projects-container">
      <Swiper {...swiperConfig}>
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <PropertyCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation controls */}
      <div className="area-projects-navigation">
        <button className="area-projects-prev">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="area-projects-next">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      {/* Pagination */}
      <div className="area-projects-pagination"></div>
    </div>
  );
});

AreaSimilarProjects.displayName = 'AreaSimilarProjects';

export default AreaSimilarProjects;