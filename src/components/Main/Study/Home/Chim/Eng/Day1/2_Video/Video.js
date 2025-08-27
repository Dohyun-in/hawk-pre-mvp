// Video.js
import React, { useRef, useState, useEffect } from "react";
import videoSrc from "assets/video/26s.mp4";
import bottomBoxImg from "assets/mvp_icon_v1/study_tab/03study_course/01_Quize/bottom_box.png";
import subtitles from "./subtitles";
import "./Video.css"; // 추가된 CSS 파일
import { VideoButtons } from "./VideoButtons";
import { VideoSubtitles } from "./VideoSubtitles";

export default function Video() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showKorean, setShowKorean] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // 추가

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      const time = video.currentTime;
      setCurrentTime(time);

      const currentSentence = subtitles.enSentences.find(
        (s) => time >= s.start && time <= s.end
      );
      if (currentSentence) {
        const index = subtitles.enSentences.indexOf(currentSentence);
        setCurrentSentenceIndex(index);
      }
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      try {
        video.pause();
      } catch (_) {}
    };
  }, []);

  // 진행 상태에 맞게 CSS 변수 업데이트
  useEffect(() => {
    const input = document.querySelector(".video-slider");
    if (input && duration > 0) {
      const progress = (currentTime / duration) * 100;
      input.style.setProperty("--progress", `${progress}%`);
    }
  }, [currentTime, duration]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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
      <VideoSubtitles
        subtitles={subtitles}
        currentSentenceIndex={currentSentenceIndex} // 추가
        currentTime={currentTime}
        showEnglish={showEnglish}
        showKorean={showKorean}
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

      {/* 재생바 */}
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={currentTime}
        onChange={handleSeek}
        className="video-slider"
        style={{
          width: "90%",
          position: "absolute",
          bottom: 15,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      />

      {/* 버튼 영역 - VideoButtons로 분리 */}
      <VideoButtons
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        showEnglish={showEnglish}
        showKorean={showKorean}
        onToggleEnglish={() => setShowEnglish(!showEnglish)}
        onToggleKorean={() => setShowKorean(!showKorean)}
      />
    </div>
  );
}
