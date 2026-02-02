"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Upload, Eye, Globe } from "lucide-react"

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

interface AdminPortfolioUploadProps {
  onAddProject: (project: PortfolioProject) => void
  onUpdateProject: (project: PortfolioProject) => void
  language: "ar" | "en"
  projectToEdit?: PortfolioProject | null
  setProjectToEdit?: (project: PortfolioProject | null) => void
}

export function AdminPortfolioUpload({
  onAddProject,
  onUpdateProject,
  language,
  projectToEdit,
  setProjectToEdit
}: AdminPortfolioUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
    title: "",
    description: "",
    previewUrl: "",
    videoUrl: "",
    image: "",
    technologies: [],
    category: "",
    clientName: "",
    completedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  })
  const [currentTech, setCurrentTech] = useState("")

  useEffect(() => {
    if (projectToEdit) {
      setNewProject(projectToEdit)
      setIsOpen(true)
    }
  }, [projectToEdit])

  useEffect(() => {
    if (!isOpen && setProjectToEdit) {
      setProjectToEdit(null)
    }
  }, [isOpen, setProjectToEdit])

  const t = {
    ar: {
      button: "إضافة مشروع",
      title: projectToEdit ? "تعديل المشروع" : "إضافة مشروع جديد للمحفظة",
      projectTitle: "عنوان المشروع",
      description: "وصف المشروع",
      previewUrl: "رابط الموقع (Live URL)",
      videoUrl: "رابط الفيديو (اختياري)",
      imageUrl: "رابط الصورة (Image URL)",
      category: "الفئة",
      client: "اسم العميل",
      date: "تاريخ الانتهاء",
      tech: "التقنيات المستخدمة",
      add: "إضافة",
      cancel: "إلغاء",
      submit: projectToEdit ? "تعديل المشروع" : "إضافة المشروع",
      preview: "معاينة",
    },
    en: {
      button: "Add Project",
      title: projectToEdit ? "Edit Project" : "Add New Portfolio Project",
      projectTitle: "Project Title",
      description: "Description",
      previewUrl: "Website URL (Live)",
      videoUrl: "Video URL (Optional)",
      imageUrl: "Image URL",
      category: "Category",
      client: "Client Name",
      date: "Completion Date",
      tech: "Technologies",
      add: "Add",
      cancel: "Cancel",
      submit: projectToEdit ? "Update Project" : "Add Project",
      preview: "Preview",
    },
  }[language]

  const categories = [
    "Web Development",
    "Mobile Development",
    "Web Application",
    "Business Software",
    "E-Commerce",
  ]

  const addTechnology = () => {
    if (currentTech.trim() && !newProject.technologies?.includes(currentTech.trim())) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), currentTech.trim()],
      }))
      setCurrentTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setNewProject((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((t) => t !== tech),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const project: PortfolioProject = {
      id: projectToEdit?.id || Math.random().toString(36).substr(2, 9),
      title: newProject.title || "",
      description: newProject.description || "",
      image: newProject.image || "/placeholder.svg",
      previewUrl: newProject.previewUrl || "#",
      videoUrl: newProject.videoUrl,
      technologies: newProject.technologies || [],
      category: newProject.category || "General",
      clientName: newProject.clientName || "Direct Client",
      completedDate: newProject.completedDate || "",
    }

    if (projectToEdit) {
      onUpdateProject(project)
    } else {
      onAddProject(project)
    }

    setIsOpen(false)
    setNewProject({
      title: "",
      description: "",
      previewUrl: "",
      videoUrl: "",
      image: "",
      technologies: [],
      category: "",
      clientName: "",
      completedDate: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="premium"
          data-admin-trigger="true"
          className="fixed bottom-8 right-8 z-50 shadow-2xl rounded-full px-6 h-14"
        >
          <Plus className="h-6 w-6 mr-2" />
          {t.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t.projectTitle}</Label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder={t.projectTitle}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t.description}</Label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder={t.description}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t.previewUrl}</Label>
                  <Input
                    value={newProject.previewUrl}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, previewUrl: e.target.value }))}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.videoUrl}</Label>
                  <Input
                    value={newProject.videoUrl}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t.imageUrl}</Label>
                <Input
                  value={newProject.image}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t.category}</Label>
                <Select
                  value={newProject.category}
                  onValueChange={(val) => setNewProject((prev) => ({ ...prev, category: val }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.category} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t.client}</Label>
                  <Input
                    value={newProject.clientName}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, clientName: e.target.value }))}
                    placeholder={t.client}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.date}</Label>
                  <Input
                    value={newProject.completedDate}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, completedDate: e.target.value }))}
                    placeholder="March 2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t.tech}</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    placeholder="Add..."
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" variant="outline" onClick={addTechnology}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {newProject.technologies?.map((tech) => (
                    <Badge key={tech} variant="secondary" className="gap-1 rounded-full px-3">
                      {tech}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Label className="mb-2 block">{t.preview}</Label>
                <Card className="overflow-hidden border-white/5 bg-white/5">
                  <div className="aspect-video relative bg-muted">
                    {newProject.image ? (
                      <img src={newProject.image} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        <Upload className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="rounded-full">
              {t.cancel}
            </Button>
            <Button type="submit" variant="premium" className="rounded-full px-8">
              {t.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
