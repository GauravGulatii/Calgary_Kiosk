/* global google */
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import "./PointsOfInterest.css";
import { Taskbar } from "../../components/taskbar/Taskbar";
import { Header } from "../../components/UI/Header";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import Slider from "@mui/material/Slider";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
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

const data = [
  {
    name: "Stephen Avenue Walk",
    distance: 0.18,
    lat: 51.0458969,
    lng: -114.0702167,
    type: "shopping",
    description: `A vibrant pedestrian street in downtown Calgary, known for its historic buildings, shops, restaurants, and public art installations.`,
  },
  {
    name: "Calgary Farmers' Market South",
    distance: 6.98,
    lat: 50.9854596,
    lng: -114.0517599,
    type: "shopping",
    description: `A bustling marketplace offering fresh produce, artisanal foods, and unique local goods, located in the southern part of the city.`,
  },
  {
    name: "Inglewood",
    distance: 3.92,
    lat: 51.034201,
    lng: -114.020136,
    type: "shopping",
    description: `Calgary's oldest neighborhood, blending historic charm with trendy boutiques, galleries, and dining spots along 9th Avenue SE.`,
  },
  {
    name: "Kensington Village II",
    distance: 2.66,
    lat: 51.0528608,
    lng: -114.1092064,
    type: "shopping",
    description: `A lively area known for its eclectic shops, cozy cafes, and vibrant street life, situated in the northwest part of Calgary.`,
  },
  {
    name: "Eau Claire Market",
    distance: 0.7,
    lat: 51.0525998,
    lng: -114.0684482,
    type: "shopping",
    description: `A market and entertainment area offering a variety of shops, eateries, and a cinema, located near the Bow River.`,
  },
  {
    name: "CF Chinook Centre",
    distance: 5.38,
    lat: 50.9984961,
    lng: -114.0733449,
    type: "shopping",
    description: `One of Calgary's largest shopping malls, featuring a wide range of stores, a movie theater, and dining options.`,
  },
  {
    name: "CrossIron Mills",
    distance: 18.27,
    lat: 51.203132,
    lng: -113.99348,
    type: "shopping",
    description: `A large shopping center located just outside Calgary, known for its outlet stores, dining, and entertainment facilities.`,
  },
  {
    name: "East Village",
    distance: 1.53,
    lat: 51.0463759,
    lng: -114.0505705,
    type: "shopping",
    description: `A revitalized urban neighborhood offering modern residences, innovative public spaces, and cultural venues along the Bow River.`,
  },
  {
    name: "CORE Shopping Centre",
    distance: 0.25,
    lat: 51.04600989999999,
    lng: -114.0691417,
    type: "shopping",
    description: `A premier shopping destination in the heart of downtown Calgary, featuring over 160 retailers and a stunning indoor garden.`,
  },
  {
    name: "17th Ave Business Improvement Area",
    distance: 1.12,
    lat: 51.0384237,
    lng: -114.0812688,
    type: "shopping",
    description: `A vibrant district known for its fashion boutiques, bars, and restaurants, stretching along 17th Avenue SW.`,
  },
  {
    name: "Studio Bell, home of the National Music Centre",
    distance: 1.41,
    lat: 51.0445506,
    lng: -114.0525973,
    type: "entertainment",
    description: `A contemporary facility celebrating Canada's music history through exhibits and performances.`,
  },
  {
    name: "The GRAND",
    distance: 0.51,
    lat: 51.0471659,
    lng: -114.0651156,
    type: "entertainment",
    description: `A historic theatre and cultural venue that hosts a variety of live performances and events in downtown Calgary.`,
  },
  {
    name: "Calgary Zoo",
    distance: 2.93,
    lat: 51.0450054,
    lng: -114.0306976,
    type: "entertainment",
    description: `A leading Canadian zoo, home to thousands of animals, botanical gardens, and a prehistoric park.`,
  },
  {
    name: "TELUS Spark Science Centre",
    distance: 3.45,
    lat: 51.0538889,
    lng: -114.0244446,
    type: "entertainment",
    description: `An interactive museum dedicated to exploring science, technology, and creativity through exhibits and workshops.`,
  },
  {
    name: "Fort Calgary",
    distance: 2,
    lat: 51.044625,
    lng: -114.04403,
    type: "entertainment",
    description: `A historical site marking the birthplace of Calgary, offering exhibits on the city's founding and development.`,
  },
  {
    name: "The Military Museums",
    distance: 4.81,
    lat: 51.0138755,
    lng: -114.1168785,
    type: "entertainment",
    description: `Canada's second largest military museum, showcasing the history of the Canadian Forces.`,
  },
  {
    name: "Heritage Park",
    distance: 7.44,
    lat: 50.9824547,
    lng: -114.1009544,
    type: "entertainment",
    description: `A historical village that depicts life in Western Canada from the 1860s to the 1950s, featuring authentically restored buildings and live demonstrations.`,
  },
  {
    name: "Calgary Tower",
    distance: 0.71,
    lat: 51.04430800000001,
    lng: -114.0630914,
    type: "entertainment",
    description: `A 190.8 meter freestanding observation tower in downtown Calgary, offering panoramic views of the city.`,
  },
  {
    name: "Stampede Park",
    distance: 1.76,
    lat: 51.0374488,
    lng: -114.0520858,
    type: "entertainment",
    description: `The site of the world famous Calgary Stampede, a large festival, exhibition, and rodeo held every July.`,
  },
  {
    name: "Fish Creek Provincial Park",
    distance: 15.33,
    lat: 50.9147128,
    lng: -114.0107697,
    type: "outdoors",
    description: `One of the largest urban parks in Canada, offering extensive walking, biking trails, and a man made beach.`,
  },
  {
    name: "Nose Hill Park",
    distance: 7.69,
    lat: 51.1114337,
    lng: -114.1112986,
    type: "outdoors",
    description: `A vast natural environment park offering hiking trails and wildlife viewing, located in the northwest part of Calgary.`,
  },
  {
    name: "Prince's Island Park",
    distance: 0.99,
    lat: 51.0556,
    lng: -114.0702533,
    type: "outdoors",
    description: `An urban park on an island in the Bow River, known for its beautiful walking paths, flower gardens, and outdoor performances.`,
  },
  {
    name: "Bow River Pathway",
    distance: 3.34,
    lat: 51.0476201,
    lng: -114.1201058,
    type: "outdoors",
    description: `A network of paths along the Bow River, ideal for walking, biking, and enjoying the natural beauty of Calgary.`,
  },
  {
    name: "Calaway Park",
    distance: 20.3,
    lat: 51.0854398,
    lng: -114.3559887,
    type: "outdoors",
    description: `Western Canada's largest outdoor family amusement park, offering a variety of rides, games, and entertainment.`,
  },
  {
    name: "St. Patrick's Island",
    distance: 2.17,
    lat: 51.04719919999999,
    lng: -114.0414476,
    type: "outdoors",
    description: `A beautifully revitalized park in the Bow River, offering natural landscapes, play areas, and event spaces.`,
  },
  {
    name: "Sikome Lake",
    distance: 16.88,
    lat: 50.899444,
    lng: -114.015556,
    type: "outdoors",
    description: `ade lake located within Fish Creek Provincial Park, popular for swimming and sunbathing during the summer months.`,
  },
  {
    name: "Edworthy Park",
    distance: 6.66,
    lat: 51.0620527,
    lng: -114.1644059,
    type: "outdoors",
    description: `A scenic park along the Bow River, featuring picnic areas, playgrounds, and the historic Lawrey Gardens.`,
  },
  {
    name: "The Hangar Flight Museum",
    distance: 6.71,
    lat: 51.09436179999999,
    lng: -114.0133997,
    type: "culture",
    description: `A museum dedicated to preserving and showcasing Western Canada's aviation history.`,
  },
  {
    name: "Canadian Sports Hall of Fame",
    distance: 11.24,
    lat: 51.08358399999999,
    lng: -114.2220499,
    type: "culture",
    description: `A museum celebrating Canadian sports history and honoring the country's sports heroes.`,
  },
  {
    name: "Youthlink Calgary Police Service Interpretive Centre",
    distance: 9.24,
    lat: 51.09852910000001,
    lng: -113.9690713,
    type: "culture",
    description: `Offers interactive exhibits and programs about policing, aiming to educate and inspire youth.`,
  },
  {
    name: "Glenbow Museum",
    distance: 0.82,
    lat: 51.0449777,
    lng: -114.0611335,
    type: "culture",
    description: `One of Western Canada's largest museums, featuring art, history, and cultural exhibitions.`,
  },
  {
    name: "Southern Alberta Jubilee Auditorium",
    distance: 2.26,
    lat: 51.0628664,
    lng: -114.0921023,
    type: "culture",
    description: `A performing arts, culture, and community facility, hosting a variety of performances and events.`,
  },
  {
    name: "Leighton Art Centre",
    distance: 29.63,
    lat: 50.7956657,
    lng: -114.2123565,
    type: "culture",
    description: `An art gallery and museum set in a beautiful rural landscape, showcasing Alberta artists and offering art education programs.`,
  },
  {
    name: "Calgary Chinese Cultural Centre",
    distance: 0.7,
    lat: 51.0512849,
    lng: -114.0654657,
    type: "culture",
    description: `Celebrates Chinese culture and heritage with exhibitions, a traditional garden, and cultural events.`,
  },
  {
    name: "Lougheed House National & Provincial Historic Site",
    distance: 0.77,
    lat: 51.0405556,
    lng: -114.0772222,
    type: "culture",
    description: `A beautifully restored Victorian mansion that offers a glimpse into early 20th century Calgary.`,
  },
];

