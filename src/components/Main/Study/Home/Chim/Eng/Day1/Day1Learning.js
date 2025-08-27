// Day1Learning.js
// 학습 단계 스텝 이동 조율(뒤로가기, 이전, 다음 버튼)
import React, { useEffect } from "react";
import Day1Layout from "./Day1Layout";

import { Prelearn } from "./1_Prelearn/Prelearn";
import Video from "./2_Video/Video";
import Shadowing from "./3_Shadowing/Shadowing";
import Test from "./4_Test/Test";
import Result from "./5_Results/Results";

import { useDay1 } from "./Day1Context";

const stepsComponents = [Prelearn, Video, Shadowing, Test, Result];

function Day1LearningContent({ onBack }) {
  const { currentStep, goToStep, updateSubProgress, subProgresses, resetDay } =
    useDay1();

  const totalSteps = stepsComponents.length;
  const StepComponent = stepsComponents[currentStep - 1]; // currentStep is 1-based
  // 화면 진입 시 진행 상태 초기화 (studychim에서 돌아왔을 때 포함)
  useEffect(() => {
    resetDay();
    // 초기 진입 직후 첫 단계 진행률 0으로 보장
    updateSubProgress(0, 0);
  }, [resetDay, updateSubProgress]);

  // 단계 변경 시 해당 단계의 진행률 업데이트
  useEffect(() => {
    console.log(`Day1Learning useEffect 실행: currentStep=${currentStep}`);

    // 2단계 이상으로 이동할 때만 진행률 업데이트
    if (currentStep >= 2) {
      // 2단계 이상은 완료된 것으로 설정
      for (let i = 1; i < currentStep; i++) {
        updateSubProgress(i, 1); // 완료 상태
      }
    }

    console.log(`단계 변경: currentStep=${currentStep}`);
  }, [currentStep, updateSubProgress]);

  // subProgresses 상태 변화 모니터링
  useEffect(() => {
    console.log(`subProgresses 상태 변화:`, subProgresses);
  }, [subProgresses]);

  const handleNext = () => {
    console.log(
      `다음 버튼 클릭: currentStep=${currentStep} -> ${currentStep + 1}`
    );
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    console.log(
      `이전 버튼 클릭: currentStep=${currentStep} -> ${currentStep - 1}`
    );
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // 1단계와 5단계(Results)에서 배경 이미지 보이도록 설정
  const showBackground = currentStep === 1 || currentStep === 5;

  // 필요하면 단계별로 contentPadding 조절 가능 (예시)
  const contentPadding = showBackground ? "80px 16px 150px" : "0 16px 80px";

  return (
    <Day1Layout
      currentStep={currentStep}
      showBackground={showBackground}
      contentPadding={contentPadding}
      bottomButtons={
        <div className="flex gap-20 justify-center">
          <button onClick={onBack} aria-label="뒤로가기">
            뒤로
          </button>
          {currentStep > 1 && (
            <button onClick={handlePrev} aria-label="이전 단계">
              이전
            </button>
          )}
          {currentStep < totalSteps && (
            <button onClick={handleNext} aria-label="다음 단계">
              다음
            </button>
          )}
        </div>
      }
    >
      {StepComponent ? (
        <StepComponent onBack={onBack} />
      ) : (
        <div>학습 단계를 불러올 수 없습니다.</div>
      )}
    </Day1Layout>
  );
}

export default function Day1Learning({ onBack }) {
  return <Day1LearningContent onBack={onBack} />;
}
