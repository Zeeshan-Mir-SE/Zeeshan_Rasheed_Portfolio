import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Float, Icosahedron, Torus, Octahedron } from '@react-three/drei'

// A soft blurred "cloud" made from overlapping low-poly spheres.
function Cloud({ position, scale = 1 }) {
  const group = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.position.x = position[0] + Math.sin(t * 0.08 + position[1]) * 0.35
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
    if (ref.current) ref.current.position.y = 1.6 + Math.sin(t * 0.16) * 0.1
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
  const color = isNight ? '#4169E1' : '#5AA9E6'
  const color2 = isNight ? '#C7F000' : '#FDB750'
  return (
    <>
      {/* Top-left corner, well clear of the headline */}
      <Float speed={0.55} rotationIntensity={0.55} floatIntensity={0.75}>
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
      <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.65}>
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
      <Float speed={0.65} rotationIntensity={0.5} floatIntensity={0.8}>
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
      dpr={[1, 1.1]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={isNight ? 0.35 : 0.9} />
      <directionalLight position={[3, 4, 2]} intensity={isNight ? 0.4 : 1} />

      {isNight ? (
        <>
          <Stars radius={60} depth={40} count={1400} factor={2.2} saturation={0} fade speed={0.12} />
          <Sparkles count={24} scale={[8, 5, 4]} size={2.2} speed={0.1} color="#F0EEE9" opacity={0.55} />
        </>
      ) : (
        <>
          <Sun />
          {clouds.map((c, i) => (
            <Cloud key={i} position={c} scale={0.9 + i * 0.15} />
          ))}
          <Sparkles count={16} scale={[8, 5, 4]} size={1.5} speed={0.1} color="#ffffff" opacity={0.35} />
        </>
      )}

      <FloatingTechShapes isNight={isNight} />
    </Canvas>
  )
}