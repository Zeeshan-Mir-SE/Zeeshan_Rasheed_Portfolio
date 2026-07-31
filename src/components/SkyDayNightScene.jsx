import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Float, Icosahedron, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

// A soft blurred "cloud" made from overlapping low-poly spheres.
function Cloud({ position, scale = 1 }) {
  const group = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.position.x = position[0] + Math.sin(t * 0.15 + position[1]) * 0.6
    }
  })
  return (
    <group ref={group} position={position} scale={scale}>
      {[[0, 0, 0], [0.6, 0.15, 0.1], [-0.6, 0.1, -0.1], [0.25, -0.15, 0.2]].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.55, 12, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function Sun() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) ref.current.position.y = 1.6 + Math.sin(t * 0.3) * 0.15
  })
  return (
    <mesh ref={ref} position={[2.6, 1.6, -2]}>
      <sphereGeometry args={[0.9, 32, 32]} />
      <meshStandardMaterial color="#FDB750" emissive="#FDB750" emissiveIntensity={1.4} />
    </mesh>
  )
}

// Floating tech-icon-like shapes used both in day (softer, glassy) and night (glowing) modes
function FloatingTechShapes({ isNight }) {
  const color = isNight ? '#8B7CFF' : '#5AA9E6'
  const color2 = isNight ? '#33D6C0' : '#FDB750'
  return (
    <>
      {/* Top-left corner, well clear of the headline */}
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.3}>
        <Icosahedron args={[0.4, 0]} position={[-4.6, 2.6, -4]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isNight ? 0.35 : 0.1}
            roughness={0.25}
            metalness={0.3}
          />
        </Icosahedron>
      </Float>
      {/* Bottom-left corner, clear of paragraph/buttons */}
      <Float speed={1.1} rotationIntensity={1.2} floatIntensity={1.1}>
        <Torus args={[0.38, 0.12, 16, 32]} position={[-4.8, -3, -4.5]}>
          <meshStandardMaterial
            color={color2}
            emissive={color2}
            emissiveIntensity={isNight ? 0.35 : 0.1}
            roughness={0.3}
            metalness={0.2}
          />
        </Torus>
      </Float>
      {/* Far background, behind the photo column so it never overlaps it visually */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.4}>
        <Octahedron args={[0.3, 0]} position={[4.6, 2.4, -5]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isNight ? 0.3 : 0.08}
            roughness={0.3}
            metalness={0.25}
          />
        </Octahedron>
      </Float>
    </>
  )
}

export default function SkyDayNightScene({ isNight }) {
  const clouds = useMemo(
    () => [
      [-3.2, 1.4, -2],
      [3.4, 2, -3],
      [-1.2, 2.4, -3.5],
    ],
    []
  )

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={isNight ? 0.35 : 0.9} />
      <directionalLight position={[3, 4, 2]} intensity={isNight ? 0.4 : 1} />

      {isNight ? (
        <>
          <Stars radius={60} depth={40} count={3500} factor={2.2} saturation={0} fade speed={0.6} />
          <Sparkles count={40} scale={[8, 5, 4]} size={2.5} speed={0.3} color="#EAF0FF" opacity={0.7} />
        </>
      ) : (
        <>
          <Sun />
          {clouds.map((c, i) => (
            <Cloud key={i} position={c} scale={0.9 + i * 0.15} />
          ))}
          <Sparkles count={25} scale={[8, 5, 4]} size={1.5} speed={0.2} color="#ffffff" opacity={0.35} />
        </>
      )}

      <FloatingTechShapes isNight={isNight} />
    </Canvas>
  )
}
