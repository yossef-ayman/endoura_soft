"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Users, Monitor, Smartphone, Tablet, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioProject {
  id: string
  title: string
  description: string
  image: string
  previewUrl: string
  technologies: string[]
  category: string
  completedDate: string
  clientName: string
}

interface PortfolioModalProps {
  project: PortfolioProject | null
  isOpen: boolean
  onClose: () => void
  onRequestSimilar: (projectName: string) => void
}

type ViewportSize = "desktop" | "tablet" | "mobile"

export function PortfolioModal({ project, isOpen, onClose, onRequestSimilar }: PortfolioModalProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop")
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!project) return null

  const getViewportDimensions = () => {
    switch (viewportSize) {
      case "mobile":
        return { width: "375px", height: "667px" }
      case "tablet":
        return { width: "768px", height: "1024px" }
      default:
        return { width: "100%", height: "100%" }
    }
  }

  const dimensions = getViewportDimensions()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn("overflow-y-auto", isFullscreen ? "max-w-[95vw] max-h-[95vh]" : "max-w-4xl max-h-[90vh]")}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            {/* Viewport Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Preview:</span>
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                  <Button
                    variant={viewportSize === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewportSize("desktop")}
                    className="h-8 px-3"
                  >
                    <Monitor className="h-4 w-4 mr-1" />
                    Desktop
                  </Button>
                  <Button
                    variant={viewportSize === "tablet" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewportSize("tablet")}
                    className="h-8 px-3"
                  >
                    <Tablet className="h-4 w-4 mr-1" />
                    Tablet
                  </Button>
                  <Button
                    variant={viewportSize === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewportSize("mobile")}
                    className="h-8 px-3"
                  >
                    <Smartphone className="h-4 w-4 mr-1" />
                    Mobile
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {viewportSize === "desktop" ? "Responsive" : dimensions.width + " × " + dimensions.height}
              </div>
            </div>

            {/* Enhanced Preview Container */}
            <div className="relative bg-muted rounded-lg overflow-hidden p-4">
              <div
                className={cn(
                  "mx-auto bg-background rounded-lg overflow-hidden shadow-lg transition-all duration-300",
                  viewportSize === "desktop" && "w-full aspect-video",
                  viewportSize === "tablet" && "w-[768px] h-[600px] max-w-full",
                  viewportSize === "mobile" && "w-[375px] h-[667px] max-w-full",
                )}
                style={
                  viewportSize !== "desktop"
                    ? {
                      width: dimensions.width,
                      height: dimensions.height,
                      maxWidth: "100%",
                    }
                    : {}
                }
              >
                <iframe
                  src={project.previewUrl}
                  className="w-full h-full border-0"
                  title={`Preview of ${project.title}`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Preview Controls */}
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={project.previewUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Project Details</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">Client: {project.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Completed: {project.completedDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <a href={project.previewUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => {
                    onRequestSimilar(project.title)
                    onClose()
                  }}
                >
                  Request Similar Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
