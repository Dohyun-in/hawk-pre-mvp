// Day2Layout.js
// 배경이미지(그라데이션) / 콘텐츠영역
import React from "react";
import backgroundImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/background.png";

export default function Day2Layout({
  children,
  bottomButtons,
  showBackground = true,
  contentPadding = "0px 16px 0px",
  backgroundHeight = "80%",
}) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "600px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {showBackground && (
        <img
          src={backgroundImg}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: backgroundHeight,
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          padding: contentPadding,
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {bottomButtons && (
        <div
          style={{
            position: "absolute",
            bottom: -4,
            left: 0,
            right: 0,
            padding: "4px 4px",
            zIndex: 3,
            background: "linear-gradient(transparent, rgba(255,255,255,0.9))",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "center",
          }}
        >
          {bottomButtons}
        </div>
      )}
    </div>
  );
}
