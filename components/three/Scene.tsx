'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerformanceMonitor } from '@react-three/drei';
import { ACESFilmicToneMapping } from 'three';
import * as THREE from 'three';

import Lighting from './Lighting';
import Environment from './Environment';

/**
 * Auto-rotating camera with mouse parallax.
 * Pauses auto-orbit while the user is actively dragging/touching OrbitControls.
 */
function AutoOrbit({
  orbitCenterX,
  isInteracting,
  inView,
}: {
  orbitCenterX: number;
  isInteracting: React.MutableRefObject<boolean>;
  inView: boolean;
}) {
  const { camera, pointer } = useThree();
  const angle = useRef(0);
  // Store the camera position at the moment the user grabs, so we can resume smoothly
  const resumeAngle = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (!inView) return;

    // If user is dragging, let OrbitControls own the camera
    if (isInteracting.current) {
      // Sync angle so when we resume, we orbit from where OrbitControls left off
      const dx = camera.position.x - orbitCenterX;
      const dz = camera.position.z;
      resumeAngle.current = Math.atan2(dx, dz);
      return;
    }

    // Snap angle to resume position once the user releases
    if (resumeAngle.current !== null) {
      angle.current = resumeAngle.current;
      resumeAngle.current = null;
    }

    angle.current += delta * 0.08;
    const t = state.clock.elapsedTime;

    // Mouse parallax offset (subtle)
    const px = pointer.x * 0.6;
    const py = pointer.y * 0.3;

    const radius = 7.5;
    camera.position.x = orbitCenterX + Math.sin(angle.current) * radius + px;
    camera.position.z = Math.cos(angle.current) * radius;
    camera.position.y = 3 + py + Math.sin(t * 0.3) * 0.15;
    camera.lookAt(orbitCenterX, 1.2, 0);
  });

  return null;
}

function SceneContents({ inView }: { inView: boolean }) {
  const { size, advance } = useThree();
  const isMobile = size.width < 768;
  const orbitCenterX = isMobile ? 0 : -1.8;
  const isInteracting = useRef(false);

  return (
    <>
      <Lighting />
      <Environment />
      <AutoOrbit orbitCenterX={orbitCenterX} isInteracting={isInteracting} inView={inView} />
      <OrbitControls
        target={[orbitCenterX, 1.2, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.4}
        onStart={() => { isInteracting.current = true; }}
        onEnd={() => { isInteracting.current = false; }}
      />
    </>
  );
}

export default function Scene({ inView = true }: { inView?: boolean }) {
  const [dpr, setDpr] = useState<number>(1);

  // Set high-resolution DPR safely after client mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDpr(Math.min(window.devicePixelRatio || 2, 2));
    }
  }, []);

  return (
    <Canvas
      frameloop={inView ? 'always' : 'demand'}
      shadows={false}
      dpr={dpr}
      gl={{
        antialias: true,         // Ultra-sharp 1080p line anti-aliasing
        alpha: true,
        precision: 'highp',      // High precision floating point rendering
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 3, 7.5], fov: 45, near: 0.5, far: 60 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SceneContents inView={inView} />
      </Suspense>
    </Canvas>
  );
}
