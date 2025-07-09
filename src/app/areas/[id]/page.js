import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// Components - keep critical ones for initial render
import DefaultHeader from "@/components/common/DefaultHeader"
import Footer from "@/components/common/default-footer"
import MobileMenu from "@/components/common/mobile-menu"
import AreaHero from "@/components/home/home-v1/area hero"
import EnquiryForm from "@/components/common/enquiry-form"

// Lazy load non-critical components (removed ssr: false)
const NearbySimilarProperty = dynamic(
  () => import("@/components/property/property-single-style/common/NearbySimilarProperty"),
  { 
    loading: () => <div className="animate-pulse h-64 bg-gray-200 rounded">Loading properties...</div>
  }
)

// API Functions - moved outside component for better caching
export async function getAreas(id) {
  try {
    const res = await fetch(
      `https://backend.thetopmasters.com/api/v1/areas/${id}`,
      {
        next: { 
          revalidate: 3600, // Cache for 1 hour
          tags: [`area-${id}`] // For on-demand revalidation
        }
      }
    )

    if (!res.ok) {
      if (res.status === 404) {
        notFound()
      }
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch area:", error)
    throw error
  }
}

// Metadata generation for SEO
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params
    const areas = await getAreas(resolvedParams.id)
    const areaData = areas.data

    // Use API SEO fields or fallback to defaults
    const title = areaData.seo_title || `${areaData.name} - Premium Properties in Dubai | Top Masters`
    const description = areaData.seo_description || 
      `Discover luxury properties in ${areaData.name}, Dubai. Starting from AED ${areaData.starting_price || 'Call for Price'}. Premium real estate opportunities in one of Dubai's most sought-after locations.`

    return {
      title,
      description,
      keywords: `${areaData.name}, Dubai real estate, luxury properties, investment opportunities, ${areaData.name} properties`,
      
      // Open Graph for social media
      openGraph: {
        title,
        description,
        url: `https://thetopmasters.com/areas/${resolvedParams.id}`,
        siteName: 'Top Masters Real Estate',
        images: [
          {
            url: areaData.img_url || '/default-area-image.jpg',
            width: 1200,
            height: 630,
            alt: `${areaData.name} - Dubai Real Estate`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },

      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [areaData.img_url || '/default-area-image.jpg'],
      },

      // Additional SEO
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

      // Canonical URL
      alternates: {
        canonical: `https://thetopmasters.com/areas/${resolvedParams.id}`,
      },

      // Additional metadata
      other: {
        'geo.region': 'AE-DU',
        'geo.placename': areaData.name,
        ...(areaData.lat && areaData.lng && {
          'geo.position': `${areaData.lat};${areaData.lng}`
        }),
      },
    }
  } catch (error) {
    // Fallback metadata if API fails
    return {
      title: 'Area Details - Top Masters Real Estate',
      description: 'Discover premium real estate opportunities in Dubai with Top Masters.',
    }
  }
}

// JSON-LD Structured Data Component
function StructuredData({ areaData }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": areaData.name,
    "description": areaData.description?.replace(/<[^>]*>/g, '') || `Premium real estate location in ${areaData.name}, Dubai`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": areaData.name,
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "url": `https://thetopmasters.com/areas/${areaData.slug}`,
    "image": areaData.img_url,
    ...(areaData.lat && areaData.lng && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": areaData.lat,
        "longitude": areaData.lng
      }
    }),
    ...(areaData.count_properties && {
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Available Properties",
          "value": areaData.count_properties
        }
      ]
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Main Component
async function AreaV1({ params }) {
  const resolvedParams = await params
  
  // Fetch data with error handling
  let areas
  try {
    areas = await getAreas(resolvedParams.id)
  } catch (error) {
    notFound()
  }

  const areaData = areas.data

  // Optimized background style
  const heroStyle = areaData.img_url ? {
    backgroundImage: `linear-gradient(rgba(31,31,31,0.5), rgba(31,31,31,0.5)), url(${areaData.img_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {}

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData areaData={areaData} />

      {/* Main Header Nav */}
      <DefaultHeader />

      {/* Mobile Nav */}
      <MobileMenu />

      {/* Hero Section */}
      <section className="home-banner-style2 p0">
        <div className="home-style2">
          <div className="container maxw1600">
            <div 
              className="area-hero-banner bdrs12" 
              style={heroStyle}
              role="banner"
              aria-label={`${areaData.name} hero banner`}
            />
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <AreaHero areas={areaData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="container customPaddingProjectAbout marginTopResponsive">
        <article>
          <header>
            <h1>{areaData.name ? `About ${areaData.name}` : 'About This Area'}</h1>
          </header>
          
          {areaData.content && (
            <div 
              dangerouslySetInnerHTML={{ __html: areaData.content }}
              className="area-content"
            />
          )}
        </article>
        
        {areaData.heading && areaData.description && (
          <article className='mt-4'>
          <header>
            <h2>{areaData.heading}</h2>
          </header>
          <div 
            dangerouslySetInnerHTML={{ __html: areaData.description }}
            className="area-description"
          />
        </article>
        )}

      </div>

      {/* Additional Content Section */}
      {/* {areaData.heading && areaData.description && (
        <div className="container customPaddingProjectAbout">
          <article>
            <header>
              <h2>{areaData.heading}</h2>
            </header>
            <div 
              dangerouslySetInnerHTML={{ __html: areaData.description }}
              className="area-description"
            />
          </article>
        </div>
      )} */}

      {/* Related Properties Section */}
      <section className="container" aria-labelledby="related-properties">
        <div className="row">
          <div className="col-lg-12">
            <h2 id="related-properties" className="pb-5">
              Properties in {areaData.name}
            </h2>
            <div className="property-city-slider">
              <Suspense fallback={
                <div className="animate-pulse h-64 bg-gray-200 rounded">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500">Loading properties...</div>
                  </div>
                </div>
              }>
                <NearbySimilarProperty areaId={areaData.id} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-style1 pt60 pb-0">
        <Footer />
      </footer>

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
  )
}

export default AreaV1