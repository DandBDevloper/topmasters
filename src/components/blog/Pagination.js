// components/blog/Pagination.jsx
'use client'

import React from 'react'

export default function Pagination({
  total,
  perPage = 9,        // default to 9 per page
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const delta = 2 // how many pages to show around the current
  const range = []

  // build window of [currentPage - delta … currentPage + delta]
  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  // build final list, inserting ellipses where needed
  const pages = []
  if (range[0] > 1) {
    pages.push(1)
    if (range[0] > 2) {
      pages.push('left-ellipsis')
    }
  }
  pages.push(...range)
  if (range[range.length - 1] < totalPages) {
    if (range[range.length - 1] < totalPages - 1) {
      pages.push('right-ellipsis')
    }
    pages.push(totalPages)
  }

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <ul className="page_navigation mt20">
      {/* Previous */}
      <li className="page-item">
        <button
          className="page-link"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <span className="fas fa-angle-left" />
        </button>
      </li>

      {/* Page Numbers */}
      {pages.map((p, idx) => {
        if (p === 'left-ellipsis' || p === 'right-ellipsis') {
          return (
            <li className="page-item disabled" key={p + idx}>
              <span className="page-link">…</span>
            </li>
          )
        } else {
          return (
            <li
              className={`page-item ${currentPage === p ? 'active' : ''}`}
              aria-current={currentPage === p ? 'page' : undefined}
              key={p}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          )
        }
      })}

      {/* Next */}
      <li className="page-item">
        <button
          className="page-link"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <span className="fas fa-angle-right" />
        </button>
      </li>
    </ul>
  )
}
