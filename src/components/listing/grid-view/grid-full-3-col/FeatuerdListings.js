"use client";

import Image from "next/image";
import Link from "next/link";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
    {console.log("Page Items:", data)}
      {data.map((listing) => (
        <div
          className={` ${
            colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
          }  `}
          key={listing.id}
        >
          <div
            className={
              colstyle
                ? "listing-style1 listCustom listing-type"
                : "listing-style1"
            }
          >
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                className="w-100  cover"
                style={{ height: "230px" }}
                src={listing.image}
                alt="listings"
              />
            </div>

            <div className="list-content">
              <div className="list-meta2 d-flex flex-column text-center justify-content-between align-items-center">
                <h4 className=" text-center w-100">Dubai Marina</h4>
                {/* <p>One of the best Dubai's real estate developer with an expertise in retail, hospitality and leisure.</p> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
