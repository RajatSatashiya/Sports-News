import React from "react";
import { constructorLogo, countryFlag } from "./Resource/F1Resource";

function ConstructorStandings({ standings }) {
  const displayConstructorsStandings = standings.map((item, index) => {
    return (
      <tr key={index} className="tableRow">
        <td>{item.positionText}</td>
        <td>
          <div className="constructorColumn">
            <img
              src={`${
                item.Constructor.name in constructorLogo
                  ? constructorLogo[item.Constructor.name]
                  : "https://cdn-icons-png.flaticon.com/512/16/16096.png"
              }`}
              className="constructorLogo"
            />
            {item.Constructor.name}
          </div>
        </td>
        <td>{item.points}</td>
        <td>{item.wins}</td>
      </tr>
    );
  });

  return (
    <>
      <table className="constructorsTable">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Constructor</th>
            <th>Pts.</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody className="f1-tbody">{displayConstructorsStandings}</tbody>
      </table>
    </>
  );
}

export default ConstructorStandings;
