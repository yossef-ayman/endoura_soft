"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  language: "ar" | "en"
  setLanguage: (language: "ar" | "en") => void
}

export function LanguageSwitcher({ language, setLanguage }: LanguageSwitcherProps) {
  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar"
    setLanguage(newLanguage)
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLanguage
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
      title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "ar" ? "EN" : "عر"}</span>
    </Button>
  )
}
