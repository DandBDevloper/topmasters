// app/projects/loading.js

import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/common/default-footer";

// Project Card Skeleton with shimmer animation
function ProjectCardSkeleton() {
  return (
    <div className="col-sm-12 col-lg-4 mb-4">
      <div className="project-card-skeleton" style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9'
      }}>
        {/* Image skeleton */}
        <div 
          className="skeleton-image"
          style={{
            height: '240px',
            backgroundColor: '#e2e8f0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="shimmer-overlay" />
        </div>
        
        {/* Content skeleton */}
        <div style={{ padding: '20px' }}>
          {/* Title skeleton */}
          <div 
            className="skeleton-text"
            style={{
              height: '24px',
              width: '80%',
              backgroundColor: '#e2e8f0',
              borderRadius: '4px',
              marginBottom: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="shimmer-overlay" />
          </div>
          
          {/* Developer skeleton */}
          <div 
            className="skeleton-text"
            style={{
              height: '16px',
              width: '60%',
              backgroundColor: '#e2e8f0',
              borderRadius: '4px',
              marginBottom: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="shimmer-overlay" />
          </div>
          
          {/* Price skeleton */}
          <div 
            className="skeleton-text"
            style={{
              height: '20px',
              width: '50%',
              backgroundColor: '#e2e8f0',
              borderRadius: '4px',
              marginBottom: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="shimmer-overlay" />
          </div>
          
          {/* Button skeleton */}
          <div 
            className="skeleton-button"
            style={{
              height: '40px',
              width: '100%',
              backgroundColor: '#e2e8f0',
              borderRadius: '6px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="shimmer-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Breadcrumb skeleton
function BreadcrumbSkeleton() {
  return (
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
  );
}

// Filter bar skeleton
function FilterBarSkeleton() {
  return (
    <section className="pt50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div 
                className="skeleton-text"
                style={{
                  height: '20px',
                  width: '150px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '4px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="shimmer-overlay" />
              </div>
              <div 
                className="skeleton-text"
                style={{
                  height: '40px',
                  width: '120px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '6px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="shimmer-overlay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main projects loading component
function ProjectsLoadingAnimation() {
  return (
    <>
      {/* Breadcrumb Skeleton */}
      <BreadcrumbSkeleton />
      
      {/* Filter Bar Skeleton */}
      <FilterBarSkeleton />
      
      {/* Projects Grid Skeleton */}
      <section className="pb90">
        <div className="container">
          <div className="row">
            {[...Array(6)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
          
          {/* Pagination skeleton */}
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center">
              <div className="d-flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="skeleton-pagination"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '6px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="shimmer-overlay" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shimmer animation styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .shimmer-overlay {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }
          
          .project-card-skeleton {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .project-card-skeleton:nth-child(1) {
            animation-delay: 0.1s;
          }
          
          .project-card-skeleton:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .project-card-skeleton:nth-child(3) {
            animation-delay: 0.3s;
          }
          
          .project-card-skeleton:nth-child(4) {
            animation-delay: 0.4s;
          }
          
          .project-card-skeleton:nth-child(5) {
            animation-delay: 0.5s;
          }
          
          .project-card-skeleton:nth-child(6) {
            animation-delay: 0.6s;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .skeleton-image {
            animation: pulseGlow 2s ease-in-out infinite;
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: inset 0 0 20px rgba(14, 86, 81, 0.05);
            }
            50% {
              box-shadow: inset 0 0 30px rgba(14, 86, 81, 0.1);
            }
          }
        `
      }} />
    </>
  );
}

// Main loading component
export default function Loading() {
  return (
    <>
      {/* Navigation - Always visible */}
      <DefaultHeader />
      <MobileMenu />

      {/* Projects Loading Animation */}
      <ProjectsLoadingAnimation />

      {/* Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
}