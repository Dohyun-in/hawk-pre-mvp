import React from "react";

// 나눔고딕 폰트 적용
const EN_FONT =
  "'NanumGothic', 'Pretendard', 'Noto Sans KR', Arial, sans-serif";

// 24방향, 최대 2px, 소수점 포함
const solidWhite24 = [
  "2px 0 0 white",
  "-2px 0 0 white",
  "0 2px 0 white",
  "0 -2px 0 white",
  "1.4px 1.4px 0 white",
  "-1.4px 1.4px 0 white",
  "1.4px -1.4px 0 white",
  "-1.4px -1.4px 0 white",
  "1px 1.7px 0 white",
  "-1px 1.7px 0 white",
  "1px -1.7px 0 white",
  "-1px -1.7px 0 white",
  "1.7px 1px 0 white",
  "-1.7px 1px 0 white",
  "1.7px -1px 0 white",
  "-1.7px -1px 0 white",
  "0.5px 1.9px 0 white",
  "-0.5px 1.9px 0 white",
  "0.5px -1.9px 0 white",
  "-0.5px -1.9px 0 white",
  "1.9px 0.5px 0 white",
  "-1.9px 0.5px 0 white",
  "1.9px -0.5px 0 white",
  "-1.9px -0.5px 0 white",
].join(", ");

const solidBlue24 = [
  "2px 0 0 rgb(68,0,255)",
  "-2px 0 0 rgb(68,0,255)",
  "0 2px 0 rgb(68,0,255)",
  "0 -2px 0 rgb(68,0,255)",
  "1.4px 1.4px 0 rgb(68,0,255)",
  "-1.4px 1.4px 0 rgb(68,0,255)",
  "1.4px -1.4px 0 rgb(68,0,255)",
  "-1.4px -1.4px 0 rgb(68,0,255)",
  "1px 1.7px 0 rgb(68,0,255)",
  "-1px 1.7px 0 rgb(68,0,255)",
  "1px -1.7px 0 rgb(68,0,255)",
  "-1px -1.7px 0 rgb(68,0,255)",
  "1.7px 1px 0 rgb(68,0,255)",
  "-1.7px 1px 0 rgb(68,0,255)",
  "1.7px -1px 0 rgb(68,0,255)",
  "-1.7px -1px 0 rgb(68,0,255)",
  "0.5px 1.9px 0 rgb(68,0,255)",
  "-0.5px 1.9px 0 rgb(68,0,255)",
  "0.5px -1.9px 0 rgb(68,0,255)",
  "-0.5px -1.9px 0 rgb(68,0,255)",
  "1.9px 0.5px 0 rgb(68,0,255)",
  "-1.9px 0.5px 0 rgb(68,0,255)",
  "1.9px -0.5px 0 rgb(68,0,255)",
  "-1.9px -0.5px 0 rgb(68,0,255)",
].join(", ");

const subtitleStyles = {
  en: (isHighlighted) => ({
    position: "absolute",
    bottom: "60px",
    width: "100%",
    fontSize: "24px",
    fontWeight: "700",
    fontFamily: EN_FONT,
    color: isHighlighted ? "rgb(68, 0, 255)" : "#a5b4fc",
    textShadow: isHighlighted ? solidWhite24 : solidBlue24,
    textAlign: "center",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "pre-wrap",
    zIndex: 2,
    lineHeight: "1.4",
    letterSpacing: "-0.5px",
    padding: "0 0px",
  }),
};

export function TestSubtitles({ subtitles, currentTime, showEnglish }) {
  // 현재 시간에 해당하는 문장 찾기
  const getCurrentSentence = () => {
    if (!subtitles.enSentences) return null;
    return subtitles.enSentences.find(
      (s) => currentTime >= s.start && currentTime <= s.end
    );
  };

  // 영어 자막 문장+누적 하이라이트 렌더링 함수
  const renderSentence = (sentences, words, currentTime) => {
    if (!sentences || !words) return null;
    const currentSentence = getCurrentSentence();
    if (!currentSentence) return null;

    const sentenceWords = words.filter(
      (w) => w.start >= currentSentence.start && w.start <= currentSentence.end
    );

    return (
      <div style={subtitleStyles.en(false)}>
        {sentenceWords.map((w, idx) => (
          <span
            key={idx}
            style={
              currentTime >= w.start
                ? {
                    color: "rgb(68, 0, 255)",
                    textShadow: solidWhite24,
                  }
                : {
                    color: "#a5b4fc",
                    textShadow: solidBlue24,
                  }
            }
          >
            {w.word + " "}
          </span>
        ))}
      </div>
    );
  };

  const renderSubtitle = () => {
    if (!subtitles.enSentences || !subtitles.en) return null;
    return renderSentence(subtitles.enSentences, subtitles.en, currentTime);
  };

  return <>{showEnglish && renderSubtitle()}</>;
}
