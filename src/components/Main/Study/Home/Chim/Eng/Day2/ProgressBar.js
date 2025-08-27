// ProgressBar.js
import React from "react";
import { useDay2 } from "./Day2Context";

const stepNames = ["학습", "영상", "쉐도잉", "테스트"];

export function ProgressBar({
  currentStep: propCurrentStep,
  subProgresses: propSubProgresses,
}) {
  // 컨텍스트가 있으면 우선 사용, 없으면 props 사용
  const day2 = useDay2();
  const currentStep = day2?.currentStep ?? propCurrentStep ?? 1;
  const subProgresses = day2?.subProgresses ??
    propSubProgresses ?? [0, 0, 0, 0];

  // 상단바는 4칸만 표시하도록 제한
  const displayProgresses = subProgresses.slice(0, 4);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "16px",
        width: "100%",
        maxWidth: "600px",
        margin: "30px auto 0",
      }}
    >
      {/* 단계 이름 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // 전체 중앙 정렬
          gap: "37px", // 이름들 간격 넓히기 (필요에 따라 조정)
          marginBottom: "4px", // 이름과 진행바 간격
          padding: "0 4px",
        }}
      >
        {stepNames.map((name, idx) => (
          <div
            key={idx}
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: idx === currentStep - 1 ? "#a80000" : "#999",
              paddingLeft: idx === 0 || idx === 1 ? "6px" : undefined,
              paddingRight: idx === 0 || idx === 1 ? "6px" : undefined,
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* 4토막 진행바 */}
      <div
        style={{
          display: "flex",
          gap: "6px",
        }}
      >
        {displayProgresses.map((progress, idx) => {
          // 첫 번째 바(학습)는 퀴즈 진행 상황에 따라 4분할 진행으로 수정
          let effectiveWidth;
          if (idx === 0) {
            // 학습 바: 퀴즈 진행 상황에 따라 4분할 진행
            if (currentStep >= 2) {
              // 영상 탭 이상으로 넘어가면 학습 바 전체 가득
              effectiveWidth = "100%";
            } else if (progress < 0.26) {
              // 1번퀴즈: 0%
              effectiveWidth = "0%";
            } else if (progress < 0.51) {
              // 2번퀴즈: 1/4
              effectiveWidth = "30%";
            } else if (progress < 0.76) {
              // 3번퀴즈: 2/4
              effectiveWidth = "55%";
            } else if (progress < 1.0) {
              // 4번퀴즈: 3/4
              effectiveWidth = "80%";
            } else {
              // 모든 퀴즈 완료: 100%
              effectiveWidth = "80%";
            }
          } else {
            // 나머지 바들: 이전 단계들은 100%, 현재 단계는 0%
            const isPreviousStep = idx < currentStep - 1;
            effectiveWidth = isPreviousStep ? "100%" : "0%";
          }

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                backgroundColor: "#ddd",
                height: "10px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: effectiveWidth,
                  height: "100%",
                  backgroundColor:
                    idx === currentStep - 1 ? "#a80000" : "#a80000",
                  borderRadius: "8px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
