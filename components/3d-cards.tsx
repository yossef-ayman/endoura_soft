"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface Card3DProps {
  children: ReactNode
  className?: string
}

export function Card3D({ children, className = "" }: Card3DProps) {
  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      whileHover={{
        rotateY: 5,
        rotateX: 5,
        scale: 1.05,
        z: 50,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <Card className="transform-gpu hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border-cyan-500/20">
        {children}
      </Card>
    </motion.div>
  )
}

export function FloatingElement({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
