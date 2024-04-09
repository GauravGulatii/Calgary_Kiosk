import React, { useState, useEffect } from "react";
import { Header } from "../../components/UI/Header";
import { Taskbar } from "../../components/taskbar/Taskbar";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useTranslation } from "react-i18next";
import "./TransitHome.css";

const delayData = [
  { number: "129", route: "Dalhousie/Sage Hill", delay: "5min delay" },
  {
    number: "113",
    route: "North Ranchlands/Scenic Acres",
    delay: "2min delay",
  },
  { number: "96", route: "Douglasdale/Mckenzie", delay: "13min delay" },
  { number: "217", route: "Cranston", delay: "1min delay" },
];

const TransitHome = ({ setPage }) => {
  const { t } = useTranslation();
  const [delayDataIndex, setDelayDataIndex] = useState(0);
  let intervalRef = React.useRef(null);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDelayDataIndex((prevIndex) => (prevIndex + 1) % delayData.length);
    }, 5000);
  };

  const handleNext = () => {
    setDelayDataIndex((prevIndex) => (prevIndex + 1) % delayData.length);
    startInterval();
  };

  const handlePrevious = () => {
    setDelayDataIndex(
      (prevIndex) => (prevIndex - 1 + delayData.length) % delayData.length
    );
    startInterval();
  };

  return (
    <div>
      <Header
        setPage={setPage}
        previousPage="Home"
        title="Transit Information"
      />
      <div className="transit-info-container">
        <div className="transit-info">
          <div className="transit-info-number">
            {delayData[delayDataIndex].number}
          </div>
          <div className="transit-info-route">
            {delayData[delayDataIndex].route}
          </div>
          <div className="transit-info-delay">
            {t(`${delayData[delayDataIndex].delay}`)}
          </div>
        </div>
        <div className="transit-pagination">
          <button onClick={handlePrevious} className="pagination-button">
            <ChevronLeftOutlinedIcon />
          </button>
          <div className="transit-pagination-dots">
            {delayData.map((item, index) =>
              index === delayDataIndex ? (
                <CircleIcon key={index} />
              ) : (
                <CircleOutlinedIcon key={index} />
              )
            )}
          </div>
          <button onClick={handleNext} className="pagination-button">
            <ChevronRightOutlinedIcon />
          </button>
        </div>
      </div>
      <div className="transit-options-container">
        <div
          onClick={() => {
            setPage("TransitRoutes");
          }}
          className="transit-option"
        >
          {t("Transit Routes & Schedules")}
        </div>
        <div
          onClick={() => {
            setPage("PlanATrip");
          }}
          className="transit-option"
        >
          {t("Plan a Trip!")}
        </div>
        <div
          onClick={() => {
            setPage("FareInformation");
          }}
          className="transit-option"
        >
          {t("Fare Information")}
        </div>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default TransitHome;
