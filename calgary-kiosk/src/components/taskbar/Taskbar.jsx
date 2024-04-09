import React from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HomeIcon from "@mui/icons-material/Home";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import BlockIcon from '@mui/icons-material/Block';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { QRCodeSVG } from 'qrcode.react';
import "./Taskbar.css";

export const Taskbar = ({ setPage, qrLink, qrLabel }) => {
  console.log(qrLink)
  return (
    <div className="taskbar-container">
      {qrLink ? (
        <div className="taskbar-qr">
          <QRCodeSVG value={qrLink} size={85} level={"M"}  />
          {qrLabel && (
            <div className="taskbar-qr-label">
              <ArrowBackIcon/>
              <span>{qrLabel}</span> 
            </div>
          )}
        </div>
      ) : (
        <div className="taskbar-qr">
          <QrCodeScannerIcon
            sx={{ fontSize: 85, color: '#cfcfcf' }}
          />
          <BlockIcon className="taskbar-qr-overlay" sx={{width: 70, height: 70}}/>
        </div>      
      )}
      <HomeIcon
        onClick={() => {
          setPage("Home");
        }}
        classNameName="taskbar-icon"
        sx={{ fontSize: 85 }}
      />
      <GTranslateIcon
        onClick={() => {
          setPage("Language");
        }}
        classNameName="taskbar-icon"
        sx={{ fontSize: 85, marginRight: "5%" }}
      />
    </div>
  );
};
