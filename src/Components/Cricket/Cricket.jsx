import React, { useEffect, useState } from "react";
import "../Stylings/Cricket.css";

function Cricket() {
  const [livematches, setLivematches] = useState([]);
  const [upcomingmatches, setUpcomingmatches] = useState([]);
  const [recentmatches, setRecentmatches] = useState([]);
  const [type, setType] = useState(0);

  const getLiveMatches = async () => {
    try {
      const response = await fetch(
        "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
        {
          headers: {
            "X-RapidAPI-Key":
              "b9711df563mshd084d4e7ca54a8dp14bf17jsna56d05d1aadd",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setLivematches(data.typeMatches[type].seriesMatches);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const getUpcomingMatches = async () => {
    try {
      const response = await fetch(
        "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",
        {
          headers: {
            "X-RapidAPI-Key":
              "b9711df563mshd084d4e7ca54a8dp14bf17jsna56d05d1aadd",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setUpcomingmatches(data.typeMatches[type].seriesMatches);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const getRecentMatches = async () => {
    try {
      const response = await fetch(
        "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",
        {
          headers: {
            "X-RapidAPI-Key":
              "b9711df563mshd084d4e7ca54a8dp14bf17jsna56d05d1aadd",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setRecentmatches(data.typeMatches[type].seriesMatches);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  const displayLiveMatches = livematches.map((item, index) => {
    if ("adDetail" in item) {
      return <div key={index}></div>;
    } else {
      const matchdata = item.seriesAdWrapper;
      return (
        <div key={index}>
          <h3>{matchdata.seriesName}</h3>
          <div className="series">
            {matchdata.matches.map((match, index2) => {
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
                      {match.matchInfo.team1.teamName}
                      {firstInn && (
                        <div className="score">
                          {firstInn.inngs1.runs}/{firstInn.inngs1.wickets} (
                          {firstInn.inngs1.overs})
                        </div>
                      )}
                    </div>
                    <div className="teamScore">
                      {match.matchInfo.team2.teamName}
                      {secondInn && (
                        <div className="score">
                          {secondInn.inngs1 && secondInn.inngs1.runs}/
                          {secondInn.inngs1 && secondInn.inngs1.wickets} (
                          {secondInn.inngs1 && secondInn.inngs1.overs})
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="status">{match.matchInfo.status}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  const displayUpcomingMatches = upcomingmatches.map((item, index) => {
    if ("adDetail" in item) {
      return <div key={index}></div>;
    } else {
      const matchdata = item.seriesAdWrapper;
      return (
        <div key={index}>
          <h3>{matchdata.seriesName}</h3>
          <div className="series">
            {matchdata.matches.map((match, index2) => {
              return (
                <div key={index2} className="match">
                  <h3>
                    {match.matchInfo.matchDesc},{" "}
                    {match.matchInfo.venueInfo.city}
                  </h3>
                  <div className="scores">
                    <div className="teamScore">
                      {match.matchInfo.team1.teamName}
                    </div>
                    <div className="teamScore">
                      {match.matchInfo.team2.teamName}
                    </div>
                  </div>
                  <div className="status">{match.matchInfo.status}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  const displayRecentMatches = recentmatches.map((item, index) => {
    if ("adDetail" in item) {
      return "";
    } else {
      const matchdata = item.seriesAdWrapper;
      return (
        <div key={index}>
          <h3>{matchdata.seriesName}</h3>
          <div className="series">
            {matchdata.matches.map((match, index2) => {
              const firstInn = match.matchScore.team1Score;
              const secondInn = match.matchScore.team2Score;
              return (
                <div className="match" key={index2}>
                  <h3>
                    {match.matchInfo.matchDesc},{" "}
                    {match.matchInfo.venueInfo.city}
                  </h3>
                  <div className="scores">
                    <div className="teamScore">
                      {match.matchInfo.team1.teamName}
                      {firstInn && (
                        <div className="score">
                          {firstInn.inngs1.runs}/{firstInn.inngs1.wickets} (
                          {firstInn.inngs1.overs})
                        </div>
                      )}
                    </div>
                    <div className="teamScore">
                      {match.matchInfo.team2.teamName}
                      {secondInn && (
                        <div className="score">
                          {secondInn.inngs1.runs}/{secondInn.inngs1.wickets} (
                          {secondInn.inngs1.overs})
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="status">{match.matchInfo.status}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  useEffect(() => {
    getLiveMatches();
    // getUpcomingMatches();
    // getRecentMatches();
  }, [type]);

  return (
    <>
      <div className="container">
        <div>
          <h2>Matches</h2>
          <div className="matchType">
            <div onClick={() => setType(0)}>International Matches</div>
            <div onClick={() => setType(1)}>League Matches</div>
            <div onClick={() => setType(2)}>Domestic Matches</div>
            <div onClick={() => setType(3)}>Women's Cricket</div>
          </div>
        </div>

        <h2>Live Matches</h2>
        <div>{displayLiveMatches}</div>

        <h2>Upcoming Matches</h2>
        <div>{displayUpcomingMatches}</div>

        <h2>Recent Matches</h2>
        <div>{displayRecentMatches}</div>
      </div>
    </>
  );
}

export default Cricket;

// vit email api key -> b9711
