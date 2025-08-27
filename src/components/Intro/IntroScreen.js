// IntroScreen.js
import React from "react";
import { motion } from "framer-motion";

import introImageTop from "assets/mvp_icon_v1/main_logo/logo_bird.png";
import introImageBottom from "assets/mvp_icon_v1/main_logo/logo_word.png";

export function IntroScreen({ onClick }) {
  return (
    <motion.div
      className="w-full h-full flex flex-col justify-center items-center cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      {/* 위쪽 이미지 */}
      <img
        src={introImageTop}
        alt="Intro Top"
        className="w-[120px] mb-[40px] -mt-8 object-contain"
      />

      {/* 아래쪽 이미지 */}
      <img
        src={introImageBottom}
        alt="Intro Bottom"
        className="w-[80px] object-contain"
      />
    </motion.div>
  );
}
