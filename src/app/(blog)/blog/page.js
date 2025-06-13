import DefaultHeader from "@/components/common/DefaultHeader"
import MobileMenu from "@/components/common/mobile-menu"
import BlogFilterContainer from "@/components/blog/blog-list-v3/BlogFilterContainer"
import Footer from "@/components/common/default-footer"
import { Suspense } from "react"

export const metadata = {
  title: "Blog • Homez - Real Estate NextJS Template",
}

export default function BlogV3() {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <section className="breadcumb-section">
        <div className="container">
          <div className="breadcumb-style1">
            <h2 className="title">Blog</h2>
            <div className="breadcumb-list">
              <a href="/">Home</a>
              <a href="/blog">Blog</a>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Wrap client component with Suspense */}
      <Suspense fallback={<p>Loading blog...</p>}>
        <BlogFilterContainer />
      </Suspense>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  )
}