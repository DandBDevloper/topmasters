// app/projects/[id]/page.js

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from "next/image";
import { notFound } from 'next/navigation';
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import Faq from '@/components/common/Faq';
import MobileMenu from "@/components/common/mobile-menu";
import EnquiryForm from "@/components/common/enquiry-form";
import Form from "@/components/common/form";
import Link from 'next/link';
import DownloadEnquire from '@/components/property/property-single-style/common/DownloadEnquire';

// Lazy load heavy components
const NearbySimilarProperty = dynamic(() => import('@/components/property/property-single-style/common/NearbySimilarProperty'));
const OverView = dynamic(() => import('@/components/property/property-single-style/common/OverView'));
const PropertyGallery = dynamic(() => import('@/components/property/property-single-style/single-v4/property-gallery'));
const ProjectHero = dynamic(() => import('@/components/property/property-single-style/common/ProjectHero'));
const DownloadBrochure = dynamic(() => import('@/components/property/property-single-style/common/DownlaodBrochure'));
const MapComponent = dynamic(() => import('@/components/property/MapComponent'));
// const Faq = dynamic(() => import('@/components/common/Faq'));

// Enhanced fetch function with better error handling and caching
async function fetchProjectData(id) {
  try {
    const res = await fetch(`https://backend.thetopmasters.com/api/v1/projects/${id}`, {
      next: {
        revalidate: 1800, // 30 minutes
        tags: [`project-${id}`]
      },
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
      }
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch project: ${res.status}`);
    }

    const result = await res.json();

    if (!result?.data) {
      notFound();
    }

    return Array.isArray(result.data) ? result.data[0] : result.data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}

// Enhanced metadata generation
export async function generateMetadata({ params }) {
  try {

    const resolvedParams = await params;
    const id = resolvedParams.id;
     
    const projectData = await fetchProjectData(id);

    const title = projectData?.Full?.meta_data?.title || `${projectData?.Full?.name} by ${projectData?.Full?.developer_name}`;
    const description = projectData?.Full?.meta_data?.description || 
      `Discover ${projectData?.Full?.name} - Premium real estate project by ${projectData?.Full?.developer_name} in Dubai. Starting from ${projectData?.Full?.start_price ? `AED ${projectData.Full.start_price.toLocaleString()}` : 'competitive prices'}.`;

    const images = projectData?.Full?.images?.length > 0
      ? [{
          url: projectData.Full.images[0],
          width: 1200,
          height: 630,
          alt: `${projectData.Full.name} - Premium Real Estate Project`
        }]
      : [];

    return {
      title: `${title} | The Top Masters`,
      description,
      keywords: [
        projectData?.Full?.name,
        projectData?.Full?.developer_name,
        'Dubai real estate',
        'property investment',
        'luxury properties',
        'thetopmasters.com'
      ].filter(Boolean).join(', '),
      
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
        title,
        description,
        url: `https://www.thetopmasters.com/projects/${id}`,
        siteName: 'The Top Masters',
        images,
        type: 'website',
        locale: 'en_US',
      },
      
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: images.map(img => img.url),
        creator: '@thetopmasters',
        site: '@thetopmasters',
      },
      
      alternates: {
        canonical: `https://www.thetopmasters.com/projects/${id}`,
      },
      
      other: {
        'article:author': 'The Top Masters',
        'article:section': 'Real Estate',
        'article:tag': 'Dubai Real Estate, Property Investment, Luxury Properties',
      },
    };
  } catch (error) {
    return {
      title: 'Project Not Found | The Top Masters',
      description: 'The requested project could not be found. Discover other premium real estate projects in Dubai.',
      robots: { index: false, follow: false },
    };
  }
}

// Utility functions
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

// Enhanced image component with progressive loading
function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  fill = false, 
  width, 
  height, 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  objectFit = "contain"
}) {
  if (!src) return <div className={`${className} bg-gray-200 animate-pulse`}></div>;

  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      quality={85}
      placeholder="blur"
      blurDataURL={blurDataURL}
      objectFit={objectFit}
    />
  );
}

