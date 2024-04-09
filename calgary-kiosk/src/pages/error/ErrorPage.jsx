import React, { useState, useEffect } from "react";

const ErrorPage = ({ setPage }) => {
  return (
    <div>
      SOME ERROR OCCURRED
      <div
        onClick={() => {
          setPage("Home");
        }}
      >
        Go back to home
      </div>
    </div>
  );
};

export default ErrorPage;
