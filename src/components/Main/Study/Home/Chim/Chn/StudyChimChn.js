// StudyChimChn.js
import React from "react";
import emptyPage from "assets/mvp_icon_v1/empty_page_v2/popup.png";
import subscribeButton from "assets/mvp_icon_v1/empty_page_v2/popup_button.png";

function StudyChimChn({ onScreenChange }) {
  return (
    <div className="relative">
      {/* 중국어 콘텐츠들 */}
      {/* 팝업 오버레이 */}
      <div className="absolute top-[72%] left-1/2 transform -translate-x-1/2 -translate-y-[10%] w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-black opacity-20 rounded-xl z-0"></div>
          <img
            src={emptyPage}
            alt="팝업"
            className="relative z-10 w-full h-auto object-contain"
          />
          <img
            src={subscribeButton}
            alt="피드백 댓글 달기"
            className="absolute bottom-[25px] left-1/2 transform -translate-x-1/2 w-[200px] z-20"
          />
        </div>
      </div>
    </div>
  );
}

export default StudyChimChn;
