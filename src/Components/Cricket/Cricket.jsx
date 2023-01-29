import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Stylings/Cricket.css";

function Cricket() {
  const [series, setSeries] = useState([]);
  const getCricketData = async () => {
    const res = await fetch(
      "https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
          "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
        },
      }
    );
    const d = await res.json();
    setSeries(d.seriesMapProto);
  };

  // const displaySeries = series.map((item, index) => {
  //   return (
  //     <div key={index}>
  //       <h4>{item.date}</h4>
  //       {item.series.map((tour, index2) => (
  //         <div key={index2}>{tour.name}</div>
  //       ))}
  //     </div>
  //   );
  // });
  useEffect(() => {
    getCricketData();
  }, []);

  return (
    <>
      {/* {displaySeries} */}
      <div className="cricketList">
        <div>Matches</div>
        <div>Schedules</div>
        <div>Series</div>
        <div>Teams</div>
        <div>Venues</div>
        <div>Players</div>
        <div>News</div>
        <div>Photos</div>
        <div>
          <Link to="/cricket/stats">Stats</Link>
        </div>
      </div>
    </>
  );
}

export default Cricket;
