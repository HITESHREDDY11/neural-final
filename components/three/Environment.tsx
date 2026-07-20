'use client';

/**
 * Environment.tsx — Blueprint cleanroom scene
 *
 * Labels: plain illuminated text sitting directly above each object.
 * - No leader lines, no extensions, no CAD elbow.
 * - Text is a child of the object group → moves with it automatically.
 * - Yaw-only billboard: compensates camera horizontal rotation so text
 *   always faces the viewer. Pitch is NOT compensated so the label stays
 *   "lying" in the scene like a real blueprint annotation.
 * - Font: Outfit Light 300 (matches the website) loaded via Google Fonts URL.
 * - Reveal: sequential opacity fade-in driven by clock.elapsedTime.
 *   Zero React state mutations in the hot path.
 * - Hover: cursor over object → label brightens, subtle glow increase.
 */

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// ─── Palette ──────────────────────────────────────────────────────────────────
const BLUE     = '#3b82f6';
const BLUE_DIM = '#1e3a5f';
const WHT_DIM  = '#64748b';

// Blueprint indicator animation — pre-allocated, mutated in useFrame
const _cBlue = new THREE.Color('#3b82f6');
const _cCyan = new THREE.Color('#22d3ee');

// Label colour — mutated in useFrame, never re-allocated
const _labelColor = new THREE.Color();

// Outfit Light 300 served locally — prevents Suspense hang due to 404/network errors
const OUTFIT_URL = '/assets/outfit.woff';

// ─── Reveal timing (seconds) ──────────────────────────────────────────────────
const T_LABEL_START = 2.2;   // first label starts fading in
const T_LABEL_STAG  = 0.40;  // stagger between each label
const T_LABEL_DUR   = 0.80;  // fade-in duration per label
const T_GLOW_START  = 5.5;   // idle breathing begins after all labels are in

/** Smooth linear ramp 0 → 1 clamped */
function ramp(t: number, t0: number, dur: number) {
  return Math.min(1, Math.max(0, (t - t0) / dur));
}

// ─── Geometry helpers ─────────────────────────────────────────────────────────

const WireBox = React.memo(function WireBox({ position, size, color = BLUE, opacity = 0.35 }: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  const [sx, sy, sz] = size;
  const geo  = useMemo(() => new THREE.BoxGeometry(sx, sy, sz), [sx, sy, sz]);
  const edge = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  return (
    <lineSegments geometry={edge} position={position}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
});

const GridPanel = React.memo(function GridPanel({ position, rotation, size, color = BLUE_DIM, opacity = 0.06 }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number];
  color?: string;
  opacity?: number;
}) {
  const [sw, sh] = size;
  const geo = useMemo(() => new THREE.PlaneGeometry(sw, sh), [sw, sh]);
  return (
    <mesh position={position} rotation={rotation} geometry={geo}>
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
});

// ─── Invisible hit mesh for pointer events ────────────────────────────────────

