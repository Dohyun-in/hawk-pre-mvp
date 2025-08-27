import React from "react";
import playImg from "assets/mvp_icon_v1/study_tab/03study_course/02_watch/play_button_default.png";
import pauseImg from "assets/mvp_icon_v1/study_tab/03study_course/02_watch/play_button_active.png";
import enSubOn from "assets/mvp_icon_v1/study_tab/03study_course/02_watch/eng_button_active.png";
import enSubOff from "assets/mvp_icon_v1/study_tab/03study_course/02_watch/eng_button_default.png";
import koSubOn from "assets/mvp_icon_v1/study_tab/03study_course/02_watch/kr_button_active.png";
import koSubOff from "assets/mvp_icon_v1/study_tab/03study_course/02_watch/kr_button_default.png";

// Video.js의 버튼 영역을 분리한 컴포넌트
export function VideoButtons({
  isPlaying,
  onTogglePlay,
  showEnglish,
  showKorean,
  onToggleEnglish,
  onToggleKorean,
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: -80,
        left: 0,
        width: "100%",
        zIndex: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      {/* 중앙 재생/일시정지 버튼 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src={isPlaying ? pauseImg : playImg}
          onClick={onTogglePlay}
          alt="PlayPause"
          style={{ cursor: "pointer", height: 70 }}
        />
      </div>
      {/* 영어/한글 토글 버튼 */}
      <div
        style={{
          display: "flex",
          gap: 7,
          marginLeft: "200px",
          marginTop: "25px",
        }}
      >
        <img
          src={showEnglish ? enSubOn : enSubOff}
          onClick={onToggleEnglish}
          alt="Toggle EN"
          style={{ cursor: "pointer", height: 70 }}
        />
        <img
          src={showKorean ? koSubOn : koSubOff}
          onClick={onToggleKorean}
          alt="Toggle KO"
          style={{ cursor: "pointer", height: 70 }}
        />
      </div>
    </div>
  );
}
