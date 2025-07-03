import { Suspense } from 'react';
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import AreasFiltering from '@/components/listing/grid-view/areas/AreasFiltering';
// import AreasFiltering from "@/components/listing/areas/AreasFiltering";

// Fetch areas with server-side pagination
async function fetchAreasWithPagination(params, retries = 3) {
  const page = parseInt(params.page) || 1;
  const search = params.search || '';
  const sortBy = params.sortBy || 'name';
  const sortOrder = params.sortOrder || 'asc';
  const minPrice = params.minPrice || '';
  const maxPrice = params.maxPrice || '';
  const minProperties = params.minProperties || '';
  const maxProperties = params.maxProperties || '';

  // Build query string
  const queryParams = new URLSearchParams({
    page: page.toString(),
  });

  if (search) queryParams.append('search', search);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);
  if (minPrice) queryParams.append('minPrice', minPrice);
  if (maxPrice) queryParams.append('maxPrice', maxPrice);
  if (minProperties) queryParams.append('minProperties', minProperties);
  if (maxProperties) queryParams.append('maxProperties', maxProperties);

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(
        `https://backend.thetopmasters.com/api/v1/areas?${queryParams.toString()}`,
        {
          next: {
            revalidate: 300, // 5 minutes cache
            tags: ['areas']
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
      return {
        data: result.data || [],
        pagination: result.pagination || {},
        message: result.message || '',
        error: result.error
      };
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

export const metadata = {
  title: "Dubai Areas & Communities | The Top Masters - Premium Real Estate Areas",
  description: "Explore Dubai's most prestigious areas and communities. Discover luxury properties, investment opportunities, and lifestyle amenities in Business Bay, Downtown Dubai, Dubai Marina, and more.",
  keywords: "Dubai areas, Dubai communities, Business Bay, Downtown Dubai, Dubai Marina, DIFC, JBR, Dubai Hills, Arabian Ranches, luxury neighborhoods, Dubai real estate areas",
  authors: [{ name: 'The Top Masters', url: 'https://www.thetopmasters.com/about' }],
  creator: 'The Top Masters',
  publisher: 'The Top Masters',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Dubai Areas & Communities | The Top Masters",
    description: "Explore Dubai's most prestigious areas and communities. Discover luxury properties and investment opportunities.",
    url: "https://www.thetopmasters.com/areas",
    siteName: "The Top Masters",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Areas & Communities | The Top Masters",
    description: "Explore Dubai's most prestigious areas and communities. Discover luxury properties and investment opportunities.",
    creator: "@thetopmasters",
    site: "@thetopmasters",
  },
  alternates: {
    canonical: "https://www.thetopmasters.com/areas",
  },
  other: {
    'article:section': 'Real Estate Areas',
    'article:tag': 'Dubai Areas, Communities, Neighborhoods, Real Estate',
  },
};

export default async function AreasPage({ searchParams }) {
  // Await searchParams before using
  const params = await searchParams;
  
  // Fetch areas data on the server with pagination
  let areasData = { data: [], pagination: {}, message: '', error: null };
  let error = null;
  
  try {
    areasData = await fetchAreasWithPagination(params);
  } catch (err) {
    console.error('Failed to fetch areas:', err);
    error = err;
  }

  // Get pagination info from API response
  const pagination = areasData.pagination || {};
  const currentPage = parseInt(pagination.current_page) || 1;
  const totalPages = parseInt(pagination.total_pages) || 1;
  const total = parseInt(pagination.total) || 0;

  // Handle no areas case in page.js
  if (areasData.data.length === 0 && !error && !params.search) {
    return (
      <>
        {/* Main Header Nav */}
        <DefaultHeader />
        {/* End Main Header Nav */}

        {/* Mobile Nav */}
        <MobileMenu />
        {/* End Mobile Nav */}

        {/* Breadcrumb Sections */}
        <section className="breadcumb-section bgc-f7">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-style1">
                  <h1 className="title">Dubai Areas & Communities</h1>
                  <div className="breadcumb-list">
                    <a href="/" aria-label="Go to homepage">Home</a>
                    <span>Areas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Breadcrumb Sections */}

        {/* Intro Section */}
        {/* <div className="container customPaddingProjectAbout marginTopResponsive">
          <div className="text-center">
            <h2>Top Dubai Communities</h2>
            <p><strong>Discover vibrant living in Dubai through our comprehensive area guide, offering insights into top communities, attractions, and things to do.</strong></p>
          </div>
        </div> */}

        {/* No Areas Found */}
        <section className="pt50 pb90">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-map-marker-alt fa-3x text-muted"></i>
                  </div>
                  <h4 className="mb-3">No Areas Available</h4>
                  <p className="text-muted mb-4">
                    We don&apos;t have any areas available at the moment. Please check back later for new listings.
                  </p>
                  <a href="/" className="btn btn-primary">
                    <i className="fas fa-home me-2"></i>
                    Go Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Start Our Footer */}
        <section className="footer-style1 pt60 pb-0">
          <Footer />
        </section>
        {/* End Our Footer */}
      </>
    );
  }

  // Handle error case in page.js  
  if (error) {
    return (
      <>
        {/* Main Header Nav */}
        <DefaultHeader />
        {/* End Main Header Nav */}

        {/* Mobile Nav */}
        <MobileMenu />
        {/* End Mobile Nav */}

        {/* Breadcrumb Sections */}
        <section className="breadcumb-section bgc-f7">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-style1">
                  <h1 className="title">Dubai Areas & Communities</h1>
                  <div className="breadcumb-list">
                    <a href="/" aria-label="Go to homepage">Home</a>
                    <span>Areas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Breadcrumb Sections */}

        {/* Intro Section */}
        {/* <div className="container customPaddingProjectAbout marginTopResponsive">
          <div className="text-center">
            <h2>Top Dubai Communities</h2>
            <p><strong>Discover vibrant living in Dubai through our comprehensive area guide, offering insights into top communities, attractions, and things to do.</strong></p>
          </div>
        </div> */}

        {/* Error State */}
        <section className="pt50 pb90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <div className="alert alert-danger">
                  <h4 className="alert-heading">Oops! Something went wrong</h4>
                  <p className="mb-3">
                    We encountered an error while loading areas. This might be a temporary issue.
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <a href="/areas" className="btn btn-primary">
                      <i className="fas fa-redo me-2"></i>
                      Try Again
                    </a>
                    <a href="/" className="btn btn-outline-secondary">
                      Go Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Start Our Footer */}
        <section className="footer-style1 pt60 pb-0">
          <Footer />
        </section>
        {/* End Our Footer */}
      </>
    );
  }

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav */}
      <MobileMenu />
      {/* End Mobile Nav */}

      {/* Breadcrumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h1 className="title">Dubai Areas & Communities</h1>
                <div className="breadcumb-list">
                  <a href="/" aria-label="Go to homepage">Home</a>
                  <span>Areas</span>
                </div>
                <button
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#listingSidebarFilter"
                  aria-controls="listingSidebarFilter"
                  aria-label="Open filter menu"
                >
                  <span className="flaticon-settings" /> Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}

      {/* Intro Section */}
      {/* <div className="container customPaddingProjectAbout marginTopResponsive">
        <div className="text-center">
          <h2>Top Dubai Communities</h2>
          <p><strong>Discover vibrant living in Dubai through our comprehensive area guide, offering insights into top communities, attractions, and things to do. Explore the best restaurants, must-visit places, and top-rated apartments, while uncovering the finest properties for the community that best fits you.</strong></p>
        </div>
      </div> */}

      {/* Areas Content */}
      <Suspense fallback={<div>Loading areas...</div>}>
        <AreasFiltering 
          initialAreas={areasData.data}
          total={total}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>
      {/* End Areas Content */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
}