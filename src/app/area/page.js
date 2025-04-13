// "use client";
// import { useEffect, useState } from 'react'
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import EnergyClass from "@/components/property/property-single-style/common/EnergyClass";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import HomeValueChart from "@/components/property/property-single-style/common/HomeValueChart";
import InfoWithForm from "@/components/property/property-single-style/common/more-info";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import PropertyViews from "@/components/property/property-single-style/common/property-view";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common/ReviewBoxForm";
import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
import AllReviews from "@/components/property/property-single-style/common/reviews";
import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v4/property-gallery";

import React from "react";
import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import WalkScore from "@/components/property/property-single-style/common/WalkScore";
import ProjectHero from "@/components/property/property-single-style/common/ProjectHero";
import Image from "next/image";
import EnquiryForm from "@/components/common/enquiry-form";
import Hero from "@/components/home/home-v1/hero";
import AreaHero from "@/components/home/home-v1/area hero";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";

export const metadata = {
  title: "Project Page",
};

// export async function getProjects(el) {
//   try {
//     const res = await fetch(`http://127.0.0.1:8000/api/v1/projects/${el}`)

//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`)
//     }

//     const data = await res.json()
//     console.log(data)
//     return data
//   } catch (error) {
//     console.error("Failed to fetch projects:", error)
//     throw error  // rethrow the error to handle it higher up in the call chain
//   }
// }

const missionData = [
  {
    icon: "flaticon-garden",
    title: "15 Mins",
    description: "Away from Downtown.",
  },
  {
    icon: "flaticon-secure-payment",
    title: "15 Mins",
    description: "Away from Downtown.",
  },
  {
    icon: "flaticon-secure-payment",
    title: "15 Mins",
    description: "Away from Downtown.",
  },,
  {
    icon: "flaticon-secure-payment",
    title: "15 Mins",
    description: "Away from Downtown.",
  },
];

async function AreaList ({params}) {
  // let projects = await getProjects(params.id);



  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* <ProjectHero  images={projects.data.Gallery}/> */}

      {/* <section className="p-0">
        <div className="sellingList">
          <div className="sellingListItem">
          Starting from <br/><span>AED 1,052,000</span>
          </div>
          <div className="sellingListItem">
          Easy <br/><span>Payment Plans</span>
          </div>
          <div className="sellingListItem">
          Handover<br/><span>2029</span>
          </div>
        </div>
      </section> */}

      {/* Home Banner Style V2 */}
      {/* <section className="home-b 
      
      
      
      
      
      
      
      
      
      */}
      {/* End Home Banner Style V2 */}

      


      <div className="container customPaddingProjectAbout marginTopResponsive">
        <div className="">
          <div className="text-center">
            <h1>Top Dubai Communities</h1>
            <p><strong>Discover vibrant living in Dubai through our comprehensive area guide, offering insights into top communities, attractions, and things to do. Explore the best restaurants, must-visit places, and top-rated apartments, while uncovering the finest properties for the community that best fits you.</strong></p>
          </div>
        </div>
      </div>

      
      {/* <div className="container customPaddingProjectGallery">
        <div className="row">
          <PropertyGallery id={params.id}/>
        </div>
      </div> */}

      {/* <div className="">
          <div className="container customPaddingProjectGallery">
            <div className="row ">
              <div className="col-12 col-md-6 d-flex align-items-center" >
                <Image
                  src="https://enquiries.estate/laguna-residence/images/hero.webp" // Image URL
                  alt="Example of a Next.js Image"
                  layout="fill" 
                  objectFit="cover"
                  className="imgRounded"
                />
              </div>

              <div className="col-12 col-md-6 color-white d-flex cntLocationSec flex-column justify-content-center align-items-center ">
                <h3>Live the Island State of Mind at DAMAC Islands Dubai, UAE</h3>
                <div>
                  <p>Prime Location in Dubailand: Situated in one of the most sought-after areas, DAMAC Islands by DAMAC Properties in Dubai offers easy access to the city's main attractions.</p>
                  <p>Prime Location in Dubailand: Situated in one of the most sought-after areas, DAMAC Islands by DAMAC Properties in Dubai offers easy access to the city's main attractions.</p>
                  <p>Prime Location in Dubailand: Situated in one of the most sought-after areas, DAMAC Islands by DAMAC Properties in Dubai offers easy access to the city's main attractions.</p>
                  <p>Prime Location in Dubailand: Situated in one of the most sought-after areas, DAMAC Islands by DAMAC Properties in Dubai offers easy access to the city's main attractions.</p>
                  <p>Prime Location in Dubailand: Situated in one of the most sought-after areas, DAMAC Islands by DAMAC Properties in Dubai offers easy access to the city's main attractions.</p>
                </div>
              </div>
              
            </div>
          </div>
      </div> */}

      {/* <div className="">
      <div className="container customPaddingProjectGallery">
      <div className="row mt20">

        {missionData.map((item, index) => (
          <div className="col-6 col-md-3" key={index}>
            <div className="why-chose-list style3 ">
              <div className="list-one mb30">
                <span className={`list-icon flex-shrink-0 ${item.icon} mb20`} />
                <div className="list-content flex-grow-1">
                  <h6 className="mb-1">{item.title}</h6>
                  <p className="text mb-0 fz14">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
                  
                </div>
      </div>
      </div> */}

      {/* <div className="customPaddingProject">
        <div className="container floorplanSection">
          <div className="row">

          <div className="col-12 col-md-6 d-flex align-items-center">
              <div>
                  <h4>Download Floorplan</h4>
                  <p>Everything you need to know about this project</p>
                  <button className="ud-btn btn-thm">Downlaod Now</button>
              </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="brochureImage">

              <Image src='https://enquiries.estate/communities/dubai-hills-estate/images/brochure.webp' alt="An example responsive image"
                layout="responsive" // Makes the image responsive
                width={400} // Native width of the image in pixels
                height={300} // Native height of the image in pixels
                priority />
            </div>
          </div>
          </div>
        </div>
      </div> */}

      {/* Property Filtering */}
      <ProperteyFiltering/>
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}

      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <EnquiryForm />
        </div>
      </div>
    </>
  );
};

export default AreaList;