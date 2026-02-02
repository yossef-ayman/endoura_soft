"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Text, MeshDistortMaterial, Float } from "@react-three/drei"
import type * as THREE from "three"

interface Card3DProps {
  title: string
  description: string
  position: [number, number, number]
  color: string
}

function Card3D({ title, description, position, color }: Card3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.scale.setScalar(hovered ? 1.1 : clicked ? 0.95 : 1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <Box
          ref={meshRef}
          args={[2, 3, 0.2]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onPointerDown={() => setClicked(true)}
          onPointerUp={() => setClicked(false)}
        >
          <MeshDistortMaterial
            color={color}
            distort={hovered ? 0.3 : 0.1}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Box>

        <Text
          position={[0, 0.5, 0.15]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          {title}
        </Text>

        <Text
          position={[0, -0.2, 0.15]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          textAlign="center"
          font="/fonts/Geist_Regular.json"
        >
          {description}
        </Text>
      </group>
    </Float>
  )
}

export default function Interactive3DCards() {
  const services = [
    {
      title: "Web Development",
      description: "Modern responsive websites",
      color: "#00bcd4",
    },
    {
      title: "Mobile Apps",
      description: "iOS & Android applications",
      color: "#4ecdc4",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful user experiences",
      color: "#45b7d1",
    },
  ]

  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#00bcd4" intensity={0.3} />

        {services.map((service, index) => (
          <Card3D
            key={index}
            title={service.title}
            description={service.description}
            position={[(index - 1) * 3, 0, 0]}
            color={service.color}
          />
        ))}
      </Canvas>
    </div>
  )
}
