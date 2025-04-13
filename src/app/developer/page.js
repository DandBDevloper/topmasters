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
import DeveloperListing from "./DeveloperListing";
import DeveloperCard from "./DeveloperCard";

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

async function AreaV1 ({params}) {
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
      {/* <section className="home-banner-style2 p0">
        <div className="home-style2">
          <div className="container maxw1600">
            <div className="area-hero-banner bdrs12"></div>
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <AreaHero />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Home Banner Style V2 */}

      


      <div className="customPaddingProjectAbout">
        <div className="row d-flex justify-content-between">
          {/* <div className="aboutDetails">
            
            <div className="listitems">
              <div className="DetailsList">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 68 60" fill="none">
                  <path d="M4.93119 60H55.8876C59.504 60 62.4628 57.0412 62.4628 53.4248V45.9456C65.257 45.5345 67.3943 43.1514 67.3943 40.2745V30.4121C67.3943 27.5352 65.2576 25.1521 62.4628 24.741V17.2618C62.4628 13.6454 59.504 10.6866 55.8876 10.6866H49.066L47.6689 1.40041C47.5869 0.907376 47.3404 0.49632 46.9294 0.249816C46.5183 0.00329651 46.0253 -0.078686 45.6142 0.0852786L8.21878 10.6872H4.93156C2.21936 10.6872 0 12.9064 0 15.6188V55.0689C0 57.7811 2.21922 59.9999 4.93156 59.9999L4.93119 60ZM64.1064 30.4124V40.2748C64.1064 41.6719 63.0378 42.7406 61.6406 42.7406H49.3124C46.6002 42.7406 44.3809 40.5214 44.3809 37.809V32.8775C44.3809 30.1653 46.6001 27.9459 49.3124 27.9459H61.6406C63.0383 27.9465 64.1064 29.0152 64.1064 30.4124ZM44.7101 3.70138L45.7787 10.6876L20.2183 10.6871L44.7101 3.70138ZM3.28744 15.6185C3.28744 14.7144 4.02699 13.9749 4.93105 13.9749H55.8875C57.6956 13.9749 59.1747 15.4539 59.1747 17.2621V24.6587L49.3123 24.6592C44.7918 24.6592 41.0935 28.3575 41.0935 32.878V37.8096C41.0935 42.3301 44.7918 46.0284 49.3123 46.0284H59.1747V53.425C59.1747 55.2331 57.6956 56.7122 55.8875 56.7122H4.93105C4.02695 56.7122 3.28744 55.9726 3.28744 55.0686V15.6185Z" fill="#121954"/>
                  <circle cx="50.8538" cy="35.2229" r="2.20146" fill="#121954"/>
                  </svg>
                </div>
                <div className="DetailsItem">
                  <h3>AED 800K</h3>
                  <p>Starting Price</p>
                </div>
                
              </div>

              <div className="DetailsList">
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 55 60" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1848 28.2634C15.5972 29.8403 18.4038 30.7091 21.285 30.7707C24.1666 30.8326 27.0077 30.0845 29.4855 28.6123L31.842 30.155C32.3954 30.5209 33.0692 30.6566 33.7211 30.5345H33.7822L36.0225 30.0691L36.4145 31.9423C36.572 32.6955 37.0221 33.3557 37.6659 33.7766C38.3102 34.198 39.095 34.3462 39.8482 34.1886L41.7214 33.7967L42.1804 36.0191C42.3196 36.6886 42.718 37.2761 43.2885 37.6531L45.1919 38.8772L45.1923 38.8777C45.5847 39.136 46.0442 39.2743 46.5143 39.2752C46.6808 39.276 46.8469 39.2594 47.0105 39.2265L53.2844 37.9533C53.8386 37.8372 54.3241 37.5054 54.6341 37.0314C54.9441 36.5571 55.053 35.9794 54.9373 35.4252L53.6333 29.1512C53.5022 28.5218 53.1256 27.971 52.5867 27.6209L36.8794 17.3248C37.3427 13.6745 36.4823 9.97908 34.4546 6.90823C32.4264 3.83781 29.3658 1.59539 25.8266 0.588128C22.2873 -0.419546 18.5043 -0.125348 15.1632 1.41689C11.8225 2.95909 9.14486 5.64738 7.61588 8.99445C6.08691 12.3415 5.80806 16.1258 6.82939 19.6608C7.85116 23.1962 10.1056 26.2483 13.1846 28.2635L13.1848 28.2634ZM11.2993 8.63853C13.3996 5.41869 16.882 3.36405 20.7158 3.08182C24.5497 2.80002 28.2951 4.32344 30.8437 7.20137C33.3923 10.0793 34.4522 13.9813 33.7088 17.7528C33.5892 18.363 33.8505 18.9847 34.3702 19.3259L50.6951 30.0379L51.76 35.1368L46.661 36.2017L45.1431 35.2103L44.4881 32.0579C44.3852 31.5506 44.0829 31.1061 43.6491 30.8239C43.2149 30.5417 42.6858 30.446 42.1802 30.5583L39.3584 31.1706L38.7461 28.3487H38.7465C38.6419 27.8475 38.3426 27.4085 37.9143 27.1285C37.4861 26.8484 36.9643 26.7502 36.4635 26.8552L33.3478 27.4854L30.33 25.5081V25.5085C29.8138 25.1613 29.1383 25.1613 28.6221 25.5085C25.4625 27.6886 21.4672 28.2723 17.8153 27.0874C14.1638 25.9021 11.2727 23.0836 9.99517 19.4633C8.71803 15.8429 9.20014 11.8345 11.2992 8.6202L11.2993 8.63853ZM12.9939 41.8404L13.9426 43.9647C14.2078 44.5561 14.6966 45.0185 15.3017 45.2499L16.9789 45.8622L16.4708 47.2581C16.2121 47.9331 16.2326 48.6838 16.5276 49.3439C16.8226 50.004 17.3683 50.5198 18.0442 50.7776L19.4093 51.2981L18.797 52.9693V52.9689C18.5643 53.5752 18.5818 54.249 18.8461 54.8421L19.6539 56.6785C19.8998 57.2408 20.3605 57.6815 20.9331 57.9026L26.1299 59.8919C26.6354 60.0627 27.1871 60.0302 27.6691 59.8018C28.1512 59.5734 28.5252 59.1669 28.7131 58.6678L30.7088 53.471C30.9249 52.8997 30.9074 52.2661 30.6597 51.708L24.0736 36.8948C24.4382 36.4529 24.7755 35.9887 25.0834 35.505C25.5313 34.7885 25.3135 33.8445 24.5966 33.3965C23.8801 32.9486 22.9361 33.1664 22.4878 33.8829C22.1065 34.4939 21.6633 35.0639 21.1658 35.5848C20.7346 36.034 20.6184 36.6992 20.872 37.2679L27.7519 52.644L26.2276 56.6106L22.2614 55.0927L21.6859 53.807L22.659 51.267H22.6594C22.8443 50.7986 22.8336 50.276 22.6299 49.8157C22.4263 49.3554 22.0467 48.9963 21.5757 48.8183L19.4212 47.9921L20.2538 45.911C20.4387 45.4426 20.428 44.92 20.2243 44.4597C20.0207 43.9995 19.6411 43.6404 19.1701 43.4623L16.6301 42.4828L15.4059 39.6917C15.1557 39.1191 14.5793 38.7592 13.9551 38.7856C10.2315 38.9146 6.71738 37.0627 4.71783 33.9185C2.71873 30.7742 2.53258 26.8069 4.22851 23.4892C4.61237 22.7317 4.30964 21.8068 3.55218 21.4231C2.79515 21.0396 1.86985 21.3424 1.48651 22.0998C-0.616767 26.2163 -0.480571 31.1201 1.84731 35.1139C4.17564 39.1074 8.37585 41.6424 12.9944 41.8405L12.9939 41.8404ZM18.3078 17.9934C17.3787 17.9947 16.4697 17.7223 15.6943 17.2099L15.7061 17.21C14.468 16.3983 13.6776 15.0572 13.5679 13.5807C13.4578 12.1043 14.0411 10.6606 15.1456 9.67473C16.2498 8.68837 17.7502 8.2725 19.2049 8.54832C20.6591 8.8241 21.903 9.7613 22.5695 11.0832C23.236 12.4052 23.2497 13.9619 22.6066 15.2954C21.9636 16.6292 20.7369 17.5878 19.2873 17.8892C18.965 17.9575 18.637 17.9921 18.3078 17.9934ZM17.959 11.5784C17.5158 11.6694 17.1281 11.9337 16.8817 12.3129L16.8816 12.3435C16.6212 12.8491 16.6301 13.4516 16.9064 13.9486C17.1822 14.446 17.6882 14.7727 18.2552 14.8188C18.8223 14.8653 19.3748 14.6258 19.7279 14.18C19.9542 13.8363 20.0486 13.4221 19.9935 13.0144C19.938 12.6066 19.7369 12.2326 19.4269 11.9619C19.1169 11.6912 18.7194 11.5417 18.3078 11.5417C18.1904 11.5421 18.0738 11.5545 17.959 11.5784Z" fill="#121954"/>
                </svg>
                </div>
                <div className="DetailsItem">
                  <h3>2028</h3>
                  <p>Handover</p>
                </div>
              </div>

              <div className="DetailsList">

                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 60" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M56.9721 38.775C57.6661 39.0369 58.0149 39.8153 57.7536 40.5067C53.4112 51.9681 42.2581 59.6689 30.0001 59.6689C13.6402 59.6689 0.331151 46.3591 0.331152 29.9999C0.331152 13.639 13.6395 0.330877 30.0001 0.330878C45.1665 0.330878 57.7044 11.7733 59.4532 26.4798L61.1089 24.4347C61.5759 23.8563 62.4209 23.7683 62.9978 24.2348C63.5746 24.6997 63.6652 25.5468 63.1972 26.1232L59.3793 30.8449C59.3571 30.8715 59.3318 30.8953 59.3068 30.919C59.299 30.9264 59.2912 30.9338 59.2835 30.9412C59.2783 30.9464 59.273 30.9516 59.2684 30.9553C59.2132 31.0089 59.1538 31.0578 59.0913 31.1021C59.0822 31.1069 59.0738 31.1124 59.0652 31.118C59.0635 31.1191 59.0618 31.1202 59.0601 31.1214C59.0013 31.1604 58.9398 31.1937 58.8774 31.2208C58.8672 31.2252 58.857 31.2295 58.8467 31.2338C58.8364 31.2381 58.8261 31.2424 58.8159 31.2468C58.7592 31.2687 58.7024 31.2848 58.6436 31.2999C58.6134 31.3062 58.5822 31.3124 58.5494 31.3176C58.4978 31.326 58.4463 31.3312 58.3942 31.3343C58.3847 31.335 58.3754 31.3364 58.366 31.3378C58.3532 31.3397 58.3405 31.3416 58.3276 31.3416C58.3162 31.3416 58.3053 31.34 58.2944 31.3385C58.2873 31.3375 58.2802 31.3365 58.2729 31.3359C58.2363 31.3345 58.2005 31.3295 58.1641 31.3244C58.1591 31.3237 58.154 31.323 58.149 31.3223C58.0969 31.3156 58.0449 31.3083 57.9954 31.2947C57.9894 31.2931 57.9835 31.2915 57.9776 31.2899C57.9579 31.2846 57.9388 31.2794 57.9199 31.2718C57.8548 31.251 57.7929 31.226 57.734 31.1979C57.7215 31.1932 57.7101 31.1859 57.6976 31.1776C57.6263 31.1391 57.5586 31.0969 57.4951 31.0464C57.494 31.0448 57.4909 31.0443 57.4904 31.0427L52.7692 27.2248C52.4407 26.9598 52.2704 26.5719 52.2704 26.1799C52.2704 25.8831 52.3667 25.5843 52.5682 25.3359C53.0347 24.7591 53.8803 24.6695 54.4571 25.136L56.8167 27.0446C55.3399 13.5522 43.8788 3.01756 29.9999 3.01756C15.1217 3.01756 3.01795 15.1211 3.01795 29.9982C3.01795 44.8754 15.1215 56.9802 29.9999 56.9802C41.1478 56.9802 51.2908 49.9787 55.2399 39.556C55.5018 38.8625 56.2786 38.5116 56.9721 38.775ZM39.969 19.0504L18.2954 40.724C17.9898 41.0744 18.0075 41.6011 18.3363 41.9294C18.6647 42.2582 19.1914 42.276 19.5417 41.9704L41.2154 20.2967C41.3998 20.1359 41.5091 19.9055 41.5176 19.6611C41.526 19.4163 41.4323 19.1795 41.2593 19.0065C41.0862 18.8334 40.8494 18.7397 40.6046 18.7482C40.3603 18.7566 40.1298 18.866 39.969 19.0504ZM32.0157 32.4316C33.0371 31.4106 34.4219 30.8366 35.8662 30.8366C37.3107 30.8366 38.6958 31.4106 39.7172 32.4316C40.7382 33.453 41.3123 34.8383 41.3123 36.2826C41.3123 37.7266 40.7382 39.1118 39.7172 40.1332C38.6958 41.1546 37.3105 41.7282 35.8662 41.7282C34.4219 41.7282 33.0371 41.1545 32.0157 40.1332C30.9943 39.1118 30.4207 37.7265 30.4207 36.2826C30.4207 34.8382 30.9943 33.453 32.0157 32.4316ZM33.2566 38.8922C33.9488 39.5844 34.8875 39.9736 35.8662 39.9736C36.8454 39.9736 37.7841 39.5844 38.4763 38.8922C39.1685 38.2 39.5572 37.2614 39.5572 36.2826C39.5572 35.3034 39.1685 34.3647 38.4763 33.6725C37.7841 32.9803 36.8454 32.5916 35.8662 32.5916C34.8875 32.5916 33.9488 32.9804 33.2566 33.6725C32.5644 34.3647 32.1753 35.3034 32.1753 36.2826C32.1753 37.2613 32.5645 38.2 33.2566 38.8922ZM27.4943 28.5889C26.4729 29.6099 25.0881 30.1839 23.6438 30.1839C22.1994 30.1839 20.8142 29.6098 19.7928 28.5889C18.7718 27.5675 18.1978 26.1822 18.1978 24.7379C18.1978 23.2939 18.7718 21.9087 19.7928 20.8873C20.8142 19.8659 22.1995 19.2923 23.6438 19.2923C25.0881 19.2923 26.4729 19.8659 27.4943 20.8873C28.5158 21.9087 29.0894 23.294 29.0894 24.7379C29.0894 26.1823 28.5157 27.5675 27.4943 28.5889ZM23.6438 21.0473C24.6225 21.0474 25.5613 21.4361 26.2534 22.1283C26.9456 22.8205 27.3347 23.7592 27.3347 24.7379C27.3347 25.7171 26.9456 26.6558 26.2534 27.3479C25.5612 28.0401 24.6225 28.4289 23.6438 28.4289C22.6646 28.4289 21.7259 28.0401 21.0337 27.3479C20.3416 26.6557 19.9528 25.717 19.9528 24.7379C19.9541 23.7595 20.3436 22.8217 21.0355 22.1299C21.7272 21.4382 22.665 21.049 23.6438 21.0473Z" fill="#121954"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M35.8102 39.9733C35.8288 39.9735 35.8476 39.9736 35.8662 39.9736C35.8849 39.9736 35.9034 39.9735 35.922 39.9733C36.8809 39.9587 37.7973 39.5712 38.4763 38.8922C39.1685 38.2 39.5572 37.2614 39.5572 36.2826C39.5572 35.3034 39.1685 34.3647 38.4763 33.6725C37.7841 32.9803 36.8454 32.5916 35.8662 32.5916C34.8875 32.5916 33.9488 32.9804 33.2566 33.6725C32.5644 34.3647 32.1753 35.3034 32.1753 36.2826C32.1753 37.2613 32.5645 38.2 33.2566 38.8922C33.9356 39.5712 34.8517 39.9587 35.8102 39.9733ZM54.4571 25.136L56.8167 27.0446C56.7994 26.8873 56.7807 26.7305 56.7608 26.574C55.0721 13.308 43.7169 3.01756 29.9999 3.01756C15.1217 3.01756 3.01795 15.1211 3.01795 29.9982C3.01795 44.8754 15.1215 56.9802 29.9999 56.9802C41.1478 56.9802 51.2908 49.9787 55.2399 39.556C55.5018 38.8625 56.2786 38.5116 56.9721 38.775C57.554 38.9947 57.8931 39.5775 57.8334 40.1677C57.8219 40.2811 57.7956 40.3953 57.7536 40.5067C57.7101 40.6214 57.6659 40.7365 57.621 40.8504C53.1875 52.1219 42.1352 59.6689 30.0001 59.6689C13.6402 59.6689 0.331151 46.3591 0.331152 29.9999C0.331152 13.639 13.6395 0.330877 30.0001 0.330878C45.0098 0.330878 57.4449 11.5382 59.3954 26.0251C59.4158 26.1764 59.4351 26.3279 59.4532 26.4798L61.1089 24.4347C61.5759 23.8563 62.4209 23.7683 62.9978 24.2348C63.5746 24.6997 63.6652 25.5468 63.1972 26.1232L59.3793 30.8449C59.3571 30.8715 59.3318 30.8953 59.3068 30.919C59.3036 30.922 59.3002 30.9252 59.297 30.9282C59.2924 30.9326 59.288 30.9368 59.2835 30.9412C59.2783 30.9464 59.273 30.9516 59.2684 30.9553C59.2132 31.0089 59.1538 31.0578 59.0913 31.1021C59.0822 31.1069 59.0738 31.1124 59.0652 31.118L59.0601 31.1214C59.0013 31.1604 58.9398 31.1937 58.8774 31.2208C58.8672 31.2252 58.857 31.2295 58.8467 31.2338C58.8364 31.2381 58.8261 31.2424 58.8159 31.2468C58.7592 31.2687 58.7024 31.2848 58.6436 31.2999C58.6134 31.3062 58.5822 31.3124 58.5494 31.3176C58.4978 31.326 58.4463 31.3312 58.3942 31.3343C58.3847 31.335 58.3754 31.3364 58.366 31.3378C58.3532 31.3397 58.3405 31.3416 58.3276 31.3416C58.3162 31.3416 58.3053 31.34 58.2944 31.3385C58.2873 31.3375 58.2802 31.3365 58.2729 31.3359C58.2363 31.3345 58.2005 31.3295 58.1641 31.3244L58.149 31.3223C58.0969 31.3156 58.0449 31.3083 57.9954 31.2947L57.9776 31.2899C57.9579 31.2846 57.9388 31.2794 57.9199 31.2718C57.8548 31.251 57.7929 31.226 57.734 31.1979C57.7215 31.1932 57.7101 31.1859 57.6976 31.1776C57.6263 31.1391 57.5586 31.0969 57.4951 31.0464C57.494 31.0448 57.4909 31.0443 57.4904 31.0427L52.7692 27.2248C52.4407 26.9598 52.2704 26.5719 52.2704 26.1799C52.2704 25.8831 52.3667 25.5843 52.5682 25.3359C53.0347 24.7591 53.8803 24.6695 54.4571 25.136ZM52.311 25.1275C52.8925 24.4089 53.9462 24.2974 54.6651 24.8788L56.3862 26.271C54.5671 13.335 43.4288 3.3487 29.9998 3.3487C15.3044 3.3487 3.34882 15.304 3.34882 29.9983C3.34882 44.6927 15.3041 56.6493 29.9998 56.6493C41.0101 56.6493 51.0299 49.7328 54.9302 39.4389C55.2567 38.5748 56.2242 38.1374 57.0888 38.4655C57.7943 38.7317 58.2133 39.425 58.1679 40.1389L58.2497 40.1319L58.0632 40.624C53.6721 52.2142 42.3955 60 30 60C13.4573 60 -7.23077e-07 46.5421 0 30C7.23147e-07 13.4563 13.4566 -7.23135e-07 30 0C45.0714 6.58793e-07 57.5746 11.1738 59.6804 25.6731L60.8512 24.2269C61.4334 23.5058 62.4871 23.3964 63.2058 23.9776C63.9248 24.5574 64.0376 25.6133 63.454 26.332L59.6331 31.0573C59.5982 31.0991 59.5606 31.1346 59.5375 31.1563L59.5341 31.1596C59.5271 31.1662 59.5214 31.1716 59.516 31.1768C59.5126 31.1802 59.5033 31.1895 59.4912 31.2002C59.4254 31.2634 59.3554 31.3207 59.2825 31.3723L59.2644 31.3851L59.2501 31.3927L59.2466 31.395L59.243 31.3973C59.2427 31.3975 59.2424 31.3977 59.2421 31.3979C59.1675 31.4473 59.0892 31.4898 59.0088 31.5246C59.0086 31.5247 59.0091 31.5245 59.0088 31.5246M59.0088 31.5246C58.9962 31.5301 58.9838 31.5353 58.9741 31.5393C58.9635 31.5438 58.9555 31.5471 58.9481 31.5504L58.9415 31.5533L58.9348 31.5558C58.8603 31.5845 58.7893 31.6044 58.7257 31.6207L58.7182 31.6226L58.7105 31.6242C58.6794 31.6306 58.6421 31.6382 58.6016 31.6446C58.5396 31.6546 58.4791 31.6607 58.4203 31.6644L58.4149 31.6652C58.4063 31.6665 58.3691 31.6727 58.3274 31.6727C58.2889 31.6727 58.2552 31.6674 58.2476 31.6663L58.2461 31.6661C58.1979 31.6635 58.1535 31.6573 58.1228 31.653L58.1062 31.6507C58.1057 31.6506 58.1052 31.6506 58.1047 31.6505C58.0538 31.6439 57.9814 31.6342 57.9079 31.6141L57.8916 31.6097L57.8883 31.6088C57.8724 31.6045 57.8422 31.5965 57.8091 31.584C57.7356 31.5601 57.6658 31.5319 57.5997 31.5007C57.5682 31.4872 57.5424 31.4717 57.5269 31.4617C57.4511 31.4201 57.3737 31.3719 57.298 31.3128C57.2954 31.3109 57.2926 31.3088 57.2898 31.3067C57.2849 31.3029 57.2793 31.2984 57.2732 31.2931L57.2483 31.2733L57.2477 31.2724L52.5612 27.4826C52.1513 27.152 51.9393 26.6676 51.9393 26.18C51.9393 25.8115 52.0592 25.438 52.311 25.1275M58.2476 31.6663C58.2475 31.6663 58.2476 31.6663 58.2476 31.6663ZM18.0532 40.4981L39.7275 18.8238C39.9483 18.5756 40.2614 18.429 40.5931 18.4175C40.9299 18.4059 41.2555 18.5348 41.4932 18.7726C41.7309 19.0103 41.8598 19.3359 41.8482 19.6727C41.8368 20.0043 41.6901 20.3174 41.4419 20.5383L19.7677 42.2125L19.7592 42.2199C19.278 42.6397 18.5538 42.6157 18.1021 42.1636C17.65 41.712 17.626 40.9878 18.0458 40.5066L18.0532 40.4981ZM18.2954 40.724C17.9898 41.0744 18.0075 41.6011 18.3363 41.9294C18.6647 42.2582 19.1914 42.276 19.5417 41.9704L41.2154 20.2967C41.3998 20.1359 41.5091 19.9055 41.5176 19.6611C41.526 19.4163 41.4323 19.1795 41.2593 19.0065C41.0862 18.8334 40.8494 18.7397 40.6046 18.7482C40.3603 18.7566 40.1298 18.866 39.969 19.0504L18.2954 40.724ZM31.7815 32.1976C32.8649 31.1146 34.334 30.5057 35.8661 30.5057C37.3983 30.5057 38.8677 31.1146 39.9511 32.1976C41.0341 33.2811 41.6431 34.7506 41.6431 36.2827C41.6431 37.8145 41.0342 39.2839 39.9512 40.3673C38.8677 41.4508 37.3982 42.0593 35.8661 42.0593C34.334 42.0593 32.865 41.4508 31.7815 40.3673C30.698 39.2839 30.0895 37.8144 30.0895 36.2827C30.0895 34.7505 30.698 33.2811 31.7815 32.1976ZM27.7282 28.8231C26.6448 29.9061 25.1758 30.515 23.6436 30.515C22.1114 30.515 20.6421 29.9061 19.5586 28.8231C18.4756 27.7397 17.8666 26.2701 17.8666 24.738C17.8666 23.2062 18.4756 21.7369 19.5585 20.6534C20.642 19.5699 22.1116 18.9614 23.6436 18.9614C25.1757 18.9614 26.6447 19.5699 27.7282 20.6534C28.8118 21.7369 29.4202 23.2064 29.4202 24.738C29.4202 26.2702 28.8117 27.7396 27.7282 28.8231ZM23.642 21.047C23.6259 21.0471 23.6098 21.0472 23.5937 21.0475C23.5239 21.0485 23.4544 21.0516 23.3851 21.0565C22.5009 21.1199 21.666 21.4993 21.0355 22.1299C20.3436 22.8217 19.9541 23.7595 19.9528 24.7379C19.9528 25.717 20.3416 26.6557 21.0337 27.3479C21.7259 28.0401 22.6646 28.4289 23.6438 28.4289C24.6225 28.4289 25.5612 28.0401 26.2534 27.3479C26.9456 26.6558 27.3347 25.7171 27.3347 24.7379C27.3347 23.7592 26.9456 22.8205 26.2534 22.1283C25.5744 21.4492 24.658 21.0619 23.6994 21.0475C23.6808 21.0472 23.6623 21.0473 23.6438 21.0473M23.6442 21.3781C22.753 21.3796 21.8992 21.7343 21.2694 22.3641C20.6395 22.994 20.2848 23.8478 20.2837 24.7384C20.2838 25.6297 20.6377 26.484 21.2677 27.114C21.8977 27.7441 22.7522 28.098 23.6436 28.098C24.5346 28.098 25.3891 27.7441 26.0192 27.114C26.6494 26.4839 27.0036 25.6294 27.0036 24.738C27.0036 23.8472 26.6493 22.9927 26.0192 22.3625C25.3892 21.7324 24.5349 21.3782 23.6442 21.3781ZM33.4906 38.6583C34.1207 39.2885 34.9752 39.6427 35.8661 39.6427C36.7574 39.6427 37.6119 39.2884 38.2421 38.6583C38.8722 38.0282 39.2261 37.1737 39.2261 36.2827C39.2261 35.3913 38.8722 34.5368 38.2421 33.9067C37.612 33.2766 36.7575 32.9227 35.8661 32.9227C34.9752 32.9227 34.1207 33.2766 33.4905 33.9067C32.8604 34.5369 32.5061 35.3914 32.5061 36.2827C32.5061 37.1735 32.8604 38.0281 33.4906 38.6583ZM19.7928 20.8873C20.8142 19.8659 22.1995 19.2923 23.6438 19.2923C25.0881 19.2923 26.4729 19.8659 27.4943 20.8873C28.5158 21.9087 29.0894 23.294 29.0894 24.7379C29.0894 26.1823 28.5157 27.5675 27.4943 28.5889C26.4729 29.6099 25.0881 30.1839 23.6438 30.1839C22.1994 30.1839 20.8142 29.6098 19.7928 28.5889C18.7718 27.5675 18.1978 26.1822 18.1978 24.7379C18.1978 23.2939 18.7718 21.9087 19.7928 20.8873ZM35.8662 30.8366C34.4219 30.8366 33.0371 31.4106 32.0157 32.4316C30.9943 33.453 30.4207 34.8382 30.4207 36.2826C30.4207 37.7265 30.9943 39.1118 32.0157 40.1332C33.0371 41.1545 34.4219 41.7282 35.8662 41.7282C37.3105 41.7282 38.6958 41.1546 39.7172 40.1332C40.7382 39.1118 41.3123 37.7266 41.3123 36.2826C41.3123 34.8383 40.7382 33.453 39.7172 32.4316C38.6958 31.4106 37.3107 30.8366 35.8662 30.8366Z" fill="#121954"/>
                  </svg>
                </div>
                <div className="DetailsItem">
                <h3>60/40</h3>
                <p>Payment Plan</p>
                </div>
              </div>
            </div>


            {/* <div
              className={`col-sm-6 col-lg-4 `}
            >
              <div className="overview-element d-flex align-items-center">
                <span className={`icon flaticon-edit`} />
                <div className="ml15">
                  <h6 className="mb-0">AED 800K</h6>
                  <p className="text mb-0 fz15">Starting Price</p>
                </div>
              </div>

              <div className="overview-element d-flex align-items-center">
                <span className={`icon flaticon-bed`} />
                <div className="ml15">
                  <h6 className="mb-0">Handover</h6>
                  <p className="text mb-0 fz15">2028</p>
                </div>
              </div>

              <div className="overview-element d-flex align-items-center">
                <span className={`icon flaticon-bed`} />
                <div className="ml15">
                  <h6 className="mb-0">Payment Plan</h6>
                  <p className="text mb-0 fz15">60/40</p>
                </div>
              </div>
            </div> 
          </div> */}

          <div className="col-12 text-center">
            <h1>Property Developers in Dubai</h1>
            <p><strong>Property developers in Dubai are more than just real estate developers. In many cases they are massive brands so well known, they have become household names.</strong></p>
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
      <DeveloperListing/>
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

export default AreaV1;