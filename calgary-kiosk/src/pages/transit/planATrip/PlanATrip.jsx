/* global google */
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import "./PlanATrip.css";
import { Taskbar } from "../../../components/taskbar/Taskbar";
import { Header } from "../../../components/UI/Header";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useTranslation } from "react-i18next";

const GOOGLE_API_KEY = "AIzaSyDywEmVrxAsXW4uDgQUSn3xZlQxkbC8syM";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 51.04680038121731,
  lng: -114.07242089509964,
};

const libraries = ["places", "geometry"];

const generateGoogleMapsLink = (lat, lng) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

const PlanATrip = ({ setPage }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [search_query, setSearchQuery] = useState("");
  const [search_results, setSearchResults] = useState([]);
  const [travel_mode, setTravelMode] = useState("TRANSIT");
  const [google_map_height, setGoogleMapHeight] = useState(400);
  const [current_page, setCurrentPage] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const map_ref = useRef(null);

  const updateDirections = async (loc) => {
    const directionsService = new window.google.maps.DirectionsService();

    const result = await directionsService.route({
      origin: center,
      destination: location,
      travelMode: travel_mode, // Use the state value
    });
    setDirections(result);
  };

  const clearDirections = () => {
    setDirections(null);
  };

  useEffect(() => {
    if (location) {
      updateDirections(location);
    } else {
      clearDirections();
    }
  }, [location, travel_mode]);

  const updateSearchResults = (query) => {
    const service = new window.google.maps.places.PlacesService(
      map_ref.current
    );

    const request = {
      location: center,
      radius: "5000",
      query,
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const filteredResults = results
          .map((result) => ({
            ...result,
            distance:
              window.google.maps.geometry.spherical.computeDistanceBetween(
                new window.google.maps.LatLng(center),
                result.geometry.location
              ) / 1000, // Distance in kilometers
          }))
          .filter((r) => r.distance < 500);

        setSearchResults(filteredResults);
      }
    });
  };

  const clearSearchResults = () => {
    setCurrentPage(1);
    setSearchResults([]);
  };

  useEffect(() => {
    if (search_query) {
      updateSearchResults(search_query);
      setLocation(null);
    } else {
      clearSearchResults();
    }
  }, [search_query]);

  const selectLocation = (loc) => {
    const lat = loc.lat();
    const lng = loc.lng();
    setSearchQuery("");
    setLocation({ lat, lng });
  };

  useEffect(() => {
    if (location || search_query) {
      setGoogleMapHeight(200);
    } else {
      setGoogleMapHeight(400);
    }
  }, [location, search_query]);

  const onMapLoad = useCallback((map) => {
    map_ref.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const itemsPerPage = 5;
  const page_count = Math.ceil(search_results.length / itemsPerPage);
  const indexOfLastItem = current_page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = search_results.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    const new_page =
      current_page + 1 > page_count ? current_page : current_page + 1;
    setCurrentPage(new_page);
  };

  const prevPage = () => {
    const new_page = current_page - 1 <= 0 ? current_page : current_page - 1;
    setCurrentPage(new_page);
  };

  const qrLink = location
    ? generateGoogleMapsLink(location.lat, location.lng)
    : null;

  return (
    <div className="plan-a-trip-page">
      <Header setPage={setPage} previousPage="Transit" title="Plan a Trip" />
      <div className="search-bar">
        <input
          type="text"
          placeholder={t("Search")}
          value={search_query}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur(); // This will cause the input to lose focus
              e.preventDefault();
            }
          }}
        />
        <div className="search-bar-icon">
          <SearchOutlinedIcon />
        </div>
        {isDropdownVisible && (
          <div className="search-bar-results">
            {search_results.length > 0 ? (
              search_results.slice(0, 5).map((place, index) => (
                <button
                  key={index}
                  onClick={() => selectLocation(place.geometry.location)}
                >
                  <span>{place.name}</span>
                  <span>{place.distance.toFixed(2)} km</span>
                </button>
              ))
            ) : (
              <span className="search-bar-empty">
                {t("Search for results")}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="google-map" style={{ height: google_map_height }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          center={center}
          zoom={10}
          onClick={(event) => selectLocation(event.latLng)}
          onLoad={onMapLoad}
        >
          {location && <Marker position={location} />}
          {location && (
            <Marker
              position={center}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "blue",
                fillOpacity: 0.8,
                strokeColor: "white",
                strokeWeight: 2,
                scale: 10,
              }}
            />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#ff2527",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                },
                markerOptions: { visible: false },
              }}
            />
          )}
        </GoogleMap>
      </div>
      <div className="map-directions-actions">
        <div className="map-directions-mode">
          <button
            className={travel_mode === "WALKING" ? "active-mode" : ""}
            onClick={() => setTravelMode("WALKING")}
          >
            <DirectionsRunIcon></DirectionsRunIcon>
          </button>
          <button
            className={travel_mode === "TRANSIT" ? "active-mode" : ""}
            onClick={() => setTravelMode("TRANSIT")}
          >
            <DirectionsRailwayIcon></DirectionsRailwayIcon>
          </button>
          <button
            className={travel_mode === "DRIVING" ? "active-mode" : ""}
            onClick={() => setTravelMode("DRIVING")}
          >
            <DirectionsCarIcon></DirectionsCarIcon>
          </button>
        </div>
        {location && (
          <button
            className="map-directions-close"
            onClick={() => setLocation(null)}
          >
            <CloseOutlinedIcon />
          </button>
        )}
      </div>
      {directions && (
        <div className="map-directions">
          <div className="directions-header">{t("Directions")}</div>
          {directions.routes[0].legs.map((leg, legIndex) => (
            <div className="map-directions-body" key={legIndex}>
              {leg.steps.map((step, stepIndex) => (
                <StepComponent key={`_${stepIndex}`} step={step} level={0} />
              ))}
            </div>
          ))}
        </div>
      )}

      {search_results.length > 0 && (
        <div className="search-results">
          <div className="search-header">{t("Search Results")}</div>
          <div className="search-results-body">
            {currentItems.map((place, index) => (
              <button
                className="search-result"
                key={index}
                onClick={() => selectLocation(place.geometry.location)}
              >
                <span className="search-name">{place.name}</span>
                <span className="search-distance">
                  {place.distance.toFixed(2)} km
                </span>
              </button>
            ))}
            <div class="pagination">
              <button onClick={prevPage} className="pagination-button">
                <ChevronLeftOutlinedIcon />
              </button>
              <div className="pagination-info">
                {current_page}/{page_count}
              </div>
              <button onClick={nextPage} className="pagination-button">
                <ChevronRightOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      )}
      <Taskbar setPage={setPage} qrLink={qrLink} qrLabel={t('Scan to open maps')}/>
    </div>
  );
};

export default PlanATrip;

const StepComponent = ({ step, level }) => {
  const nested_steps = step.steps;
  const transit_details = step.transit;
  const indentStyle = {
    marginLeft: `${level * 20}px`,
  };

  return (
    <div style={indentStyle}>
      {transit_details ? (
        <div className="step-transit">
          <span className="step-transit-header">
            Ride the <b>{transit_details.line.vehicle.type}</b> towards{" "}
            <b>{transit_details.headsign}</b>
          </span>
          <span className="step-transit-fromto">
            From: {transit_details.departure_stop.name} (
            {transit_details.departure_time.text})
          </span>
          <span className="step-transit-fromto">
            To: {transit_details.arrival_stop.name} (
            {transit_details.arrival_time.text})
          </span>
          {step.steps &&
            step.steps.map((nestedStep, index) => (
              <StepComponent
                key={`${level + 1}_${index}`}
                step={nestedStep}
                level={level + 1}
              />
            ))}
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: step.instructions }} />
      )}

      {nested_steps &&
        nested_steps.map((nested_step, index) => (
          <StepComponent
            key={`${level + 1}_${index}`}
            step={nested_step}
            level={level + 1}
          />
        ))}
    </div>
  );
};
