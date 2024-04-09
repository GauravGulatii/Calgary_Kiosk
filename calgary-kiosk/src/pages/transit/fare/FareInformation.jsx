import React, { useState, useEffect } from "react";
import { Header } from "../../../components/UI/Header";
import { Taskbar } from "../../../components/taskbar/Taskbar";
import { useTranslation } from "react-i18next";
import "./FareInformation.css";

const FARE_QR_LINK =
  "https://www.calgarytransit.com/fares---passes/my-fare.html";

const FareInformation = ({ setPage }) => {
  const { t } = useTranslation();
  const [fareData, setFareData] = useState({
    AdultSingleUse: 0,
    YouthSingleUse: 0,
    ChildSingleUse: 0,
    AdultDayPass: 0,
    YouthDayPass: 0,
    ChildDayPass: 0,
    AdultMonthPass: 0,
    YouthMonthPass: 0,
    ChildMonthPass: 0,
  });

  const farePrices = {
    AdultSingleUse: 3.7,
    YouthSingleUse: 2.5,
    ChildSingleUse: 0,
    AdultDayPass: 11.6,
    YouthDayPass: 8.5,
    ChildDayPass: 0,
    AdultMonthPass: 115.0,
    YouthMonthPass: 82.5,
    ChildMonthPass: 0,
  };

  const resetData = () => {
    setFareData({
      AdultSingleUse: 0,
      YouthSingleUse: 0,
      ChildSingleUse: 0,
      AdultDayPass: 0,
      YouthDayPass: 0,
      ChildDayPass: 0,
      AdultMonthPass: 0,
      YouthMonthPass: 0,
      ChildMonthPass: 0,
    });
  };

  const handleValueChange = (type, value) => {
    setFareData({
      ...fareData,
      [type]: value,
    });
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    for (let key in fareData) {
      totalCost += fareData[key] * farePrices[key];
    }
    return totalCost;
  };

  return (
    <div>
      <Header
        setPage={setPage}
        previousPage="Transit"
        title="Fare Information"
      />
      <div class="fare-container">
        <div class="fare-title">{t("Fares")}</div>
        <div class="fare-info-container">
          <div></div>
          <div class="age-title">{t("Adult")} (18+)</div>
          <div class="age-title">{t("Youth")} (13-17)</div>
          <div class="age-title">{t("Child")} (0-12)</div>

          <div class="duration">{t("Single Use")} (90min)</div>
          <div class="price">$3.70</div>
          <div class="price">$2.50</div>
          <div class="price">{t("Free")}</div>

          <div class="middle-row">
            <div class="duration">{t("Day Pass")} (till EOD)</div>
            <div class="price">$11.60</div>
            <div class="price">$8.50</div>
            <div class="price">{t("Free")}</div>
          </div>

          <div class="duration">{t("Month Pass")} (1 mon)</div>
          <div class="price">$115.00</div>
          <div class="price">$82.50</div>
          <div class="price">{t("Free")}</div>
        </div>
      </div>

      <div class="fare-calculator-container">
        <div class="fare-title">{t("Fare Calculator")}</div>
        <div class="fare-info-container">
          <div></div>
          <div class="age-title">{t("Adult")} (18+)</div>
          <div class="age-title">{t("Youth")} (13-17)</div>
          <div class="age-title">{t("Child")} (0-12)</div>

          <div class="duration">{t("Single Use")} (90min)</div>
          <NumberBox
            type="AdultSingleUse"
            valueProp={fareData.AdultSingleUse}
            onChange={handleValueChange}
          />
          <NumberBox
            type="YouthSingleUse"
            valueProp={fareData.YouthSingleUse}
            onChange={handleValueChange}
          />
          <NumberBox
            type="ChildSingleUse"
            valueProp={fareData.ChildSingleUse}
            onChange={handleValueChange}
          />

          <div class="middle-row">
            <div class="duration">{t("Day Pass")} (till EOD)</div>
            <NumberBox
              type="AdultDayPass"
              valueProp={fareData.AdultDayPass}
              onChange={handleValueChange}
            />
            <NumberBox
              type="YouthDayPass"
              valueProp={fareData.YouthDayPass}
              onChange={handleValueChange}
            />
            <NumberBox
              type="ChildDayPass"
              valueProp={fareData.ChildDayPass}
              onChange={handleValueChange}
            />
          </div>

          <div class="duration">{t("Month Pass")} (1 mon)</div>
          <NumberBox
            type="AdultMonthPass"
            valueProp={fareData.AdultMonthPass}
            onChange={handleValueChange}
          />
          <NumberBox
            type="YouthMonthPass"
            valueProp={fareData.YouthMonthPass}
            onChange={handleValueChange}
          />
          <NumberBox
            type="ChildMonthPass"
            valueProp={fareData.ChildMonthPass}
            onChange={handleValueChange}
          />
        </div>
      </div>
      <div className="cost-and-reset">
        <div class="box" id="scan-text">
          <p>{t("Scan to buy tickets!")}</p>
        </div>
        <h3
          className="reset-fare-cost"
          id="reset-fare-cost"
          onClick={() => {
            resetData();
          }}
        >
          {t("Reset")}
        </h3>
        <h3 id="total-fare-cost">
          {t("Total")}: ${calculateTotalCost().toFixed(2)}
        </h3>
      </div>
      <Taskbar setPage={setPage} qrLink={FARE_QR_LINK} />
    </div>
  );
};

const NumberBox = ({ type, valueProp, onChange }) => {
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const increment = () => {
    const newValue = value + 1 < 100 ? value + 1 : value;
    setValue(newValue);
    onChange(type, newValue);
  };

  const decrement = () => {
    const newValue = value - 1 >= 0 ? value - 1 : 0;
    setValue(newValue);
    onChange(type, newValue);
  };

  return (
    <div className="number-box">
      <button class="increment-button" onClick={decrement}>
        -
      </button>
      <input class="fare-input" type="number" value={value} readOnly />
      <button class="increment-button" onClick={increment}>
        +
      </button>
    </div>
  );
};
export default FareInformation;
