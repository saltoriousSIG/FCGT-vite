import { sdk } from "@farcaster/frame-sdk";
import { Routes, Route } from "react-router-dom";
import { useEffect, } from "react";
import SplashPage from "./components/app/pages/SplashPage";
import AboutPage from "./components/app/pages/AboutPage";
import SubmitEntry from "./components/app/pages/SubmitEntry";
import WatchNVote from "./components/app/pages/WatchNVote";

function App() {

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-950">

      <Routes>
        <Route path="/" element={<SplashPage onNavigate={() => { }} />} />
        <Route path="/about" element={<AboutPage onBack={() => { }} />} />
        <Route path="/submit" element={
          <SubmitEntry />
        } />
        <Route path="/watch" element={<WatchNVote />} />
      </Routes>
    </div>
  );
}

export default App;
