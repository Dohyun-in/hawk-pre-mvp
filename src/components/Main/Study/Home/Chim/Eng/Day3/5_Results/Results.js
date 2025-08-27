// Result.js
import React from "react";
import bottomBoxImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/bottom_box.png";
import checkBtnImg from "assets/mvp_icon_v1/study_tab/03study_course/05_result/check_button_default.png";
import { useDay3 } from "../Day3Context"; // Day3 컨텍스트 사용

export default function TestResult({ onBack }) {
  const { testResults, goToStep, resetDay } = useDay3(); // Day3 컨텍스트 사용
  const { pronunciationScore, speedScore, voiceResult } = testResults;

  // 디버깅을 위한 콘솔 출력
  console.log("Result 컴포넌트 렌더링:", {
    testResults,
    pronunciationScore,
    speedScore,
    voiceResult,
  });

  // 다시 시도 - 테스트 단계로 돌아가기
  const handleRetry = () => {
    goToStep(4); // 테스트 단계로 이동
  };

  // 완료 - Day3 완료 처리
  const handleComplete = () => {
    console.log("Day3 완료!");
    // 여기에 Day3 완료 후 처리 로직 추가 가능
  };

  // 원형 차트 컴포넌트
  const CircularProgress = ({ score, title, feedback }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.max(0, Math.min(100, score)); // 0-100 범위로 제한
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
            {/* 배경 원 */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="8"
            />
            {/* 진행률 원 */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#a80000"
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.5s ease-in-out",
              }}
            />
          </svg>
          {/* 중앙 점수와 피드백을 세로로 배치 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {/* 점수 */}
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#a80000",
                lineHeight: 1,
              }}
            >
              {score}
            </div>
            {/* 피드백 */}
            <div
              style={{
                fontSize: "10px",
                color: "#a80000",
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              {feedback}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 점수에 따른 피드백 생성
  const getFeedback = (score) => {
    if (score >= 100) return "완벽해요!";
    if (score >= 90) return "최고예요!";
    if (score >= 80) return "훌륭해요!";
    if (score >= 60) return "좋아요!";
    if (score >= 40) return "잘했어요!";
    return "괜찮아요!";
  };

  return (
    <div
      style={{
        position: "relative",
        top: "0px",
        width: "100%",
        overflow: "visible",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "20px auto",
          padding: "0px 16px",
          userSelect: "none",
          position: "relative",
        }}
      >
        {/* 상단 텍스트 */}
        <div
          style={{
            position: "absolute",
            top: "-70px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            zIndex: 10,
            userSelect: "none",
          }}
        >
          테스트 결과
        </div>

        {/* QuizBox와 동일한 구조 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            scale: "1.12",
          }}
        >
          {/* 흰색 모서리 둥근 사각형으로 교체 */}
          <div
            style={{
              width: "100%",
              height: "280px",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* 좌우 원형 차트 표시 - 간격을 줄여서 더 가깝게 */}
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "24px",
              right: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* 발음 정확도 차트 */}
            <CircularProgress
              score={pronunciationScore}
              title="발음 정확도"
              feedback={getFeedback(pronunciationScore)}
            />

            {/* 속도 정확도 차트 */}
            <CircularProgress
              score={speedScore}
              title="속도 정확도"
              feedback={getFeedback(speedScore)}
            />
          </div>
        </div>

        {/* 오늘 말한 어휘와 문장 정보 */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "60px",
            right: "70px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            zIndex: 3,
          }}
        >
          {/* 오늘 말한 어휘 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <span>오늘 말한 어휘</span>
            <span style={{ fontWeight: "bold" }}>+132개</span>
          </div>

          {/* 오늘 말한 문장 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <span>오늘 말한 문장</span>
            <span style={{ fontWeight: "bold" }}>+20개</span>
          </div>
        </div>
        {/* 하단 박스 */}
        <img
          src={bottomBoxImg}
          alt="Bottom Box"
          style={{
            position: "absolute",
            bottom: -240,
            left: 0,
            width: "100%",
            zIndex: 2,
            transform: "scale(1.14)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        {/* 음성 인식 결과 보기 버튼 - 하단박스 위에 위치 */}
        <div
          style={{
            position: "absolute",
            bottom: -190, // 하단박스 위에 위치하도록 조정
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column", // 세로 배치
            alignItems: "center",
            justifyContent: "center",
            gap: "12px", // 버튼 간 간격
            zIndex: 9,
          }}
        >
          {/* 음성인식 결과 보기 버튼 */}
          <button
            onClick={() => {
              if (voiceResult) {
                alert(`음성 인식 결과:\n${voiceResult}`);
              } else {
                alert("음성 인식 결과가 없습니다.");
              }
            }}
            style={{
              padding: "12px 24px",
              backgroundColor: "rgb(252, 164, 173)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#138496";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgb(252, 164, 173)";
            }}
          >
            음성인식 결과 보기
          </button>
          {/* 학습코스 종료 버튼 (checkBtnImg 사용) - 아래쪽 */}
          <button
            onClick={() => {
              console.log("학습코스 종료 - onBack 함수 호출");
              // Day1Context에서 resetDay 호출하여 상태 초기화
              resetDay();
              // onBack 함수를 호출하여 "뒤로" 버튼과 동일한 동작 수행
              if (onBack) {
                onBack();
              } else {
                console.warn("onBack 함수가 전달되지 않음");
                // fallback: 기본 뒤로가기
                window.history.back();
              }
            }}
            style={{
              padding: "0px 0px",
              backgroundColor: "transparent", // 배경 투명
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={checkBtnImg}
              alt="학습코스 종료"
              style={{
                width: "auto",
                height: "60px", // 버튼 크기에 맞게 조정
                pointerEvents: "none",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
