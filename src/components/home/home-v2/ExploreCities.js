"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ExploreCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAreas() {
      try {
        const res = await fetch('https://backend.thetopmasters.com/api/v1/areas');
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const json = await res.json();
        // Adjust if your API wraps data in `data`
        const areas = Array.isArray(json.data) ? json.data : json;

        const mapped = areas.map(a => ({
          id: a.id,
          name: a.name,
          image: a.img_url,                  // already a full `/storage/...` URL
          number: a.count_properties || 0,    // whatever numeric field
        }));

        setCities(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAreas();
  }, []);

  if (loading) {
    return <p>Loading areas…</p>;
  }

  if (cities.length === 0) {
    return <p>No areas to show.</p>;
  }

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".cities_next__active",
          prevEl: ".cities_prev__active",
        }}
        pagination={{
          el: ".cities_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {cities.map((city) => (
          <SwiperSlide key={city.id}>
            <div className="item">
              <Link href={`area/${city.id}`}>
                <div className="feature-style2 mb30">
                  <div className="feature-img HomeAreaImg">
                    <Image
                      fill={true}
                      className="w-100 h-100 cover"
                      src={city.image}
                      alt="city listings"
                    />
                  </div>
                  <div className="feature-content pt20">
                    <h6 className="title mb-1">{city.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ExploreCities;
