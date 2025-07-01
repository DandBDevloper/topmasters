// app/blog/[id]/page.jsx
import Details       from "@/components/blog/blog-single/Details";
import Features      from "@/components/blog/blog-single/Features";
import Pagination    from "@/components/blog/blog-single/Pagination";
import ReviewBoxForm from "@/components/blog/blog-single/ReviewBoxForm";
import Social        from "@/components/blog/blog-single/Social";
import Tags          from "@/components/blog/blog-single/Tags";
import TopComments   from "@/components/blog/blog-single/TopComments";
import AllReviews    from "@/components/blog/blog-single/reviews";
import Blog          from "@/components/common/Blog";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer        from "@/components/common/default-footer";
import MobileMenu    from "@/components/common/mobile-menu";

// Dynamic metadata generation
export async function generateMetadata({ params }) {
  const { id } = params;
  
  try {
    // Fetch the blog post data
    const res = await fetch(
      `https://backend.thetopmasters.com/api/v1/blogs/${id}`,
      { cache: "no-store" }
    );
    
    if (!res.ok) {
      // Fallback metadata if API fails
      return {
        title: "Blog Post || Homez - Real Estate NextJS Template",
        description: "Read our latest real estate insights and market trends.",
      };
    }

    const json = await res.json();
    const post = json.data;

    // Generate dynamic metadata
    const title = post.seo_title || post.title || "Blog Post";
    const description = post.seo_description || `Read about ${post.title} and stay updated with the latest real estate insights.`;
    const imageUrl = post.featured_image || "/images/default-blog-image.jpg";
    const url = `https://yourdomain.com/blog/${id}`;

    return {
      title: `${title}`,
      description: description,
      
      // Open Graph (Facebook, LinkedIn, etc.)
      openGraph: {
        title: title,
        description: description,
        type: "article",
        url: url,
        siteName: "Homez",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: "en_US",
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
      },

      // Twitter Card
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [imageUrl],
        creator: "@homez_realestate",
        site: "@homez_realestate",
      },

      // Additional SEO tags
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      // Canonical URL
      alternates: {
        canonical: url,
      },

      // Article specific metadata
      other: {
        "article:author": "Homez Editorial Team",
        "article:published_time": post.created_at,
        "article:modified_time": post.updated_at,
        "article:section": "Real Estate",
        "article:tag": "real estate, property, investment, market trends",
      },

      // Verification tags (add your actual verification codes)
      verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
        yahoo: "your-yahoo-verification-code",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    
    // Fallback metadata if there's an error
    return {
      title: "Blog Post || Homez - Real Estate NextJS Template",
      description: "Read our latest real estate insights and market trends.",
    };
  }
}

export default async function BlogSingle({ params }) {
  const { id } = params;

  // 1) Fetch the post by ID
  const res = await fetch(
    `https://backend.thetopmasters.com/api/v1/blogs/${id}`,
    { cache: "no-store" }          // always fetch fresh data
  );
  if (!res.ok) {
    // You can customize error handling here
    throw new Error(`Failed to fetch blog ${id}`);
  }

  const json = await res.json();
  const post = json.data;          // note: data is a single object

  // 2) Render
  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <section className="our-blog pt50">
        {/* Details section */}
        <Details post={post} />

        <div className="container">
          <div className="roww" data-aos="fade-up" data-aos-delay="500">
            <div className="col-xl-8 offset-xl-2">
              {/* Render the HTML content from the API */}
              <div
                className="ui-content mt40 mb60"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Example static part of your template */}
              {/* <div className="blockquote-style1 mb60">
                <blockquote className="blockquote">
                  <p className="fst-italic fz15 fw500 ff-heading">
                    Aliquam hendrerit sollicitudin purus, quis rutrum mi
                    accumsan nec. Quisque bibendum orci ac nibh facilisis, at
                    malesuada orci congue.
                  </p>
                  <h6 className="quote-title">Luis Pickford</h6>
                </blockquote>
              </div> */}

              <div className="bdrt1 bdrb1 d-block d-sm-flex justify-content-between pt50 pt30-sm pb50 pb30-sm">
                <div className="blog_post_share d-flex align-items-center mb10-sm">
                  <span className="mr30">Share this post</span>
                  <Social />
                </div>
                {/* <div className="bsp_tags d-flex">
                  <Tags tags={post.tags} />
                </div> */}
              </div>

              {/* <TopComments /> */}

              <Pagination />

              {/* <AllReviews /> */}

              {/* <div className="bsp_reveiw_wrt">
                <h6 className="fz17">Leave A Review</h6>
                <ReviewBoxForm postId={post.id} />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {/* <section className="pb90 pb20-md pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
        </div>
      </section> */}

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
}