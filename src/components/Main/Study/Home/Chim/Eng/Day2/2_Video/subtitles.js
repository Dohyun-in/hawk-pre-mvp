// subtitles.js

// 1. 단어별 배열 (요청한 타임 인덱스 기준)
const englishWords = [
  // 1. "In university,"
  { word: "In", start: 0.03 },
  { word: "university,", start: 0.29 },
  // 2. "some people often still kept their uniforms at home."
  { word: "some", start: 0.99 },
  { word: "people", start: 1.27 },
  { word: "often", start: 1.67 },
  { word: "still", start: 1.91 },
  { word: "kept", start: 2.09 },
  { word: "their", start: 2.35 },
  { word: "uniforms", start: 2.63 },
  { word: "at", start: 2.81 },
  { word: "home.", start: 3.07 },
  // 3. "They had very deeply fond, cherished,"
  { word: "They", start: 3.86 },
  { word: "had", start: 4.02 },
  { word: "very", start: 4.2 },
  { word: "deeply", start: 4.5 },
  { word: "fond,", start: 4.92 },
  { word: "cherished,", start: 5.6 },
  // 4. "and nostalgic romantic feelings"
  { word: "and", start: 6.12 },
  { word: "nostalgic", start: 6.52 },
  { word: "romantic", start: 6.92 },
  { word: "feelings", start: 7.36 },
  // 5. "about their school days."
  { word: "about", start: 7.83 },
  { word: "their", start: 7.97 },
  { word: "school", start: 8.18 },
  { word: "days.", start: 8.46 },
  // 6. "They altered their uniforms over a considerable period of time"
  { word: "They", start: 10.22 },
  { word: "altered", start: 10.42 },
  { word: "their", start: 10.72 },
  { word: "uniforms", start: 10.95 },
  { word: "over", start: 11.57 },
  { word: "a", start: 11.91 },
  { word: "considerable", start: 12.05 },
  { word: "period", start: 12.53 },
  { word: "of", start: 12.69 },
  { word: "time", start: 12.85 },
  // 7. "and eventually grew attached to them and became quite fond of them."
  { word: "and", start: 13.45 },
  { word: "eventually", start: 13.83 },
  { word: "grew", start: 14.51 },
  { word: "attached", start: 14.85 },
  { word: "to", start: 14.99 },
  { word: "them", start: 15.27 },
  { word: "and", start: 16.01 },
  { word: "became", start: 16.19 },
  { word: "quite", start: 16.55 },
  { word: "fond", start: 16.99 },
  { word: "of", start: 17.15 },
  { word: "them.", start: 17.41 },
  // 8. "They became fond of their uniforms."
  { word: "They", start: 19.84 },
  { word: "became", start: 20.02 },
  { word: "fond", start: 20.48 },
  { word: "of", start: 20.76 },
  { word: "their", start: 20.96 },
  { word: "uniforms.", start: 21.26 },
  // 9. "When there was a thorough inspection,"
  { word: "When", start: 23.84 },
  { word: "there", start: 24.12 },
  { word: "was", start: 24.28 },
  { word: "a", start: 24.4 },
  { word: "thorough", start: 24.55 },
  { word: "inspection,", start: 24.79 },
  // 10. "they carried extra pants in their bags for emergencies, just in case,"
  { word: "they", start: 25.71 },
  { word: "carried", start: 25.87 },
  { word: "extra", start: 26.25 },
  { word: "pants", start: 26.63 },
  { word: "in", start: 26.95 },
  { word: "their", start: 27.05 },
  { word: "bags", start: 27.27 },
  // 11. "for emergencies, just in case, or any unexpected situations."
  { word: "for", start: 27.53 },
  { word: "emergencies,", start: 27.87 },
  { word: "just", start: 28.94 },
  { word: "in", start: 29.18 },
  { word: "case,", start: 29.22 },
  { word: "or", start: 29.98 },
  { word: "any", start: 30.32 },
  { word: "unexpected", start: 30.44 },
  { word: "situations.", start: 30.82 },
  // 12. " For unexpected situations."
  { word: "For", start: 31.86 },
  { word: "unexpected", start: 32.02 },
  { word: "situations.", start: 32.67 },
  // 13. "During the inspection,
  { word: "During", start: 34.91 },
  { word: "the", start: 35.15 },
  { word: "inspection,", start: 35.27 },
  // 14. "they would change into wide-legged ones."
  { word: "they", start: 35.96 },
  { word: "would", start: 36.28 },
  { word: "change", start: 36.4 },
  { word: "into", start: 36.64 },
  { word: "wide-legged", start: 36.95 },
  { word: "ones.", start: 37.44 },
  // 15. "Then they'd switch back to the tight ones."
  { word: "Then", start: 39.47 },
  { word: "they'd", start: 39.68 },
  { word: "switch", start: 39.95 },
  { word: "back", start: 40.15 },
  { word: "to", start: 40.29 },
  { word: "the", start: 40.4 },
  { word: "tight", start: 40.55 },
  { word: "ones.", start: 40.65 },
];

