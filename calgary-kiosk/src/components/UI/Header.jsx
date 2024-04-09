import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import "./Header.css";

export const Header = ({ setPage, previousPage, title, color = "black" }) => {
  const { t } = useTranslation();
  return (
    <div class="header-container">
      <ArrowBackIcon
        style={color === "red" ? { visibility: "hidden" } : {}}
        className="arrow"
        sx={{ fontSize: 40, marginLeft: "5%" }}
        onClick={() => {
          setPage(previousPage);
        }}
      />
      <div class="header-div">
        <h1 class={`header-text ${color === "red" ? "red" : ""}`}>
          {t(`${title}`)}
        </h1>
      </div>
    </div>
  );
};
