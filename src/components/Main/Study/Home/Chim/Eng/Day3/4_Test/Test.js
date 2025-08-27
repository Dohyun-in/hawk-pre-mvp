// Test.js
import React, { useRef, useState, useEffect } from "react";
import videoSrc from "assets/video/70s.mp4";
import bottomBoxImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/bottom_box.png";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import "./Test.css";
import { TestSubtitles } from "./TestSubtitles";
import { useDay3 } from "../Day3Context";
import subtitles from "../2_Video/subtitles.js";
import TestButtons from "./TestButtons";

// 정답 문장들을 직접 정의
const correctSentences = [
  "My dad worked at a snack factory.",
  "So as his son, which was quite interesting, as you might expect, exposed to snacks from a young age.",
  "I learned to cherish them.",
  "I can't throw away crumbs, can't toss them.",
  "Even with bread, you know?",
  "I simply do this and toss it.",
  "It's hard to throw away these crumbs.",
  "But it certainly faced a tough opponent.",
  "Shouldn't we perhaps balance this out internally?",
  "Balance it with a user patch.",
  "It's actually a three-color pen, but unfortunately, two colors don't work, right?",
  "Two colors aren't working.",
  "The color is kind of a bright, almost neon-like fluorescent shade, you know?",
  "Like lemon color.",
  "Hard to see when drawing.",
  "You have to hold it up to the light to see it.",
  "Let's just simply leave it at that.",
  "What's more regrettable?",
  "Perhaps cracker crumbs, right?",
  "Throwing away crumbs is indeed a sin.",
];

// subtitles.js에서 가져온 자막 데이터 사용

// Azure Speech Service 설정
const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.REACT_APP_AZURE_SPEECH_KEY,
  process.env.REACT_APP_AZURE_SPEECH_REGION
);
speechConfig.speechRecognitionLanguage = "en-US";

// 유틸리티 함수들 - 쉐도잉과 동일한 방식
const clean = (str) => {
  console.log("=== clean 함수 디버깅 ===");
  console.log("입력 문자열:", str);
  console.log("입력 문자열 타입:", typeof str);
  console.log("입력 문자열이 빈 문자열인가?", str === "");
  console.log("입력 문자열이 null인가?", str === null);
  console.log("입력 문자열이 undefined인가?", str === undefined);

  if (!str || typeof str !== "string") {
    console.log("유효하지 않은 입력 - 빈 배열 반환");
    return [];
  }

  const result = str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .filter(Boolean);

  console.log("clean 결과:", result);
  return result;
};

const checkSimilarity = (recognized, target) => {
  console.log("=== checkSimilarity 디버깅 ===");
  console.log("입력된 recognized:", recognized);
  console.log("입력된 target:", target);

  const recWords = clean(recognized);
  const tgtWords = clean(target);

  console.log("정리된 recWords:", recWords);
  console.log("정리된 tgtWords:", tgtWords);
  console.log("recWords 길이:", recWords.length);
  console.log("tgtWords 길이:", tgtWords.length);

  if (recWords.length === 0 || tgtWords.length === 0) {
    console.log("빈 배열 감지 - 0 반환");
    return 0;
  }

  // 매칭되는 단어 수
  const match = recWords.filter((w) => tgtWords.includes(w)).length;
  console.log("매칭되는 단어 수:", match);

  // 전체 정답 대비 방식: 매칭된 단어 수 / 전체 정답 단어 수
  const sim = match / tgtWords.length;
  console.log("최종 유사도:", sim);

  return sim;
};

