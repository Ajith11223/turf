"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createBallTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = "#f4f8f1";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const columns = 12;
  const rows = 8;
  const cellWidth = canvas.width / columns;
  const cellHeight = canvas.height / rows;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const centerX = column * cellWidth + (row % 2) * cellWidth * 0.5;
      const centerY = row * cellHeight + cellHeight * 0.5;
      const radiusX = cellWidth * 0.34;
      const radiusY = cellHeight * 0.34;
      context.beginPath();
      for (let side = 0; side < 6; side += 1) {
        const angle = (Math.PI / 3) * side;
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY + Math.sin(angle) * radiusY;
        if (side === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.fillStyle = (row * 5 + column * 3) % 5 === 0 ? "#10251a" : "#f4f8f1";
      context.fill();
      context.strokeStyle = "#aab8ac";
      context.lineWidth = 3;
      context.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function HeroBall() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
      });
    } catch {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.z = 11;

    scene.add(new THREE.HemisphereLight(0xf4f8f1, 0x294b31, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(-3, 5, 8);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x9ede3f, 1.8);
    rimLight.position.set(4, -2, 3);
    scene.add(rimLight);

    const texture = createBallTexture();
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: texture,
      roughness: 0.5,
      metalness: 0.02,
      clearcoat: 0.18,
      transparent: true
    });
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.42, 48, 32), material);
    scene.add(ball);

    let visible = true;
    let frame = 0;
    const startedAt = performance.now();

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = (now) => {
      frame = 0;
      if (!visible) return;

      const elapsed = reducedMotion ? 4 : (now - startedAt) / 1000;
      const cycle = elapsed % 10.5;
      const progress = reducedMotion ? 0.5 : Math.min(cycle / 8, 1);
      const active = reducedMotion || cycle < 8;
      ball.visible = active;

      if (active) {
        const halfHeight = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const halfWidth = halfHeight * camera.aspect;
        ball.position.x = THREE.MathUtils.lerp(-halfWidth - 0.6, halfWidth + 0.6, progress);
        ball.position.y = -halfHeight * 0.44 + Math.sin(progress * Math.PI * 4) * 0.12;
        ball.rotation.z = -progress * Math.PI * 8;
        ball.rotation.x = Math.sin(progress * Math.PI * 2) * 0.16;
        if (!reducedMotion) {
          const fade = Math.min(progress / 0.08, (1 - progress) / 0.08, 1);
          material.opacity = Math.max(0, fade) * 0.96;
        }
      }

      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frame && visible && !reducedMotion) frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (reducedMotion) render(performance.now());
        else schedule();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    visibilityObserver.observe(host);
    resize();
    if (reducedMotion) render(performance.now());
    else schedule();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      ball.geometry.dispose();
      material.dispose();
      texture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-ball-layer" aria-hidden="true" />;
}