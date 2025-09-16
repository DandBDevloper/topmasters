"use client";

import React from 'react';

// This component replicates the "Asset Management in Dubai" card from the provided image.
// It uses standard CSS classes with a single file approach to ensure styles are
// scoped and to avoid import errors.

const DownloadEnquire = () => {
  return (
    <div className="container">
      {/* The main container for the card */}
      <div className="card">
        {/*
          This div creates the red-to-transparent gradient overlay.
        */}
        <div className="gradientOverlay"></div>

        {/* The background image with a subtle gradient effect */}
        <div className="backgroundImage">
          <img
            src="https://placehold.co/1200x800/2C2D32/fff?text=Building+Placeholder"
            alt="Dubai skyline and luxury building"
            className="image"
          />
        </div>

        {/* This div contains all the text and the button, positioned on top of the gradient. */}
        <div className="content">
          <h1 className="title">
            ASSET MANAGEMENT IN<br />DUBAI
          </h1>
          <hr className="line" />
          <p className="subtitle">
            Make the Most of Your Assets
          </p>
          <button className="button">
            Enquire Now
          </button>
        </div>
      </div>

      {/* This style block contains the CSS for the component.
        Placing it here ensures that the styles are bundled with the component
        and can be applied correctly without a separate CSS file import.
      */}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 1rem;
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 80rem;
          height: 16rem;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        @media (min-width: 768px) {
          .card {
            height: 20rem;
          }
        }

        @media (min-width: 1024px) {
          .card {
            height: 24rem;
          }
        }

        .gradientOverlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(220, 38, 38, 0));
          opacity: 0.9;
          z-index: 1;
        }

        .backgroundImage {
          position: absolute;
          inset: 0;
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content {
          position: relative;
          padding: 1.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          color: white;
          z-index: 2;
        }

        .title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .title {
            font-size: 2.25rem;
          }
        }

        .line {
          width: 40%;
          max-width: 25rem;
          border-top: 2px solid white;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-size: 0.875rem;
          margin-bottom: 1rem;
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .subtitle {
            font-size: 1.125rem;
          }
        }

        .button {
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          background-color: white;
          color: #dc2626;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition-property: background-color;
          transition-duration: 300ms;
          font-family: 'Inter', sans-serif;
          border: none;
        }

        .button:hover {
          background-color: #e5e7eb;
        }

        @media (min-width: 768px) {
          .button {
            padding: 0.75rem 2rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DownloadEnquire;
