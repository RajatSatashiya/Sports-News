import React, { useEffect, useState } from "react";
import { matches } from "./Resource/Series";
import { Link, useParams } from "react-router-dom";

function Schedule() {
  const { id } = useParams();
  const [apidata, setApidata] = useState([]);
  const [title, setTitle] = useState("");

  const getApiData = async () => {
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${id}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setApidata(data.matchDetails);
      setTitle(data.appIndex.seoTitle.split("live")[0]);
      console.log(data);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayResult = apidata.map((item, index) => {
    var key = Object.keys(item);
    if (key[0] === "adDetail") {
      return <div key={index}></div>;
    } else {
      const matchdata = item.matchDetailsMap;
      return (
        <div className="series" key={index}>
          {matchdata.match.map((match, index2) => {
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
                          {team1.inngs1.wickets ? team1.inngs1.wickets : "0"} (
                          {team1.inngs1.overs ? team1.inngs1.overs : "0"})
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
                <div className="status">{matchdata.key}</div>
                <div className="status">{match.matchInfo.status}</div>
              </div>
            );
          })}
        </div>
      );
    }
  });

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <h3 className="title">{title}</h3>
      <button className="btn">
        <Link to={`/pointstable/${id}`}>Standings</Link>
      </button>
      <div className="seriesMatches">{displayResult}</div>
    </>
  );
}

export default Schedule;