// 2. 문장별 배열 (문장 단위 표출)
const englishSentences = [
  { start: 0.03, end: 0.91, text: "In university," },
  {
    start: 0.99,
    end: 3.42,
    text: "some people often still kept their uniforms at home.",
  },
  {
    start: 3.86,
    end: 6.02,
    text: "They had very deeply fond, cherished,",
  },
  {
    start: 6.12,
    end: 7.64,
    text: "and nostalgic romantic feelings",
  },
  {
    start: 7.83,
    end: 8.78,
    text: "about their school days.",
  },
  {
    start: 10.22,
    end: 13.35,
    text: "They altered their uniforms over a considerable period of time",
  },
  {
    start: 13.45,
    end: 18.3,
    text: "and eventually grew attached to them and became quite fond of them.",
  },
  {
    start: 19.84,
    end: 21.94,
    text: "They became fond of their uniforms.",
  },
  {
    start: 23.84,
    end: 25.57,
    text: "When there was a thorough inspection,",
  },
  {
    start: 25.71,
    end: 27.48,
    text: "they carried extra pants in their bags",
    highlight: false,
  },
  {
    start: 27.53,
    end: 31.59,
    text: "for emergencies, just in case, or any unexpected situations.",
    highlight: false,
  },
  {
    start: 31.86,
    end: 33.29,
    text: "For unexpected situations.",
  },
  {
    start: 34.91,
    end: 35.9,
    text: "During the inspection,",
    highlight: false,
  },
  {
    start: 35.96,
    end: 38.59,
    text: "they would change into wide-legged ones.",
  },
  {
    start: 39.47,
    end: 41.89,
    text: "Then they'd switch back to the tight ones.",
  },
];

// 3. 한글 자막
const koreanSubtitles = [
  { start: 0.03, end: 0.91, text: "대학교에 가서도", highlight: false },
  {
    start: 1.29,
    end: 3.42,
    text: "집에 교복을 그대로 두는 사람들이 꽤 있었어.",
    highlight: false,
  },
  {
    start: 3.86,
    end: 6.12,
    text: "그들은 아주 깊게 애정어린, 소중한,",
    highlight: false,
  },
  {
    start: 6.12,
    end: 7.46,
    text: "그리고 향수에 빠진, 낭만적인 감정을 가지고 있었어.",
    highlight: false,
  },
  {
    start: 7.83,
    end: 8.78,
    text: "그들의 학창 시절에 대해서.",
    highlight: false,
  },
  {
    start: 10.22,
    end: 13.35,
    text: "그들은 오랜 기간동안 교복을 바꿔가며 입다가",
    highlight: false,
  },
  {
    start: 13.45,
    end: 18.3,
    text: "결국 점점 정이 들어서 무척 좋아하게 됐어.",
    highlight: false,
  },
  {
    start: 19.84,
    end: 21.94,
    text: "교복에 애착을 가지게 된 거야.",
    highlight: false,
  },
  {
    start: 23.84,
    end: 25.57,
    text: "철저한 검사가 있을 땐,",
    highlight: false,
  },
  {
    start: 25.71,
    end: 27.48,
    text: "가방에 여분의 바지를 넣고 다녔어.",
    highlight: false,
  },
  {
    start: 27.53,
    end: 31.59,
    text: "혹시 모를 긴급 상황이나, 돌발 상황에 대비해서.",
    highlight: false,
  },
  {
    start: 31.86,
    end: 33.29,
    text: "예상치 못한 상황이 생길지도 모르잖아.",
    highlight: false,
  },
  {
    start: 34.91,
    end: 35.9,
    text: "검사가 진행되는 동안에는,",
    highlight: false,
  },
  {
    start: 35.96,
    end: 38.59,
    text: "통이 넓은 바지로 갈아입었을 거야.",
    highlight: false,
  },
  {
    start: 39.47,
    end: 41.89,
    text: "그리고 나서는 다시 딱 달라붙는 바지로 갈아입었지.",
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