const HitMesh = React.memo(function HitMesh({ size, center, onEnter, onLeave }: {
  size: [number, number, number];
  center: [number, number, number];
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [sx, sy, sz] = size;
  const geo = useMemo(() => new THREE.BoxGeometry(sx, sy, sz), [sx, sy, sz]);
  return (
    <mesh position={center} geometry={geo} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
});

// ─── Label component ──────────────────────────────────────────────────────────
// Sits at `localY` above the parent group's origin.
// Yaw-only billboard so it faces the camera horizontally.

interface LabelProps {
  text: string;
  /** Local Y position above the object */
  localY: number;
  revealIndex: number;
  hoveredRef: React.MutableRefObject<boolean>;
}

const Label = React.memo(function Label({ text, localY, revealIndex, hoveredRef }: LabelProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const textRef  = useRef<any>(null);
  const hoverT   = useRef(0);
  const _euler   = useMemo(() => new THREE.Euler(), []);

  React.useEffect(() => {
    if (textRef.current && textRef.current.material) {
      const mat = textRef.current.material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => {
          m.transparent = true;
        });
      } else {
        mat.transparent = true;
      }
    }
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Reveal alpha
    const alpha = ramp(t, T_LABEL_START + revealIndex * T_LABEL_STAG, T_LABEL_DUR);

    // Breathing glow after full reveal
    const elapsed = Math.max(0, t - T_GLOW_START);
    const breath  = elapsed > 0
      ? 0.06 * Math.sin(elapsed * 0.7 + revealIndex * 1.3)
      : 0;

    // Hover (lerp, no React state)
    hoverT.current += ((hoveredRef.current ? 1 : 0) - hoverT.current) * 0.08;
    const h = hoverT.current;

    // Apply directly to material
    if (textRef.current && textRef.current.material) {
      const mat = textRef.current.material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => {
          m.opacity = alpha * (0.72 + breath + h * 0.28);
          if ('color' in m && m.color) {
            (m.color as THREE.Color).setRGB(
              0.55 + h * 0.45,
              0.88 + h * 0.12,
              0.96 + h * 0.04
            );
          }
        });
      } else {
        mat.opacity = alpha * (0.72 + breath + h * 0.28);
        if ('color' in mat && mat.color) {
          (mat.color as THREE.Color).setRGB(
            0.55 + h * 0.45,
            0.88 + h * 0.12,
            0.96 + h * 0.04
          );
        }
      }
    }

    // Yaw-only billboard — compensate camera Y rotation only
    if (groupRef.current) {
      _euler.setFromQuaternion(camera.quaternion, 'YXZ');
      _euler.x = 0;
      _euler.z = 0;
      groupRef.current.quaternion.setFromEuler(_euler);
    }
  });

  return (
    <group ref={groupRef} position={[0, localY, 0]}>
      <Text
        ref={textRef}
        font={OUTFIT_URL}
        fontSize={0.18}
        letterSpacing={0.14}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0}
        color="#8eefff"
        depthOffset={-2}
        renderOrder={10}
        maxWidth={6}
        overflowWrap="normal"
        whiteSpace="nowrap"
        outlineWidth={0.004}
        outlineOpacity={0.0}
        outlineColor="#22d3ee"
      >
        {text}
      </Text>
    </group>
  );
});

// ─── Equipment ────────────────────────────────────────────────────────────────

const CleanDoor = React.memo(function CleanDoor({ position, rotation = [0, 0, 0], phase = 0, label, revealIndex }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  phase?: number;
  label: string;
  revealIndex: number;
}) {
  const panelRef   = useRef<THREE.Group>(null);
  const indRef     = useRef<THREE.Mesh>(null);
  const hoveredRef = useRef(false);

  const panelGeo  = useMemo(() => new THREE.BoxGeometry(1.1, 2.1, 0.03), []);
  const panelEdge = useMemo(() => new THREE.EdgesGeometry(panelGeo), [panelGeo]);

  useFrame(({ clock }) => {
    const open = Math.sin(clock.elapsedTime * 0.4 + phase) * 0.5 + 0.5;
    if (panelRef.current)
      panelRef.current.rotation.y = -open * (Math.PI * 0.45);
    if (indRef.current)
      (indRef.current.material as THREE.MeshBasicMaterial)
        .color.lerpColors(_cBlue, _cCyan, open);
  });

  return (
    <group position={position} rotation={rotation}>
      <HitMesh
        size={[1.4, 2.6, 0.4]}
        center={[0, 1.2, 0]}
        onEnter={() => { hoveredRef.current = true; }}
        onLeave={() => { hoveredRef.current = false; }}
      />

      {/* Frame */}
      <WireBox position={[0, 1.1, 0]} size={[1.2, 2.2, 0.08]} color={BLUE} opacity={0.5} />

      {/* Status strip */}
      <mesh ref={indRef} position={[0, 2.05, 0.05]}>
        <boxGeometry args={[0.9, 0.04, 0.02]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.9} />
      </mesh>

      {/* Swinging panel */}
      <group ref={panelRef} position={[-0.55, 0, 0]}>
        <mesh position={[0.55, 1.1, 0]}>
          <boxGeometry args={[1.1, 2.1, 0.03]} />
          <meshBasicMaterial color={BLUE_DIM} transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments geometry={panelEdge} position={[0.55, 1.1, 0]}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.4} />
        </lineSegments>
        <mesh position={[1.05, 1.1, 0.06]}>
          <boxGeometry args={[0.04, 0.2, 0.04]} />
          <meshBasicMaterial color={BLUE} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Label floats just above the top of the frame */}
      <Label
        text={label}
        localY={2.55}
        revealIndex={revealIndex}
        hoveredRef={hoveredRef}
      />
    </group>
  );
});

