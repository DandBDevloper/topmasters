
// import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";


export async function getBlog() {
  try {
    const res   = await fetch('https://backend.thetopmasters.com/api/v1/blogs?limit=3')

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
    <div className="row">
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
            <div className="date">
              <span className="month">
                {/* example: July → you’ll want to parse updated_at or have server send */}
                {new Date(blog.updated_at).toLocaleString('default',{month:'long'})}
              </span>
              <span className="day">
                {new Date(blog.updated_at).getUTCDate()}
              </span>
            </div>
            {/* if you want the first category tag on the card */}
            {/* {blog.categories?.[0] && (
              <a className="tag" href="#">
                {blog.categories[0].name}
              </a>
            )} */}
            <h6 className="title mt-1">
              <Link href={`/blogs/${blog.slug}`}>
                {blog.title}
              </Link>
            </h6>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Blog;
