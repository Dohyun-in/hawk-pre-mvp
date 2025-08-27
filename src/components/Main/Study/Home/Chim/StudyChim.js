// StudyChim.js
import React, { useState } from "react";
import backIcon from "assets/mvp_icon_v1/study_tab/02study_chim/back_button.png";

import engDefault from "assets/mvp_icon_v1/study_tab/02study_chim/eng_button_default.png";
import engActive from "assets/mvp_icon_v1/study_tab/02study_chim/eng_button_pressed.png";
import jpnDefault from "assets/mvp_icon_v1/study_tab/02study_chim/jpn_button_default.png";
import jpnActive from "assets/mvp_icon_v1/study_tab/02study_chim/jpn_button_pressed.png";
import chnDefault from "assets/mvp_icon_v1/study_tab/02study_chim/chn_button_default.png";
import chnActive from "assets/mvp_icon_v1/study_tab/02study_chim/chn_button_pressed.png";

import StudyChimEng from "./Eng/StudyChimEng";
import StudyChimJpn from "./Jpn/StudyChimJpn";
import StudyChimChn from "./Chn/StudyChimChn";

function StudyChim({ onBack, onScreenChange }) {
  const [selectedLang, setSelectedLang] = useState("eng");

  const handleScreenChange = (screenId) => {
    // Day1, Day2 등 학습코스 선택 시 상위 컴포넌트로 전달
    if (typeof onScreenChange === "function") {
      onScreenChange(screenId);
    }
  };

  const renderLangComponent = () => {
    // 언어별 기본 컴포넌트 렌더링
    switch (selectedLang) {
      case "eng":
        return <StudyChimEng onScreenChange={handleScreenChange} />;
      case "jpn":
        return <StudyChimJpn onScreenChange={handleScreenChange} />;
      case "chn":
        return <StudyChimChn onScreenChange={handleScreenChange} />;
      default:
        return null;
    }
  };

  const langButtons = [
    {
      id: "eng",
      defaultImg: engDefault,
      activeImg: engActive,
      alt: "영어",
      marginRight: "mr-4",
    },
    {
      id: "jpn",
      defaultImg: jpnDefault,
      activeImg: jpnActive,
      alt: "일본어",
    },
    {
      id: "chn",
      defaultImg: chnDefault,
      activeImg: chnActive,
      alt: "중국어",
      marginLeft: "ml-4",
    },
  ];

  return (
    <div
      className={`flex flex-col w-full relative ${
        selectedLang === "jpn" || selectedLang === "chn" ? "min-h-[360px]" : ""
      }`}
    >
      {/* 뒤로가기 버튼 */}
      <div className="absolute top-6 left-6 z-10">
        <img
          src={backIcon}
          alt="뒤로가기"
          onClick={onBack}
          className="w-4 h-4 cursor-pointer"
        />
      </div>

      {/* 언어 선택 버튼들 */}
      <div className="absolute top-6 left-1/2 z-10 flex items-center -translate-x-1/2">
        {langButtons.map(
          ({ id, defaultImg, activeImg, alt, marginLeft, marginRight }) => (
            <img
              key={id}
              src={selectedLang === id ? activeImg : defaultImg}
              alt={alt}
              onClick={() => setSelectedLang(id)}
              className={`w-8 h-auto cursor-pointer ${marginLeft ?? ""} ${
                marginRight ?? ""
              }`}
            />
          )
        )}
      </div>

      {/* 언어별 콘텐츠 */}
      <div className="pt-20 px-4 flex-1 overflow-auto">
        {renderLangComponent()}
      </div>
    </div>
  );
}

export default StudyChim;
