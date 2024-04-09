import React from "react";
import "./Emergency.css";
import { Header } from "../../components/UI/Header";
import { Taskbar } from "../../components/taskbar/Taskbar";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { useTranslation } from "react-i18next";

const tableData = [
  { name: "Emergency Services", number: "911" },
  { name: "Distress Centre Calgary", number: "403-266-4357" },
  { name: "Health Link Alberta", number: "811" },
  { name: "Poison & Drug Info Service", number: "1-800-332-1414" },
  { name: "Mental Health Helplines", number: "1-877-303-2642" },
  { name: "Non Emergency Police", number: "403-266-1234" },
  { name: "Women's Emergency Shelter", number: "403-234-7233" },
  { name: "ENMAX (Power Outages)", number: "403-514-6100" },
  { name: "City Services", number: "311" },
];

const EmergencyHome = ({ setPage }) => {
  const { t } = useTranslation();
  return (
    <div className="emergency-contact-container">
      <Header setPage={setPage} previousPage="Home" title="Emergency Contact" />
      <div className="button-container">
        <button
          onClick={() => setPage("HelpOnWay")}
          className="emergency-option"
        >
          <PhoneInTalkIcon style={{ marginRight: "8px" }} />
          {t("Request Immediate Help")}
        </button>
      </div>
      <div className="contact-info-container">
        <div className="title">{t("Contact Information Book")}</div>
        <table className="contact-info-table">
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{t(`${item.name}`)}</td>
                <td>{item.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default EmergencyHome;
