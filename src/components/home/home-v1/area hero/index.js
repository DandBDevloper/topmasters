import { memo } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

// Lazy load the modal since it's not immediately visible
const AdvanceFilterModal = dynamic(
  () => import("@/components/common/advance-filter"),
  { 
    loading: () => null // No loading state needed for modal
  }
)

// Prefetch Component for images and related resources
const ResourcePrefetch = memo(({ areas }) => {
  if (!areas) return null

  return (
    <Head>
      {/* Prefetch hero background image if it exists */}
      {areas.img_url && (
        <link
          rel="prefetch"
          href={areas.img_url}
          as="image"
          type="image/webp"
        />
      )}
      
      {/* Prefetch thumbnail if it exists and is different from main image */}
      {areas.thumb_url && areas.thumb_url !== areas.img_url && (
        <link
          rel="prefetch"
          href={areas.thumb_url}
          as="image"
          type="image/webp"
        />
      )}

      {/* Preconnect to external domains for faster loading */}
      <link rel="preconnect" href="https://backend.thetopmasters.com" />
      <link rel="dns-prefetch" href="https://backend.thetopmasters.com" />
    </Head>
  )
})

ResourcePrefetch.displayName = 'ResourcePrefetch'

// Optimized AreaHero Component
const AreaHero = memo(({ areas }) => {
  // Early return if no data
  if (!areas) {
    return (
      <div className="inner-banner-style1 text-center mt60">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Prefetch Resources */}
      <ResourcePrefetch areas={areas} />

      {/* Hero Content */}
      <div className="inner-banner-style1 text-center mt60">
        <h1 className="hero-title animate-up-2">
          {areas.name || 'Premium Location'}
        </h1>
        
        {areas.subheading && (
          <p className="hero-text fz15 animate-up-3">
            {areas.subheading}
          </p>
        )}
      </div>

      {/* Lazy-loaded Modal */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
          role="dialog"
          aria-modal="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
    </>
  )
})

AreaHero.displayName = 'AreaHero'

export default AreaHero

// Alternative: If you want to prefetch from the parent component
export const prefetchAreaImages = (areas) => {
  if (typeof window !== 'undefined' && areas) {
    // Prefetch main image
    if (areas.img_url) {
      const img = new Image()
      img.src = areas.img_url
    }
    
    // Prefetch thumbnail
    if (areas.thumb_url && areas.thumb_url !== areas.img_url) {
      const thumbImg = new Image()
      thumbImg.src = areas.thumb_url
    }
  }
}

// Usage in parent component:
// useEffect(() => {
//   prefetchAreaImages(areas)
// }, [areas])

// Advanced prefetching with Intersection Observer (for when component comes into view)
export const usePrefetchOnView = (areas) => {
  useEffect(() => {
    if (!areas || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Prefetch when component is about to be visible
            prefetchAreaImages(areas)
            observer.disconnect() // Only prefetch once
          }
        })
      },
      { rootMargin: '100px' } // Start prefetching 100px before component is visible
    )

    const heroElement = document.querySelector('.inner-banner-style1')
    if (heroElement) {
      observer.observe(heroElement)
    }

    return () => observer.disconnect()
  }, [areas])
}