// Prelearn.js - Day3용 (5개 퀴즈 지원)
// 1단계 '학습' 표출(퀴즈박스, 하단버튼, 하단박스) / 퀴즈 이전, 다음 버튼
import React, { useState, useEffect } from "react";
import { quizzes } from "./quizData";
import { QuizBox } from "./QuizBox";
import { QuizButtons } from "./QuizButtons";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { useDay3 } from "../Day3Context";

import hintImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/hint_button_default.png";
import voiceImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/voice_button_default.png";
import voiceActiveImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/voice_button_active.png";
import answerImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/answer_button_default.png";
import bottomBoxImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/bottom_box.png";

// Azure Speech Service 설정
const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.REACT_APP_AZURE_SPEECH_KEY,
  process.env.REACT_APP_AZURE_SPEECH_REGION
);
speechConfig.speechRecognitionLanguage = "en-US";

export function Prelearn() {
  const [page, setPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [hintIndex, setHintIndex] = useState({});
  const [recognizer, setRecognizer] = useState(null);
  const [lastSpeechTime, setLastSpeechTime] = useState(null);
  const [autoStopTimer, setAutoStopTimer] = useState(null);

  // Day1Context에서 updateSubProgress 함수 가져오기
  const { updateSubProgress } = useDay3();

  // 퀴즈 진행률을 Day3Context에 업데이트
  useEffect(() => {
    const totalQuizzes = quizzes.length; // 이제 5개
    const currentProgress = (page + 1) / totalQuizzes; // 0부터 시작하므로 +1
    console.log(
      `Day3 퀴즈 진행률 업데이트: page=${page}, progress=${currentProgress}`
    );
    updateSubProgress(0, currentProgress); // 첫 번째 단계(인덱스 0)의 진행률 업데이트
  }, [page, updateSubProgress]);

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
      stopListening();
    }, 4000); // 4초 후 자동 종료
    setAutoStopTimer(timer);
  };

  // 음성 인식 결과 처리
  const handleSpeechResult = (result) => {
    if (result.reason === sdk.ResultReason.RecognizedSpeech) {
      // 특수문자 제거 및 소문자 변환
      const cleanText = result.text
        .toLowerCase()
        .replace(/[.,!?;:'"()]/g, "")
        .trim();
      const words = cleanText.split(/\s+/);
      const correctAnswers = quizzes[page].answers;
      const answerKeys = Object.keys(correctAnswers);

      // 현재 페이지의 빈칸 수만큼만 처리
      const newAnswers = { ...(userAnswers[page] || {}) };
      const newFeedback = { ...(feedback[page] || {}) };

      answerKeys.forEach((key, index) => {
        if (index < words.length) {
          newAnswers[key] = words[index];
          newFeedback[key] =
            words[index] === correctAnswers[key].toLowerCase()
              ? "correct"
              : "wrong";
        }
      });

      setUserAnswers((prev) => ({
        ...prev,
        [page]: newAnswers,
      }));

      setFeedback((prev) => ({
        ...prev,
        [page]: newFeedback,
      }));

      // 마지막 발화 시간 업데이트 및 타이머 리셋
      setLastSpeechTime(Date.now());
      resetAutoStopTimer();
    }
  };

  // 음성 인식 시작
  const startListening = () => {
    if (recognizer) {
      setIsListening(true);

      recognizer.recognized = (s, e) => {
        handleSpeechResult(e.result);
      };

      recognizer.sessionStopped = (s, e) => {
        stopListening();
      };

      recognizer.startContinuousRecognitionAsync();
      setLastSpeechTime(Date.now());
      resetAutoStopTimer();
    }
  };

  // 음성 인식 중지
  const stopListening = () => {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
      setIsListening(false);
      if (autoStopTimer) {
        clearTimeout(autoStopTimer);
        setAutoStopTimer(null);
      }
      // 음성 인식이 중지되면 버튼 이미지도 비활성화 상태로 변경
      const voiceButton = document.querySelector('img[alt="음성입력"]');
      if (voiceButton) {
        voiceButton.src = voiceImg;
      }
    }
  };

  // 음성 인식 토글
  const toggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // 힌트 버튼 클릭 시 처리
  const showHint = () => {
    const currentAnswers = userAnswers[page] || {};
    const correctAnswers = quizzes[page].answers;
    const currentHintIndex = hintIndex[page] || 0;

    // 현재 페이지의 모든 정답 키를 배열로 변환
    const answerKeys = Object.keys(correctAnswers);

    if (currentHintIndex < answerKeys.length) {
      const currentKey = answerKeys[currentHintIndex];
      const correctAnswer = correctAnswers[currentKey];
      const currentAnswer = currentAnswers[currentKey] || "";

      // 현재 입력된 답변의 길이가 정답보다 짧으면 한 글자 추가
      if (currentAnswer.length < correctAnswer.length) {
        const nextChar = correctAnswer[currentAnswer.length];
        const newAnswer = currentAnswer + nextChar;

        setUserAnswers((prev) => ({
          ...prev,
          [page]: {
            ...prev[page],
            [currentKey]: newAnswer,
          },
        }));

        // 현재 단어가 완성되면 다음 단어로 넘어가기 위해 힌트 인덱스 업데이트
        if (newAnswer.length === correctAnswer.length) {
          setHintIndex((prev) => ({
            ...prev,
            [page]: currentHintIndex + 1,
          }));
        }

        // 피드백 업데이트
        setFeedback((prev) => ({
          ...prev,
          [page]: {
            ...prev[page],
            [currentKey]: newAnswer === correctAnswer ? "correct" : "wrong",
          },
        }));
      } else {
        // 현재 단어가 완성되었으면 다음 단어로 넘어감
        setHintIndex((prev) => ({
          ...prev,
          [page]: currentHintIndex + 1,
        }));
      }
    }
  };

  // 정답보기 버튼 클릭 시 처리
  const showAnswer = () => {
    const correctAnswers = quizzes[page].answers;
    const currentAnswers = userAnswers[page] || {};

    // 모든 답변을 정답으로 채우기
    const newAnswers = {};
    const newFeedback = {};

    Object.entries(correctAnswers).forEach(([key, value]) => {
      newAnswers[key] = value;
      newFeedback[key] = "correct";
    });

    setUserAnswers((prev) => ({
      ...prev,
      [page]: newAnswers,
    }));

    setFeedback((prev) => ({
      ...prev,
      [page]: newFeedback,
    }));
  };

  const handleAnswerChange = (index, value) => {
    setUserAnswers((prev) => {
      const updatedPageAnswers = {
        ...prev[page],
        [index]: value,
      };
      const newAnswers = {
        ...prev,
        [page]: updatedPageAnswers,
      };

      const correctAnswers = quizzes[page].answers;
      const newFeedback = {};
      for (const key in correctAnswers) {
        const userAnswer = updatedPageAnswers[key]?.trim().toLowerCase();
        const correctAnswer = correctAnswers[key].trim().toLowerCase();
        newFeedback[key] = userAnswer === correctAnswer ? "correct" : "wrong";
      }

      setFeedback((prevFb) => ({
        ...prevFb,
        [page]: newFeedback,
      }));

      return newAnswers;
    });
  };

  const isAllCorrect = () => {
    const currentFeedback = feedback[page] || {};
    const correctAnswers = quizzes[page].answers;
    return Object.keys(correctAnswers).every(
      (key) => currentFeedback[key] === "correct"
    );
  };

  // 페이지 네비게이션에서 5개 퀴즈 지원
  const nextPage = () => {
    if (page < quizzes.length - 1 && isAllCorrect()) {
      // 이제 0,1,2,3,4 (5개)
      setPage(page + 1);
      setIsListening(false);
      setHintIndex((prev) => ({ ...prev, [page + 1]: 0 }));
    }
  };

  const prevPage = () => {
    if (page > 0) {
      // 이제 1,2,3,4에서 뒤로가기 가능
      setPage(page - 1);
      setIsListening(false);
      setHintIndex((prev) => ({ ...prev, [page - 1]: 0 }));
    }
  };

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "20px auto",
        padding: "0 16px",
        userSelect: "none",
        position: "relative",
      }}
    >
      {/* 상단 텍스트 */}
      <div
        style={{
          position: "absolute",
          top: "-70px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          zIndex: 10,
          userSelect: "none",
        }}
      >
        표현 학습하기
      </div>

      <QuizBox
        korean={quizzes[page].korean}
        english={quizzes[page].english}
        userAnswers={userAnswers[page] || {}}
        onAnswerChange={handleAnswerChange}
        feedback={feedback[page] || {}}
        page={page}
      />

      <QuizButtons
        onShowHint={showHint}
        onVoiceToggle={toggleVoice}
        onShowAnswer={showAnswer}
        isListening={isListening}
        images={{
          hint: hintImg,
          voice: voiceImg,
          voiceActive: voiceActiveImg,
          answer: answerImg,
        }}
      />

      {/* 하단 박스 */}
      <img
        src={bottomBoxImg}
        alt="Bottom Box"
        style={{
          position: "absolute",
          bottom: -240,
          left: 0,
          width: "100%",
          zIndex: 2,
          transform: "scale(1.14)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* 페이지 네비게이션 */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          color: "#666",
        }}
      >
        {page > 0 ? (
          <button onClick={prevPage}>이전</button>
        ) : (
          <div style={{ width: "40px" }} />
        )}

        {page < quizzes.length - 1 ? (
          isAllCorrect() ? (
            <button onClick={nextPage}>다음</button>
          ) : (
            <div
              style={{
                width: "40px",
                textAlign: "right",
                visibility: "hidden",
              }}
            >
              다음
            </div>
          )
        ) : (
          <div style={{ width: "40px" }} />
        )}
      </div>
    </div>
  );
}
