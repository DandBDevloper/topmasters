'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import PropertyCard from '@/components/common/PropertyCard';
import ListingSidebar from '../../sidebar';
import PaginationTwo from '../../PaginationTwo';

// Error boundary component
function ErrorFallback({ error, retry }) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="alert alert-danger">
            <h4 className="alert-heading">Oops! Something went wrong</h4>
            <p className="mb-3">
              We encountered an error while loading projects. This might be a temporary issue.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button onClick={retry} className="btn btn-primary">
                <i className="fas fa-redo me-2"></i>
                Try Again
              </button>
              <a href="/" className="btn btn-outline-secondary">
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch projects with retry mechanism and caching
async function fetchProjectsWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(
        'https://backend.thetopmasters.com/api/v1/projects',
        {
          next: {
            revalidate: 300, // 5 minutes cache
            tags: ['projects']
          },
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
          }
        }
      );
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const result = await res.json();
      return result.data || [];
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

export default function PropertyFiltering({ initialProjects = [], initialError = null }) {
  // States for the fetched projects data
  const [projects, setProjects] = useState(initialProjects);
  const [error, setError] = useState(initialError);

  // Filtering and sorting states
  const [filteredData, setFilteredData] = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState('Newest');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  // Filter states
  const [listingStatus, setListingStatus] = useState('All');
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState('All Cities');
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setYearBuild] = useState([0, 2050]);
  const [categories, setCategories] = useState([]);

  // Memoized filter functions to prevent unnecessary re-renders
  const resetFilter = useCallback(() => {
    setListingStatus('All');
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation('All Cities');
    setSquirefeet([]);
    setYearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption('Newest');
    document.querySelectorAll('.filterInput').forEach((element) => {
      element.value = null;
    });
    document.querySelectorAll('.filterSelect').forEach((element) => {
      element.value = 'All Cities';
    });
  }, []);

  const handlelistingStatus = useCallback((elm) => {
    setListingStatus((prev) => (prev === elm ? 'All' : elm));
  }, []);

  const handlepropertyTypes = useCallback((elm) => {
    if (elm === 'All') {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((prev) =>
        prev.includes(elm) ? prev.filter((el) => el !== elm) : [...prev, elm]
      );
    }
  }, []);

  const handlepriceRange = useCallback((elm) => {
    setPriceRange(elm);
  }, []);

  const handlebedrooms = useCallback((elm) => {
    setBedrooms(elm);
  }, []);

  const handlebathroms = useCallback((elm) => {
    setBathroms(elm);
  }, []);

  const handlelocation = useCallback((elm) => {
    setLocation(elm);
  }, []);

  const handlesquirefeet = useCallback((elm) => {
    setSquirefeet(elm);
  }, []);

  const handleyearBuild = useCallback((elm) => {
    setYearBuild(elm);
  }, []);

  const handlecategories = useCallback((elm) => {
    if (elm === 'All') {
      setCategories([]);
    } else {
      setCategories((prev) =>
        prev.includes(elm) ? prev.filter((el) => el !== elm) : [...prev, elm]
      );
    }
  }, []);

  // Memoized filter functions object
  const filterFunctions = useMemo(() => ({
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
  }), [
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
  ]);

  // Fetch projects function with error handling
  const fetchProjects = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchProjectsWithRetry();
      setProjects(data);
      setFilteredData(data); // Set initial filtered data
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setError(error);
      setProjects([]);
      setFilteredData([]);
    }
  }, []);

  // Initial data setup
  useEffect(() => {
    if (initialProjects.length > 0) {
      setProjects(initialProjects);
      setFilteredData(initialProjects);
    }
    if (initialError) {
      setError(initialError);
    }
  }, [initialProjects, initialError]);

  // Update filtered data when projects change (for now, just copy all projects)
  useEffect(() => {
    setFilteredData(projects);
  }, [projects]);

  // Filtering logic (commented out as requested)
  // useEffect(() => {
  //   // Use fetched projects if available, otherwise use empty array.
  //   const refItems = projects.filter((elm) => {
  //     if (listingStatus === "All") {
  //       return true;
  //     } else if (listingStatus === "Buy") {
  //       return !elm.forRent;
  //     } else if (listingStatus === "Rent") {
  //       return elm.forRent;
  //     }
  //     return true;
  //   });

  //   let filteredArrays = [];

  //   if (propertyTypes.length > 0) {
  //     const filtered = refItems.filter((elm) =>
  //       propertyTypes.includes(elm.propertyType)
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }
  //   filteredArrays = [
  //     ...filteredArrays,
  //     refItems.filter((el) => el.bed >= bedrooms),
  //   ];
  //   filteredArrays = [
  //     ...filteredArrays,
  //     refItems.filter((el) => el.bath >= bathroms),
  //   ];
  //   filteredArrays = [
  //     ...filteredArrays,
  //     !categories.length ? [...refItems] : refItems.filter((elm) =>
  //       categories.every((elem) => elm.features.includes(elem))
  //     ),
  //   ];

  //   if (location !== 'All Cities') {
  //     filteredArrays = [
  //       ...filteredArrays,
  //       refItems.filter((el) => el.city === location),
  //     ];
  //   }

  //   if (priceRange.length > 0) {
  //     const filtered = refItems.filter((elm) => {
  //       const numericPrice = Number(elm.price.split('$')[1].replace(/,/g, ''));
  //       return numericPrice >= priceRange[0] && numericPrice <= priceRange[1];
  //     });
  //     filteredArrays = [...filteredArrays, filtered];
  //   }
  //   if (squirefeet.length > 0 && squirefeet[1]) {
  //     const filtered = refItems.filter(
  //       (elm) => elm.sqft >= squirefeet[0] && elm.sqft <= squirefeet[1]
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }
  //   if (yearBuild.length > 0) {
  //     const filtered = refItems.filter(
  //       (elm) => elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1]
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }

  //   // Intersection of all filtered arrays: items that appear in every filter array
  //   const commonItems = refItems.filter((item) =>
  //     filteredArrays.every((array) => array.includes(item))
  //   );

  //   setFilteredData(commonItems);
  // }, [
  //   projects,
  //   listingStatus,
  //   propertyTypes,
  //   priceRange,
  //   bedrooms,
  //   bathroms,
  //   location,
  //   squirefeet,
  //   yearBuild,
  //   categories,
  // ]);

  // Optimized sorting logic with useMemo
  const sortedData = useMemo(() => {
    let sorted = [...filteredData];
    
    switch (currentSortingOption) {
      case 'Newest':
        sorted.sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));
        break;
      case 'Price Low':
        sorted.sort((a, b) => (a.start_price || 0) - (b.start_price || 0));
        break;
      case 'Price High':
        sorted.sort((a, b) => (b.start_price || 0) - (a.start_price || 0));
        break;
      default:
        break;
    }
    
    return sorted;
  }, [filteredData, currentSortingOption]);

  // Update sorted data when dependencies change
  useEffect(() => {
    setPageNumber(1);
    setSortedFilteredData(sortedData);
  }, [sortedData]);

  // Optimized pagination with useMemo
  const paginatedData = useMemo(() => {
    const capacity = 9;
    const start = (pageNumber - 1) * capacity;
    const end = pageNumber * capacity;
    
    const pageItems = sortedFilteredData.slice(start, end);
    const contentTrac = [start + 1, Math.min(end, sortedFilteredData.length), sortedFilteredData.length];
    
    return { pageItems, contentTrac };
  }, [pageNumber, sortedFilteredData]);

  // Update page content tracking
  useEffect(() => {
    setPageContentTrac(paginatedData.contentTrac);
  }, [paginatedData.contentTrac]);

  // Error state
  if (error) {
    return <ErrorFallback error={error} retry={fetchProjects} />;
  }

  // Show content even if no projects (empty state will be handled in JSX)
  return (
    <section className="pt50 pb90">
      <div className="container">
        {/* Mobile Filter Sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
              Project Filters
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close filter menu"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        {/* Advance Feature Modal */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End Advance Feature Modal */}

        {/* Projects Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="list-title">
                <h4 className="mb-0">
                  {sortedFilteredData.length > 0 
                    ? `${sortedFilteredData.length} Projects Found`
                    : 'No Projects Found'
                  }
                </h4>
                {pageContentTrac.length > 0 && (
                  <p className="text-muted mb-0">
                    Showing {pageContentTrac[0]}-{pageContentTrac[1]} of {pageContentTrac[2]} projects
                  </p>
                )}
              </div>
              
              {/* Sort Dropdown */}
              <div className="dropdown">
                <select 
                  className="form-select"
                  value={currentSortingOption}
                  onChange={(e) => setCurrentSortingOption(e.target.value)}
                  aria-label="Sort projects"
                >
                  <option value="Newest">Newest First</option>
                  <option value="Price Low">Price: Low to High</option>
                  <option value="Price High">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Listing */}
        <div className="row">
          {/* Only show content after initial data processing */}
          {
            paginatedData.pageItems.map((project) => (
              <div key={project.id} className="col-sm-12 col-lg-4 mb-4">
                <PropertyCard project={project} />
              </div>
            ))
          }
        </div>
        {/* End Projects Listing */}

        {/* Pagination */}
        {sortedFilteredData.length > 9 && (
          <div className="row mt-4">
            <div className="col-12">
              <PaginationTwo
                pageCapacity={9}
                data={sortedFilteredData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </div>
          </div>
        )}
        {/* End Pagination */}
      </div>
      {/* End container */}
    </section>
  );
}