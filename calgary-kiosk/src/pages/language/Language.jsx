import React, { useState } from "react";
import "./Language.css";
import { Header } from "../../components/UI/Header";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import "./Modal.css";

const LanguageSelection = ({ setPage }) => {
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const selectLanguage = (language) => {
    console.log(`${language} selected`);
    setSelectedLanguage(language);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const confirmSelection = () => {
    if (selectedLanguage === "en") {
      changeLanguage("en");
      setShowModal(false);
      setPage("Home");
    } else if (selectedLanguage === "ko") {
      changeLanguage("ko");
      setShowModal(false);
      setPage("Home");
    } else {
      setShowModal(true);
    }
  };

  const closeModalAndGoHome = () => {
    setShowModal(false);
    setPage("Home");
    setTimeout(() => {
      setSelectedLanguage("English");
    }, 5000);
  };

  const languages = [
    { name: "English", lng: "en" },
    { name: "French", nativeName: "Français", lng: "fr" },
    { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", lng: "pj" },
    { name: "Chinese", nativeName: "中文", lng: "ch" },
    { name: "Español", nativeName: "Español", lng: "es" },
    { name: "Arabic", nativeName: "العربية", lng: "ab" },
    { name: "Urdu", nativeName: "اردو", lng: "ud" },
    { name: "Hindi", nativeName: "हिंदी", lng: "hd" },
    { name: "Vietnamese", nativeName: "Tiếng Việt", lng: "vt" },
    { name: "German", nativeName: "Deutsch", lng: "ge" },
    { name: "Italian", nativeName: "Italiano", lng: "it" },
    { name: "Korean", nativeName: "한국어", lng: "ko" },
    { name: "Russian", nativeName: "Русский", lng: "ru" },
    { name: "Somali", nativeName: "Soomaali", lng: "sm" },
  ];

  return (
    <div>
      <Header setPage={setPage} previousPage="Home" title="Select Language" />
      <div className="languages-grid">
        {languages.map((language) => (
          <button
            key={language.name}
            onClick={() => selectLanguage(language.lng)}
            className={
              selectedLanguage === language.lng
                ? "selected-button language-button"
                : "language-button"
            }
          >
            {language.name}
            {language.nativeName && ` (${language.nativeName})`}
          </button>
        ))}
      </div>
      <div className="footer">
        <button className="cancel-button" onClick={() => setPage("Home")}>
          ✖ {t("Cancel")}
        </button>
        <button className="confirm-button" onClick={confirmSelection}>
          ✔ {t("Confirm")}
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        message="Sorry, the only languages avaliable at this time are English and Korean."
        onConfirm={closeModalAndGoHome}
        countdown={10}
      />
    </div>
  );
};

export default LanguageSelection;
