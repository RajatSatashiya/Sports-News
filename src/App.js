import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import FootballLeague from "./Components/Football/FootballLeague";
import Standings from "./Components/Football/Standings";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import Cricket from "./Components/Cricket/Cricket";
import Series from "./Components/Cricket/Series";
// import Stats from "./Components/Cricket/Stats";
import F1 from "./Components/F1/F1";
import Race from "./Components/F1/Race";
import Competitions from "./Components/Football/Competitions";
import Scorecard from "./Components/Cricket/Scorecard";
import PointsTable from "./Components/Cricket/PointsTable";
import Schedule from "./Components/Cricket/Schedule";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Home page */}
        <Route path="/" exact element={<Home />} />

        {/* Cricket */}
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/cricket/match/:matchId" element={<Scorecard />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<Schedule />} />
        <Route path="/pointstable/:id" element={<PointsTable />} />

        {/* F1 */}
        <Route path="/f1" element={<F1 />} />
        <Route path="/f1/:year/:round" element={<Race />} />

        {/* Football */}
        <Route path="/football" element={<Competitions />} />
        <Route path="/league/:id" element={<FootballLeague />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
