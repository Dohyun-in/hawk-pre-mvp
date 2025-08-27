// subtitles.js

// 1. 단어별 배열 (요청한 타임 인덱스 기준)
const englishWords = [
  // 1. "So the story is,"
  { word: "So", start: 0.01 },
  { word: "the", start: 0.2 },
  { word: "story", start: 0.4 },
  { word: "is,", start: 0.65 },
  // 2. "whether or not there's a story behind the uniform."
  { word: "whether", start: 1.6 },
  { word: "or", start: 1.86 },
  { word: "not", start: 2.0 },
  { word: "there's", start: 2.14 },
  { word: "a", start: 2.38 },
  { word: "story", start: 2.48 },
  { word: "behind", start: 2.78 },
  { word: "the", start: 3.06 },
  { word: "uniform.", start: 3.2 },
  // 3. "Or,"
  { word: "Or,", start: 4.6 },
  // 4. "if you were a class president and did a lot for the school"
  { word: "if", start: 5.75 },
  { word: "you", start: 5.95 },
  { word: "were", start: 6.15 },
  { word: "a", start: 6.35 },
  { word: "class", start: 6.47 },
  { word: "president", start: 6.75 },
  { word: "and", start: 7.15 },
  { word: "did", start: 7.35 },
  { word: "a", start: 7.55 },
  { word: "lot", start: 7.67 },
  { word: "for", start: 7.81 },
  { word: "the", start: 8.01 },
  { word: "school", start: 8.1 },
  // 5. "throughout the entire academic year, consistently,"
  { word: "throughout", start: 8.41 },
  { word: "the", start: 8.75 },
  { word: "entire", start: 8.91 },
  { word: "academic", start: 9.23 },
  { word: "year,", start: 9.67 },
  { word: "consistently,", start: 9.95 },
  // 6. "as a result of your hard work and dedication,"
  { word: "as", start: 11.1 },
  { word: "a", start: 11.3 },
  { word: "result", start: 11.42 },
  { word: "of", start: 11.9 },
  { word: "your", start: 12.02 },
  { word: "hard", start: 12.22 },
  { word: "work", start: 12.46 },
  { word: "and", start: 12.7 },
  { word: "dedication,", start: 12.9 },
  // 7. "then it might be hard to throw it away."
  { word: "then", start: 14.6 },
  { word: "it", start: 14.84 },
  { word: "might", start: 15.02 },
  { word: "be", start: 15.26 },
  { word: "hard", start: 15.46 },
  { word: "to", start: 15.7 },
  { word: "throw", start: 15.86 },
  { word: "it", start: 16.1 },
  { word: "away.", start: 16.26 },
  // 8. "Or if you spent a lot of time hanging out with friends,"
  { word: "Or", start: 17.5 },
  { word: "if", start: 17.74 },
  { word: "you", start: 17.94 },
  { word: "spent", start: 18.14 },
  { word: "a", start: 18.38 },
  { word: "lot", start: 18.5 },
  { word: "of", start: 18.74 },
  { word: "time", start: 18.86 },
  { word: "hanging", start: 19.14 },
  { word: "out", start: 19.44 },
  { word: "with", start: 19.64 },
  { word: "friends,", start: 19.84 },
  // 9. "you don't want to throw the uniform away, right?"
  { word: "you", start: 20.8 },
  { word: "don't", start: 21.02 },
  { word: "want", start: 21.26 },
  { word: "to", start: 21.46 },
  { word: "throw", start: 21.62 },
  { word: "the", start: 21.86 },
  { word: "uniform", start: 22.02 },
  { word: "away,", start: 22.34 },
  { word: "right?", start: 22.58 },
  // 10. "Well, I'm not sure."
  { word: "Well,", start: 23.6 },
  { word: "I'm", start: 23.84 },
  { word: "not", start: 24.02 },
  { word: "sure.", start: 24.22 },
  // 11. "That's not really how I feel."
  { word: "That's", start: 24.71 },
  { word: "not", start: 24.95 },
  { word: "really", start: 25.15 },
  { word: "how", start: 25.39 },
  { word: "I", start: 25.63 },
  { word: "feel.", start: 25.83 },
];

// 2. 문장별 배열 (문장 단위 표출)
const englishSentences = [
  { start: 0.01, end: 1.0, text: "So the story is," },
  {
    start: 1.6,
    end: 4.1,
    text: "whether or not there's a story behind the uniform.",
  },
  { start: 4.6, end: 5.1, text: "Or," },
  {
    start: 5.75,
    end: 8.35,
    text: "if you were a class president and did a lot for the school",
  },
  {
    start: 8.41,
    end: 11.0,
    text: "throughout the entire academic year, consistently,",
  },
  {
    start: 11.1,
    end: 13.7,
    text: "as a result of your hard work and dedication,",
  },
  { start: 14.6, end: 16.8, text: "then it might be hard to throw it away." },
  {
    start: 17.5,
    end: 20.3,
    text: "Or if you spent a lot of time hanging out with friends,",
  },
  {
    start: 20.8,
    end: 22.9,
    text: "you don't want to throw the uniform away, right?",
  },
  { start: 23.6, end: 24.7, text: "Well, I'm not sure." },
  { start: 24.71, end: 26.6, text: "That's not really how I feel." },
];

// 3. 기존 한글 자막은 그대로
const koreanSubtitles = [
  { start: 0.01, end: 1.0, text: "그러니까 핵심은,", highlight: false },
  {
    start: 1.6,
    end: 4.1,
    text: "교복에 얽힌 특별한 사연이 있느냐 없느냐는 거야.",
    highlight: false,
  },
  { start: 4.6, end: 5.1, text: "혹은,", highlight: false },
  {
    start: 5.75,
    end: 8.2,
    text: "네가 반장이었고 학교를 위해 많은 것을 했다면,",
    highlight: false,
  },
  {
    start: 8.2,
    end: 11.1,
    text: "학기 내내 계속해서 말이야, 꾸준하게,",
    highlight: false,
  },
  {
    start: 11.1,
    end: 13.7,
    text: "그러면 그 노력과 헌신의 결과로,",
    highlight: true,
  },
  {
    start: 14.6,
    end: 16.8,
    text: "그 교복을 쉽게 버리긴 어려울 거야.",
    highlight: false,
  },
  {
    start: 17.5,
    end: 20.3,
    text: "또는 네가 친구들과 어울리며 많은 시간을 보냈다면,",
    highlight: false,
  },
  {
    start: 20.8,
    end: 22.9,
    text: "그 교복을 버리고 싶지 않을 거야. 그렇지?",
    highlight: false,
  },
  { start: 23.6, end: 24.7, text: "음, 근데 확실하진 않아.", highlight: false },
  {
    start: 24.7,
    end: 26.6,
    text: "내가 그렇게 느끼는 건 아니거든.",
    highlight: false,
  },
];

// 4. export 구조 변경
const subtitles = {
  en: englishWords,
  enSentences: englishSentences,
  ko: koreanSubtitles,
};

export default subtitles;
