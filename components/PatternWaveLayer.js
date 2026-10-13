"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import PatternWaves from "@/src/component/PatternWaves";

export default function PatternWaveLayer() {
  const ref = useRef(null);
  const isNearViewport = useInView(ref, { margin: "250px" });

  return (
    <div ref={ref} className="pattern-wave-layer" aria-hidden="true">
      {isNearViewport && (
        <PatternWaves
          preset="silk"
          color="#9ede3f"
          backgroundColor="rgba(0, 0, 0, 0)"
          opacity={0.5}
          speed={0.28}
          interactive={false}
        />
      )}
    </div>
  );
}