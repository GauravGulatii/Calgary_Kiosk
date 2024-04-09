/* global google */

import { Header } from "../../../components/UI/Header";
import { Taskbar } from "../../../components/taskbar/Taskbar";
import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useTranslation } from "react-i18next";
import "./TransitRoutes.css";

const busData = [
  { number: "1", route: "Bowness/Forest Lawn", time: "5min" },
  { number: "70", route: "Valley Ridge Express", time: "2min" },
  { number: "449", route: "Eau Claire/Parkhill", time: "13min" },
  { number: "201", route: "Tuscany/Somerset-Bridlewood", time: "12min" },
  { number: "202", route: "Saddletowne/69 Street", time: "9min" },
  { number: "300", route: "BRT Airport/City Centre", time: "21min" },
  { number: "302", route: "BRT Southeast", time: "6min" },
  { number: "301", route: "BRT North", time: "2min" },
];

const TransitRoutes = ({ setPage }) => {
  const { t } = useTranslation();
  const apiKey = "AIzaSyDywEmVrxAsXW4uDgQUSn3xZlQxkbC8syM";
  const totalGroups = Math.ceil(busData.length / 4);

  const GoogleMap = ({ apiKey }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
      const loader = new Loader({
        apiKey,
        version: "2.19.3",
      });

      loader.load().then(() => {
        mapRef.current = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 51.04680038121731, lng: -114.07242089509964 },
          zoom: 14,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        });

        const myLatLng = { lat: 51.04680038121731, lng: -114.07242089509964 };

        new google.maps.Marker({
          map: mapRef.current,
          position: myLatLng,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "blue",
            fillOpacity: 0.8,
            strokeColor: "white",
            strokeWeight: 2,
            scale: 7,
          },
        });
      });
    }, [apiKey]);

    return (
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    );
  };

  const [busDataIndex, setBusDataIndex] = useState(0);
  let intervalRef = useRef(null);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setBusDataIndex((prevIndex) => (prevIndex + 4) % busData.length);
    }, 5000);
  };

  const handleNext = () => {
    setBusDataIndex((prevIndex) => (prevIndex + 4) % busData.length);
    startInterval();
  };

  const handlePrevious = () => {
    setBusDataIndex(
      (prevIndex) => (prevIndex - 4 + busData.length) % busData.length
    );
    startInterval();
  };

  const displayedBusData = busData
    .slice(busDataIndex, busDataIndex + 4)
    .concat(busData.slice(0, Math.max(0, 4 - (busData.length - busDataIndex))));

  return (
    <div>
      <Header setPage={setPage} previousPage="Transit" title="Transit Routes" />
      <div className="google-map-container" style={{ height: 300 }}>
        <GoogleMap apiKey={apiKey} />
      </div>
      <div className="bus-info-container">
        {displayedBusData.map((bus, index) => (
          <div key={index} className="bus-info">
            <div className="bus-info-number">{bus.number}</div>
            <div className="bus-info-route">{bus.route}</div>
            <div className="bus-info-time">{t(`${bus.time}`)}</div>
          </div>
        ))}
        <div className="bus-pagination">
          <button onClick={handlePrevious} className="pagination-button">
            <ChevronLeftOutlinedIcon />
          </button>
          <div className="bus-pagination-dots">
            {Array.from({ length: 2 }, (_, i) =>
              Math.floor(busDataIndex / 4) % 2 === i ? (
                <CircleIcon key={i} />
              ) : (
                <CircleOutlinedIcon key={i} />
              )
            )}
          </div>
          <button onClick={handleNext} className="pagination-button">
            <ChevronRightOutlinedIcon />
          </button>
        </div>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default TransitRoutes;
