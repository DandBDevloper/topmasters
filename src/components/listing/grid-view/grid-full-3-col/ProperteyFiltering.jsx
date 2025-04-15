'use client';

import React, { useState, useEffect } from 'react';
// import ListingSidebar from '@/components/common/ListingSidebar';
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import TopFilterBar from './TopFilterBar';
import FeaturedListings from './FeatuerdListings';
// import PaginationTwo from '@/components/common/PaginationTwo';
import PropertyCard from '@/components/common/PropertyCard';
import ListingSidebar from '../../sidebar';
import PaginationTwo from '../../PaginationTwo';

// If you have a local data file for fallback, you can import it (optional)
// import listings from "@/data/listings";

export default function PropertyFiltering() {
  // States for the fetched projects data
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Filtering and sorting states
  const [filteredData, setFilteredData] = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState('Newest');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  // Filter states
  const [listingStatus, setListingStatus] = useState('All');
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState('All Cities');
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setYearBuild] = useState([0, 2050]);
  const [categories, setCategories] = useState([]);

  // Functions to update filter states
  const resetFilter = () => {
    setListingStatus('All');
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation('All Cities');
    setSquirefeet([]);
    setYearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption('Newest');
    document.querySelectorAll('.filterInput').forEach((element) => {
      element.value = null;
    });
    document.querySelectorAll('.filterSelect').forEach((element) => {
      element.value = 'All Cities';
    });
  };

  const handlelistingStatus = (elm) => {
    setListingStatus((prev) => (prev === elm ? 'All' : elm));
  };

  const handlepropertyTypes = (elm) => {
    if (elm === 'All') {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((prev) =>
        prev.includes(elm) ? prev.filter((el) => el !== elm) : [...prev, elm]
      );
    }
  };

  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };

  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };

  const handlebathroms = (elm) => {
    setBathroms(elm);
  };

  const handlelocation = (elm) => {
    setLocation(elm);
  };

  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };

  const handleyearBuild = (elm) => {
    setYearBuild(elm);
  };

  const handlecategories = (elm) => {
    if (elm === 'All') {
      setCategories([]);
    } else {
      setCategories((prev) =>
        prev.includes(elm) ? prev.filter((el) => el !== elm) : [...prev, elm]
      );
    }
  };

  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
  };

  // Fetch projects from the API once on component mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          'https://backend.thetopmasters.com/api/v1/projects',
          { cache: 'no-store' }
        );
        if (!res.ok) {
          // If the API fails, you can either set projects to an empty array or handle the error
          console.error('Error fetching projects:', res.status);
          setProjects([]);
        } else {
          const result = await res.json();
          if (!result.data || (Array.isArray(result.data) && result.data.length === 0)) {
            setProjects([]);
          } else {
            // Assume result.data is an array
            setProjects(result.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // Filtering logic (using listings from fetched API data)
  // useEffect(() => {
  //   // Use fetched projects if available, otherwise use empty array.
  //   const refItems = projects.filter((elm) => {
  //     if (listingStatus === "All") {
  //       return true;
  //     } else if (listingStatus === "Buy") {
  //       return !elm.forRent;
  //     } else if (listingStatus === "Rent") {
  //       return elm.forRent;
  //     }
  //     return true;
  //   });

  //   let filteredArrays = [];

  //   if (propertyTypes.length > 0) {
  //     const filtered = refItems.filter((elm) =>
  //       propertyTypes.includes(elm.propertyType)
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }
  //   filteredArrays = [
  //     ...filteredArrays,
  //     refItems.filter((el) => el.bed >= bedrooms),
  //   ];
  //   filteredArrays = [
  //     ...filteredArrays,
  //     refItems.filter((el) => el.bath >= bathroms),
  //   ];
  //   filteredArrays = [
  //     ...filteredArrays,
  //     !categories.length ? [...refItems] : refItems.filter((elm) =>
  //       categories.every((elem) => elm.features.includes(elem))
  //     ),
  //   ];

  //   if (location !== 'All Cities') {
  //     filteredArrays = [
  //       ...filteredArrays,
  //       refItems.filter((el) => el.city === location),
  //     ];
  //   }

  //   if (priceRange.length > 0) {
  //     const filtered = refItems.filter((elm) => {
  //       const numericPrice = Number(elm.price.split('$')[1].replace(/,/g, ''));
  //       return numericPrice >= priceRange[0] && numericPrice <= priceRange[1];
  //     });
  //     filteredArrays = [...filteredArrays, filtered];
  //   }
  //   if (squirefeet.length > 0 && squirefeet[1]) {
  //     const filtered = refItems.filter(
  //       (elm) => elm.sqft >= squirefeet[0] && elm.sqft <= squirefeet[1]
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }
  //   if (yearBuild.length > 0) {
  //     const filtered = refItems.filter(
  //       (elm) => elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1]
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }

  //   // Intersection of all filtered arrays: items that appear in every filter array
  //   const commonItems = refItems.filter((item) =>
  //     filteredArrays.every((array) => array.includes(item))
  //   );

  //   setFilteredData(commonItems);
  // }, [
  //   projects,
  //   listingStatus,
  //   propertyTypes,
  //   priceRange,
  //   bedrooms,
  //   bathroms,
  //   location,
  //   squirefeet,
  //   yearBuild,
  //   categories,
  // ]);

  // Sorting logic
  useEffect(() => {
    setPageNumber(1);
    let sorted;
    if (currentSortingOption === 'Newest') {
      sorted = [...filteredData].sort((a, b) => b.yearBuilding - a.yearBuilding);
    } else if (currentSortingOption.trim() === 'Price Low') {
      sorted = [...filteredData].sort(
        (a, b) =>
          Number(a.price.split('$')[1].replace(/,/g, '')) -
          Number(b.price.split('$')[1].replace(/,/g, ''))
      );
    } else if (currentSortingOption.trim() === 'Price High') {
      sorted = [...filteredData].sort(
        (a, b) =>
          Number(b.price.split('$')[1].replace(/,/g, '')) -
          Number(a.price.split('$')[1].replace(/,/g, ''))
      );
    } else {
      sorted = filteredData;
    }
    setSortedFilteredData(sorted);
  }, [filteredData, currentSortingOption]);

  // Pagination effect
  useEffect(() => {
    const capacity = 9;
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * capacity, pageNumber * capacity)
    );
    setPageContentTrac([
      (pageNumber - 1) * capacity + 1,
      pageNumber * capacity,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  if (loadingProjects) {
    return (
      <div className='container min-vh-100 d-flex align-items-center justify-content-center '>
        <div className="col-sm-12 col-lg-4 list-title">
          <p className='list-title'>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt50 pb90">
      <div className="container">
        {/* Mobile Filter Sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
              Listing Filter
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        {/* Advance Feature Modal */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End Advance Feature Modal */}

        {/* Projects Listing */}
        <div className="row">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="col-sm-12 col-lg-4">
                <PropertyCard project={project} />
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
        {/* End Projects Listing */}

        {/* Pagination */}
        <div className="row">
          <PaginationTwo
            pageCapacity={9}
            data={sortedFilteredData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
      {/* End container */}
    </section>
  );
}