const libraries = ["places", "geometry"];

const generateGoogleMapsLink = (lat, lng) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

const PointsOfInterest = ({ setPage }) => {
  const { t } = useTranslation();
  const [selected_place, setSelectedPlace] = useState(null);
  const [directions, setDirections] = useState(null);
  const [search_query, setSearchQuery] = useState("");
  const [search_results, setSearchResults] = useState([]);
  const [travel_mode, setTravelMode] = useState("TRANSIT");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const map_ref = useRef(null);

  const [activeFilters, setActiveFilters] = useState(["shopping"]);
  const [distanceRange, setDistanceRange] = useState([0, 30]);
  const [filteredData, setFilteredData] = useState([]);

  const updateDirections = async (loc) => {
    const directionsService = new window.google.maps.DirectionsService();

    const result = await directionsService.route({
      origin: center,
      destination: loc,
      travelMode: travel_mode, // Use the state value
    });
    setDirections(result);
  };

  const clearDirections = () => {
    setDirections(null);
  };

  useEffect(() => {
    if (selected_place) {
      const loc = { lat: selected_place.lat, lng: selected_place.lng };
      updateDirections(loc);
    } else {
      clearDirections();
    }
  }, [selected_place, travel_mode]);

  const valueLabelFormat = (value) => {
    return `${value} km`;
  };

  const toggleFilter = (category) => {
    const index = activeFilters.findIndex((c) => c === category);
    if (index >= 0)
      setActiveFilters(activeFilters.filter((c) => c !== category));
    else setActiveFilters([...activeFilters, category]);
  };

  // Function to handle distance slider change
  const handleDistanceChange = (event, newValue) => {
    setDistanceRange(newValue);
  };

  const selectPlace = (place) => {
    setSelectedPlace(place);
    setSearchQuery("");
  };

  const onMapLoad = useCallback((map) => {
    map_ref.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (search_query) {
      const query = search_query.toLowerCase().trim();
      const s = data.filter((item) => item.name.toLowerCase().includes(query));
      setSearchResults(s);
      setSelectedPlace(null);
    } else {
      setSearchResults([]);
    }
  }, [search_query]);

  useEffect(() => {
    const [min, max] = distanceRange;
    setFilteredData(
      data.filter(
        (item) =>
          activeFilters.includes(item.type) &&
          min < item.distance &&
          max > item.distance
      )
    );
  }, [distanceRange, activeFilters]);

  const location = selected_place
    ? { lat: selected_place.lat, lng: selected_place.lng }
    : null;

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const qrLink = location ? generateGoogleMapsLink(location.lat, location.lng) : null

  return (
    <div className="points-of-interest-page">
      <Header
        setPage={setPage}
        previousPage="Home"
        title="Points of Interest"
      />
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
                  onClick={() => {
                    selectPlace(place);
                  }}
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
      <div className="google-map" style={{ height: 200 }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          center={center}
          zoom={10}
          onLoad={onMapLoad}
        >
          {location && <Marker position={location} />}
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
        </GoogleMap>
      </div>
      <div className="bottom-of-page">
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
              onClick={() => selectPlace(null)}
            >
              <CloseOutlinedIcon />
            </button>
          )}
        </div>
        {selected_place ? (
          <div className="selected-place">
            <span className="selected-place-name">{selected_place.name}</span>
            <p className="selected-place-description">
              {t(`${selected_place.description}`)}
            </p>
          </div>
        ) : (
          <div>
            <div className="filters">
              <div className="filters-title">
                {t("Filters")} ({t("Type & Distance")})
              </div>
              <div className="checkboxGroup">
                <label
                  className="label"
                  onClick={() => toggleFilter("shopping")}
                >
                  <div className="checkbox">
                    {activeFilters.includes("shopping") ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </div>
                  {t("Shopping")} / {t("Dining")}
                </label>
                <label
                  className="label entertainment"
                  onClick={() => toggleFilter("entertainment")}
                >
                  <div className="checkbox">
                    {activeFilters.includes("entertainment") ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </div>
                  {t("Entertainment")}
                </label>
              </div>
              <div className="checkboxGroup">
                <label
                  className="label"
                  onClick={() => toggleFilter("outdoors")}
                >
                  <div className="checkbox">
                    {activeFilters.includes("outdoors") ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </div>
                  {t("Outdoors")}
                </label>
                <label
                  className="label"
                  onClick={() => toggleFilter("culture")}
                >
                  <div className="checkbox">
                    {activeFilters.includes("culture") ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </div>
                  {t("Culture")} / {t("History")}
                </label>
              </div>
              <div className="slider">
                <Slider
                  value={distanceRange}
                  onChange={handleDistanceChange}
                  valueLabelDisplay="on" // Always show the value label
                  aria-labelledby="range-slider"
                  getAriaValueText={valueLabelFormat}
                  valueLabelFormat={valueLabelFormat}
                  min={0}
                  max={30}
                />
              </div>
            </div>
            <div className="point-of-interest-results">
              {filteredData.length > 0 ? (
                <>
                  {filteredData.map((item) => (
                    <div
                      key={item.name}
                      className="point-of-interest-result"
                      onClick={() => {
                        selectPlace(item);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </>
              ) : (
                <div>{t("No Results, try changing the filters above!")}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <Taskbar setPage={setPage} qrLink={qrLink} qrLabel={t('Scan to open maps')}/>
    </div>
  );
};

export default PointsOfInterest;
