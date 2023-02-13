import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Stylings/Scorecard.css";

function Template() {
  const [apidata, setApidata] = useState([]);
  const [matchStatus, setMatchStatus] = useState("");
  const { matchId } = useParams();

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    try {
      const response = await fetch(
        `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`,
        {
          headers: {
            "X-RapidAPI-Key":
              "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
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

  const BowlingData = (data) => {
    const bowlers = Object.keys(data.bowlersData);

    return bowlers.map((bowler, index) => {
      const bowlerData = data.bowlersData[bowler];

      return (
        <tr key={index}>
          <td className="player">
            {bowlerData.bowlName} {bowlerData.isCaptain ? "(C)" : ""}
          </td>
          <td>{bowlerData.overs}</td>
          <td>{bowlerData.maidens}</td>
          <td>{bowlerData.runs}</td>
          <td>{bowlerData.wickets}</td>
          <td>{bowlerData.no_balls}</td>
          <td>{bowlerData.wides}</td>
          <td>{bowlerData.economy}</td>
        </tr>
      );
    });
  };

  const BattingData = (data) => {
    const batsmen = Object.keys(data.batsmenData);

    return batsmen.map((batsman, index) => {
      const batsmanData = data.batsmenData[batsman];
      return (
        <tr key={index} className="batsmanRow">
          <td className="player">
            {batsmanData.batName} {batsmanData.isCaptain ? "(C)" : ""}{" "}
            {batsmanData.isKeeper ? "(Wk)" : ""}
          </td>
          <td className="player playerDesc">{batsmanData.outDesc}</td>
          <td>{batsmanData.runs}</td>
          <td>{batsmanData.balls}</td>
          <td>{batsmanData.boundaries}</td>
          <td>{batsmanData.sixers}</td>
          <td>{batsmanData.strikeRate}</td>
        </tr>
      );
    });
  };

  const displayResult = apidata.map((item, index) => {
    return (
      <div key={index}>
        <h2 className="innings">Innings: {item.inningsId}</h2>
        <div>
          <div className="innsTitle">
            <h2>{item.batTeamDetails.batTeamName}</h2>
            <div>
              {item.scoreDetails.runs} / {item.scoreDetails.wickets} (
              {item.scoreDetails.overs})
            </div>
          </div>
          <table className="scorecard">
            <div className="extra">Extras: {item.extrasData.total}</div>
            <thead>
              <tr className="batsmanRow">
                <th className="player">Batsman</th>
                <th></th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>Sr</th>
              </tr>
            </thead>
            <tbody>{BattingData(item.batTeamDetails)}</tbody>
          </table>
          <div className="bowling">
            <div className="innsTitle">
              <h2>{item.bowlTeamDetails.bowlTeamName}</h2>
            </div>
            <table className="scorecard">
              <thead>
                <tr>
                  <th className="player">Bowler</th>
                  <th>O</th>
                  <th>M</th>
                  <th>R</th>
                  <th>W</th>
                  <th>NB</th>
                  <th>Wd</th>
                  <th>Eco</th>
                </tr>
              </thead>

              <tbody>{BowlingData(item.bowlTeamDetails)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  });

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
