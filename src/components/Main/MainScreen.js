// MainScreen.js
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import topBar from "assets/mvp_icon_v1/navigation_bar/top_bar.png";
import tabBar from "assets/mvp_icon_v1/navigation_bar/tab_bar.png";
import bellIcon from "assets/mvp_icon_v1/navigation_bar/bell_button_default.png";
import profileIcon from "assets/mvp_icon_v1/empty_page_v2/proflie_button_default_v2.png";

import studyDefault from "assets/mvp_icon_v1/navigation_bar/study_button_default.png";
import studyPressed from "assets/mvp_icon_v1/navigation_bar/study_button_pressed.png";
import fieldDefault from "assets/mvp_icon_v1/navigation_bar/field_button_default.png";
import fieldPressed from "assets/mvp_icon_v1/navigation_bar/field_button_pressed.png";
import rankingDefault from "assets/mvp_icon_v1/navigation_bar/ranking_button_default.png";
import rankingPressed from "assets/mvp_icon_v1/navigation_bar/ranking_button_pressed.png";

import { StudyTab } from "components/Main/Study/StudyTab";
import { FieldTab } from "components/Main/Field/FieldTab";
import { RankingTab } from "components/Main/Ranking/RankingTab";
import { ProgressBar as Day1ProgressBar } from "components/Main/Study/Home/Chim/Eng/Day1/ProgressBar";
import { ProgressBar as Day2ProgressBar } from "components/Main/Study/Home/Chim/Eng/Day2/ProgressBar"; // Day2 진행바 추가
import { ProgressBar as Day3ProgressBar } from "components/Main/Study/Home/Chim/Eng/Day3/ProgressBar"; // Day3 진행바 추가

// Day1Provider, Day2Provider 임포트
import { Day1Provider } from "components/Main/Study/Home/Chim/Eng/Day1/Day1Context";
import { Day2Provider } from "components/Main/Study/Home/Chim/Eng/Day2/Day2Context";
import { Day3Provider } from "components/Main/Study/Home/Chim/Eng/Day3/Day3Context"; // Day3Provider 추가

export function MainScreen() {
  const [activeTab, setActiveTab] = useState("study");
  const [fieldView, setFieldView] = useState("feed");
  const [studyPage, setStudyPage] = useState("home");

  const studyResetFunc = useRef(null);
  const handleStudyTabReset = (resetFunc) => {
    studyResetFunc.current = resetFunc;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "study":
        return (
          <StudyTab
            resetToHome={handleStudyTabReset}
            onPageChange={setStudyPage}
          />
        );
      case "field":
        return <FieldTab view={fieldView} />;
      case "ranking":
        return <RankingTab />;
      default:
        return null;
    }
  };

  // 하단바 숨김 조건 수정 - Day3 추가
  const shouldShowTabBar = !(
    activeTab === "study" &&
    (studyPage === "day1" || studyPage === "day2" || studyPage === "day3")
  );

  return (
    <Day1Provider>
      <Day2Provider>
        <Day3Provider>
          {" "}
          {/* Day3Provider 추가 */}
          <motion.div className="w-full h-full max-w-full flex flex-col overflow-hidden">
            {/* 상단바 */}
            {activeTab === "study" && (
              <div className="relative w-full">
                {/* 진행바 - topBar 위에 오버레이 */}
                {studyPage === "day1" && (
                  <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-2">
                    <Day1ProgressBar currentStep={1} />
                  </div>
                )}
                {studyPage === "day2" && (
                  <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-2">
                    <Day2ProgressBar currentStep={1} />
                  </div>
                )}
                {studyPage === "day3" && ( // Day3 진행바 추가
                  <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-2">
                    <Day3ProgressBar currentStep={1} />
                  </div>
                )}

                {/* 항상 topBar 이미지 렌더링 */}
                <img
                  src={topBar}
                  alt="Top Bar"
                  className="w-full h-auto object-contain"
                />

                {/* bell/profile은 학습코스 페이지가 아닐 때만 표시 - Day3 추가 */}
                {!["day1", "day2", "day3"].includes(studyPage) && (
                  <>
                    <img
                      src={bellIcon}
                      alt="Bell"
                      className="absolute bottom-5 right-16 w-6 h-6"
                    />
                    <img
                      src={profileIcon}
                      alt="Profile"
                      onClick={() => {
                        setFieldView("profile");
                        setActiveTab("field");
                      }}
                      className="absolute bottom-3 right-3.5 w-10 h-10 rounded-full cursor-pointer"
                    />
                  </>
                )}
              </div>
            )}

            {/* 콘텐츠 */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0 }}
                  className="absolute inset-0"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 하단바 - day1, day2 페이지에서는 숨기기 */}
            {shouldShowTabBar && (
              <div className="relative w-full scale-[1.1]">
                <img
                  src={tabBar}
                  alt="Tab Bar"
                  className="w-full h-auto object-contain"
                />
                <img
                  src={activeTab === "study" ? studyPressed : studyDefault}
                  alt="스터디"
                  onClick={() => {
                    if (activeTab === "study") {
                      if (studyResetFunc.current) studyResetFunc.current();
                    } else {
                      setActiveTab("study");
                    }
                  }}
                  className="absolute bottom-[24px] left-[20%] h-[37px] w-auto cursor-pointer"
                />
                <img
                  src={activeTab === "field" ? fieldPressed : fieldDefault}
                  alt="field"
                  onClick={() => {
                    setFieldView("feed");
                    setActiveTab("field");
                  }}
                  className="absolute bottom-[24px] left-1/2 transform -translate-x-1/2 h-[40px] w-auto cursor-pointer"
                />
                <img
                  src={
                    activeTab === "ranking" ? rankingPressed : rankingDefault
                  }
                  alt="ranking"
                  onClick={() => setActiveTab("ranking")}
                  className="absolute bottom-[24px] right-[20%] h-[40px] w-auto cursor-pointer"
                />
              </div>
            )}
          </motion.div>
        </Day3Provider>
      </Day2Provider>
    </Day1Provider>
  );
}
