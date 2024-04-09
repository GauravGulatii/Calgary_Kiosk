import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../../components/UI/Header";
import { Taskbar } from "../../components/taskbar/Taskbar";
import "./Emergency.css";
import "./HelpIsOnTheWay.css";

const EmergencyHome = ({ setPage }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState("REQUESTING HELP....");
  const [submitButtonText, setSubmitButtonText] = useState("Submit Request");
  const [countdown, setCountdown] = useState(8);
  const [progress, setProgress] = useState(0);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];

      if (updatedCategories.length !== prev.length)
        setSubmitButtonText("Update Request");

      setSubmitted(false);
      resetProgress();
      return updatedCategories;
    });
  };

  const handleButtonClick = () => {
    if (
      submitButtonText === "Request Submitted" ||
      submitButtonText === "Request Updated"
    ) {
      return;
    } else if (submitButtonText === "Submit Request") {
      submitRequest();
    } else if (submitButtonText === "Update Request") {
      updateRequest();
    }
  };

  const resetProgress = () => {
    cancelProgress();
    setCountdown(8);
  };

  const cancelProgress = () => {
    setProgress(0);
    setCountdown(0);
  };

  const updateRequest = () => {
    setSubmitted(true);
    setTitle("HELP IS ON THE WAY");
    setSubmitButtonText("Request Updated");
    cancelProgress();
  };

  const submitRequest = () => {
    setSubmitted(true);
    setTitle("HELP IS ON THE WAY");
    setSubmitButtonText("Request Submitted");
    cancelProgress();
  };

  useEffect(() => {
    if (submitted || countdown < 0) return;

    let interval = null;
    if (countdown > 0) {
      if (submitButtonText === "Submit Request") {
        setTitle("SUBMITTING REQUEST");
      } else if (submitButtonText === "Update Request") {
        setTitle("UPDATING REQUEST");
      }
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          return prevCountdown - 1;
        });
        setProgress((prevProgress) => prevProgress + 100 / 8);
      }, 1000);
    } else {
      submitRequest(true);
    }

    return () => clearInterval(interval);
  }, [submitted, countdown]);

  return (
    <div className="emergency-contact-container">
      <Header
        setPage={setPage}
        previousPage="Emergency"
        title={title}
        color="red"
      />
      <div className="button-container">
        <div
          onClick={() => toggleCategory("Medical")}
          className={`emergency-category ${
            selectedCategories.includes("Medical") ? "selected" : ""
          }`}
        >
          <MedicalServicesIcon />
          {t("Ambulance")}
        </div>
        <div
          onClick={() => toggleCategory("Safety")}
          className={`emergency-category ${
            selectedCategories.includes("Safety") ? "selected" : ""
          }`}
        >
          <HealthAndSafetyIcon />
          {t("Police")}
        </div>
        <div
          onClick={() => toggleCategory("Fire")}
          className={`emergency-category ${
            selectedCategories.includes("Fire") ? "selected" : ""
          }`}
        >
          <WhatshotIcon />
          {t("Firefighters")}
        </div>
      </div>
      <div className="subtitle">
        {t(
          "Please select a category so our first responders can be better equipped to assist you"
        )}
      </div>
      <button
        className="information-option submit"
        style={{ "--progress": `${progress}%` }}
        onClick={handleButtonClick}
      >
        <span className="submit-text">{t(`${submitButtonText}`)}</span>
        <span
          className="submit-progress"
          style={{ width: `${progress}%` }}
        ></span>
      </button>
      <div
        className="emergency-option cancel"
        onClick={() => setPage("Emergency")}
      >
        {t("Cancel Request")}
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default EmergencyHome;
