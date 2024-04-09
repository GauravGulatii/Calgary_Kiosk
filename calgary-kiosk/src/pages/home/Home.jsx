import React from "react";
import { Taskbar } from "../../components/taskbar/Taskbar";
import { useTranslation } from "react-i18next";
import "./Home.css";

const Home = ({ setPage }) => {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="welcome-header-container">
        <h1 className="welcome-header">Welcome to Calgary</h1>
        <h1 className="welcome-header" id="non-english-header">
          {t("Bienvenue à Calgary")}
        </h1>
      </div>
      <div className="information-container">
        <div
          onClick={() => {
            setPage("Transit");
          }}
          className="information-option"
        >
          {t("Transit Information")}
        </div>
        <div
          onClick={() => {
            setPage("PointsOfInterest");
          }}
          className="information-option"
        >
          {t("Points of Interest")}
        </div>
      </div>
      <div
        onClick={() => {
          setPage("Emergency");
        }}
        className="emergency-option"
      >
        {t("Emergency Contact")}
      </div>
      <div className="instructions">
        <div className="box" id="scan-text">
          <p>Scan to take me with you!</p>
          <p className="french-text">{t("Scanne pour m'emmener avec toi!")}</p>
        </div>

        <div className="box" id="language-text">
          <p>Change language!</p>
          <p className="french-text">{t("Changer de langue!")}</p>
        </div>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default Home;
