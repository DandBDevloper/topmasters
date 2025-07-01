'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import Link  from 'next/link'

export default function BlogFilter({ posts, selectedCategory, onFilter }) {
  // derive unique categories from the posts you fetched
  const categories = useMemo(() => {
    const map = new Map()
    posts.forEach(post => {
      (post.categories||[]).forEach(c => map.set(c.id, c.name))
    })
    // always include “All” as first option
    return [{ id: 'All', name: 'All' }, ...Array.from(map, ([id,name])=>({id,name}))]
  }, [posts])

  return (
    <>
      {/* <ul className="nav nav-pills mb20">
        {categories.map(({ id, name }) => (
          <li className="nav-item" role="presentation" key={id}>
            <button
              className={
                `nav-link mb-2 mb-lg-0 fw500 dark-color ` +
                (String(id) === String(selectedCategory) ? 'active' : '')
              }
              onClick={() => onFilter(id)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul> */}
      {/* End nav */}

      <div className="row">
        {posts.map((blog) => (
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
    </>
  )
}