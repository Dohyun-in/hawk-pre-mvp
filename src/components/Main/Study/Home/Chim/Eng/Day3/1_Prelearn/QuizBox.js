// QuizBox.js
import React from "react";
import quizBoxImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/Quize_box.png";

// 색상
const CORRECT_COLOR = "#c8f7c5";
const WRONG_COLOR = "#ffe0e0";
const INPUT_BG = "#ffe0e0";

export function QuizBox({
  korean,
  english,
  userAnswers,
  onAnswerChange,
  feedback,
  page,
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        scale: "1.12",
      }}
    >
      {/* 퀴즈 박스 이미지 */}
      <img
        src={quizBoxImg}
        alt="퀴즈박스"
        style={{ width: "100%", display: "block" }}
      />

      {/* 한글 번역 */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "20px",
          right: "20px",
          height: "80px",
          overflow: "hidden",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#222",
          lineHeight: 1.4,
          pointerEvents: "none",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: korean }}
          style={{ width: "100%" }}
        />
      </div>

      {/* 영어 문장 */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "20px",
          right: "20px",
          height: "72px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#222",
          lineHeight: "24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          overflowY: "visible",
        }}
      >
        {english.split(/(\([^)]+\))/g).flatMap((part, i) => {
          if (part.startsWith("(") && part.endsWith(")")) {
            const words = part.slice(1, -1).split(" ");
            return words.map((word, j) => {
              const index = `${page}-${j}`;
              const value = userAnswers[index] || "";
              const isCorrect = feedback?.[index] === "correct";
              const isWrong = feedback?.[index] === "wrong";
              return (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => onAnswerChange(index, e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                  style={{
                    width: `${word.length + 1}ch`,
                    fontSize: "20px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "6px",
                    height: "28px",
                    lineHeight: "28px",
                    padding: "0 6px",
                    margin: "0 4px 4px 0",
                    verticalAlign: "middle",
                    marginTop: "-2px",
                    backgroundColor: isCorrect
                      ? CORRECT_COLOR
                      : isWrong
                      ? WRONG_COLOR
                      : INPUT_BG,
                    outline: "none",
                    textTransform: "lowercase",
                  }}
                />
              );
            });
          }

          // 괄호가 없는 일반 텍스트 처리
          return part.split(" ").map((word, j) => (
            <span
              key={`${i}-n-${j}`}
              style={{ marginRight: "6px", marginBottom: "4px" }}
            >
              {word}
            </span>
          ));
        })}
      </div>
    </div>
  );
}
