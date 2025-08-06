import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Lk } from "./components/lk";
import {App1} from "./components/Games";
import { SlotMachine } from "./components/SlotMachine";
import { SlotMachine3 } from "./components/Slots3x3";
import { Mine } from "./components/Mine";
import { Mine5 } from "./components/Mine5x5";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Lk />} />
        <Route path="/form" element={<Hero />} />
        <Route path="/forecasts" element={<Projects />} />
        <Route path="/games" element={<App1 />} />
        <Route path="/lk" element={<Lk />} />
        <Route path="/SlotMachine" element={<SlotMachine />} />
        <Route path="/SlotMachine3" element={<SlotMachine3 />} />
        <Route path="/Mine" element={<Mine />} />
        <Route path="/Mine5" element={<Mine5 />} />
      </Routes>
    </div>
  );
}