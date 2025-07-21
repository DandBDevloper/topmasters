// Cache object to store API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// API configuration
const API_CONFIG = {
  baseUrl: 'https://backend.thetopmasters.com/api/v1',
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
};

// Utility function to create fetch with timeout
function fetchWithTimeout(url, options = {}) {
  const { timeout = API_CONFIG.timeout } = options;
  
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Request timeout after ${timeout}ms`)), timeout)
    ),
  ]);
}

// Utility function to implement retry logic
async function fetchWithRetry(url, options = {}, retries = API_CONFIG.retries) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      const isLastAttempt = i === retries;
      
      if (isLastAttempt) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay * (i + 1)));
    }
  }
}

// Data validation functions
function validateBlogPost(post) {
  return (
    post &&
    typeof post === 'object' &&
    typeof post.slug === 'string' &&
    post.slug.length > 0 &&
    (typeof post.updated_at === 'string' || typeof post.updated_at === 'number' || post.updated_at instanceof Date)
  );
}

function validateProject(project) {
  return (
    project &&
    typeof project === 'object' &&
    typeof project.slug === 'string' &&
    project.slug.length > 0 &&
    (typeof project.updated_at === 'string' || typeof project.updated_at === 'number' || project.updated_at instanceof Date)
  );
}

function validateArea(area) {
  return (
    area &&
    typeof area === 'object' &&
    typeof area.slug === 'string' &&
    area.slug.length > 0 &&
    (typeof area.updated_at === 'string' || typeof area.updated_at === 'number' || area.updated_at instanceof Date)
  );
}

// Generic API fetch function with caching
async function fetchApiData(endpoint, validator) {
  const cacheKey = endpoint;
  const cachedData = cache.get(cacheKey);
  
  // Return cached data if it's still valid
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }
  
  try {
    const url = `${API_CONFIG.baseUrl}/${endpoint}?limit=10000`;
    const response = await fetchWithRetry(url);
    const jsonData = await response.json();
    
    // Validate response structure
    if (!jsonData || typeof jsonData !== 'object') {
      throw new Error(`Invalid response format for ${endpoint}`);
    }
    
    const data = Array.isArray(jsonData.data) ? jsonData.data : [];
    
    // Validate and filter data
    const validData = data.filter(validator);
    
    if (validData.length !== data.length) {
      console.warn(`${endpoint}: ${data.length - validData.length} invalid items filtered out`);
    }
    
    // Cache the result
    cache.set(cacheKey, {
      data: validData,
      timestamp: Date.now(),
    });
    
    return validData;
    
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error.message);
    
    // Return cached data if available, even if expired
    if (cachedData) {
      console.warn(`Using expired cache for ${endpoint}`);
      return cachedData.data;
    }
    
    // Return empty array as fallback
    return [];
  }
}

// Helper function to safely create Date objects
function safeDate(dateInput) {
  if (!dateInput) return new Date();
  
  const date = new Date(dateInput);
  return isNaN(date.getTime()) ? new Date() : date;
}

// Helper function to determine change frequency based on content age
function getChangeFrequency(updatedAt) {
  if (!updatedAt) return 'monthly';
  
  const now = new Date();
  const updated = new Date(updatedAt);
  const daysSinceUpdate = (now - updated) / (1000 * 60 * 60 * 24);
  
  if (daysSinceUpdate < 7) return 'daily';
  if (daysSinceUpdate < 30) return 'weekly';
  if (daysSinceUpdate < 90) return 'monthly';
  return 'yearly';
}

// Helper function to determine priority based on content type and freshness
function getPriority(type, updatedAt) {
  const basePriorities = {
    blog: 0.5,
    project: 0.6,
    area: 0.6,
  };
  
  let priority = basePriorities[type] || 0.5;
  
  // Boost priority for recently updated content
  if (updatedAt) {
    const now = new Date();
    const updated = new Date(updatedAt);
    const daysSinceUpdate = (now - updated) / (1000 * 60 * 60 * 24);
    
    if (daysSinceUpdate < 30) {
      priority = Math.min(priority + 0.1, 1.0);
    }
  }
  
  return priority;
}

export default async function sitemap() {
  try {
    // Fetch all dynamic content concurrently
    const [blogs, projects, areas] = await Promise.all([
      fetchApiData('blogs', validateBlogPost),
      fetchApiData('projects', validateProject),
      fetchApiData('areas', validateArea),
    ]);

    // Define static pages with better metadata
    const staticPages = [
      {
        url: 'https://www.thetopmasters.com/',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://www.thetopmasters.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://www.thetopmasters.com/blog',
        lastModified: blogs.length > 0 ? 
          new Date(Math.max(...blogs.map(post => new Date(post.updated_at || 0).getTime()))) : 
          new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      },
      {
        url: 'https://www.thetopmasters.com/projects',
        lastModified: projects.length > 0 ? 
          new Date(Math.max(...projects.map(project => new Date(project.updated_at || 0).getTime()))) : 
          new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://www.thetopmasters.com/areas',
        lastModified: areas.length > 0 ? 
          new Date(Math.max(...areas.map(area => new Date(area.updated_at || 0).getTime()))) : 
          new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    // Map dynamic blog posts with enhanced metadata
    const blogPages = blogs.map((post) => ({
      url: `https://www.thetopmasters.com/blog/${encodeURIComponent(post.slug)}`,
      lastModified: safeDate(post.updated_at),
      changeFrequency: getChangeFrequency(post.updated_at),
      priority: getPriority('blog', post.updated_at),
    }));

    // Map dynamic projects with enhanced metadata
    const projectPages = projects.map((project) => ({
      url: `https://www.thetopmasters.com/projects/${encodeURIComponent(project.slug)}`,
      lastModified: safeDate(project.updated_at),
      changeFrequency: getChangeFrequency(project.updated_at),
      priority: getPriority('project', project.updated_at),
    }));

    // Map dynamic areas with enhanced metadata
    const areaPages = areas.map((area) => ({
      url: `https://www.thetopmasters.com/areas/${encodeURIComponent(area.slug)}`,
      lastModified: safeDate(area.updated_at),
      changeFrequency: getChangeFrequency(area.updated_at),
      priority: getPriority('area', area.updated_at),
    }));

    // Combine all pages
    const allPages = [
      ...staticPages,
      ...blogPages,
      ...projectPages,
      ...areaPages,
    ];

    // Sort by priority (highest first) for better SEO
    allPages.sort((a, b) => b.priority - a.priority);

    return allPages;

  } catch (error) {
    console.error('Critical error in sitemap generation:', error);
    
    // Return minimal sitemap with just static pages as fallback
    return [
      {
        url: 'https://www.thetopmasters.com/',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://www.thetopmasters.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];
  }
}