"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Users, Award, ArrowRight, Globe, Smartphone, Database, Plus } from "lucide-react"
import Image from "next/image"
import { PortfolioShowcase } from "@/components/portfolio-showcase"
import { ReviewsSection } from "@/components/reviews-section"
import { AnimatedText } from "@/components/animated-text"
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import { Card3D, FloatingElement } from "@/components/3d-cards"
import Framer3DBackground from "@/components/framer-3d-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { RequestSection } from "@/components/request-section"
import { AdminPortfolioUpload } from "@/components/admin-portfolio-upload"
import { Card } from "@/components/ui/card"
import { useEffect, useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"

function PageContent() {
    const searchParams = useSearchParams()
    const isAdmin = searchParams.get("MoYO$711") === "true"

    const [isVisible, setIsVisible] = useState(false)
    const [language, setLanguage] = useState<"ar" | "en">("ar")
    const [extraProjects, setExtraProjects] = useState<any[]>([])
    const [requestedProjectName, setRequestedProjectName] = useState<string>("")
    const [projectToEdit, setProjectToEdit] = useState<any | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem("endoura_extra_projects")
        if (saved) setExtraProjects(JSON.parse(saved))
    }, [])

    const handleAddProject = (project: any) => {
        const updated = [...extraProjects, project]
        setExtraProjects(updated)
        localStorage.setItem("endoura_extra_projects", JSON.stringify(updated))
    }

    const handleUpdateProject = (updatedProject: any) => {
        const exists = extraProjects.some(p => p.id === updatedProject.id)
        const updated = exists
            ? extraProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
            : [...extraProjects, updatedProject]
        setExtraProjects(updated)
        localStorage.setItem("endoura_extra_projects", JSON.stringify(updated))
        setProjectToEdit(null)
    }

    const handleRequestSimilar = (projectName: string) => {
        setRequestedProjectName(projectName)
        setTimeout(() => setRequestedProjectName(""), 1000)

        // Scroll to request section
        const element = document.getElementById("request")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => {
        setIsVisible(true)
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
        document.documentElement.lang = language
    }, [language])

    const content = {
        ar: {
            about: "حول",
            services: "الخدمات",
            portfolio: "أعمالنا",
            reviews: "التقييمات",
            contact: "تواصل معنا",
            heroTitle: "بناء حلول رقمية تحول الأعمال",
            heroDesc: "نحن إندورا سوفت، شركة رائدة في تطوير البرمجيات متخصصة في إنشاء تطبيقات الويب المبتكرة والحلول المحمولة والبرمجيات المخصصة التي تدفع النمو.",
            viewWork: "شاهد أعمالنا",
            getStarted: "ابدأ الآن",
            aboutTitle: "حول إندورا سوفت",
            aboutDesc: "تأسست بشغف للابتكار، نقدم حلول برمجية متطورة تساعد الشركات على الازدهار في العصر الرقمي.",
            expertDev: "تطوير خبير",
            clientFocused: "محور العميل",
            qualityAssured: "جودة مضمونة",
            globalReach: "وصول عالمي",
            servicesTitle: "خدماتنا",
            servicesDesc: "من المفهوم إلى النشر، نقدم خدمات تطوير برمجيات شاملة.",
            webDev: "تطوير الويب",
            mobileDev: "تطوير المحمول",
            backendSolutions: "حلول الخادم",
            projectsCompleted: "مشروع مكتمل",
            happyClients: "عميل سعيد",
            yearsExp: "سنوات خبرة",
            support: "دعم متاح",
            readyTransform: "مستعد لتحويل عملك؟",
            readyDesc: "دعنا نناقش مشروعك وننشئ شيئًا مذهلاً معًا.",
            startProject: "ابدأ مشروعك",
            requestTitle: "أرسل طلبك",
            footerDesc: "بناء حلول برمجية مبتكرة تدفع نمو الأعمال والتحول الرقمي.",
            allRights: "جميع الحقوق محفوظة.",
        },
        en: {
            about: "About",
            services: "Services",
            portfolio: "Portfolio",
            reviews: "Reviews",
            contact: "Contact Us",
            heroTitle: "Building Digital Solutions That Transform Businesses",
            heroDesc: "We are Endoura Soft, a leading software development company specializing in creating innovative web applications, mobile solutions, and custom software that drives growth.",
            viewWork: "View Our Work",
            getStarted: "Get Started",
            aboutTitle: "About Endoura Soft",
            aboutDesc: "Founded with a passion for innovation, we deliver cutting-edge software solutions that help businesses thrive in the digital age.",
            expertDev: "Expert Development",
            clientFocused: "Client-Focused",
            qualityAssured: "Quality Assured",
            globalReach: "Global Reach",
            servicesTitle: "Our Services",
            servicesDesc: "From concept to deployment, we offer comprehensive software development services.",
            webDev: "Web Development",
            mobileDev: "Mobile Development",
            backendSolutions: "Backend Solutions",
            projectsCompleted: "Projects Completed",
            happyClients: "Happy Clients",
            yearsExp: "Years Experience",
            support: "Support Available",
            readyTransform: "Ready to Transform Your Business?",
            readyDesc: "Let's discuss your project and create something amazing together.",
            startProject: "Start Your Project",
            requestTitle: "Submit Request",
            footerDesc: "Building innovative software solutions that drive business growth and digital transformation.",
            allRights: "All rights reserved.",
        },
    }

    const t = content[language]

    return (
        <div className="min-h-screen bg-background dark:bg-gray-900 relative">
            <Framer3DBackground />

            <header className="sticky top-0 z-50 w-full border-b bg-background/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
                <div className="container flex h-16 items-center justify-between">
                    <ScrollAnimation direction="left" delay={0}>
                        <div className="flex items-center gap-3">
                            <a href="#top" className="flex items-center gap-3 group">
                                <FloatingElement>
                                    <Image src="/logo-icon.png" alt="Endoura Soft Logo" width={40} height={40} className="h-10 w-10 group-hover:scale-110 transition-transform duration-300" />
                                </FloatingElement>
                                <div className="flex items-center">
                                    <Image src="/logo-text.png" alt="Endoura" width={120} height={30} className="h-8 group-hover:scale-105 transition-transform duration-300 mr-1 rtl:mr-0 rtl:ml-1" />
                                    <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">Soft</span>
                                </div>
                            </a>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation direction="right" delay={0.2}>
                        <nav className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-6">
                                <a href="#about" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group">
                                    {t.about}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <a href="#services" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group">
                                    {t.services}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group">
                                    {t.portfolio}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <a href="#reviews" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group">
                                    {t.reviews}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>

                            <div className="flex items-center gap-3 border-l pl-3 rtl:border-r rtl:pr-3 rtl:border-l-0">
                                <ThemeToggle />
                                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                            </div>

                            {isAdmin && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const modal = document.querySelector('[data-admin-trigger="true"]') as HTMLElement;
                                        if (modal) modal.click();
                                    }}
                                    className="hidden lg:flex items-center gap-2 rounded-full px-6 border-primary/50 text-primary hover:bg-primary/5"
                                >
                                    <Plus className="h-4 w-4" />
                                    {language === "ar" ? "إضافة مشروع" : "Add Project"}
                                </Button>
                            )}

                            <Button asChild variant="premium" className="hidden md:flex items-center gap-2 rounded-full px-6">
                                <a href="#request">{t.requestTitle}</a>
                            </Button>
                        </nav>
                    </ScrollAnimation>
                </div>
            </header>

            <section className="py-20 px-4 relative overflow-hidden">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <ScrollAnimation direction="scale" delay={0.5}>
                            <AnimatedText text={t.heroTitle} className="text-4xl md:text-6xl font-bold text-balance mb-6 dark:text-white" delay={500} speed={80} />
                        </ScrollAnimation>
                        <ScrollAnimation direction="up" delay={1}>
                            <AnimatedText text={t.heroDesc} className="text-xl text-muted-foreground dark:text-gray-300 text-pretty mb-8 max-w-2xl mx-auto" delay={3000} speed={30} />
                        </ScrollAnimation>
                        <ScrollAnimation direction="up" delay={1.5}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" variant="premium" className="text-lg px-8 group rounded-full">
                                    <a href="#portfolio">{t.viewWork} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 rtl:rotate-180 rtl:mr-2 rtl:ml-0" /></a>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="text-lg px-8 rounded-full hover:bg-primary/5 transition-all duration-300">
                                    <a href="#request">{t.getStarted}</a>
                                </Button>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>

            <section id="about" className="py-20 px-4 bg-muted/30 dark:bg-gray-800/30">
                <div className="container mx-auto">
                    <ScrollAnimation direction="up" delay={0}>
                        <div className="text-center mb-16">
                            <AnimatedText text={t.aboutTitle} className="text-3xl md:text-4xl font-bold mb-4 dark:text-white" delay={0} speed={100} />
                            <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto text-pretty">{t.aboutDesc}</p>
                        </div>
                    </ScrollAnimation>
                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StaggerItem>
                            <Card3D>
                                <CardHeader className="text-center">
                                    <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <CardTitle className="dark:text-white">{t.expertDev}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground dark:text-gray-300 text-center">{language === "ar" ? "فريقنا من المطورين المهرة يستخدم أحدث التقنيات لبناء تطبيقات قوية." : "Our team of skilled developers uses the latest technologies to build robust applications."}</p>
                                </CardContent>
                            </Card3D>
                        </StaggerItem>
                        <StaggerItem>
                            <Card3D>
                                <CardHeader className="text-center">
                                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <CardTitle className="dark:text-white">{t.clientFocused}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground dark:text-gray-300 text-center">{language === "ar" ? "نعطي الأولوية لفهم احتياجات عملك لتقديم حلول مخصصة." : "We prioritize understanding your business needs to deliver tailored solutions."}</p>
                                </CardContent>
                            </Card3D>
                        </StaggerItem>
                        <StaggerItem>
                            <Card3D>
                                <CardHeader className="text-center">
                                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <CardTitle className="dark:text-white">{t.qualityAssured}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground dark:text-gray-300 text-center">{language === "ar" ? "كل مشروع يخضع لاختبارات صارمة لضمان أعلى معايير الجودة." : "Every project undergoes rigorous testing to ensure the highest quality standards."}</p>
                                </CardContent>
                            </Card3D>
                        </StaggerItem>
                        <StaggerItem>
                            <Card3D>
                                <CardHeader className="text-center">
                                    <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <CardTitle className="dark:text-white">{t.globalReach}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground dark:text-gray-300 text-center">{language === "ar" ? "نخدم العملاء في جميع أنحاء العالم مع دعم 24/7 وقدرات متعددة اللغات." : "Serving clients worldwide with 24/7 support and multilingual capabilities."}</p>
                                </CardContent>
                            </Card3D>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            <section id="services" className="py-20 px-4">
                <div className="container mx-auto">
                    <ScrollAnimation direction="up" delay={0}>
                        <div className="text-center mb-16">
                            <AnimatedText text={t.servicesTitle} className="text-3xl md:text-4xl font-bold mb-4 dark:text-white" delay={0} speed={120} />
                            <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto text-pretty">{t.servicesDesc}</p>
                        </div>
                    </ScrollAnimation>
                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[t.webDev, t.mobileDev, t.backendSolutions].map((service, index) => (
                            <StaggerItem key={index}>
                                <Card3D>
                                    <CardHeader>
                                        <FloatingElement>
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 overflow-hidden p-3">
                                                {index === 0 && <Image src="/logo-icon.png" alt="Service Icon" width={32} height={32} className="h-full w-full object-contain" />}
                                                {index === 1 && <Smartphone className="h-8 w-8 text-primary" />}
                                                {index === 2 && <Database className="h-8 w-8 text-primary" />}
                                            </div>
                                        </FloatingElement>
                                        <CardTitle className="dark:text-white">{service}</CardTitle>
                                        <CardDescription className="dark:text-gray-300">
                                            {index === 0 && (language === "ar" ? "مواقع ويب وتطبيقات ويب حديثة ومتجاوبة مبنية بأحدث الأطر." : "Modern, responsive websites and web applications built with the latest frameworks.")}
                                            {index === 1 && (language === "ar" ? "تطبيقات محمولة أصلية ومتعددة المنصات لنظامي iOS و Android." : "Native and cross-platform mobile applications for iOS and Android.")}
                                            {index === 2 && (language === "ar" ? "أنظمة خادم قابلة للتوسع وواجهات برمجة التطبيقات وهندسة قواعد البيانات." : "Scalable backend systems, APIs, and database architecture.")}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {index === 0 && (<><Badge variant="secondary" className="rounded-full">React</Badge><Badge variant="secondary" className="rounded-full">Next.js</Badge><Badge variant="secondary" className="rounded-full">Node.js</Badge></>)}
                                            {index === 1 && (<><Badge variant="secondary" className="rounded-full">React Native</Badge><Badge variant="secondary" className="rounded-full">Flutter</Badge><Badge variant="secondary" className="rounded-full">Swift</Badge></>)}
                                            {index === 2 && (<><Badge variant="secondary" className="rounded-full">Python</Badge><Badge variant="secondary" className="rounded-full">PostgreSQL</Badge><Badge variant="secondary" className="rounded-full">AWS</Badge></>)}
                                        </div>
                                    </CardContent>
                                </Card3D>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            <ScrollAnimation direction="up" delay={0}>
                <PortfolioShowcase
                    language={language}
                    extraProjects={extraProjects}
                    onRequestSimilar={handleRequestSimilar}
                    isAdmin={isAdmin}
                    onEdit={setProjectToEdit}
                />
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0}>
                <ReviewsSection language={language} />
            </ScrollAnimation>

            <RequestSection language={language} initialProjectName={requestedProjectName} />

            {isAdmin && (
                <AdminPortfolioUpload
                    onAddProject={handleAddProject}
                    onUpdateProject={handleUpdateProject}
                    language={language}
                    projectToEdit={projectToEdit}
                    setProjectToEdit={setProjectToEdit}
                />
            )}

            <ScrollAnimation direction="up" delay={0}>
                <section className="py-20 px-4 bg-primary text-primary-foreground relative overflow-hidden">
                    <div className="container mx-auto relative z-10">
                        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <StaggerItem><div className="group hover:scale-110 transition-all duration-500"><div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">150+</div><div className="text-lg opacity-90">{t.projectsCompleted}</div></div></StaggerItem>
                            <StaggerItem><div className="group hover:scale-110 transition-all duration-500"><div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">50+</div><div className="text-lg opacity-90">{t.happyClients}</div></div></StaggerItem>
                            <StaggerItem><div className="group hover:scale-110 transition-all duration-500"><div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">5+</div><div className="text-lg opacity-90">{t.yearsExp}</div></div></StaggerItem>
                            <StaggerItem><div className="group hover:scale-110 transition-all duration-500"><div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">24/7</div><div className="text-lg opacity-90">{t.support}</div></div></StaggerItem>
                        </StaggerContainer>
                    </div>
                </section>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0}>
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <div className="max-w-3xl mx-auto">
                            <AnimatedText text={t.readyTransform} className="text-3xl md:text-4xl font-bold mb-6 text-balance dark:text-white" delay={0} speed={100} />
                            <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8 text-pretty">{t.readyDesc}</p>
                            <Button asChild size="lg" variant="premium" className="text-lg px-10 h-16 rounded-full group shadow-2xl shadow-primary/20">
                                <a href="#request">{t.startProject} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 rtl:rotate-180 rtl:mr-2 rtl:ml-0" /></a>
                            </Button>
                        </div>
                    </div>
                </section>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0}>
                <footer className="bg-muted dark:bg-gray-800 py-12 px-4">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="col-span-2">
                                <div className="flex items-center gap-3 mb-4 group">
                                    <FloatingElement><Image src="/logo-icon.png" alt="Endoura Soft Logo" width={32} height={32} className="h-8 w-8" /></FloatingElement>
                                    <Image src="/logo-text.png" alt="Endoura" width={96} height={24} className="h-6 group-hover:scale-105 transition-transform duration-300" />
                                    <span className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300 dark:text-white">Soft</span>
                                </div>
                                <p className="text-muted-foreground dark:text-gray-300 mb-4 max-w-md">{t.footerDesc}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 hover:text-primary transition-colors duration-300 dark:text-white">{t.services}</h4>
                                <ul className="space-y-2 text-muted-foreground dark:text-gray-300">
                                    <li className="hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 cursor-pointer">{t.webDev}</li>
                                    <li className="hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 cursor-pointer">{language === "ar" ? "تطبيقات المحمول" : "Mobile Apps"}</li>
                                    <li className="hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 cursor-pointer">{t.backendSolutions}</li>
                                    <li className="hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 cursor-pointer">{language === "ar" ? "تصميم واجهة المستخدم" : "UI/UX Design"}</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 hover:text-primary transition-colors duration-300 dark:text-white">{t.contact}</h4>
                                <ul className="space-y-2 text-muted-foreground dark:text-gray-300">
                                    <li className="hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 cursor-pointer">yossefayman664@gmail.com</li>
                                    <li className="hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 cursor-pointer">+201146433667</li>
                                    <li className="hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 cursor-pointer">{language === "ar" ? "القاهرة، مصر" : "Cairo, Egypt"}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t mt-8 pt-8 text-center text-muted-foreground dark:text-gray-300">
                            <p className="hover:text-primary transition-colors duration-300">&copy; 2024 Endoura Soft. {t.allRights}</p>
                        </div>
                    </div>
                </footer>
            </ScrollAnimation>
        </div>
    )
}

export default function HomePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
            <PageContent />
        </Suspense>
    )
}
