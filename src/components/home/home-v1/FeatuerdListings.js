"use client";
import { useEffect, useState } from "react";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import PropertyCard from "@/components/common/PropertyCard";

const FeaturedListings = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
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
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {projects.slice(0, 4).map((project) => (
          <SwiperSlide key={project.id}>
            <PropertyCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <button className="featured-prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        {/* End prev */}

        <div className="col-auto">
          <div className="pagination swiper--pagination featured-pagination__active" />
        </div>
        {/* End pagination */}

        <div className="col-auto">
          <button className="featured-next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
        {/* End Next */}
      </div>
      {/* End .col for navigation and pagination */}
    </>
  );
};

export default FeaturedListings;
