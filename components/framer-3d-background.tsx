"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Framer3DBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 border-2 border-cyan-400/20 rounded-lg"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            rotateX: mousePosition.y * 20 + scrollY * 0.1,
            rotateY: mousePosition.x * 20 + scrollY * 0.05,
            translateZ: Math.sin(scrollY * 0.01 + i) * 50,
            scale: 1 + Math.sin(scrollY * 0.005 + i) * 0.2,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 blur-3xl"
        style={{
          left: "10%",
          top: "20%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: scrollY * 0.1,
          x: mousePosition.x * 50,
          y: mousePosition.y * 30,
        }}
        transition={{
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY },
          rotate: { duration: 0.1 },
          x: { duration: 0.5 },
          y: { duration: 0.5 },
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/10 to-cyan-600/10 blur-3xl"
        style={{
          right: "10%",
          bottom: "20%",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: -scrollY * 0.05,
          x: -mousePosition.x * 30,
          y: -mousePosition.y * 40,
        }}
        transition={{
          scale: { duration: 6, repeat: Number.POSITIVE_INFINITY },
          rotate: { duration: 0.1 },
          x: { duration: 0.5 },
          y: { duration: 0.5 },
        }}
      />
    </div>
  )
}
