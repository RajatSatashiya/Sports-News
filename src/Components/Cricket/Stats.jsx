import { useEffect, useState } from "react";

function Stats() {
  const [cricketFormat, setCricketFormat] = useState("test");
  const [rank, setRank] = useState([]);

  const getStats = async () => {
    const res = await fetch(
      `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen?formatType=${cricketFormat}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2a8016e8a9msha89647f2eb26617p1fd9d6jsn8c1a21455c46",
          "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
        },
      }
    );
    const data = await res.json();
    // setRank(data.rank);
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <div className="format">
        <div onClick={() => setCricketFormat("test")}>Test</div>
        <div onClick={() => setCricketFormat("odi")}>ODI</div>
        <div onClick={() => setCricketFormat("t20")}>T20</div>
      </div>
    </>
  );
}

export default Stats;
