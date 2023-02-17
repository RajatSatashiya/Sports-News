import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Series() {
  const [apidata, setApidata] = useState([]);
  const [matchType, setMatchType] = useState("international");

  const getApiData = async () => {
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${matchType}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "b9711df563mshd084d4e7ca54a8dp14bf17jsna56d05d1aadd",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setApidata(data.seriesMapProto);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    return (
      <div key={index}>
        <h4>{item.date}</h4>
        <div className="CricketSeries">
          {item.series.map((serie, id) => (
            <Link to={`/series/${serie.id}`} key={id}>
              <div>{serie.name}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  });

  useEffect(() => {
    getApiData();
  }, [matchType]);

  return (
    <>
      <div className="cricketNav">
        <div
          onClick={() => {
            setMatchType("international");
          }}
        >
          International
        </div>
        <div
          onClick={() => {
            setMatchType("league");
          }}
        >
          League
        </div>
        <div
          onClick={() => {
            setMatchType("domestic");
          }}
        >
          Domestic
        </div>
        <div
          onClick={() => {
            setMatchType("women");
          }}
        >
          Women
        </div>
      </div>
      <div className="tourDeSeries">
        <h1>Tournaments & Series</h1>
        <div>{displayResult}</div>
      </div>
    </>
  );
}

export default Series;
