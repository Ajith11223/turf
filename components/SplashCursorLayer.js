"use client";

import { useReducedMotion } from "framer-motion";
import SplashCursor from "@/src/component/SplashCursor";

export default function SplashCursorLayer() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <SplashCursor
      SIM_RESOLUTION={96}
      DYE_RESOLUTION={768}
      CAPTURE_RESOLUTION={256}
      PRESSURE_ITERATIONS={12}
      SPLAT_FORCE={3500}
      COLOR_UPDATE_SPEED={0}
      RAINBOW_MODE={false}
      COLOR="#9ede3f"
      TRANSPARENT
    />
  );
}