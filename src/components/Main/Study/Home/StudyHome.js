// StudyHome.js
import React, { useState } from "react";
import chimThumbnail from "assets/mvp_icon_v1/study_tab/01study_home/chim_button_default.png";
import chimThumbnailPressed from "assets/mvp_icon_v1/study_tab/01study_home/chim_button_pressed.png";
import emptyThumbnail from "assets/mvp_icon_v1/study_tab/01study_home/empty_button_default.png";

export default function StudyHome({ onSelect }) {
  // 이미지 상태를 관리하는 state
  const [chimImage, setChimImage] = useState(chimThumbnail);

  // 이미지 변경 함수
  const handleImageChange = () => {
    setChimImage(chimThumbnailPressed); // 눌렀을 때 이미지로 변경
  };

  // 눌렀다가 떼면 원래 이미지로 복원
  const handleMouseUp = () => {
    setChimImage(chimThumbnail); // 기본 이미지로 복원
  };

  return (
    <div className="p-4 overflow-y-scroll h-full bg-transparent">
      <div
        className="cursor-pointer mb-1"
        onMouseDown={handleImageChange} // 눌렀을 때 이미지 변경
        onMouseUp={handleMouseUp} // 뗐을 때 원래 이미지로 복원
        onClick={onSelect}
      >
        <img src={chimImage} alt="침 썸네일" className="w-full h-auto" />
      </div>

      {/* 빈 썸네일들이 담긴 flex 컨테이너 */}
      <div className="flex flex-col gap-4 items-center">
        <img
          src={emptyThumbnail}
          alt="빈 썸네일"
          className="w-[310px] h-auto"
        />
        <img
          src={emptyThumbnail}
          alt="빈 썸네일"
          className="w-[310px] h-auto"
        />
        <img
          src={emptyThumbnail}
          alt="빈 썸네일"
          className="w-[310px] h-auto"
        />
      </div>
    </div>
  );
}
