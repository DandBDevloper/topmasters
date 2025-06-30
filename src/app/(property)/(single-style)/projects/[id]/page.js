import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from "next/image";
import { notFound, redirect } from 'next/navigation';
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyGallery from "@/components/property/property-single-style/single-v4/property-gallery";
import ProjectHero from "@/components/property/property-single-style/common/ProjectHero";
import EnquiryForm from "@/components/common/enquiry-form";
import DownloadBrochure from "@/components/property/property-single-style/common/DownlaodBrochure";

// Lazy load heavy components
const MapComponent = dynamic(() => import('@/components/property/MapComponent'), {
  loading: () => <div className="map-skeleton h-400 bg-gray-200 animate-pulse rounded"></div>
});

// Error boundary component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-4 text-danger">404</h1>
          <h2 className="mb-4">Project Not Found</h2>
          <p className="text-muted mb-4">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/" className="btn btn-primary">Go Home</a>
            <button onClick={resetErrorBoundary} className="btn btn-outline-secondary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch project data with better error handling
async function fetchProjectData(id) {
  try {
    const res = await fetch(`https://backend.thetopmasters.com/api/v1/projects/${id}`, {
      next: { 
        revalidate: 3600, // 1 hour for better SEO
        tags: [`project-${id}`] // For on-demand revalidation
      },
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    
    if (!result?.data || (Array.isArray(result.data) && result.data.length === 0)) {
      notFound();
    }

    return Array.isArray(result.data) ? result.data[0] : result.data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}

// Generate metadata dynamically for better SEO
export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const projectData = await fetchProjectData(id);
    
    const title = `${projectData?.Full?.meta_data?.title}`;
    const description = projectData?.Full?.meta_data?.description 
      ? projectData?.Full?.meta_data?.description
      : `Explore ${projectData?.Full?.name || 'this project'} - innovative real estate solutions in Dubai.`;
    
    const images = projectData?.Full?.images?.length > 0 
      ? [{ url: projectData.Full.images[0], width: 1200, height: 630 }]
      : [];

    return {
      title,
      description,
      keywords: [
        projectData?.Full?.name,
        projectData?.Full?.developer_name,
        'Dubai real estate',
        'property investment',
        'thetopmasters.com'
      ].filter(Boolean),
      authors: [{ name: 'The Top Master', url: 'https://www.thetopmasters.com/about' }],
      creator: 'The Top Master',
      publisher: 'The Top Master',
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
        title,
        description,
        url: `https://www.thetopmasters.com/projects/${id}`,
        siteName: 'The Top Masters',
        images,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images,
      },
      alternates: {
        canonical: `https://www.thetopmasters.com/projects/${id}`,
      },
    };
  } catch (error) {
    return {
      title: 'Project Not Found | The Top Masters',
      description: 'The requested project could not be found.',
    };
  }
}

// Utility functions for safe data access
const safeGet = (obj, path, defaultValue = '') => {
  return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
};

const formatPrice = (price) => {
  if (!price) return 'Price on Request';
  return `AED ${price.toLocaleString()}`;
};

const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  try {
    return new Date(dateString).getFullYear();
  } catch {
    return 'TBA';
  }
};

// Optimized image component with WebP support
function OptimizedImage({ src, alt, className, fill, width, height, priority = false }) {
  if (!src) return <div className={`${className} bg-gray-200`}></div>;
  
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
}

