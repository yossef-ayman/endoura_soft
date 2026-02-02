"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Review {
  id: string
  name: string
  position: string
  company: string
  avatar: string
  rating: number
  review: string
  projectType: string
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechMart Solutions",
    avatar: "/placeholder.svg?height=60&width=60&text=SJ",
    rating: 5,
    review:
      "Endoura Soft delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding. The project was completed on time and within budget.",
    projectType: "E-Commerce Platform",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    position: "Director",
    company: "MediCare Plus",
    avatar: "/placeholder.svg?height=60&width=60&text=MC",
    rating: 5,
    review:
      "The healthcare management system they built for us has revolutionized our operations. Patient management is now seamless, and our staff productivity has increased significantly. Highly recommended!",
    projectType: "Healthcare System",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    position: "Founder",
    company: "PropertyHub Inc",
    avatar: "/placeholder.svg?height=60&width=60&text=AH",
    rating: 5,
    review:
      "The mobile app they developed for our real estate business is fantastic. The user interface is intuitive, and the virtual tour feature has impressed our clients. Great work!",
    projectType: "Mobile Application",
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    position: "Academic Director",
    company: "EduTech Academy",
    avatar: "/placeholder.svg?height=60&width=60&text=LR",
    rating: 5,
    review:
      "Our learning management system has transformed how we deliver education. The video streaming quality is excellent, and the progress tracking features are exactly what we needed.",
    projectType: "Learning Platform",
  },
  {
    id: "5",
    name: "Marco Rossi",
    position: "Owner",
    company: "Gourmet Bistro",
    avatar: "/placeholder.svg?height=60&width=60&text=MR",
    rating: 4,
    review:
      "The POS system has streamlined our restaurant operations completely. Order management is now effortless, and the sales analytics help us make better business decisions.",
    projectType: "POS System",
  },
  {
    id: "6",
    name: "Jennifer Park",
    position: "Marketing Director",
    company: "SocialBoost Agency",
    avatar: "/placeholder.svg?height=60&width=60&text=JP",
    rating: 5,
    review:
      "The social media analytics tool they built is incredibly powerful. The sentiment analysis feature gives us insights we never had before. Excellent development team!",
    projectType: "Analytics Platform",
  },
]

function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground",
          )}
        />
      ))}
    </div>
  )
}

interface ReviewsSectionProps {
  language: "ar" | "en"
}

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reviewsPerPage = 3
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const t = {
    ar: {
      title: "ماذا يقول عملاؤنا",
      description: "لا تكتفِ بكلمتنا. إليك ما يقوله عملاؤنا الراضون عن العمل معنا.",
      basedOn: "بناءً على {n} تقييم",
      satisfaction: "رضا العملاء",
      averageRating: "متوسط التقييم",
      delivery: "التسليم في الوقت",
      repeat: "العملاء المتكررون",
    },
    en: {
      title: "What Our Clients Say",
      description: "Don't just take our word for it. Here's what our satisfied clients have to say about working with us.",
      basedOn: "Based on {n} reviews",
      satisfaction: "Client Satisfaction",
      averageRating: "Average Rating",
      delivery: "On-Time Delivery",
      repeat: "Repeat Clients",
    },
  }[language]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentReviews = reviews.slice(currentIndex * reviewsPerPage, (currentIndex + 1) * reviewsPerPage)

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <section id="reviews" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
            {t.description}
          </p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
              <StarRating rating={Math.round(averageRating)} className="justify-center mb-2" />
              <div className="text-sm text-muted-foreground">
                {t.basedOn.replace("{n}", reviews.length.toString())}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentReviews.map((review) => (
              <Card key={review.id} className="relative overflow-hidden border-none shadow-xl bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-primary/20 mb-6" />

                  <div className="mb-6">
                    <StarRating rating={review.rating} className="mb-4" />
                    <p className="text-muted-foreground leading-relaxed italic text-lg opacity-90">"{review.review}"</p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{review.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.position}, {review.company}
                      </div>
                      <div className="text-xs text-primary font-semibold mt-1 tracking-wider uppercase">{review.projectType}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="rounded-full w-12 h-12 shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronLeft className={`h-6 w-6 ${language === "ar" ? "rotate-180" : ""}`} />
              </Button>

              <div className="flex gap-3">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === currentIndex ? "bg-primary w-8" : "bg-primary/20",
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1}
                className="rounded-full w-12 h-12 shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                <ChevronRight className={`h-6 w-6 ${language === "ar" ? "rotate-180" : ""}`} />
              </Button>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-white/10">
          <div className="text-center group">
            <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t.satisfaction}</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">4.9</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t.averageRating}</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t.delivery}</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">85%</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t.repeat}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
