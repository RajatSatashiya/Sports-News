import React, { useEffect, useState } from "react";
import moment from "moment";
import "../Stylings/Cricket.css";

function Cricket() {
  const [matchType, setMatchType] = useState("live");
  const [matches, setMatches] = useState([]);
  const [type, setType] = useState([]);
  const [typeIndex, setTypeIndex] = useState(0);

  useEffect(() => {
    // getMatches();
  }, [matchType, typeIndex]);

  const getMatches = async () => {
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/matches/v1/${matchType}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "b9711df563mshd084d4e7ca54a8dp14bf17jsna56d05d1aadd",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setType(data.typeMatches);
      setMatches(data.typeMatches[typeIndex].seriesMatches);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayMatchType = type.map((item, index) => {
    return (
      <div onClick={() => setTypeIndex(index)} key={index}>
        {item.matchType}
      </div>
    );
  });
  const displayMatches = matches.map((item, index) => {
    if ("adDetail" in item) {
      return <div key={index}></div>;
    } else {
      const matchdata = item.seriesAdWrapper;
      return (
        <div key={index}>
          <h3>{matchdata.seriesName}</h3>
          <div className="series">
            {matchdata.matches.map((match, index2) => {
              let matchDate = match.matchInfo.startDate;
              matchDate = new Date(parseInt(matchDate));
              let checking = moment(matchDate).format("Do MMM YYYY, hh:mm a");
              const firstInn = match.matchScore && match.matchScore.team1Score;
              const secondInn = match.matchScore && match.matchScore.team2Score;

              return (
                <div key={index2} className="match">
                  <h3>
                    {match.matchInfo.matchDesc},{" "}
                    {match.matchInfo.venueInfo.city}
                  </h3>
                  <div className="scores">
                    <div className="teamScore">
                      <div>{match.matchInfo.team1.teamName}</div>
                      <div>
                        {firstInn && (
                          <div className="score">
                            {firstInn.inngs1.runs}/{firstInn.inngs1.wickets} (
                            {firstInn.inngs1.overs})
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="teamScore">
                      <div>{match.matchInfo.team2.teamName}</div>
                      <div>
                        {secondInn && (
                          <div className="score">
                            {secondInn.inngs1 && secondInn.inngs1.runs}/
                            {secondInn.inngs1 && secondInn.inngs1.wickets} (
                            {secondInn.inngs1 && secondInn.inngs1.overs})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="status">{checking}</div>
                  <div className="status">{match.matchInfo.status}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div className="cricketNav">
        <div
          onClick={() => {
            setMatchType("live");
          }}
        >
          Live Matches
        </div>
        <div
          onClick={() => {
            setMatchType("upcoming");
          }}
        >
          Upcoming Matches
        </div>
        <div
          onClick={() => {
            setMatchType("recent");
          }}
        >
          Recent Matches
        </div>
      </div>
      <div className="container">
        <div>
          <h2>Matches</h2>
          <div className="matchType">{displayMatchType}</div>
        </div>

        <h2>
          {matchType === "live"
            ? "Live Matches"
            : matchType === "recent"
            ? "Recent Matches"
            : "Upcoming Matches"}
        </h2>
        <div>{displayMatches}</div>
      </div>
    </>
  );
}

export default Cricket;
// vit email api key -> b9711
