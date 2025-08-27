// App.js
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { IntroScreen } from "./components/Intro/IntroScreen";
import { MainScreen } from "./components/Main/MainScreen";
import { StudyTab } from "./components/Main/Study/StudyTab";

function App() {
  const [screen, setScreen] = useState("intro"); // intro | main | studyTab

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return <IntroScreen onClick={() => setScreen("main")} />;
      case "main":
        return <MainScreen onStudyClick={() => setScreen("studyTab")} />;
      case "studyTab":
        return <StudyTab onBack={() => setScreen("main")} />;
      default:
        return null;
    }
  };

  return (
    <Router>
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="relative w-[360px] h-[720px] bg-white rounded-[40px] shadow-lg overflow-hidden flex flex-col">
          {renderScreen()}

          {/* 항상 보이도록 z-index 높게 설정한 회색 막대 */}
          <div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gray-400 rounded-full"
            style={{ pointerEvents: "none", zIndex: 9999 }}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
