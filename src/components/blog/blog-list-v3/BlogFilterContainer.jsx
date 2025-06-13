// components/blog/blog-list-v3/BlogFilterContainer.jsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import BlogFilter from './BlogFilter'
import Pagination from '../Pagination'

export default function BlogFilterContainer() {
  const searchParams    = useSearchParams()
  const router          = useRouter()
  const initialCatParam = searchParams.get('category_ids') || 'All'

  const [posts, setPosts]               = useState([])
  const [total, setTotal]               = useState(0)
  const [page, setPage]                 = useState(1)
  const [selectedCategory, setCategory] = useState(initialCatParam)
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const limit = 9

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const url = new URL('https://backend.thetopmasters.com/api/v1/blog')
      url.searchParams.set('page', page)
      url.searchParams.set('limit', limit)
      if (selectedCategory !== 'All') {
        url.searchParams.set('category_ids', selectedCategory)
      }
      const res  = await fetch(url.toString())
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setPosts(json.data)
      setTotal(json.total)
    } catch (e) {
      console.error(e)
      setError('Failed to load blogs.')
    } finally {
      setLoading(false)
    }
  }, [page, selectedCategory])

  // fetch on mount + whenever page/category changes
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  // when user clicks a pill
  const handleFilter = (catId) => {
    setCategory(catId)
    setPage(1)

    // update the URL without a full reload
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    if (catId === 'All') {
      params.delete('category_ids')
    } else {
      params.set('category_ids', catId)
    }
    router.replace(`/blog?${params.toString()}`)
  }

  return (
    <section className="our-blog pt-0">
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-delay="300">
          <div className="col-xl-12 navpill-style1">
            {loading && <p>Loading...</p>}
            {error   && <p className="text-danger">{error}</p>}
            {!loading && !error && (
              <BlogFilter
                posts={posts}
                selectedCategory={selectedCategory}
                onFilter={handleFilter}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="mbp_pagination text-center">
            <Pagination
              total={total}
              perPage={limit}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}