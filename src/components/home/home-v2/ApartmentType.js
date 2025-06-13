"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import Link from "next/link";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Autoplay]);

export default function ApartmentType() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if you have a Next.js API route, use `/api/apartmentType`
    // otherwise replace with your real external endpoint
    fetch("https://backend.thetopmasters.com/api/v1/categories")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setTypes(data.data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error.message}</p>;
  if (!types.length) return <p>No properties found.</p>;

  return (
    <Swiper
      spaceBetween={30}
      breakpoints={{
        300:  { slidesPerView: 2, spaceBetween: 15 },
        768:  { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      }}
      autoplay={{ delay: 3000 }}
    >
      {types.map((type, index) => (
        <SwiperSlide key={type.id}>
          <Link href="/#" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay={index * 100}>
            <div className="iconbox-style4">
              <span className={`icon ${type.icon}`} />
              <div className="iconbox-content">
                <h6 className="title">{type.name}</h6>
                {/* <p className="text mb-0">
                  {type.count} Properties
                </p> */}
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}