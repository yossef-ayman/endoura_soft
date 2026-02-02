"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Send, Loader2 } from "lucide-react"

interface RequestSectionProps {
    language: "ar" | "en"
    initialProjectName?: string
}

export function RequestSection({ language, initialProjectName }: RequestSectionProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
    })

    const t = {
        ar: {
            title: "أرسل طلبك",
            description: "هل لديك مشروع في الاعتبار؟ أخبرنا بالتفاصيل وسنعود إليك في أقرب وقت ممكن.",
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
            projectType: "نوع المشروع (ويب، موبايل، الخ)",
            message: "تفاصيل المشروع",
            submit: "إرسال عبر واتساب",
            sending: "جاري الإرسال...",
            successTitle: "تم الإرسال بنجاح!",
            successDesc: "شكراً لتواصلك معنا. سنقوم بمراجعة طلبك والرد عليك قريباً جداً.",
            newRequest: "إرسال طلب آخر",
        },
        en: {
            title: "Submit a Request",
            description: "Have a project in mind? Tell us the details and we'll get back to you as soon as possible.",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            projectType: "Project Type (Web, Mobile, etc.)",
            message: "Project Details",
            submit: "Send via WhatsApp",
            sending: "Sending...",
            successTitle: "Request Sent Successfully!",
            successDesc: "Thank you for reaching out. We'll review your request and get back to you very soon.",
            newRequest: "Send another request",
        },
    }[language]

    useEffect(() => {
        if (initialProjectName) {
            setFormData(prev => ({
                ...prev,
                projectType: initialProjectName,
                message: language === "ar"
                    ? `أهلاً، أنا مهتم بمشروع مشابه لـ ${initialProjectName}.`
                    : `Hi, I'm interested in a project similar to ${initialProjectName}.`
            }))
            const element = document.getElementById("request")
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [initialProjectName, language])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Format WhatsApp message
        const whatsappNumber = "201146433667"
        const message = encodeURIComponent(
            `*New Project Request*\n\n` +
            `*Name:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Phone:* ${formData.phone}\n` +
            `*Project:* ${formData.projectType}\n` +
            `*Details:* ${formData.message}`
        )

        // Simulate success and redirect
        setTimeout(() => {
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
            setIsSubmitting(false)
            setIsSuccess(true)
            setFormData({ name: "", email: "", phone: "", projectType: "", message: "" })
        }, 1000)
    }

    return (
        <section id="request" className="py-24 px-4 relative overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-gentle" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        {t.title}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t.description}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Card className="border-none shadow-2xl bg-background/50 backdrop-blur-xl ring-1 ring-white/10">
                                <CardContent className="p-8 md:p-12">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium px-1">{t.name}</label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder={t.name}
                                                    required
                                                    className="bg-background/50 border-white/10 focus:ring-primary/50 transition-all duration-300 h-12 rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium px-1">{t.email}</label>
                                                <Input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder={t.email}
                                                    required
                                                    className="bg-background/50 border-white/10 focus:ring-primary/50 transition-all duration-300 h-12 rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium px-1">{t.phone}</label>
                                                <Input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+20..."
                                                    required
                                                    className="bg-background/50 border-white/10 focus:ring-primary/50 transition-all duration-300 h-12 rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium px-1">{t.projectType}</label>
                                                <Input
                                                    value={formData.projectType}
                                                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                                    placeholder={t.projectType}
                                                    required
                                                    className="bg-background/50 border-white/10 focus:ring-primary/50 transition-all duration-300 h-12 rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium px-1">{t.message}</label>
                                            <Textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder={t.message}
                                                required
                                                className="min-h-[120px] bg-background/50 border-white/10 focus:ring-primary/50 transition-all duration-300 rounded-xl"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            variant="premium"
                                            disabled={isSubmitting}
                                            className="w-full text-lg h-14 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group shadow-xl"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    {t.sending}
                                                </>
                                            ) : (
                                                <>
                                                    {t.submit}
                                                    <Send className={`ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 ${language === "ar" ? "rotate-180" : ""}`} />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <Card className="border-none shadow-2xl bg-background/50 backdrop-blur-xl ring-1 ring-white/10 overflow-hidden">
                                <CardContent className="p-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                        className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle2 className="w-12 h-12" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold mb-4">{t.successTitle}</h3>
                                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                        {t.successDesc}
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsSuccess(false)}
                                        className="rounded-full px-8 hover:bg-primary/5 transition-colors duration-300 text-foreground"
                                    >
                                        {t.newRequest}
                                    </Button>
                                </CardContent>
                                <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient" />
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
