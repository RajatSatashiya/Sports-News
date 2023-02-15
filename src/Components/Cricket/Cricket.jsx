import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "../Stylings/Cricket.css";

function Cricket() {
  const [matchType, setMatchType] = useState("live");
  const [matches, setMatches] = useState([]);
  const [type, setType] = useState([]);
  const [typeIndex, setTypeIndex] = useState(0);

  useEffect(() => {
    getMatches();
  }, [matchType, typeIndex]);

  const getMatches = async () => {
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/matches/v1/${matchType}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
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
              let team1 = "";
              let team2 = "";
              if (match.matchScore) {
                team1 = match.matchScore.team1Score;
                team2 = match.matchScore.team2Score;
              }

              return (
                <div key={index2} className="match">
                  <Link to={`/cricket/match/${match.matchInfo.matchId}`}>
                    <h3>
                      {match.matchInfo.matchDesc},{" "}
                      {match.matchInfo.venueInfo.city}
                    </h3>
                  </Link>
                  <div className="scores">
                    <div className="teamScore">
                      <div>{match.matchInfo.team1.teamName}</div>
                      <div>
                        {team1 && (
                          <div className="score">
                            {team1.inngs1.runs}/
                            {team1.inngs1.wickets ? team1.inngs1.wickets : "0"}{" "}
                            ({team1.inngs1.overs})
                            {team1.inngs2 && (
                              <div className="secondinn">
                                & {team1.inngs2.runs}/
                                {team1.inngs2.wickets
                                  ? team1.inngs2.wickets
                                  : "0"}{" "}
                                ({team1.inngs2.overs})
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="teamScore">
                      <div>{match.matchInfo.team2.teamName}</div>
                      <div>
                        {team2 && (
                          <div className="score">
                            {team2.inngs1 && team2.inngs1.runs}/
                            {team2.inngs1 && team2.inngs1.wickets
                              ? team2.inngs1.wickets
                              : "0"}{" "}
                            ({team2.inngs1 && team2.inngs1.overs})
                            {team2.inngs2 && (
                              <div>
                                & {team2.inngs2.runs}/
                                {team2.inngs2.wickets
                                  ? team2.inngs2.wickets
                                  : "0"}{" "}
                                ({team2.inngs2.overs})
                              </div>
                            )}
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
        <div>
          <Link to="/series" className="cricket-standings">
            Standings
          </Link>
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
// kshri api key -> 2a80
