"use client";

import Image from "next/image";
import Link from "next/link";

const DeveloperCard = ({ data, colstyle }) => {
  return (
    <>
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
            <div className="list-thumb" style={{ position: "relative" }}>
              <Image
                width={382}
                height={248}
                className="w-100 cover"
                style={{ height: "230px" }}
                src={listing.image}
                alt="listings"
              />
              <div
                className="image-overlay"
                style={{
                  position: "absolute",
                  top: "10px", // Adjust as needed
                  left: "10px", // Adjust as needed
                  width: "100px", // Set width for overlay image
                  height: "50px", // Set height for overlay image
                  paddingLeft: "8px", // Add horizontal padding (left)
                  paddingRight: "8px", // Add horizontal padding (right)
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF"

                }}
              >
                <img
                  src='./images/developer/emaar-logo.webp' // Replace with your overlay image path
                  alt="Overlay"
                  style={{
                    width: "100%", // Ensures the overlay image fits the container
                    height: "100%", // Ensures the overlay image fits the container
                    objectFit: "contain", // Ensures the aspect ratio is maintained
                  }}
                />
              </div>
            </div>

            <div className="list-content">
              <div className="list-meta2 d-flex flex-column text-center justify-content-between align-items-center">
                <h4 className=" text-center w-100">Emaar</h4>
                <p>One of the best Dubais real estate developer with an expertise in retail, hospitality and leisure.</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DeveloperCard;
