// StudyChimEng.js
import React from "react";
import day1Thumbnail from "assets/mvp_icon_v1/study_tab/02study_chim/day1_button_default.png";
import day2Thumbnail from "assets/mvp_icon_v1/study_tab/02study_chim/day2_button_default.png";
import day3Thumbnail from "assets/mvp_icon_v1/study_tab/02study_chim/day3_button_default.png";
import day4Thumbnail from "assets/mvp_icon_v1/study_tab/02study_chim/day4_button_default.png";

const StudyChimEng = ({ onScreenChange }) => {
  const handleClick = (screenId) => {
    if (typeof onScreenChange === "function") {
      onScreenChange(screenId);
    } else {
      console.warn("onScreenChange is not a function");
    }
  };

  return (
    <div className="mt-[-25px] flex-1 overflow-y-auto bg-transparent">
      <div className="flex flex-col gap-0 items-center">
        <img
          src={day1Thumbnail}
          alt="Day 1 썸네일"
          className="w-[360px] h-auto cursor-pointer"
          onClick={() => handleClick("day1")}
        />
        <img
          src={day2Thumbnail}
          alt="Day 2 썸네일"
          className="w-[360px] h-auto cursor-pointer"
          onClick={() => handleClick("day2")}
        />
        <img
          src={day3Thumbnail}
          alt="Day 3 썸네일"
          className="w-[360px] h-auto cursor-pointer"
          onClick={() => handleClick("day3")}
        />
        <img
          src={day4Thumbnail}
          alt="Day 4 썸네일"
          className="w-[360px] h-auto"
        />
      </div>
    </div>
  );
};

export default StudyChimEng;
