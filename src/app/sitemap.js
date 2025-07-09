export default function sitemap() {
    return [
      {
        url: 'https://yourdomain.com',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://yourdomain.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://yourdomain.com/blog',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ]
  }
  
  // For dynamic content (like blog posts)
  export async function generateSitemaps() {
    // Fetch your posts or dynamic content
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
    
    // Generate sitemaps for different sections
    return [
      { id: 'posts' },
      { id: 'categories' },
    ]
  }
  
  // Alternative: Fetch dynamic content and include in sitemap
  export async function generateDynamicSitemap() {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
    
    const staticPages = [
      {
        url: 'https://yourdomain.com',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://yourdomain.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]
    
    const dynamicPages = posts.map((post) => ({
      url: `https://yourdomain.com/blog/${post.id}`,
      lastModified: new Date(post.createdAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.5,
    }))
    
    return [...staticPages, ...dynamicPages]
  }