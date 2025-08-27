// Day1Context.js
import React, { createContext, useState, useContext, useCallback } from "react";

const Day1Context = createContext();

export const useDay1 = () => useContext(Day1Context);

export const Day1Provider = ({ children }) => {
  const [maxStep, setMaxStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);

  // ✅ 각 단계의 서브 진행률을 담는 배열 (0~1 값) - 5단계로 확장
  const [subProgresses, setSubProgresses] = useState([0, 0, 0, 0, 0]);

  // 테스트 결과 점수들
  const [testResults, setTestResults] = useState({
    pronunciationScore: 0,
    speedScore: 0,
    voiceResult: "",
  });

  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= 5) {
      // 1~5 사이만 허용
      setCurrentStep(step);
    }
  }, []);

  const completeStep = useCallback(
    (step) => {
      if (step === maxStep && maxStep < 5) {
        setMaxStep(maxStep + 1);
      }
      setCurrentStep(step + 1 <= 5 ? step + 1 : step);
    },
    [maxStep]
  );

  // ✅ 진행률 업데이트 함수 - useCallback으로 메모이제이션
  const updateSubProgress = useCallback((stepIndex, progress) => {
    console.log(
      `updateSubProgress 호출: stepIndex=${stepIndex}, progress=${progress}`
    );
    setSubProgresses((prev) => {
      const updated = [...prev];
      updated[stepIndex] = progress;
      console.log(`subProgresses 업데이트:`, updated);
      return updated;
    });
  }, []);

  // ✅ 전체 진행 상태 초기화 함수
  const resetDay = useCallback(() => {
    setMaxStep(1);
    setCurrentStep(1);
    setSubProgresses([0, 0, 0, 0, 0]);
    setTestResults({
      pronunciationScore: 0,
      speedScore: 0,
      voiceResult: "",
    });
  }, []);

  // 테스트 결과 업데이트 함수
  const updateTestResults = useCallback((results) => {
    console.log("Day1Context updateTestResults 호출:", results);
    setTestResults(results);
  }, []);

  return (
    <Day1Context.Provider
      value={{
        maxStep,
        currentStep,
        goToStep,
        completeStep,
        subProgresses,
        updateSubProgress,
        resetDay,
        testResults,
        updateTestResults,
      }}
    >
      {children}
    </Day1Context.Provider>
  );
};

export default Day1Context;