// Error fallback component
function ProjectError({ error }) {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-4 text-danger">Oops!</h1>
          <h2 className="mb-4">Something went wrong</h2>
          <p className="text-muted mb-4">
            We encountered an error while loading this project. Please try again.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/" className="btn btn-primary">Go Home</a>
            <Link href="/projects" className="btn btn-outline-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default async function ProjectV1({ params }) {

  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const projectData = await fetchProjectData(id);

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
    const faqs = safeGet(projectData, 'Full.faqs', []);

    return (
      <>
        {/* Navigation - Always visible */}
        <DefaultHeader />
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 60" fill="none">
                      <g>
                        <path d="M27.703 15.826H12a1 1 0 1 1 0-2h15.703a1 1 0 1 1 0 2zM46 15.826h-2.717a1 1 0 1 1 0-2H46a1 1 0 1 1 0 2zM38.375 23.826a1 1 0 0 1-.46-1.889l3.581-1.847a.995.995 0 0 1 1.347.431.999.999 0 0 1-.43 1.347l-3.581 1.847a.987.987 0 0 1-.457.111z" fill="#0e5651" />
                        <path d="M29.645 23.826a1 1 0 0 1-.459-1.889l14.033-7.234a.999.999 0 1 1 .916 1.778l-14.033 7.234a.987.987 0 0 1-.457.111zM20.916 23.826a1 1 0 0 1-.459-1.889l20.93-10.79a.998.998 0 0 1 1.346.431.998.998 0 0 1-.43 1.347l-20.93 10.79a.987.987 0 0 1-.457.111zM12.187 23.826a1 1 0 0 1-.459-1.889L37.775 8.509a.998.998 0 0 1 1.348.431.999.999 0 0 1-.432 1.347L12.644 23.715a.99.99 0 0 1-.457.111z" fill="#0e5651" />
                        <path d="M40.93 11.259a1 1 0 0 1-.891-.542.998.998 0 0 0-1.346-.431 1 1 0 1 1-.918-1.778 2.973 2.973 0 0 1 2.289-.191A2.974 2.974 0 0 1 41.816 9.8a.999.999 0 0 1-.886 1.459zM8 19.826a1 1 0 0 1-1-1c0-2.757 2.243-5 5-5a1 1 0 1 1 0 2c-1.654 0-3 1.346-3 3a1 1 0 0 1-1 1z" fill="#0e5651" />
                        <path d="M12 23.826c-2.71 0-5-2.29-5-5s2.29-5 5-5a1 1 0 1 1 0 2c-1.626 0-3 1.374-3 3s1.374 3 3 3a1 1 0 1 1 0 2zM56 27.826a1 1 0 0 1-1-1c0-1.654-1.346-3-3-3a1 1 0 1 1 0-2c2.757 0 5 2.243 5 5a1 1 0 0 1-1 1zM52 55.826H12a1 1 0 1 1 0-2h40a1 1 0 1 1 0 2z" fill="#0e5651" />
                        <path d="M52 55.826a1 1 0 1 1 0-2c1.654 0 3-1.346 3-3a1 1 0 1 1 2 0c0 2.757-2.243 5-5 5z" fill="#0e5651" />
                        <path d="M56 51.826a1 1 0 0 1-1-1v-24a1 1 0 1 1 2 0v24a1 1 0 0 1-1 1zM12 55.826c-2.757 0-5-2.243-5-5a1 1 0 1 1 2 0c0 1.654 1.346 3 3 3a1 1 0 1 1 0 2z" fill="#0e5651" />
                        <path d="M8 51.826a1 1 0 0 1-1-1v-32a1 1 0 1 1 2 0v32a1 1 0 0 1-1 1zM50 23.826a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1z" fill="#0e5651" />
                        <path d="M50 19.826a1 1 0 0 1-1-1c0-1.654-1.346-3-3-3a1 1 0 1 1 0-2c2.757 0 5 2.243 5 5a1 1 0 0 1-1 1zM46 45.826c-3.794 0-7-3.206-7-7s3.206-7 7-7a1 1 0 1 1 0 2c-2.71 0-5 2.29-5 5s2.29 5 5 5a1 1 0 1 1 0 2z" fill="#0e5651" />
                        <path d="M56 45.826H46a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2zM56 33.826H46a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2zM46 41.762c-1.491 0-3-1.009-3-2.936 0-3.854 6-3.854 6 0 0 1.927-1.509 2.936-3 2.936zm0-3.869c-.167 0-1 .045-1 .935s.833.935 1 .935 1-.045 1-.935-.833-.935-1-.935zM47.408 23.826a1 1 0 0 1-.891-.542l-6.479-12.567a.999.999 0 0 1 .432-1.347.997.997 0 0 1 1.346.431l6.479 12.567a.999.999 0 0 1-.887 1.458z" fill="#0e5651" />
                        <path d="M52 23.826H12a1 1 0 1 1 0-2h40a1 1 0 1 1 0 2z" fill="#0e5651" />
                      </g>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="p-1" width="40" height="40" viewBox="0 0 512 512">
                      <g>
                        <path d="M334.974 0c-95.419 0-173.049 77.63-173.049 173.049 0 21.213 3.769 41.827 11.211 61.403L7.672 399.928a12.613 12.613 0 0 0-3.694 8.917v90.544c0 6.965 5.646 12.611 12.611 12.611h74.616a12.61 12.61 0 0 0 8.91-3.686l25.145-25.107a12.61 12.61 0 0 0 3.701-8.925v-30.876h30.837c6.965 0 12.611-5.646 12.611-12.611v-12.36h12.361c6.964 0 12.611-5.646 12.611-12.611v-27.136h27.136c3.344 0 6.551-1.329 8.917-3.694l40.121-40.121c19.579 7.449 40.196 11.223 61.417 11.223 95.419 0 173.049-77.63 173.049-173.049C508.022 77.63 430.393 0 334.974 0zm0 320.874c-20.642 0-40.606-4.169-59.339-12.393-4.844-2.126-10.299-.956-13.871 2.525-.039.037-.077.067-.115.106l-42.354 42.354h-34.523c-6.965 0-12.611 5.646-12.611 12.611v27.136H159.8c-6.964 0-12.611 5.646-12.611 12.611v12.36h-30.838c-6.964 0-12.611 5.646-12.611 12.611v38.257l-17.753 17.725H29.202v-17.821l154.141-154.14c4.433-4.433 4.433-11.619 0-16.051s-11.617-4.434-16.053 0L29.202 436.854V414.07l167.696-167.708c.038-.038.067-.073.102-.11 3.482-3.569 4.656-9.024 2.53-13.872-8.216-18.732-12.38-38.695-12.38-59.33 0-81.512 66.315-147.827 147.827-147.827S482.802 91.537 482.802 173.05c-.002 81.51-66.318 147.824-147.828 147.824z" fill="#0e5651" />
                        <path d="M387.638 73.144c-26.047 0-47.237 21.19-47.237 47.237s21.19 47.237 47.237 47.237 47.237-21.19 47.237-47.237-21.189-47.237-47.237-47.237zm0 69.252c-12.139 0-22.015-9.876-22.015-22.015s9.876-22.015 22.015-22.015 22.015 9.876 22.015 22.015-9.876 22.015-22.015 22.015z" fill="#0e5651" />
                      </g>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 486.025 486.025">
                      <g>
                        <path d="M420.725 85.413c-42.1-42.1-98.1-65.3-157.6-65.3-60.6 0-117.3 23.9-159.6 67.3-4.6 4.7-4.5 12.3.2 17 4.7 4.6 12.3 4.5 17-.2 37.8-38.7 88.3-60 142.4-60 109.7-.1 198.9 89.1 198.9 198.8s-89.2 198.9-198.9 198.9-198.9-89.2-198.9-198.9v-2.5l19.8 19.8c2.3 2.3 5.4 3.5 8.5 3.5s6.1-1.2 8.5-3.5c4.7-4.7 4.7-12.3 0-17l-40.2-40.3c-4.7-4.7-12.3-4.7-17 0l-40.3 40.3c-4.7 4.7-4.7 12.3 0 17s12.3 4.7 17 0l19.8-19.8v2.5c0 59.5 23.2 115.5 65.3 157.6s98.1 65.3 157.6 65.3 115.5-23.2 157.6-65.3 65.2-98.1 65.2-157.6-23.2-115.5-65.3-157.6z" fill="#0e5651" />
                        <path d="m326.925 161.913-147.4 147.3c-4.7 4.7-4.7 12.3 0 17 2.3 2.3 5.4 3.5 8.5 3.5s6.1-1.2 8.5-3.5l147.4-147.4c4.7-4.7 4.7-12.3 0-17-4.7-4.6-12.3-4.6-17 .1zM288.325 261.113c-16.7 16.7-16.7 44 0 60.7 8.1 8.1 18.9 12.6 30.4 12.6s22.3-4.5 30.4-12.6c16.7-16.7 16.7-44 0-60.7-8.1-8.1-18.9-12.6-30.4-12.6s-22.2 4.5-30.4 12.6zm43.8 43.8c-3.6 3.6-8.3 5.5-13.4 5.5s-9.8-2-13.4-5.5c-7.4-7.4-7.4-19.4 0-26.8 3.6-3.6 8.3-5.5 13.4-5.5s9.8 2 13.4 5.5c7.4 7.4 7.4 19.4 0 26.8zM207.925 151.213c-11.5 0-22.3 4.5-30.4 12.6s-12.6 18.9-12.6 30.4 4.5 22.3 12.6 30.4 18.9 12.6 30.4 12.6 22.3-4.5 30.4-12.6c8.1-8.1 12.6-18.9 12.6-30.4s-4.5-22.3-12.6-30.4c-8.2-8.1-18.9-12.6-30.4-12.6zm13.4 56.4c-3.6 3.6-8.3 5.5-13.4 5.5s-9.8-2-13.4-5.5c-3.6-3.6-5.5-8.3-5.5-13.4s2-9.8 5.5-13.4c3.6-3.6 8.3-5.5 13.4-5.5s9.8 2 13.4 5.5c3.6 3.6 5.5 8.3 5.5 13.4 0 5-1.9 9.8-5.5 13.4z" fill="#0e5651" />
                      </g>
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
              <PropertyGallery images={images} />
            </div>
          </div>
        )}

        {/* <div>
          <DownloadEnquire />
        </div> */}

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
                    objectFit="cover"
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
                <h2 className=" mb30">
                  {safeGet(projectData, 'Banner.project_name', projectName)} Amenities
                </h2>
                <div className="row">
                  <OverView amenities={amenities} />
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
                <div className="col-12 col-md-6 d-flex align-items-center mb-4 md-mb-0">
                  <MapComponent
                    lat={location.lat}
                    lng={location.lng}
                    markerTitle={projectName}
                  />
                </div>
                <div className="col-12 col-md-6 color-white d-flex cntLocationSec flex-column justify-content-center align-items-center">
                  <div>
                    <h2>{projectData.Full.address}</h2>
                  </div>
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
          <DownloadBrochure />
        </div>



        {/* Faqs Section */}
        {faqs.length >= 1 && (
          <div className="customPaddingProject container">
            <h2 className='mb-4'>{projectName} Frequently Asked Questions</h2>
            <Faq faqs={faqs} />
          </div>
        )}

        <section className='bgc-f7'>
          <div className="container ">
            {/* Use a row to create a flex container */}
            <div className="row align-items-center">
              
              {/* Column 1: The Text */}
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className=''>Fill the form below to get more information</h2>
                {/* You can add more text or a description here if needed */}
                <p className="lead">We&apos;ll get back to you as soon as possible with all the details.</p>
              </div>

              {/* Column 2: The Form */}
              <div className="col-lg-6">
                <Form title="Get More Information" />
              </div>

            </div>
          </div>
</section>

        {/* Similar Properties Section */}
        {/* <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="property-city-slider">
                  <NearbySimilarProperty />
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
  } catch (error) {
    return (
      <>
        <DefaultHeader />
        <MobileMenu />
        <ProjectError error={error} />
        <section className="footer-style1 pt60 pb-0">
          <Footer />
        </section>
      </>
    );
  }
}