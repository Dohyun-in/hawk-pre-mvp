// StudyTab.js
import React, { useState, useEffect } from "react";
import StudyHome from "./Home/StudyHome";
import StudyChim from "./Home/Chim/StudyChim";
import Day1Learning from "./Home/Chim/Eng/Day1/Day1Learning";
import Day2Learning from "./Home/Chim/Eng/Day2/Day2Learning"; // Day2 추가
import Day3Learning from "./Home/Chim/Eng/Day3/Day3Learning"; // Day3 추가

// 임시 상세 페이지 컴포넌트 (나중에 실제 컴포넌트로 교체)
const DetailPage2 = ({ onBack }) => (
  <div>
    <button onClick={onBack}>Back</button>
    <h1>Detail Page 2</h1>
  </div>
);

export function StudyTab({ resetToHome, onPageChange }) {
  const [page, setPage] = useState("home");

  // 홈으로 초기화할 수 있는 reset 함수 등록
  useEffect(() => {
    if (resetToHome) {
      resetToHome(() => setPage("home"));
    }
  }, [resetToHome]);

  // 페이지 변경 시 부모에 알림
  useEffect(() => {
    if (onPageChange) {
      onPageChange(page);
    }
  }, [page, onPageChange]);

  // 화면 렌더링
  const renderPage = () => {
    switch (page) {
      case "home":
        return <StudyHome onSelect={() => setPage("chim")} />;
      case "chim":
        return (
          <StudyChim
            onBack={() => setPage("home")}
            onScreenChange={(screenId) => setPage(screenId)}
          />
        );
      case "day1":
        return <Day1Learning onBack={() => setPage("chim")} />;
      case "day2":
        return <Day2Learning onBack={() => setPage("chim")} />;
      case "day3": // Day3 case 추가
        return <Day3Learning onBack={() => setPage("chim")} />;
      default:
        return null;
    }
  };

  return <div className="w-full h-full overflow-y-auto">{renderPage()}</div>;
}
