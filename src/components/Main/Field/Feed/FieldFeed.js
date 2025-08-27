// FieldFeed.js
import React from "react";
import feedImg from "assets/mvp_icon_v1/empty_page_v2/필드탭 클릭시(하단탭_필드).png";
import emptyPage from "assets/mvp_icon_v1/empty_page_v2/popup.png";
import subscribeButton from "assets/mvp_icon_v1/empty_page_v2/popup_button.png";

export function FieldFeed() {
  return (
    <div className="relative w-full h-full">
      {/* 기존 필드 이미지 */}
      <div className="w-full h-full scale-[1.24] origin-top">
        <img
          src={feedImg}
          alt="Feed"
          className="w-full h-full object-contain"
        />
      </div>

      {/* 팝업 오버레이 */}
      <div className="absolute top-[72%] left-1/2 transform -translate-x-1/2 -translate-y-[10%] w-[90%]">
        <div className="relative">
          {/* 검은색 반투명 배경 */}
          <div className="absolute inset-0 bg-black opacity-40 rounded-xl z-0"></div>

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
