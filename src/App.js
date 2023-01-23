import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import FootballLeague from "./Components/FootballLeague";
import Standings from "./Components/Standings";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/league/:id" element={<FootballLeague />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
