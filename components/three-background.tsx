"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ThreeBackgroundProps {
  className?: string
}

export function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const particlesRef = useRef<THREE.Points>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00bcd4,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    particlesRef.current = particlesMesh
    scene.add(particlesMesh)

    // Create geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.ConeGeometry(0.5, 1, 32),
    ]

    const material = new THREE.MeshBasicMaterial({
      color: 0x00bcd4,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })

    const shapes: THREE.Mesh[] = []
    for (let i = 0; i < 5; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const shape = new THREE.Mesh(geometry, material)
      shape.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20)
      shapes.push(shape)
      scene.add(shape)
    }

    camera.position.z = 5

    // Animation loop
    let scrollY = 0
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate particles based on scroll
      if (particlesRef.current) {
        particlesRef.current.rotation.x = scrollY * 0.0005
        particlesRef.current.rotation.y = scrollY * 0.0003
      }

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.002
        shape.rotation.y += 0.01 + index * 0.002
        shape.position.y = Math.sin(Date.now() * 0.001 + index) * 2
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle scroll
    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className={`fixed inset-0 -z-10 ${className}`} />
}
