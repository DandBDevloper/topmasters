"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function MapComponent({ lat, lng, zoom = 12, markerTitle }) {
  // Move map initialization logic to a function
  const initializeMap = () => {
    const mapContainer = document.getElementById("map");
    if (mapContainer && window.google) {
      const mapOptions = {
        center: { lat: Number(lat), lng: Number(lng) },
        zoom,
        disableDefaultUI: true,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
          { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
        ],
      };

      const map = new google.maps.Map(mapContainer, mapOptions);

      // Use a transparent icon for removing the default pin
      const transparentIcon = {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADElEQVQIW2NgYGD4DwABBAEAzHlhGQAAAABJRU5ErkJggg==",
        scaledSize: new google.maps.Size(1, 1),
      };

      const marker = new google.maps.Marker({
        position: { lat: Number(lat), lng: Number(lng) },
        map,
        icon: transparentIcon,
      });

      if (markerTitle) {
        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="font-size:16px; font-weight:bold; background-color:#fff; padding:5px 10px; border-radius:4px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">${markerTitle}</div>`,
        });
        infoWindow.open(map, marker);
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    }
  };

  // Use a useEffect to set up the map if the API is already loaded
  useEffect(() => {
    if (window.google) {
      initializeMap();
    }
  }, [lat, lng, zoom, markerTitle]);

  return (
    <>
      {/* Load Google Maps API asynchronously using the Next.js Script component */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAV8VEG1RLclapyZ92xOujbsX1lRnIksdc`}
        strategy="afterInteractive"
        onLoad={initializeMap}
      />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "300px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      ></div>
    </>
  );
}
