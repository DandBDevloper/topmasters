"use client";
import listings from "@/data/listings";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const GalleryBox = ({images}) => {
  // const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  const imageUrls = [
    "/images/listings/listing-single-slide1.jpg",
    "/images/listings/listing-single-slide2.jpg",
    
    "/images/listings/listing-single-slide3.jpg",
  ];

  return (
    <>
    <Gallery>
      <Swiper
        className="overflow-visible"
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".single-pro-slide-next__active",
          prevEl: ".single-pro-slide-prev__active",
        }}
        slidesPerView={1}
        // initialSlide={2} 
        // loop={true}
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className="item GalleryImg">
              <Item
                original={imageUrl} // Full-size image
                thumbnail={imageUrl} // Thumbnail (optional)
                width="1600" // Width of the original image
                height="900" // Height of the original image
                title={`Image ${index + 1}`} // Optional title
              >
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    width={1170}
                    height={600}
                    className="bdrs12 w-100 h-100 cover"
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    onClick={open} // Opens the lightbox on click
                  />
                )}
              </Item>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Gallery>

      <div className="rounded-arrow arrowY-center-position">
        <button className="single-pro-slide-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="single-pro-slide-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default GalleryBox;
