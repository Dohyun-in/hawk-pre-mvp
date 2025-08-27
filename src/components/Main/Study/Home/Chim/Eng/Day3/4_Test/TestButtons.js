import React from "react";

export default function TestButtons({
  testStarted,
  testCompleted,
  currentTime,
  duration,
  onStartTest,
}) {
  return (
    <>
      {/* 재생바 (읽기 전용) */}
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={currentTime}
        className="test-slider"
        style={{
          width: "90%",
          position: "absolute",
          bottom: 15,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* 테스트 시작 버튼 */}
      {!testStarted && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
            cursor: "pointer",
          }}
          onClick={onStartTest}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "rgba(168, 0, 0, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.backgroundColor = "rgba(168, 0, 0, 1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "rgba(168, 0, 0, 0.9)";
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "15px solid transparent",
                borderBottom: "15px solid transparent",
                borderLeft: "25px solid white",
                marginLeft: "5px",
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            테스트 시작
          </div>
        </div>
      )}

      {/* 테스트 진행 상태 표시 */}
      {testStarted && !testCompleted && (
        <div
          style={{
            position: "absolute",
            bottom: -84,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            background: "rgb(252, 228, 234)",
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            textAlign: "center",
            minWidth: "280px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#333",
            }}
          >
            테스트 진행 중...
          </div>

          <div
            style={{
              marginTop: "5px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            영상이 끝날 때까지 발화해주세요
          </div>
        </div>
      )}

      {/* 테스트 완료 안내 */}
      {testCompleted && (
        <div
          style={{
            position: "absolute",
            bottom: -84,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            background: "rgb(252, 228, 234)",
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            textAlign: "center",
            minWidth: "280px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#a80000",
            }}
          >
            테스트 완료!
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            결과를 분석하고 있습니다...
          </div>
        </div>
      )}
    </>
  );
}
