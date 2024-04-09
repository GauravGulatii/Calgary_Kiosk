import "./App.css";
import React, { useState } from "react";
import Home from "./pages/home/Home.jsx";
import TransitHome from "./pages/transit/TransitHome.jsx";
import Language from "./pages/language/Language.jsx";
import PointsOfInterest from "./pages/pointOfInterest/PointsOfInterest.jsx";
import EmergencyHome from "./pages/emergency/EmergencyHome.jsx";
import FareInformation from "./pages/transit/fare/FareInformation.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import HelpIsOnTheWay from './pages/emergency/HelpIsOnTheWay.jsx';
import TransitRoutes from './pages/transit/transitRoutes/TransitRoutes.jsx'
import PlanATrip from "./pages/transit/planATrip/PlanATrip.jsx";

function App() {
  const [page, setPage] = useState("Home");

  return (
    <div className="App">
      {page === "Home" ? (
        <Home {...{ setPage }} />
      ) : page === "Transit" ? (
        <TransitHome {...{ setPage }} />
      ) : page === "Language" ? (
        <Language {...{ setPage }} />
      ) : page === "Emergency" ? (
        <EmergencyHome {...{ setPage }} />
      ) : page === "PointsOfInterest" ? (
        <PointsOfInterest {...{ setPage }} />
      ) : page === "HelpOnWay" ? (
        <HelpIsOnTheWay {...{ setPage }} />
      ) : page === "TransitRoutes" ? (
        <TransitRoutes {...{ setPage }} />
      ) : page === "FareInformation" ? (
        <FareInformation {...{ setPage }} />
      ) : page === "PlanATrip" ? (
        <PlanATrip {...{ setPage }} />
      ) : (
        <ErrorPage {...{ setPage }} />
      )}
    </div>
  );
}

export default App;
