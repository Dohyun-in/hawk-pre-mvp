// QuizButtons.js
// 퀴즈버튼 시각적 요소
import React from "react";

export function QuizButtons({
  onShowHint,
  onVoiceToggle,
  onShowAnswer,
  isListening,
  images,
}) {
  return (
    <div
      style={{
        position: "absolute", // 절대좌표로 변경
        bottom: "-160px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "space-between",
        width: "260px",
        height: "80px",
        alignItems: "center",
        zIndex: 3, // 이미지 위에 올라오도록
      }}
    >
      <img
        src={images.hint}
        alt="힌트"
        style={{ 
          cursor: "pointer", 
          width: "auto", 
          height: "64px", 
        }}
        onClick={onShowHint}
      />
      <img
        src={isListening ? images.voiceActive : images.voice}
        alt="음성입력"
        style={{ 
            cursor: "pointer",
            height: isListening ? "120px" : "90px",  // 활성화 시 더 크게
            width: "auto",
            marginBottom: "15px",
            transition: "all 0.3s ease", // 부드럽게 크기 변화
        }}
        onClick={onVoiceToggle}
      />
      <img
        src={images.answer}
        alt="정답보기"
        style={{ 
          cursor: "pointer", 
          width: "auto", 
          height: "64px",
        }}
        onClick={onShowAnswer}
      />
    </div>
  );
}
