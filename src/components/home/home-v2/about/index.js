import React from "react";
import Funfact from "./Funfact";
import ProductSingle from "./ProductSingle";
import Image from "next/image";
import VideoBox from "./VideoBox";

const About = () => {
  return (
    <div className="row mt80 mt0-md">
      <div className="col-md-6 col-xl-6">
        <div className="position-relative">
          <div className="img-box-7">
            <Image
              width={591}
              height={768}
              className="w-100 h-100 cover img-1"
              src="/images/about/about-02.webp"
              alt="about"
            />
          </div>
          <div className="img-box-8 position-relative">
            <Image
              width={193}
              height={193}
              className="img-1 spin-right"
              src="/images/about/element-1.png"
              alt="about"
            />
          </div>
          <VideoBox />
          {/* <div className="img-box-10 position-relative">
            <Image
                width={193}
                height={193}
                className="bounce-y"
                src="/images/about/about-1.png"
                alt="about"
              />
          </div> */}
        </div>
      </div>
      {/* End col */}

      <div className="col-md-6 col-xl-4 offset-xl-2 mt-4">
        <div className="about-box-1">
          {/* <h2 className="title mb30">Invest in the Future of Dubai</h2>
          <p className="text mb20 fz15">
          Dubai is synonymous with innovation and glamour. Discover prime investment opportunities—from ultra-modern high-rises in the heart of the city to serene waterfront properties. Our expert market analysis and local insights help you make informed decisions that secure your future in one of the world’s most dynamic property markets.
          </p> */}
          <Funfact />
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default About;
