import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";

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

export const metadata = {
  title: "Premium Projects in Dubai | The Top Masters - Real Estate Excellence",
  description: "Discover exclusive real estate projects in Dubai. Browse luxury developments, off-plan properties, and investment opportunities from top developers like Emaar, DAMAC, and more.",
  keywords: "Dubai projects, real estate Dubai, off-plan properties, luxury developments, property investment, Emaar projects, DAMAC properties, Dubai Marina, Downtown Dubai",
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
    title: "Premium Projects in Dubai | The Top Masters",
    description: "Discover exclusive real estate projects in Dubai. Browse luxury developments and investment opportunities from top developers.",
    url: "https://www.thetopmasters.com/projects",
    siteName: "The Top Masters",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Projects in Dubai | The Top Masters",
    description: "Discover exclusive real estate projects in Dubai. Browse luxury developments and investment opportunities.",
    creator: "@thetopmasters",
    site: "@thetopmasters",
  },
  alternates: {
    canonical: "https://www.thetopmasters.com/projects",
  },
  other: {
    'article:section': 'Real Estate Projects',
    'article:tag': 'Dubai Real Estate, Property Investment, Luxury Projects',
  },
};

export default async function ProjectsPage() {
  // Fetch projects data on the server
  let projects = [];
  let error = null;
  
  try {
    projects = await fetchProjectsWithRetry();
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    error = err;
  }

  // Handle no projects case in page.js
  if (projects.length === 0 && !error) {
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
                  <h1 className="title">Premium Projects in Dubai</h1>
                  <div className="breadcumb-list">
                    <a href="/" aria-label="Go to homepage">Home</a>
                    <span>Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Breadcrumb Sections */}

        {/* No Projects Found */}
        <section className="pt50 pb90">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-building fa-3x text-muted"></i>
                  </div>
                  <h4 className="mb-3">No Projects Available</h4>
                  <p className="text-muted mb-4">
                    We dont have any projects available at the moment. Please check back later for new listings.
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
                  <h1 className="title">Premium Projects in Dubai</h1>
                  <div className="breadcumb-list">
                    <a href="/" aria-label="Go to homepage">Home</a>
                    <span>Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Breadcrumb Sections */}

        {/* Error State */}
        <section className="pt50 pb90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <div className="alert alert-danger">
                  <h4 className="alert-heading">Oops! Something went wrong</h4>
                  <p className="mb-3">
                    We encountered an error while loading projects. This might be a temporary issue.
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <a href="/projects" className="btn btn-primary">
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
                <h1 className="title">Premium Projects in Dubai</h1>
                <div className="breadcumb-list">
                  <a href="/" aria-label="Go to homepage">Home</a>
                  <span>Projects</span>
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

      {/* Property Filtering */}
      <ProperteyFiltering initialProjects={projects} />
      {/* End Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
}