import React, { useEffect, useState } from "react";

function Esports() {
  const [apidata, setApidata] = useState([]);

  const getApiData = async () => {
    try {
      const response = await fetch("");
      const data = await response.json();
      console.log(data);
      setApidata([]);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    return <div key={index}></div>;
  });

  useEffect(() => {
    // getApiData();
  }, []);

  return (
    <>
      <div>{displayResult}</div>
    </>
  );
}

export default Esports;

// API - Pandascore (already logged in)

