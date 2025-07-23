import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// Loading skeleton component
function BlogSkeleton() {
  return (
    <div className="row">
      {[...Array(3)].map((_, index) => (
        <div className="col-sm-6 col-lg-4" key={index}>
          <div className="blog-style1">
            <div className="blog-img">
              <div className="w-100 h-100 bg-gray-200 animate-pulse rounded" style={{ height: '271px' }} />
            </div>
            <div className="blog-content">
              <div className="date">
                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mb-1" />
                <div className="h-6 w-8 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="mt-3">
                <div className="h-5 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Error fallback component
function BlogError({ error, retry }) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="text-center py-5">
          <div className="mb-3">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Unable to load blog posts
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          {retry && (
            <button 
              onClick={retry}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced API fetch function with timeout and better error handling
export async function getBlog() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  try {
    const res = await fetch('https://backend.thetopmasters.com/api/v1/blogs?limit=3', {
      signal: controller.signal,
      next: { 
        revalidate: 300, // Cache for 5 minutes
        tags: ['blogs'] // Tag for on-demand revalidation
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid response format: expected data array');
    }

    return data.data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your connection and try again.');
      }
      throw error;
    }
    
    throw new Error('An unexpected error occurred while fetching blogs.');
  }
}

// Individual blog card component for better organization
function BlogCard({ blog }) {
  const blogDate = new Date(blog.updated_at);
  const month = blogDate.toLocaleString('default', { month: 'long' });
  const day = blogDate.getUTCDate();

  return (
    <article className="col-sm-6 col-lg-4">
      <div className="blog-style1">
        <div className="blog-img">
          {blog.featured_image ? (
            <Image
              width={386}
              height={271}
              className="w-100 h-100 cover"
              src={blog.featured_image}
              alt={`Featured image for ${blog.title}`}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              
            />
          ) : (
            <div 
              className="w-100 h-100 d-flex align-items-center justify-content-center bg-light text-muted"
              style={{ height: '271px' }}
              role="img"
              aria-label="No image available"
            >
              <span>No image found</span>
            </div>
          )}
        </div>
        <div className="blog-content">
          <div className="date" aria-label={`Published on ${month} ${day}`}>
            <span className="month">{month}</span>
            <span className="day">{day}</span>
          </div>
          <h6 className="title mt-1">
            <Link 
              href={`/blogs/${blog.slug}`}
              className="text-decoration-none"
              aria-label={`Read more about ${blog.title}`}
            >
              {blog.title}
            </Link>
          </h6>
        </div>
      </div>
    </article>
  );
}

// Main blog component
async function BlogContent() {
  try {
    const blogs = await getBlog();

    if (!blogs || blogs.length === 0) {
      return (
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <p className="text-muted">No blog posts available at the moment.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="row" role="main" aria-label="Latest blog posts">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    return <BlogError error={errorMessage} />;
  }
}

// Main exported component with Suspense boundary
export default function Blog() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent />
    </Suspense>
  );
}