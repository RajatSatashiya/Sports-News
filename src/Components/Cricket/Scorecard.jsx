import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Stylings/Scorecard.css";

function Template() {
  const [apidata, setApidata] = useState([]);
  const [matchStatus, setMatchStatus] = useState("");
  const [matchInfo, setMatchInfo] = useState({});
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
              "b9711df563mshd084d4e7ca54a8dp14bf17jsna56d05d1aadd",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMatchInfo(data.matchHeader);
      setMatchStatus(data.status);
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
    let batsmen = [
      "bat_1",
      "bat_2",
      "bat_3",
      "bat_4",
      "bat_5",
      "bat_6",
      "bat_7",
      "bat_8",
      "bat_9",
      "bat_10",
      "bat_11",
    ];

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
            <div className="extra">Extras: {item.extrasData.total}</div>
          </div>
          <div className="checking">
            <table className="scorecard">
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
          </div>
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

        <div className="matchDetails">
          <h2>Match Details</h2>
          <div>
            <h4 className="matchDetailsTitle">Toss</h4>
            <div className="">{matchInfo.status}</div>
          </div>
          <div>
            <h4 className="matchDetailsTitle">Man of the Match</h4>
            <div className="">
              {matchInfo.playersOfTheMatch &&
                matchInfo.playersOfTheMatch[0].fullName}
            </div>
          </div>
          <div>
            <h4 className="matchDetailsTitle">Man of the Series</h4>
            <div className="">
              {matchInfo.playersOfTheSeries &&
                matchInfo.playersOfTheSeries[0] &&
                matchInfo.playersOfTheSeries[0].fullName}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Template;
