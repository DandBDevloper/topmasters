import listings from "@/data/listings";
import React from "react";
import Image from "next/image";


const OverView = ({amenities}) => {
  // const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  // const overviewData = [
  //   {
  //     icon: "flaticon-bed",
  //     label: "Apartment",
  //     value: data.bed,
  //   },
  //   {
  //     icon: "flaticon-shower",
  //     label: "Luxury Interior",
  //     value: data.bath,
  //   },
  //   {
  //     icon: "flaticon-event",
  //     label: "Quick Handover",
  //     value: data.yearBuilding,
  //   },
  //   {
  //     icon: "flaticon-garage",
  //     label: "Parking",
  //     value: "2",
  //     xs: true,
  //   },
  //   {
  //     icon: "flaticon-expand",
  //     label: "Bigger Size",
  //     value: data.sqft,
  //     xs: true,
  //   },
  //   {
  //     icon: "flaticon-home-1",
  //     label: "Property Type",
  //     value: data.propertyType,
  //   },
  // ];
  
 
  return (
    <>
      {amenities.map((item, index) => (
        <div
          key={index}
          className={` col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center p-3">
            <Image 
              src={item.icon} 
              alt={`${item.name} icon`} 
              width={25}        // specify appropriate width
              height={25}
              className="icon projectAmenitiesIcon"  // your custom styling
            />
            <div className="ml15">
              <h6 className="mb-0">{item.name}</h6>
              {/* <p className="text mb-0 fz15">{item.value}</p> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