const PassBox = React.memo(function PassBox({ position }: { position: [number, number, number] }) {
  const leftRef    = useRef<THREE.Group>(null);
  const rightRef   = useRef<THREE.Group>(null);
  const uvRef      = useRef<THREE.Mesh>(null);
  const hoveredRef = useRef(false);

  const doorGeo  = useMemo(() => new THREE.BoxGeometry(0.6, 0.85, 0.02), []);
  const doorEdge = useMemo(() => new THREE.EdgesGeometry(doorGeo), [doorGeo]);

  useFrame(({ clock }) => {
    const open = Math.sin(clock.elapsedTime * 0.35) * 0.5 + 0.5;
    const s = open * 0.28;
    if (leftRef.current)  leftRef.current.position.x  = -0.32 - s;
    if (rightRef.current) rightRef.current.position.x =  0.32 + s;
    if (uvRef.current)
      (uvRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + open * 0.55;
  });

  return (
    <group position={position}>
      <HitMesh
        size={[1.6, 1.4, 1.0]}
        center={[0, 0.5, 0]}
        onEnter={() => { hoveredRef.current = true; }}
        onLeave={() => { hoveredRef.current = false; }}
      />

      <WireBox position={[0, 0.5, 0]} size={[1.4, 1, 0.8]} color={BLUE} opacity={0.4} />
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.35, 0.95, 0.75]} />
        <meshBasicMaterial color={BLUE_DIM} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      <group ref={leftRef} position={[-0.32, 0.5, 0.42]}>
        <lineSegments geometry={doorEdge}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.5} />
        </lineSegments>
        <mesh>
          <boxGeometry args={[0.58, 0.83, 0.015]} />
          <meshBasicMaterial color={BLUE_DIM} transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={rightRef} position={[0.32, 0.5, 0.42]}>
        <lineSegments geometry={doorEdge}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.5} />
        </lineSegments>
        <mesh>
          <boxGeometry args={[0.58, 0.83, 0.015]} />
          <meshBasicMaterial color={BLUE_DIM} transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <mesh ref={uvRef} position={[0, 0.92, 0.43]}>
        <boxGeometry args={[1.2, 0.03, 0.01]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.85} />
      </mesh>
      <WireBox position={[0, 0.5, 0]} size={[1.3, 0.02, 0.7]} color={WHT_DIM} opacity={0.2} />

      <Label text="PASS BOX" localY={1.22} revealIndex={2} hoveredRef={hoveredRef} />
    </group>
  );
});

