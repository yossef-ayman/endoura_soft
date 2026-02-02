"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Text3D,
  Environment,
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  useScroll,
  ScrollControls,
} from "@react-three/drei"
import * as THREE from "three"

// Floating 3D Logo
function FloatingLogo() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Text3D
        ref={meshRef}
        font="/fonts/Geist_Bold.json"
        size={1.5}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2, 0, 0]}
      >
        Endoura
        <MeshDistortMaterial color="#00bcd4" distort={0.3} speed={2} roughness={0.1} metalness={0.8} />
      </Text3D>
    </Float>
  )
}

// Interactive Geometric Shapes
function GeometricShapes() {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Sphere
          args={[0.8, 32, 32]}
          position={[3, 2, -2]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#ff6b6b" : "#00bcd4"}
            distort={hovered ? 0.6 : 0.3}
            speed={3}
            roughness={0.2}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Box args={[1, 1, 1]} position={[-3, -1, 1]}>
          <MeshDistortMaterial color="#4ecdc4" distort={0.2} speed={1.5} wireframe />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={3} floatIntensity={1.5}>
        <Torus args={[1, 0.3, 16, 100]} position={[2, -2, 2]}>
          <MeshDistortMaterial color="#45b7d1" distort={0.4} speed={2} roughness={0.1} metalness={0.7} />
        </Torus>
      </Float>
    </group>
  )
}

// Particle System
function ParticleField() {
  const points = useRef<THREE.Points>(null)
  const particlesCount = 1000

  useEffect(() => {
    if (points.current) {
      const positions = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      }

      points.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    }
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry />
      <pointsMaterial color="#00bcd4" size={0.02} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Scroll-controlled 3D Scene
function ScrollScene() {
  const scroll = useScroll()
  const meshRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (meshRef.current && scroll) {
      const offset = scroll.offset
      meshRef.current.rotation.y = offset * Math.PI * 2
      meshRef.current.position.y = offset * 5 - 2.5
    }
  })

  return (
    <group ref={meshRef}>
      <FloatingLogo />
      <GeometricShapes />
    </group>
  )
}

// Main 3D Scene Component
export default function AdvancedThreeScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#00bcd4" intensity={0.5} />

        <ScrollControls pages={4} damping={0.1}>
          <ScrollScene />
        </ScrollControls>

        <ParticleField />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
