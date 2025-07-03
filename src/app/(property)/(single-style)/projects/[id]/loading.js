// app/projects/[id]/loading.js

import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/common/default-footer";

// Card skeleton with shimmer animation
function SkeletonCard() {
  return (
    <div className="skeleton-card" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      marginBottom: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
    }}>
      {/* Image skeleton */}
      <div 
        className="skeleton-image"
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#e2e8f0',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="shimmer-overlay" />
      </div>
      
      {/* Text content skeleton */}
      <div style={{ flex: 1 }}>
        {/* Title skeleton */}
        <div 
          className="skeleton-text"
          style={{
            height: '16px',
            width: '70%',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            marginBottom: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="shimmer-overlay" />
        </div>
        
        {/* Description skeleton */}
        <div 
          className="skeleton-text"
          style={{
            height: '14px',
            width: '90%',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="shimmer-overlay" />
        </div>
      </div>
    </div>
  );
}

// Enhanced Hero Loading Component with shimmer animation
function HeroLoadingAnimation() {
  return (
    <>
      <div className="hero-loading-container" style={{ 
        minHeight: '100vh', 
        backgroundColor: '#ffffff',
        padding: '40px 0'
      }}>
        
        {/* Hero Section */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Hero Image Skeleton */}
              <div 
                className="hero-image-skeleton"
                style={{
                  height: '400px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '16px',
                  marginBottom: '40px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="shimmer-overlay" />
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-12 col-lg-8">
              {/* Title Skeleton */}
              <div 
                className="skeleton-title"
                style={{
                  height: '48px',
                  width: '80%',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="shimmer-overlay" />
              </div>
              
              {/* Details Cards */}
              <div className="row mb-4">
                <div className="col-12">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
              
              {/* Description Skeleton */}
              <div className="description-skeleton">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="skeleton-text"
                    style={{
                      height: '16px',
                      width: i === 3 ? '60%' : '100%',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      marginBottom: '12px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="shimmer-overlay" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-12 col-lg-4">
              {/* Sidebar Content */}
              <div 
                className="sidebar-skeleton"
                style={{
                  height: '300px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div className="shimmer-overlay" />
              </div>
            </div>
          </div>
          
          {/* Gallery Section */}
          <div className="row mt-5">
            <div className="col-12">
              <h5 style={{ 
                color: '#64748b', 
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Loading Gallery...
              </h5>
              <div className="row">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="col-6 col-md-4 mb-3">
                    <div 
                      className="gallery-skeleton"
                      style={{
                        height: '200px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '8px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div className="shimmer-overlay" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
              rgba(255, 255, 255, 0.4),
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
          
          .skeleton-card {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .skeleton-card:nth-child(1) {
            animation-delay: 0.1s;
          }
          
          .skeleton-card:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .skeleton-card:nth-child(3) {
            animation-delay: 0.3s;
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
          
          .hero-image-skeleton {
            animation: pulseGlow 2s ease-in-out infinite;
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(14, 86, 81, 0.1);
            }
            50% {
              box-shadow: 0 0 30px rgba(14, 86, 81, 0.2);
            }
          }
          
          .skeleton-title {
            animation: slideInLeft 0.8s ease-out;
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .gallery-skeleton:nth-child(odd) {
            animation: slideInUp 0.6s ease-out;
          }
          
          .gallery-skeleton:nth-child(even) {
            animation: slideInDown 0.6s ease-out;
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
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

      {/* Hero Loading Animation */}
      <HeroLoadingAnimation />

      {/* Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
}