"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, ExternalLink, Play, Video } from "lucide-react"
import { PortfolioModal } from "./portfolio-modal"
import Image from "next/image"

interface PortfolioProject {
  id: string
  title: string
  description: string
  image: string
  previewUrl: string
  videoUrl?: string
  technologies: string[]
  category: string
  completedDate: string
  clientName: string
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform with advanced features including real-time inventory management, payment processing, and customer analytics.",
    image: "/modern-ecommerce-dashboard.png",
    previewUrl: "https://demo-ecommerce.vercel.app",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder video
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    category: "Web Development",
    completedDate: "March 2024",
    clientName: "TechMart Solutions",
  },
  {
    id: "2",
    title: "Healthcare Management System",
    description:
      "Comprehensive healthcare management system for clinics and hospitals with patient records, appointment scheduling, and billing integration.",
    image: "/healthcare-management-dashboard.png",
    previewUrl: "https://demo-healthcare.vercel.app",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Material-UI"],
    category: "Web Application",
    completedDate: "February 2024",
    clientName: "MediCare Plus",
  },
  {
    id: "3",
    title: "Real Estate Mobile App",
    description:
      "Cross-platform mobile application for real estate listings with advanced search, virtual tours, and mortgage calculator.",
    image: "/real-estate-app-interface.png",
    previewUrl: "https://demo-realestate.vercel.app",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder video
    technologies: ["React Native", "Firebase", "Google Maps API", "Redux"],
    category: "Mobile Development",
    completedDate: "January 2024",
    clientName: "PropertyHub Inc",
  },
  {
    id: "4",
    title: "Learning Management System",
    description:
      "Educational platform with course management, video streaming, progress tracking, and interactive assessments.",
    image: "/lms-dashboard.png",
    previewUrl: "https://demo-lms.vercel.app",
    technologies: ["Vue.js", "Laravel", "MySQL", "AWS S3", "WebRTC"],
    category: "Web Development",
    completedDate: "December 2023",
    clientName: "EduTech Academy",
  },
  {
    id: "5",
    title: "Restaurant POS System",
    description: "Point of sale system for restaurants with order management, inventory tracking, and sales analytics.",
    image: "/restaurant-pos-system-interface.jpg",
    previewUrl: "https://demo-pos.vercel.app",
    technologies: ["Angular", "Express.js", "PostgreSQL", "Chart.js"],
    category: "Business Software",
    completedDate: "November 2023",
    clientName: "Gourmet Bistro",
  },
  {
    id: "6",
    title: "Social Media Analytics Tool",
    description:
      "Advanced analytics platform for social media management with sentiment analysis and performance tracking.",
    image: "/social-media-analytics-dashboard.png",
    previewUrl: "https://demo-analytics.vercel.app",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder video
    technologies: ["Python", "Django", "React", "D3.js", "Redis"],
    category: "Data Analytics",
    completedDate: "October 2023",
    clientName: "SocialBoost Agency",
  },
]

interface PortfolioShowcaseProps {
  language: "ar" | "en"
  extraProjects?: PortfolioProject[]
  onRequestSimilar: (projectName: string) => void
  isAdmin?: boolean
  onEdit?: (project: PortfolioProject) => void
}

export function PortfolioShowcase({
  language,
  extraProjects = [],
  onRequestSimilar,
  isAdmin,
  onEdit
}: PortfolioShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const t = {
    ar: {
      title: "أعمالنا المتميزة",
      description: "استكشف مشاريعنا الأخيرة وكيف ساعدنا الشركات على تحقيق أهدافها الرقمية بأحدث التقنيات.",
      all: "الكل",
      details: "التفاصيل",
      live: "مباشر",
      video: "فيديو",
      watchVideo: "شاهد الفيديو",
    },
    en: {
      title: "Our Masterpieces",
      description: "Explore our recent projects and see how we've helped businesses achieve their digital goals with cutting-edge technology.",
      all: "All",
      details: "Details",
      live: "Live",
      video: "Video",
      watchVideo: "Watch Video",
    },
  }[language]

  const allProjects = [...portfolioProjects, ...extraProjects]
  const categories = [t.all, ...Array.from(new Set(allProjects.map((p) => p.category)))]

  const filteredProjects =
    selectedCategory === t.all ? allProjects : allProjects.filter((p) => p.category === selectedCategory)

  const handleViewProject = (project: PortfolioProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="portfolio" className="py-24 px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {t.description}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "premium" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full px-6 transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="group relative h-full flex flex-col overflow-hidden border-none bg-background/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 ring-1 ring-white/10">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Badge for Video */}
                    {project.videoUrl && (
                      <div className="absolute top-3 left-3 z-20">
                        <Badge className="bg-primary/90 backdrop-blur-md border-none px-2 py-1 flex gap-1 items-center">
                          <Video className="w-3 h-3" />
                          {t.video}
                        </Badge>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                      <div className="flex gap-3 mb-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        <Button
                          size="sm"
                          onClick={() => handleViewProject(project)}
                          className="bg-primary hover:bg-primary/90 rounded-full"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {t.details}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          asChild
                          className="rounded-full shadow-lg"
                        >
                          <a href={project.previewUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {t.live}
                          </a>
                        </Button>
                        {isAdmin && onEdit && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(project)}
                            className="bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-white/20 rounded-full"
                          >
                            <Play className="h-4 w-4 mr-2 rotate-90" />
                            {language === "ar" ? "تعديل" : "Edit"}
                          </Button>
                        )}
                      </div>
                      {project.videoUrl && (
                        <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full border-white/20 text-white hover:bg-white/10"
                            asChild
                          >
                            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                              <Play className="h-4 w-4 mr-2 fill-current" />
                              {t.watchVideo}
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <CardHeader className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-primary border-primary/30">
                        {project.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {project.completedDate}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] font-medium bg-muted px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                        <span className="text-xs font-semibold">{project.clientName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Portfolio Modal */}
        <PortfolioModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRequestSimilar={onRequestSimilar}
        />
      </div>
    </section>
  )
}
