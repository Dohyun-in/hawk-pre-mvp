// Shadowing.js
import React, { useRef, useState, useEffect } from "react";
import videoSrc from "assets/video/70s.mp4";
import bottomBoxImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/bottom_box.png";
import subtitles from "../2_Video/subtitles";
import "./Shadowing.css";
import { ShadowingButtons } from "./ShadowingButtons";
import { ShadowingSubtitles } from "./ShadowingSubtitles";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

// Azure Speech Service 설정
const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.REACT_APP_AZURE_SPEECH_KEY,
  process.env.REACT_APP_AZURE_SPEECH_REGION
);
speechConfig.speechRecognitionLanguage = "en-US";

export default function Shadowing() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showKorean, setShowKorean] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 쉐도잉 관련 상태
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSentenceComplete, setIsSentenceComplete] = useState(false);

  // 현재 문장의 시작/종료 시간
  const currentSentence = subtitles.enSentences[currentSentenceIndex];
  const sentenceStart = currentSentence?.start || 0;
  const sentenceEnd = currentSentence?.end || 0;

  // 상태 추가
  const [playbackRate, setPlaybackRate] = useState(1);
  const [voiceResult, setVoiceResult] = useState("");
  const [similarity, setSimilarity] = useState(0);
  const [recognizer, setRecognizer] = useState(null);
  const [autoStopTimer, setAutoStopTimer] = useState(null);

  // 음성 인식 초기화
  useEffect(() => {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const newRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    setRecognizer(newRecognizer);

    return () => {
      if (newRecognizer) {
        newRecognizer.close();
      }
      if (autoStopTimer) {
        clearTimeout(autoStopTimer);
      }
    };
  }, []);

  // 음성 인식 자동 종료 타이머 설정
  const resetAutoStopTimer = () => {
    if (autoStopTimer) {
      clearTimeout(autoStopTimer);
    }
    const timer = setTimeout(() => {
      stopRecording();
    }, 5000); // 5초 후 자동 종료
    setAutoStopTimer(timer);
  };

  // 음성 인식 결과 처리
  const handleSpeechResult = (result) => {
    if (result.reason === sdk.ResultReason.RecognizedSpeech) {
      const recognizedText = result.text;
      setVoiceResult(recognizedText);

      // 유사도 체크
      const currentSentence = subtitles.enSentences[currentSentenceIndex];
      if (currentSentence) {
        const sim = checkSimilarity(recognizedText, currentSentence.text);
        if (sim >= 0.8) {
          // 정확도가 높으면 다음 문장으로 자동 이동
          setTimeout(() => {
            setCurrentSentenceIndex((prev) => prev + 1);
            setVoiceResult("");
            setSimilarity(0);
          }, 1500);
        }
      }

      resetAutoStopTimer();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      const time = video.currentTime;
      setCurrentTime(time);

      if (time >= sentenceEnd) {
        setIsPlaying(false);
        video.pause();
        setIsSentenceComplete(true);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration);
      video.playbackRate = playbackRate;
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      // 화면 이탈/언마운트 시 안전하게 정지
      try {
        video.pause();
      } catch (_) {}
    };
  }, [sentenceEnd, playbackRate]);

  // 문장 자동 재생 effect
  useEffect(() => {
    if (!currentSentence) return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = sentenceStart;
    video.playbackRate = playbackRate;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          // 재생이 시작된 뒤 컴포넌트가 이미 언마운트되었을 수 있으니 참조 확인
          if (!videoRef.current) return;
          setIsPlaying(true);
          setIsSentenceComplete(false);
        })
        .catch(() => {
          // DOMException: play() request interrupted 등은 무시
        });
    } else {
      setIsPlaying(true);
      setIsSentenceComplete(false);
    }

    // 의존성 변경/언마운트 시 재생 중지하여 play() 인터럽트 방지
    return () => {
      try {
        video.pause();
      } catch (_) {}
    };
  }, [currentSentenceIndex, playbackRate, sentenceStart]);

  // 배속 변경 함수
  const handleSpeedChange = (rate) => {
    console.log("배속 변경 요청:", rate);
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      console.log("비디오 배속 설정됨:", videoRef.current.playbackRate);
    }
  };

  // 이전 문장 이동
  const goToPrevSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
      setVoiceResult("");
      setSimilarity(0);
    }
  };

  // 현재 문장 처음으로
  const retrySentence = () => {
    setCurrentTime(sentenceStart);
    if (videoRef.current) {
      videoRef.current.currentTime = sentenceStart;
      videoRef.current.playbackRate = playbackRate; // 현재 배속 적용
      videoRef.current.play();
      setIsPlaying(true);
      setIsSentenceComplete(false);
    }
    setVoiceResult("");
    setSimilarity(0);
  };

  // 음성 입력 버튼 클릭
  const handleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // 음성 평가 결과 표시 및 유사도 체크(80% 이상)
  const checkSimilarity = (recognized, target) => {
    // 단어 단위로 비교, 소문자/특수문자 제거
    const clean = (str) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(" ")
        .filter(Boolean);
    const recWords = clean(recognized);
    const tgtWords = clean(target);
    const match = recWords.filter((w) => tgtWords.includes(w)).length;
    const sim = tgtWords.length > 0 ? match / tgtWords.length : 0;
    setSimilarity(sim);
    return sim;
  };

  // 음성 녹음 시작
  const startRecording = async () => {
    if (recognizer) {
      setIsRecording(true);
      setVoiceResult("");
      setSimilarity(0);

      recognizer.recognized = (s, e) => {
        handleSpeechResult(e.result);
      };

      recognizer.sessionStopped = (s, e) => {
        stopRecording();
      };

      recognizer.startContinuousRecognitionAsync();
      resetAutoStopTimer();
    }
  };

  // 음성 녹음 종료 및 평가
  const stopRecording = async () => {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
      setIsRecording(false);
      if (autoStopTimer) {
        clearTimeout(autoStopTimer);
        setAutoStopTimer(null);
      }
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

      {/* 자막 - ShadowingSubtitles 컴포넌트 사용 */}
      <ShadowingSubtitles
        subtitles={subtitles}
        currentSentenceIndex={currentSentenceIndex}
        currentTime={currentTime}
        showEnglish={showEnglish}
        showKorean={showKorean}
        voiceResult={voiceResult}
        similarity={similarity}
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
          pointerEvents: "none",
        }}
      />

      {/* 버튼 영역 - ShadowingButtons로 분리 */}
      <ShadowingButtons
        isRecording={isRecording}
        onVoiceInput={handleVoiceInput}
        onPrevSentence={goToPrevSentence}
        onRetrySentence={retrySentence}
        playbackRate={playbackRate}
        onSpeedChange={handleSpeedChange}
        voiceResult={voiceResult}
        similarity={similarity}
      />
    </div>
  );
}
