'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AreaCard from './AreaCard';

export default function AreasFiltering({ 
  initialAreas = [], 
  total = 0,
  currentPage = 1,
  totalPages = 1,
}) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get current filter states from URL params using the hook
  const [search, setSearch] = useState(urlSearchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(urlSearchParams.get('sortBy') || 'name');
  const [sortOrder, setSortOrder] = useState(urlSearchParams.get('sortOrder') || 'asc');

  // Update URL with new parameters
  const updateURL = useCallback((newParams) => {
    setIsLoading(true);
    const params = new URLSearchParams(urlSearchParams);
    
    // Reset to first page when filters change
    params.set('page', '1');
    
    // Update or remove parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/areas?${params.toString()}`);
  }, [router, urlSearchParams]);

  // Handle pagination
  const handlePageChange = useCallback((page) => {
    setIsLoading(true);
    const params = new URLSearchParams(urlSearchParams);
    params.set('page', page.toString());
    router.push(`/areas?${params.toString()}`);
  }, [router, urlSearchParams]);

  // Handle search
  const handleSearch = useCallback((searchTerm) => {
    setSearch(searchTerm);
    updateURL({ search: searchTerm });
  }, [updateURL]);

  // Handle sorting
  const handleSort = useCallback((sortOption) => {
    const [field, order] = sortOption.split('-');
    setSortBy(field);
    setSortOrder(order);
    updateURL({ sortBy: field, sortOrder: order });
  }, [updateURL]);

  // Handle filters
  const handlePriceFilter = useCallback((min, max) => {
    updateURL({ minPrice: min, maxPrice: max });
  }, [updateURL]);

  const handlePropertyFilter = useCallback((min, max) => {
    updateURL({ minProperties: min, maxProperties: max });
  }, [updateURL]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearch('');
    setSortBy('name');
    setSortOrder('asc');
    router.push('/areas');
  }, [router]);

  // Filter functions for sidebar
  const filterFunctions = {
    search,
    sortBy,
    sortOrder,
    handleSearch,
    handleSort,
    handlePriceFilter,
    handlePropertyFilter,
    resetFilters
  };

  // Stop loading when component mounts (page has loaded)
  useEffect(() => {
    setIsLoading(false);
  }, [initialAreas]);

  // Sync local state with URL params when they change
  useEffect(() => {
    setSearch(urlSearchParams.get('search') || '');
    setSortBy(urlSearchParams.get('sortBy') || 'name');
    setSortOrder(urlSearchParams.get('sortOrder') || 'asc');
  }, [urlSearchParams]);

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) items.push(i);
        items.push('...');
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) items.push(i);
      } else {
        items.push(1);
        items.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) items.push(i);
        items.push('...');
        items.push(totalPages);
      }
    }
    
    return items;
  };

  const paginationItems = generatePaginationItems();

  return (
    <section className="pt50 pb90">
      <div className="container">
        {/* Search Bar */}
        {/* <div className="row mb-4">
          <div className="col-12">
            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search areas by name..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div> */}

        {/* Areas Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="list-title">
                <h4 className="mb-0">
                  {total > 0 ? `${total} Areas Found` : 'No Areas Found'}
                </h4>
                {total > 0 && (
                  <p className="text-muted mb-0">
                    Showing {((currentPage - 1) * 3) + 1}-{Math.min(currentPage * 3, total)} of {total} areas
                  </p>
                )}
              </div>
              
              {/* Sort Dropdown */}
              <div className="dropdown">
                <select 
                  className="form-select"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => handleSort(e.target.value)}
                  aria-label="Sort areas"
                >
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="count_properties-desc">Properties: High to Low</option>
                  <option value="count_properties-asc">Properties: Low to High</option>
                  <option value="starting_price-desc">Price: High to Low</option>
                  <option value="starting_price-asc">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="row">
            <div className="col-12 text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}

        {/* Areas Listing */}
        {!isLoading && (
          <div className="row">
            {initialAreas.length > 0 ? (
              initialAreas.map((area) => (
                <div key={area.id} className="col-sm-12 col-lg-4 mb-4">
                  <AreaCard area={area} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-filter fa-3x text-muted"></i>
                  </div>
                  <h4 className="mb-3">No Areas Match Your Filters</h4>
                  <p className="text-muted mb-4">
                    Try adjusting your search criteria to see more results.
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-redo me-2"></i>
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* End Areas Listing */}

        {/* Server-Side Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="mbp_pagination text-center">
                <ul className="page_navigation">
                  {/* Previous Button */}
                  <li className="page-item">
                    <span
                      className="page-link pointer"
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    >
                      <span className="fas fa-angle-left" />
                    </span>
                  </li>

                  {/* Page 1 */}
                  <li
                    onClick={() => handlePageChange(1)}
                    className={currentPage === 1 ? "active page-item" : "page-item"}
                  >
                    <span className="page-link pointer">1</span>
                  </li>

                  {/* Page 2 */}
                  {totalPages > 1 && (
                    <li
                      onClick={() => handlePageChange(2)}
                      className={currentPage === 2 ? "active page-item" : "page-item"}
                    >
                      <span className="page-link pointer">2</span>
                    </li>
                  )}

                  {/* Page 3 */}
                  {totalPages > 2 && (
                    <li
                      onClick={() => handlePageChange(3)}
                      className={currentPage === 3 ? "active page-item" : "page-item"}
                    >
                      <span className="page-link pointer">3</span>
                    </li>
                  )}

                  {/* Ellipsis and current page if > 3 */}
                  {totalPages > 4 && currentPage !== 4 && <span>...</span>}
                  {currentPage > 3 && totalPages !== currentPage && (
                    <li
                      className="active page-item"
                      onClick={() => handlePageChange(currentPage)}
                    >
                      <span className="page-link pointer">{currentPage}</span>
                    </li>
                  )}

                  {/* Last page */}
                  {totalPages > 4 && (
                    <li
                      className={
                        currentPage === totalPages
                          ? "active page-item"
                          : "page-item"
                      }
                      onClick={() => handlePageChange(totalPages)}
                    >
                      <span className="page-link pointer">{totalPages}</span>
                    </li>
                  )}

                  {/* Next Button */}
                  <li className="page-item pointer">
                    <span
                      className="page-link"
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    >
                      <span className="fas fa-angle-right" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* End Pagination */}
      </div>
      {/* End container */}
    </section>
  );
}