export default function Test() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [recognizer, setRecognizer] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceResult, setVoiceResult] = useState("");
  const [pronunciationScore, setPronunciationScore] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [showEnglish, setShowEnglish] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  // Day2Context 사용
  const { goToStep, updateTestResults } = useDay3();

  // 음성 인식 초기화
  useEffect(() => {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const newRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    setRecognizer(newRecognizer);

    return () => {
      if (newRecognizer) {
        newRecognizer.close();
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => {
      const time = video.currentTime;
      setCurrentTime(time);

      // 영상이 끝까지 도달했는지 확인 (0.1초 여유)
      if (duration > 0 && time >= duration - 0.1) {
        stopRecording();
        setIsPlaying(false);
        // 영상이 끝나면 테스트 완료 상태로 설정 (평가는 useEffect에서 처리)
        setTestCompleted(true);
      }
    };

    const handleVideoEnded = () => {
      // 영상이 끝나면 음성 인식 중지
      stopRecording();
      setIsPlaying(false);
      // 영상이 끝나면 테스트 완료 상태로 설정 (평가는 useEffect에서 처리)
      setTestCompleted(true);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", () => {
      setDuration(video.duration);
    });
    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, [duration]);

  // 진행 상태에 맞게 CSS 변수 업데이트
  useEffect(() => {
    const input = document.querySelector(".test-slider");
    if (input && duration > 0) {
      const progress = (currentTime / duration) * 100;
      input.style.setProperty("--progress", `${progress}%`);
    }
  }, [currentTime, duration]);

  // voiceResult 변경 감지 및 평가 실행
  useEffect(() => {
    if (testCompleted && voiceResult && voiceResult.length > 0) {
      console.log("=== voiceResult 변경 감지됨 ===");
      console.log("새로운 voiceResult:", voiceResult);
      console.log("길이:", voiceResult.length);

      // 평가 완료 후 결과 페이지 표시 (약간의 지연을 두어 사용자가 결과를 볼 수 있도록)
      setTimeout(() => {
        completeTest();
      }, 1000);
    }
  }, [voiceResult, testCompleted]);

  // 음성 인식 결과 처리
  const handleSpeechResult = (result) => {
    console.log("=== handleSpeechResult 호출됨 ===");
    console.log("전체 result 객체:", result);
    console.log("result.reason:", result.reason);
    console.log(
      "sdk.ResultReason.RecognizedSpeech:",
      sdk.ResultReason.RecognizedSpeech
    );

    if (result.reason === sdk.ResultReason.RecognizedSpeech) {
      const recognizedText = result.text;
      console.log("인식된 텍스트:", recognizedText);
      console.log("이전 voiceResult:", voiceResult);

      setVoiceResult((prev) => {
        const newResult = prev + " " + recognizedText;
        console.log("새로운 voiceResult:", newResult);
        return newResult;
      });
    } else {
      console.log("음성 인식 실패 또는 다른 이유:", result.reason);
    }
  };

  // 단어 단위 비교 함수 (새로 추가)
  const calculateWordAccuracy = (recognizedText) => {
    console.log("=== 단어 단위 정확도 계산 ===");
    console.log("입력된 recognizedText:", recognizedText);
    console.log("recognizedText 타입:", typeof recognizedText);
    console.log("recognizedText 길이:", recognizedText.length);

    // 1. 인식 결과 전처리
    const recognizedWords = clean(recognizedText);
    console.log("인식된 단어들:", recognizedWords);
    console.log("인식된 단어 수:", recognizedWords.length);

    if (recognizedWords.length === 0) {
      console.log("인식된 단어가 없음 - 0% 반환");
      return 0;
    }

    // 2. 정답 단어 추출 - 쉐도잉과 동일한 방식
    const targetWords = [];
    console.log("=== 정답 문장별 처리 ===");

    correctSentences.forEach((sentence, index) => {
      console.log(`문장 ${index + 1}: "${sentence}"`);
      const sentenceWords = clean(sentence);
      console.log(`  정리된 단어들:`, sentenceWords);
      targetWords.push(...sentenceWords);
    });

    const uniqueTargetWords = [...new Set(targetWords)];
    console.log("=== 최종 정답 단어 리스트 ===");
    console.log("전체 정답 단어들:", uniqueTargetWords);
    console.log("전체 정답 단어 수:", uniqueTargetWords.length);

    // 중복 단어 분석을 위한 카운트
    const wordCounts = {};
    targetWords.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    console.log("=== 중복 단어 분석 ===");
    Object.entries(wordCounts)
      .filter(([word, count]) => count > 1)
      .forEach(([word, count]) => {
        console.log(`"${word}": ${count}번 등장`);
      });

    console.log("원본 targetWords (중복 포함):", targetWords);
    console.log("중복 제거된 uniqueTargetWords:", uniqueTargetWords);
    console.log(
      "중복 제거로 인한 단어 수 차이:",
      targetWords.length - uniqueTargetWords.length
    );

    if (uniqueTargetWords.length === 0) {
      console.warn("정답 단어 리스트가 비어 있음");
      return 0;
    }

    // 3. 매칭되는 단어 찾기 - 더 자세한 디버깅
    console.log("=== 매칭 과정 디버깅 ===");
    recognizedWords.forEach((word, index) => {
      const isIncluded = uniqueTargetWords.includes(word);
      console.log(
        `단어 ${index + 1}: "${word}" - 정답 포함 여부: ${isIncluded}`
      );
      if (isIncluded) {
        console.log(`  ✅ "${word}"는 정답에 포함됨`);
      } else {
        console.log(`  ❌ "${word}"는 정답에 포함되지 않음`);
        console.log(`  정답 단어들:`, uniqueTargetWords);
      }
    });

    const correctWords = recognizedWords.filter((w) =>
      uniqueTargetWords.includes(w)
    );
    console.log("=== 매칭 결과 ===");
    console.log("인식된 단어들:", recognizedWords);
    console.log("정답 단어들:", uniqueTargetWords);
    console.log("매칭되는 단어들:", correctWords);
    console.log("매칭 단어 수:", correctWords.length);

    // 4. 정확도 계산
    const accuracy = correctWords.length / uniqueTargetWords.length;
    console.log(`=== 최종 결과 ===`);
    console.log(`매칭 단어 수: ${correctWords.length}`);
    console.log(`전체 정답 단어 수: ${uniqueTargetWords.length}`);
    console.log(`계산된 정확도: ${(accuracy * 100).toFixed(2)}%`);

    // 100%를 초과하지 않도록 제한
    const finalAccuracy = Math.min(accuracy, 1.0);
    console.log(
      `최종 정확도 (100% 제한): ${(finalAccuracy * 100).toFixed(2)}%`
    );

    return finalAccuracy;
  };

  // 쉐도잉과 동일한 방식 테스트 (디버깅용)
  const testShadowsStyle = (recognized, target) => {
    console.log("=== 쉐도잉 스타일 테스트 ===");
    console.log("입력:", { recognized, target });

    const recWords = clean(recognized);
    const tgtWords = clean(target);

    console.log("정리된 단어들:", { recWords, tgtWords });

    const match = recWords.filter((w) => tgtWords.includes(w)).length;
    const sim = tgtWords.length > 0 ? match / tgtWords.length : 0;

    console.log("쉐도잉 방식 결과:", {
      match,
      tgtWordsLength: tgtWords.length,
      sim,
    });
    return sim;
  };

  // 최종 발음 및 속도 평가
  const evaluateFinalPerformance = () => {
    console.log("=== evaluateFinalPerformance 함수 시작 ===");
    console.log("STT 변환 결과:", voiceResult);
    console.log("voiceResult 길이:", voiceResult.length);
    console.log("voiceResult 타입:", typeof voiceResult);
    console.log("voiceResult가 빈 문자열인가?", voiceResult === "");
    console.log("voiceResult가 null인가?", voiceResult === null);
    console.log("voiceResult가 undefined인가?", voiceResult === undefined);

    // 쉐도잉 스타일 테스트 (디버깅용)
    if (voiceResult && voiceResult.length > 0) {
      const firstSentence = correctSentences[0];
      console.log("첫 번째 문장으로 쉐딩 스타일 테스트:");
      testShadowsStyle(voiceResult, firstSentence);
    }

    // 1. 단어 인식률 - 문장별로 정답 단어가 포함되었는지 확인
    const recognizedWords = clean(voiceResult);

    // 각 문장별로 정답 단어가 포함되었는지 확인
    let sentencesWithCorrectWords = 0;

    correctSentences.forEach((sentence, index) => {
      const sentenceWords = clean(sentence);
      const hasCorrectWords = sentenceWords.some((word) =>
        recognizedWords.includes(word)
      );

      if (hasCorrectWords) {
        sentencesWithCorrectWords++;
        console.log(`문장 ${index + 1}: "${sentence}" - ✅ 정답 단어 포함`);
      } else {
        console.log(`문장 ${index + 1}: "${sentence}" - ❌ 정답 단어 없음`);
      }
    });

    // 단어 인식률 = 정답 단어가 포함된 문장 수 * (100/11)점 (100점 만점)
    const pronunciationAccuracy = Math.round(
      (sentencesWithCorrectWords / correctSentences.length) * 100
    );

    // 2. 속도 정확도 - 새로운 함수 사용 (단어 단위 비교)
    const speedAccuracy = calculateWordAccuracy(voiceResult) * 100;

    console.log("=== 문장별 평가 결과 ===");
    console.log("전체 문장 수:", correctSentences.length);
    console.log("정답 단어가 포함된 문장 수:", sentencesWithCorrectWords);
    console.log("단어 인식률:", pronunciationAccuracy + "%");
    console.log("속도 정확도:", speedAccuracy + "점");

    console.log("=== 전체 요약 ===");
    console.log(
      "전체 정답 단어 수:",
      recognizedWords.length > 0 ? clean(correctSentences.join(" ")).length : 0
    );
    console.log("전체 인식된 단어 수:", recognizedWords.length);
    console.log("단어 인식률:", Math.round(pronunciationAccuracy) + "%");
    console.log("속도 정확도:", speedAccuracy + "점");

    setPronunciationScore(Math.round(pronunciationAccuracy));
    setSpeedScore(Math.round(speedAccuracy));

    // 계산된 점수 반환
    return { pronunciationAccuracy, speedAccuracy };
  };

  // 음성 녹음 시작
  const startRecording = async () => {
    if (recognizer) {
      setIsRecording(true);
      setVoiceResult("");

      recognizer.recognized = (s, e) => {
        handleSpeechResult(e.result);
      };

      recognizer.sessionStopped = (s, e) => {
        console.log("Speech recognition session stopped");
      };

      recognizer.startContinuousRecognitionAsync();
    }
  };

  // 음성 녹음 종료
  const stopRecording = async () => {
    if (recognizer) {
      try {
        await recognizer.stopContinuousRecognitionAsync();
      } catch (error) {
        console.log("Speech recognition stop error:", error);
      }
      setIsRecording(false);
    }
  };

  // 테스트 다시 시도
  const retryTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setPronunciationScore(0);
    setSpeedScore(0);
    setVoiceResult("");
  };

  // 테스트 완료
  const completeTest = () => {
    console.log("=== completeTest 함수 시작 ===");
    console.log("현재 voiceResult:", voiceResult);
    console.log("현재 voiceResult 길이:", voiceResult.length);

    // 점수 계산 결과를 직접 받아서 사용
    const { pronunciationAccuracy, speedAccuracy } = evaluateFinalPerformance();

    console.log("=== 점수 계산 결과 ===");
    console.log("발음 정확도:", pronunciationAccuracy);
    console.log("속도 정확도:", speedAccuracy);

    // 상태 업데이트
    setPronunciationScore(Math.round(pronunciationAccuracy));
    setSpeedScore(Math.round(speedAccuracy));

    // Day1 완료 처리 (필요시 Day1Context 사용)
    console.log("Day1 테스트 완료!");

    // 최종 점수로 업데이트 (계산된 값 직접 사용)
    const finalResults = {
      pronunciationScore: Math.round(pronunciationAccuracy),
      speedScore: Math.round(speedAccuracy),
      voiceResult: voiceResult || "",
    };

    console.log("최종 저장할 결과:", finalResults);
    updateTestResults(finalResults);

    goToStep(5); // 테스트 단계(4번째)를 완료하고 다음 단계(5번째: Results)로 넘어가도록 수정
  };

  // 테스트 시작
  const startTest = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
      setTestStarted(true);
      setTestCompleted(false);
      setPronunciationScore(0);
      setSpeedScore(0);
      startRecording();
    }
  };

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        position: "relative",
        padding: 0,
        height: "60vh",
      }}
    >
      {/* 영상 */}
      <video
        ref={videoRef}
        width="100%"
        src={videoSrc}
        style={{
          position: "relative",
          top: "-110px",
          transform: "scale(1.1)",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* 자막 */}
      <TestSubtitles
        subtitles={subtitles}
        currentTime={currentTime}
        showEnglish={showEnglish}
      />

      {/* 하단 박스 */}
      <img
        src={bottomBoxImg}
        alt="Bottom Box"
        style={{
          position: "absolute",
          bottom: -146,
          left: 0,
          width: "100%",
          zIndex: 1,
          transform: "scale(1.14)",
        }}
      />

      {/* 테스트 버튼 및 상태 표시 */}
      <TestButtons
        testStarted={testStarted}
        testCompleted={testCompleted}
        currentTime={currentTime}
        duration={duration}
        onStartTest={startTest}
      />
    </div>
  );
}
