import React from "react";
import backBtnImg from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/back_button_default.png";
import retryBtnImg from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/retryanswer_button_default.png";
import speedBoxImg from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/Speed_box.png";
import speed05Active from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/0.5x_onclick.png";
import speed05Default from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/0.5x.png";
import speed075Active from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/0.75x__onclick.png";
import speed075Default from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/0.75x.png";
import speed1Active from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/1x_onclick.png";
import speed1Default from "assets/mvp_icon_v1/study_tab/03study_course/03_shadowing/1x.png";
import voiceImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/voice_button_default.png";
import voiceActiveImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/voice_button_active.png";
import "./Shadowing.css";

// 버튼 그룹과 배속박스를 완전히 분리하여 위치 의존성 해제
export function ShadowingButtons({
  isRecording,
  onVoiceInput,
  onPrevSentence,
  onRetrySentence,
  playbackRate,
  onSpeedChange,
  voiceResult,
  similarity,
}) {
  return (
    <>
      {/* 버튼 그룹: 항상 가운데 고정, 배속박스와 독립 */}
      <div
        style={{
          position: "absolute",
          bottom: "-66px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "260px",
          height: "80px",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 이전문장 버튼 - 왼쪽 */}
        <img
          src={backBtnImg}
          alt="이전문장"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "auto",
            height: "64px",
            cursor: "pointer",
          }}
          onClick={onPrevSentence}
        />
        {/* 음성입력 버튼 - 가운데 */}
        <img
          src={isRecording ? voiceActiveImg : voiceImg}
          alt="음성입력"
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
            height: isRecording ? "120px" : "90px",
            width: "auto",
            marginBottom: "15px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onClick={onVoiceInput}
        />
        {/* 다시시도 버튼 - 오른쪽 */}
        <img
          src={retryBtnImg}
          alt="처음으로"
          style={{
            position: "absolute",
            right: "-16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "auto",
            height: "64px",
            cursor: "pointer",
          }}
          onClick={onRetrySentence}
        />
      </div>
      {/* 배속 박스: 별도 위치, 버튼 그룹과 독립 */}
      <div
        className="shadowing-speed-box"
        style={{
          zIndex: 3,
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "96px", // 필요에 따라 조정
          width: "168px",
          height: "30px",
          display: "block",
        }}
      >
        <img
          src={speedBoxImg}
          alt="배속박스"
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        />
        <div
          className="shadowing-speed-btns"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 4,
          }}
        >
          <img
            src={playbackRate === 1 ? speed1Active : speed1Default}
            alt="1x"
            style={{
              cursor: "pointer",
              width: "auto",
              height: "20px",
              marginLeft: "6px",
              zIndex: 5,
              position: "relative",
              pointerEvents: "auto",
            }}
            onClick={() => onSpeedChange(1)}
          />
          <img
            src={playbackRate === 0.75 ? speed075Active : speed075Default}
            alt="0.75x"
            style={{
              cursor: "pointer",
              width: "auto",
              height: "20px",
              marginLeft: "2px",
              zIndex: 5,
              position: "relative",
              pointerEvents: "auto",
            }}
            onClick={() => onSpeedChange(0.75)}
          />
          <img
            src={playbackRate === 0.5 ? speed05Active : speed05Default}
            alt="0.5x"
            style={{
              cursor: "pointer",
              width: "auto",
              height: "20px",
              marginLeft: "2px",
              marginRight: "6px",
              zIndex: 5,
              position: "relative",
              pointerEvents: "auto",
            }}
            onClick={() => onSpeedChange(0.5)}
          />
        </div>
      </div>
      {/* 음성 입력 결과 및 유사도 */}
      <div
        className="shadowing-result"
        style={{ color: similarity >= 0.8 ? "#a80000" : "#333" }}
      >
        {voiceResult && (
          <>
            <div>음성 인식 결과: {voiceResult}</div>
            <div>정확도: {(similarity * 100).toFixed(0)}%</div>
            {similarity >= 0.8 ? (
              <div>통과!</div>
            ) : (
              <div>다시 시도해보세요.</div>
            )}
          </>
        )}
      </div>
    </>
  );
}
