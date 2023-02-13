import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Stylings/Scorecard.css";

function Template() {
  const [apidata, setApidata] = useState([]);
  const [matchStatus, setMatchStatus] = useState("");
  const { matchId } = useParams();

  const getApiData = async () => {
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`,
        {
          headers: {
            "X-RapidAPI-Key":
              "b9711df563mshd084d4e7ca54a8dp14bf17jsna56d05d1aadd",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setMatchStatus(data.status);
      console.log(data.scoreCard);
      setApidata(data.scoreCard);
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
      <div>
        <h3 className="matchstatus">{matchStatus}</h3>
        {displayResult}
      </div>
    </>
  );
}

export default Template;
