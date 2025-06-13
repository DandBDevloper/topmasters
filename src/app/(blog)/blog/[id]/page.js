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
import Image         from "next/image";

export const metadata = {
  title: "Blog Single  || Homez - Real Estate NextJS Template",
};

export default async function BlogSingle({ params }) {
  const { id } = params;

  // 1) Fetch the post by ID
  const res = await fetch(
    `https://backend.thetopmasters.com/api/v1/blog/${id}`,
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