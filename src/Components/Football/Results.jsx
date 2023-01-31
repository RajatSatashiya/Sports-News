import React, { useEffect, useState } from "react";

function Results() {
  const [apidata, setApidata] = useState([]);
  const [homescore, setHomescore] = useState("");
  const [awayscore, setAwayscore] = useState("");

  const [homescore2, setHomescore2] = useState("");
  const [awayscore2, setAwayscore2] = useState("");

  const getApiData = async () => {
    try {
      const response = await fetch(
        "https://football98.p.rapidapi.com/laliga/results",
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "football98.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      // console.log(data[0][" Matchday 19 "][0]);
      setApidata(data[0][" Matchday 19 "]);
      setHomescore(data[0][" Matchday 19 "][0].homeTeamScore);
      setAwayscore(data[0][" Matchday 19 "][0].awayTeamScore);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const getApiData2 = async () => {
    try {
      const response = await fetch(
        "https://football98.p.rapidapi.com/seriea/results",
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "football98.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setApidata(data[0][" Matchday 20 "]);
      setHomescore2(data[0][" Matchday 20 "][0].homeTeamScore);
      setAwayscore2(data[0][" Matchday 20 "][0].awayTeamScore);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    return <div key={index}></div>;
  });

  useEffect(() => {
    getApiData();
    getApiData2();
  }, []);

  return (
    <>
      <div>{displayResult}</div>
      {/* <div>
        Villareal {homescore} - {awayscore} Rayo Vallecano
      </div>
      <div>
        Udinese {homescore2} - {awayscore2} Verona
      </div> */}
    </>
  );
}

export default Results;
