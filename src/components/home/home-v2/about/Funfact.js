"use client";

import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Funfact = () => {
  const funFacts = [
    { number: 150000, text: "Customers" },
    { number: 17, text: "Years in Business" },
    { number: 700, text: "Expert Employees" },
    // Add more fun facts if needed
  ];
  const featureList = [
    "Luxury Residences",
    "Commercial Spaces",
    "Market Insights",
  ];

  return (
    <div className="funfact_one">
      {/* {funFacts.map((fact, index) => (
        <div className="details mb25" key={index}>
          <ul className="ps-0 mb-0">
            <li>
              <div className="timer">
                <CounterWithAnimation end={fact.number} />
              </div>
            </li>
          </ul>
          <p className="text mb-0">{fact.text}</p>
        </div>
      ))} */}
      {/* <div className="col-lg-6 col-xl-4"> */}
          <div
            className="about-box-1 pe-4 mt0-lg mb30-lg "
            data-aos="fade-left"
          >
            <h2 className="title mb30">
            Invest in the Future of Dubai
            </h2>
            <p className="text mb25 fz15">
            Dubai is synonymous with innovation and glamour. Discover prime investment opportunities—from ultra-modern high-rises in the heart of the city to serene waterfront properties. Our expert market analysis and local insights help you make informed decisions that secure your future in one of the worlds most dynamic property markets.
            </p>
            <div className="list-style1 mb50">
              <ul>
                {featureList.map((list, index) => (
                  <li key={index}>
                    <i className="far fa-check text-white bgc-dark fz15"></i>
                    {list}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/grid-gull-3-col" className="ud-btn btn-white2">
              Download Market Report<i className="fal fa-arrow-right-long"></i>
            </Link>
          </div>
        {/* </div> */}
      {/* <Link href="#" className="ud-btn btn-thm">
      Download Market Report
        <i className="fal fa-arrow-right-long" />
      </Link> */}
    </div>
  );
};

const CounterWithAnimation = ({ end }) => {
  const countRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, options);

    const currentRef = countRef.current; // Create a local variable

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const formatNumber = (value) => {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}k+`;
    } else if (value === 400) {
      return `${value}`;
    } else {
      return `${value}+`;
    }
  };

  return (
    <span ref={countRef}>
      {inView ? (
        <CountUp
          end={end}
          duration={2}
          separator=","
          formattingFn={formatNumber}
        />
      ) : (
        "0"
      )}
    </span>
  );
};

export default Funfact;
