'use client';

/**
 * Blueprint scene lighting.
 * Dark blue ambient, blue accent points, white key for edge highlights.
 * Low intensity — the scene reads as a glowing blueprint, not a lit room.
 */
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1a2845" />

      {/* Soft key from above-front */}
      <directionalLight position={[3, 8, 4]} intensity={0.6} color="#60a5fa" />

      {/* Blue accent from left */}
      <pointLight position={[-5, 2, 2]} intensity={15} color="#3b82f6" distance={20} decay={2} />

      {/* Cyan accent from right-back */}
      <pointLight position={[5, 1, -3]} intensity={10} color="#22d3ee" distance={15} decay={2} />

      {/* Subtle fill from camera */}
      <pointLight position={[0, 3, 6]} intensity={4} color="#93c5fd" distance={15} decay={2} />
    </>
  );
}