const AirShower = React.memo(function AirShower({ position }: { position: [number, number, number] }) {
  const nozzleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const hoveredRef = useRef(false);
  const nozzles    = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let y = 0.5; y <= 2; y += 0.5)
      for (let z = -0.3; z <= 0.3; z += 0.3) {
        arr.push([-0.55, y, z]);
        arr.push([ 0.55, y, z]);
      }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    nozzleRefs.current.forEach((m, i) => {
      if (!m) return;
      const v = Math.sin(t * 2 + (i / nozzles.length) * Math.PI * 2) * 0.5 + 0.5;
      (m.material as THREE.MeshBasicMaterial).opacity = 0.2 + v * 0.6;
      m.scale.setScalar(0.8 + v * 0.4);
    });
  });

  return (
    <group position={position}>
      <HitMesh
        size={[1.5, 2.8, 1.5]}
        center={[0, 1.25, 0]}
        onEnter={() => { hoveredRef.current = true; }}
        onLeave={() => { hoveredRef.current = false; }}
      />

      <WireBox position={[0, 1.25, 0]} size={[1.3, 2.5, 1.3]} color={BLUE} opacity={0.35} />
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.25, 2.45, 1.25]} />
        <meshBasicMaterial color={BLUE_DIM} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {nozzles.map((p, i) => (
        <mesh key={i} position={p} ref={(el) => { nozzleRefs.current[i] = el; }}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={BLUE} transparent opacity={0.6} />
        </mesh>
      ))}

      <WireBox position={[0, 0.02, 0]} size={[1.25, 0.02, 1.25]} color={WHT_DIM} opacity={0.25} />
      <WireBox position={[0, 2.6,  0]} size={[1.1,  0.2,  1.1 ]} color={BLUE}   opacity={0.5} />
      <mesh position={[0, 2.6, 0]}>
        <boxGeometry args={[1.05, 0.15, 1.05]} />
        <meshBasicMaterial color={BLUE_DIM} transparent opacity={0.15} />
      </mesh>

      <Label text="AIR SHOWER" localY={3.05} revealIndex={3} hoveredRef={hoveredRef} />
    </group>
  );
});

// ─── Scene root ───────────────────────────────────────────────────────────────

export default function Environment() {
  return (
    <group>
      {/* Floor */}
      <GridPanel position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} size={[16, 16]} opacity={0.04} />
      <gridHelper args={[16, 32, BLUE, BLUE_DIM]} position={[0, 0.001, 0]} />

      {/* Walls */}
      <WireBox position={[0,   1.5, -4]}   size={[8,    3,    0.05]} color={BLUE} opacity={0.25} />
      <WireBox position={[-4,  1.5,  0]}   size={[0.05, 3,    8   ]} color={BLUE} opacity={0.25} />
      <WireBox position={[4,   1.5, -2]}   size={[0.05, 3,    4   ]} color={BLUE} opacity={0.25} />
      <WireBox position={[4,   1.5,  2.5]} size={[0.05, 3,    3   ]} color={BLUE} opacity={0.25} />
      <WireBox position={[-2,  1.5,  4]}   size={[4,    3,    0.05]} color={BLUE} opacity={0.25} />
      <WireBox position={[2.5, 1.5,  4]}   size={[3,    3,    0.05]} color={BLUE} opacity={0.25} />

      <GridPanel position={[0,  1.5, -4]} size={[8, 3]} opacity={0.03} />
      <GridPanel position={[-4, 1.5,  0]} rotation={[0, Math.PI / 2, 0]} size={[8, 3]} opacity={0.03} />

      {/* Equipment */}
      <CleanDoor
        position={[4, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        phase={0}
        label="INTERLOCKING DOOR"
        revealIndex={0}
      />
      <PassBox position={[-1.5, 0, -3.8]} />
      <AirShower position={[0.5, 0, 3.5]} />
      <CleanDoor
        position={[-3.5, 0, 4]}
        phase={Math.PI}
        label="DOOR"
        revealIndex={1}
      />

      {/* Ceiling */}
      <WireBox position={[0, 3, 0]} size={[8, 0.02, 8]} color={BLUE_DIM} opacity={0.2} />

      {/* Corner pillars */}
      {([-4, 4] as const).flatMap((x) =>
        ([-4, 4] as const).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 1.5, z]}>
            <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
            <meshBasicMaterial color={BLUE} transparent opacity={0.4} />
          </mesh>
        ))
      )}
    </group>
  );
}