// Loading skeleton component
function ProjectSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-200 mb-8"></div>
      <div className="container">
        <div className="h-8 bg-gray-200 mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-200 mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-200 mb-8 w-2/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ProjectV1({ params }) {
  let projectData;
  
  try {
    const { id } = params;
    projectData = await fetchProjectData(id);
  } catch (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
  }

  // Safe data extraction with fallbacks
  const projectName = safeGet(projectData, 'Full.name', 'Unnamed Project');
  const developerName = safeGet(projectData, 'Full.developer_name', 'Developer');
  const startPrice = safeGet(projectData, 'Full.start_price');
  const completionDate = safeGet(projectData, 'About.completion_date');
  const description = safeGet(projectData, 'Full.description');
  const images = safeGet(projectData, 'Full.images', []);
  const amenities = safeGet(projectData, 'Full.amenities', []);
  const payments = safeGet(projectData, 'Payments', []);
  const nearbyAreas = safeGet(projectData, 'Full.project_nearby_areas', []);
  const location = safeGet(projectData, 'Location', {});

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      
      {/* Mobile Nav */}
      <MobileMenu />
      
      {/* Hero Section */}
      <ProjectHero 
        title={projectName} 
        developer={safeGet(projectData, 'Banner.developer_name', developerName)}
        image={safeGet(projectData, 'Full.image') || images[0]}
      />
      
      {/* About Section */}
      <div className="container customPaddingProjectAbout">
        <div className="aboutSection">
          <div className="aboutDetails flex-start">
            <h1>{projectName} by {developerName}</h1>
            <div className="listitems">
              
              {/* Starting Price */}
              <div className="DetailsList">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 68 60" fill="none">
                    <path d="M4.93119 60H55.8876C59.504 60 62.4628 57.0412 62.4628 53.4248V45.9456C65.257 45.5345 67.3943 43.1514 67.3943 40.2745V30.4121C67.3943 27.5352 65.2576 25.1521 62.4628 24.741V17.2618C62.4628 13.6454 59.504 10.6866 55.8876 10.6866H49.066L47.6689 1.40041C47.5869 0.907376 47.3404 0.49632 46.9294 0.249816C46.5183 0.00329651 46.0253 -0.078686 45.6142 0.0852786L8.21878 10.6872H4.93156C2.21936 10.6872 0 12.9064 0 15.6188V55.0689C0 57.7811 2.21922 59.9999 4.93156 59.9999L4.93119 60ZM64.1064 30.4124V40.2748C64.1064 41.6719 63.0378 42.7406 61.6406 42.7406H49.3124C46.6002 42.7406 44.3809 40.5214 44.3809 37.809V32.8775C44.3809 30.1653 46.6001 27.9459 49.3124 27.9459H61.6406C63.0383 27.9465 64.1064 29.0152 64.1064 30.4124ZM44.7101 3.70138L45.7787 10.6876L20.2183 10.6871L44.7101 3.70138ZM3.28744 15.6185C3.28744 14.7144 4.02699 13.9749 4.93105 13.9749H55.8875C57.6956 13.9749 59.1747 15.4539 59.1747 17.2621V24.6587L49.3123 24.6592C44.7918 24.6592 41.0935 28.3575 41.0935 32.878V37.8096C41.0935 42.3301 44.7918 46.0284 49.3123 46.0284H59.1747V53.425C59.1747 55.2331 57.6956 56.7122 55.8875 56.7122H4.93105C4.02695 56.7122 3.28744 55.9726 3.28744 55.0686V15.6185Z" fill="#121954"/>
                    <circle cx="50.8538" cy="35.2229" r="2.20146" fill="#121954"/>
                  </svg>
                </div>
                <div className="DetailsItem">
                  <h3>{formatPrice(startPrice)}</h3>
                  <p>Starting Price</p>
                </div>
              </div>

              {/* Handover Date */}
              <div className="DetailsList">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 60" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.1848 28.2634C15.5972 29.8403 18.4038 30.7091 21.285 30.7707C24.1666 30.8326 27.0077 30.0845 29.4855 28.6123L31.842 30.155C32.3954 30.5209 33.0692 30.6566 33.7211 30.5345H33.7822L36.0225 30.0691L36.4145 31.9423C36.572 32.6955 37.0221 33.3557 37.6659 33.7766C38.3102 34.198 39.095 34.3462 39.8482 34.1886L41.7214 33.7967L42.1804 36.0191C42.3196 36.6886 42.718 37.2761 43.2885 37.6531L45.1919 38.8772L45.1923 38.8777C45.5847 39.136 46.0442 39.2743 46.5143 39.2752C46.6808 39.276 46.8469 39.2594 47.0105 39.2265L53.2844 37.9533C53.8386 37.8372 54.3241 37.5054 54.6341 37.0314C54.9441 36.5571 55.053 35.9794 54.9373 35.4252L53.6333 29.1512C53.5022 28.5218 53.1256 27.971 52.5867 27.6209L36.8794 17.3248C37.3427 13.6745 36.4823 9.97908 34.4546 6.90823C32.4264 3.83781 29.3658 1.59539 25.8266 0.588128C22.2873 -0.419546 18.5043 -0.125348 15.1632 1.41689C11.8225 2.95909 9.14486 5.64738 7.61588 8.99445C6.08691 12.3415 5.80806 16.1258 6.82939 19.6608C7.85116 23.1962 10.1056 26.2483 13.1846 28.2635L13.1848 28.2634Z" fill="#121954"/>
                  </svg>
                </div>
                <div className="DetailsItem">
                  <h3>{formatDate(completionDate)}</h3>
                  <p>Handover</p>
                </div>
              </div>

              {/* Payment Plan */}
              <div className="DetailsList">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 60" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M56.9721 38.775C57.6661 39.0369 58.0149 39.8153 57.7536 40.5067C53.4112 51.9681 42.2581 59.6689 30.0001 59.6689C13.6402 59.6689 0.331151 46.3591 0.331152 29.9999C0.331152 13.639 13.6395 0.330877 30.0001 0.330878C45.1665 0.330878 57.7044 11.7733 59.4532 26.4798L61.1089 24.4347C61.5759 23.8563 62.4209 23.7683 62.9978 24.2348C63.5746 24.6997 63.6652 25.5468 63.1972 26.1232L59.3793 30.8449Z" fill="#121954"/>
                  </svg>
                </div>
                <div className="DetailsItem">
                  <h3>
                    {payments.length >= 3 
                      ? `${payments[0]?.value || 0}/${payments[1]?.value || 0}/${payments[2]?.value || 0}`
                      : 'Flexible Plans'
                    }
                  </h3>
                  <p>Payment Plan</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          {description && (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </div>
      </div>
      
      {/* Gallery Section */}
      {images.length > 0 && (
        <div className="container customPaddingProjectGallery">
          <div className="row">
            <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse"></div>}>
              <PropertyGallery images={images} />
            </Suspense>
          </div>
        </div>
      )}
      
      {/* Featured Section */}
      {images.length > 1 && (
        <div className="featuredSection">
          <div className="container customPaddingProjectGallery">
            <div className="row">
              <div className="col-12 col-md-6 d-flex align-items-center position-relative" style={{ minHeight: '400px' }}>
                <OptimizedImage
                  src={images[1]}
                  alt={`Featured view of ${projectName}`}
                  fill
                  className="imgRounded"
                  priority
                />
              </div>
              <div className="col-12 col-md-6 color-white cntFeaturedSec d-flex flex-column justify-content-center align-items-center">
                <h3>{safeGet(projectData, 'Full.selling_title', 'Premium Living')}</h3>
                {safeGet(projectData, 'Full.selling_description') && (
                  <div dangerouslySetInnerHTML={{ 
                    __html: projectData.Full.selling_description 
                  }} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Amenities Section */}
      {amenities.length > 0 && (
        <div className="bgc-f7 customPaddingProject">
          <div className="container">
            <div className="overflow-hidden position-relative">
              <h4 className="title fz17 mb30">
                {safeGet(projectData, 'Banner.project_name', projectName)} Amenities
              </h4>
              <div className="row">
                <Suspense fallback={<div className="h-32 bg-gray-200 animate-pulse"></div>}>
                  <OverView amenities={amenities} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Location Section */}
      {(location.lat && location.lng) && (
        <div className="">
          <div className="container customPaddingProjectGallery">
            <div className="row">
              <div className="col-12 col-md-6 d-flex align-items-center">
                <Suspense fallback={<div className="h-400 bg-gray-200 animate-pulse w-100"></div>}>
                  <MapComponent 
                    lat={location.lat} 
                    lng={location.lng} 
                    markerTitle={projectName}
                  />
                </Suspense>
              </div>
              <div className="col-12 col-md-6 color-white d-flex cntLocationSec flex-column justify-content-center align-items-center">
                {safeGet(projectData, 'Full.address_description') && (
                  <div dangerouslySetInnerHTML={{ 
                    __html: projectData.Full.address_description 
                  }} />
                )}
                
                {nearbyAreas.length > 0 && (
                  <div className="row mt20">
                    {nearbyAreas.map((area, index) => (
                      <div className="col-6 mb25" key={index}>
                        <div className="overview-element d-flex align-items-center">
                          <div className="ml15">
                            <h6 className="mb-0">{area.time_distance || 'N/A'}</h6>
                            <p className="text mb-0 fz15">{area.to_location || 'Location'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment Plan Section */}
      {payments.length >= 3 && (
        <div className="bgc-f7 customPaddingProject">
          <div className="container">
            <div className="floorplanHeading">
              <h3>{safeGet(projectData, 'Banner.banner_bref', projectName)} Payment Plan</h3>
            </div>
            <div className="row text-center gx-5">
              {payments.slice(0, 3).map((payment, index) => (
                <div key={index} className="col-12 col-md-4 mb-4 mb-sm-0">
                  <div className="paymentplanCard">
                    <h2>{payment.value || 0}%</h2>
                    <p>{payment.title || `Payment ${index + 1}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Download Brochure Section */}
      <div className="customPaddingProject">
        <Suspense fallback={<div className="h-32 bg-gray-200 animate-pulse"></div>}>
          <DownloadBrochure />
        </Suspense>
      </div>
      
      {/* Similar Properties Section */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <Suspense fallback={<div className="h-64 bg-gray-200 animate-pulse"></div>}>
                  <NearbySimilarProperty />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      
      {/* Enquiry Modal */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <EnquiryForm />
        </div>
      </div>
    </>
  );
}