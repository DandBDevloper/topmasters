
// import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";


export async function getBlog() {
  try {
    const res = await fetch(`https://backend.thetopmasters.com/api/v1/blog`)

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    const data = await res.json()
    // console.log(data)
    return data.data
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    throw error  // rethrow the error to handle it higher up in the call chain
  }
}
async function Blog () {
  let blogs = await getBlog();
  // useEffect(() => {
  //   console.log("🟢 (client) blogs:", blogs);
  // }, [blogs]);
  return (
    <section className="row">
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '1rem' }}>
        {JSON.stringify(blogs, null, 2)}
      </pre>
      {blogs.map((blog) => (
        <div className="col-sm-6 col-lg-4" key={blog.id}>
          <div className="blog-style1">
            <div className="blog-img">
              <Image
                width={386}
                height={271}
                className="w-100 h-100 cover"
                src={blog.featured_image}
                alt={blog.title}
              />
            </div>
            <div className="blog-content">
              {/* <div className="date">
                <span className="month">{blog.date.month}</span>
                <span className="day">{blog.date.day}</span>
              </div> */}
              <h6 className="title mt-4">
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h6>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Blog;
