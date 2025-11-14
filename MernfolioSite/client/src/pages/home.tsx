import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Code2,
  Award,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  FileText,
} from "lucide-react";
import profilePhoto from "@assets/WhatsApp Image 2025-11-13 at 2.12.23 PM_1763027029439.jpeg";
import aiMockImage from "@assets/generated_images/AI_Mock_Interview_Platform_4db0415b.png";
import movieBoxImage from "@assets/generated_images/Movie_Box_Netflix_Clone_4baab1ae.png";
import shoppingImage from "@assets/generated_images/E-commerce_Shopping_Website_cc9c1c4b.png";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  const navLinks = [
    { label: "About", href: "about" },
    { label: "Projects", href: "projects" },
    { label: "Skills", href: "skills" },
    { label: "Experience", href: "experience" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl md:text-2xl font-bold hover-elevate active-elevate-2 px-4 py-2 rounded-lg"
            data-testid="link-home"
          >
            RK
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => scrollToSection(link.href)}
                data-testid={`link-${link.href}`}
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t">
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  onClick={() => scrollToSection(link.href)}
                  className="justify-start"
                  data-testid={`link-mobile-${link.href}`}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-16 pt-16 md:pt-20"
      >
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="flex flex-col items-center gap-6">
            <img
              src={profilePhoto}
              alt="Rahul Kumar"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-primary/20"
              data-testid="img-profile"
            />
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" data-testid="text-hero-name">
                Rahul Kumar
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground" data-testid="text-hero-title">
                Full Stack Developer | MERN Stack Specialist
              </p>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-tagline">
                Building modern web applications with AI integration and cutting-edge technologies
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="font-medium"
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-medium backdrop-blur-sm"
                asChild
                data-testid="button-download-resume"
              >
                <a href="/Specialised CV New-1_1763027044363.pdf" download>
                  <FileText className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm md:text-base text-muted-foreground" data-testid="stats-hero">
              <span className="flex items-center gap-2" data-testid="stat-projects">
                <Code2 className="w-4 h-4" />3 Projects
              </span>
              <span>•</span>
              <span className="flex items-center gap-2" data-testid="stat-hackerrank">
                <Award className="w-4 h-4" />
                4★ HackerRank
              </span>
              <span>•</span>
              <span className="flex items-center gap-2" data-testid="stat-researcher">
                <GraduationCap className="w-4 h-4" />
                Published Researcher
              </span>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                data-testid="link-linkedin"
              >
                <a
                  href="https://linkedin.com/in/rahul-kumar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                data-testid="link-github"
              >
                <a
                  href="https://github.com/rahulkumar2104"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-6 h-6" />
                </a>
              </Button>
            </div>

            <button
              onClick={() => scrollToSection("about")}
              className="mt-8 animate-bounce"
              data-testid="button-scroll-down"
            >
              <ChevronDown className="w-8 h-8 text-muted-foreground" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 bg-accent/20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-about">
            About Me
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-base md:text-lg leading-relaxed" data-testid="text-about-intro">
                I'm a Computer Science Engineering student at Lovely Professional University
                with a passion for building innovative web applications. My journey in tech
                has been driven by curiosity and a desire to solve real-world problems through
                code.
              </p>
              <p className="text-base md:text-lg leading-relaxed" data-testid="text-about-expertise">
                I specialize in full-stack development with expertise in MERN stack, Next.js,
                and Java Spring Boot. My recent work includes developing an AI-powered mock
                interview platform that has been recognized with a published research paper.
              </p>
              <p className="text-base md:text-lg leading-relaxed" data-testid="text-about-interests">
                When I'm not coding, you'll find me exploring new technologies, contributing
                to open-source projects, or solving algorithmic challenges on competitive
                programming platforms.
              </p>
            </div>

            <Card className="p-6 md:p-8 space-y-6" data-testid="card-about-facts">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Education</h3>
                    <p className="text-muted-foreground" data-testid="text-about-degree">
                      B.Tech in Computer Science Engineering
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="text-about-university">
                      Lovely Professional University (2021-2025)
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="text-about-cgpa">CGPA: 7.47</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-muted-foreground" data-testid="text-about-location">Motihari, Bihar, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Briefcase className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Status</h3>
                    <Badge variant="secondary" className="mt-1" data-testid="badge-about-status">
                      Open to Opportunities
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-projects">
            Featured Projects
          </h2>

          {/* Featured Project */}
          <Card className="p-0 mb-12 overflow-hidden rounded-2xl hover-elevate transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={aiMockImage}
                  alt="AI Mock Interview Platform"
                  className="w-full h-full object-cover"
                  data-testid="img-project-ai-interview"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-2xl md:text-3xl font-semibold" data-testid="text-project-ai-title">
                      AI Mock Interview Platform
                    </h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30 flex-shrink-0" data-testid="badge-featured">
                      Featured
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4" data-testid="text-project-ai-desc">
                    Developed an AI-powered mock interview platform to simulate real-life
                    interview experiences with real-time question generation, multimedia
                    interaction, and performance-based feedback.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4" data-testid="text-project-ai-dates">
                    Jan 2025 - March 2025
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Prisma ORM</Badge>
                  <Badge variant="secondary">Auth.js</Badge>
                  <Badge variant="secondary">Gemini API</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Key Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Real-time AI-generated questions tailored to user profiles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Multimedia interaction with audio/video recording capabilities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Performance analytics and personalized feedback</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <Button variant="outline" size="sm" asChild data-testid="button-project-ai-github">
                    <a
                      href="https://github.com/rahulkumar2104"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Published Research Paper
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Other Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Movie Box Project */}
            <Card className="p-0 overflow-hidden rounded-2xl hover-elevate transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={movieBoxImage}
                  alt="Movie Box Netflix Clone"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-testid="img-project-moviebox"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold" data-testid="text-project-moviebox-title">
                  Movie Box - Netflix Clone
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="text-project-moviebox-dates">June 2024 - July 2024</p>
                <p className="text-muted-foreground" data-testid="text-project-moviebox-desc">
                  Built a Netflix clone using React.js, integrating the TMDB API to fetch and
                  display dynamic movie content with smooth navigation using React Router DOM.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React.js</Badge>
                  <Badge variant="secondary">TMDB API</Badge>
                  <Badge variant="secondary">React Router</Badge>
                  <Badge variant="secondary">CSS3</Badge>
                </div>
                <Button variant="outline" size="sm" asChild data-testid="button-project-moviebox-github">
                  <a
                    href="https://github.com/rahulkumar2104"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </Card>

            {/* Shopping Website Project */}
            <Card className="p-0 overflow-hidden rounded-2xl hover-elevate transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={shoppingImage}
                  alt="Online Shopping Website"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-testid="img-project-shopping"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold" data-testid="text-project-shopping-title">
                  E-Commerce Platform
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="text-project-shopping-dates">Jan 2024 - Feb 2024</p>
                <p className="text-muted-foreground" data-testid="text-project-shopping-desc">
                  Led a team in building a fully functional e-commerce website with user
                  authentication, product listings, shopping cart, and checkout system.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Java</Badge>
                  <Badge variant="secondary">Spring Boot</Badge>
                  <Badge variant="secondary">MySQL</Badge>
                  <Badge variant="secondary">Bootstrap</Badge>
                </div>
                <Button variant="outline" size="sm" asChild data-testid="button-project-shopping-github">
                  <a
                    href="https://github.com/rahulkumar2104"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 bg-accent/20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-skills">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Languages */}
            <Card className="p-6 space-y-4" data-testid="card-skills-languages">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Languages</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground" data-testid="text-skill-cpp">C++</p>
                <p className="text-muted-foreground" data-testid="text-skill-java">Java</p>
                <p className="text-muted-foreground" data-testid="text-skill-javascript">JavaScript</p>
                <p className="text-muted-foreground" data-testid="text-skill-python">Python</p>
              </div>
            </Card>

            {/* Frameworks */}
            <Card className="p-6 space-y-4" data-testid="card-skills-frameworks">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Frameworks</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground" data-testid="text-skill-react">React.js</p>
                <p className="text-muted-foreground" data-testid="text-skill-nextjs">Next.js</p>
                <p className="text-muted-foreground" data-testid="text-skill-springboot">Spring Boot</p>
                <p className="text-muted-foreground" data-testid="text-skill-express">Express.js</p>
              </div>
            </Card>

            {/* Tools */}
            <Card className="p-6 space-y-4" data-testid="card-skills-tools">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Tools</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground" data-testid="text-skill-git">Git</p>
                <p className="text-muted-foreground" data-testid="text-skill-github">GitHub</p>
                <p className="text-muted-foreground" data-testid="text-skill-postgresql">PostgreSQL</p>
                <p className="text-muted-foreground" data-testid="text-skill-mysql">MySQL</p>
              </div>
            </Card>

            {/* Specializations */}
            <Card className="p-6 space-y-4" data-testid="card-skills-specializations">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Specializations</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground" data-testid="text-skill-neondb">Neon DB</p>
                <p className="text-muted-foreground" data-testid="text-skill-kafka">Apache Kafka</p>
                <p className="text-muted-foreground" data-testid="text-skill-restapi">REST APIs</p>
                <p className="text-muted-foreground" data-testid="text-skill-prisma">Prisma ORM</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-experience">
            Experience & Achievements
          </h2>

          <div className="space-y-12">
            {/* Experience Timeline */}
            <div className="space-y-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-6" data-testid="heading-internship">
                Internship & Training
              </h3>
              <Card className="p-6 md:p-8 border-l-4 border-l-primary" data-testid="card-experience-cipher-school">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" data-testid="icon-experience-briefcase">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-semibold mb-2" data-testid="text-experience-role">
                      Java Full Stack Developer Intern
                    </h4>
                    <p className="text-muted-foreground mb-4" data-testid="text-experience-dates">
                      Cipher School • Jan 2024 - Feb 2024
                    </p>
                    <p className="text-base mb-4" data-testid="text-experience-summary">
                      Completed intensive full-stack development training focusing on Java,
                      Spring Boot, and modern web technologies.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Learning Outcomes:</p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2" data-testid="text-experience-outcome-java">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Proficiency in Java Programming and Backend Development
                          </span>
                        </li>
                        <li className="flex items-start gap-2" data-testid="text-experience-outcome-frontend">
                          <span className="text-primary mt-1">•</span>
                          <span>Mastery of Frontend Technologies (HTML, CSS, JavaScript)</span>
                        </li>
                        <li className="flex items-start gap-2" data-testid="text-experience-outcome-integration">
                          <span className="text-primary mt-1">•</span>
                          <span>Full Stack Application Integration</span>
                        </li>
                        <li className="flex items-start gap-2" data-testid="text-experience-outcome-frameworks">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Spring Boot for backend and Bootstrap for frontend design
                          </span>
                        </li>
                        <li className="flex items-start gap-2" data-testid="text-experience-outcome-methodology">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Understanding of Software Development Methodologies and Best
                            Practices
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Certifications & Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Certifications */}
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold" data-testid="heading-certifications">Certifications</h3>
                <div className="space-y-4">
                  <Card className="p-6 hover-elevate" data-testid="card-certification-gfg-dsa">
                    <div className="flex items-start gap-4">
                      <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1" data-testid="text-certification-gfg-dsa">
                          Data Structure & Algorithm (C++)
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid="text-certification-meta-gfg-dsa">
                          GeeksforGeeks • June-July 2023
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-elevate" data-testid="card-certification-cipher-fullstack">
                    <div className="flex items-start gap-4">
                      <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1" data-testid="text-certification-cipher-fullstack">Java Full Stack</h4>
                        <p className="text-sm text-muted-foreground" data-testid="text-certification-meta-cipher-fullstack">
                          Cipher Schools • Jan-Feb 2024
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-elevate" data-testid="card-certification-google-marketing">
                    <div className="flex items-start gap-4">
                      <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1" data-testid="text-certification-google-marketing">
                          Foundations of Digital Marketing & E-commerce
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid="text-certification-meta-google-marketing">
                          Google Career (Coursera) • Feb 2024
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold" data-testid="heading-achievements">Achievements</h3>
                <div className="space-y-4">
                  <Card className="p-6 hover-elevate border-l-4 border-l-primary" data-testid="card-achievement-research-paper">
                    <div className="flex items-start gap-4">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2" data-testid="text-achievement-research-paper">Published Research Paper</h4>
                        <p className="text-sm text-muted-foreground mb-3" data-testid="text-achievement-research-paper-desc">
                          "Revolutionizing Interview Preparation: The Algorithmic Precision
                          of an AI-Powered Mock Interview Platform"
                        </p>
                        <Badge variant="secondary" className="text-xs" data-testid="badge-research-conference">
                          5th International Conference on Computer Vision and Robotics
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-elevate" data-testid="card-achievement-hackerrank">
                    <div className="flex items-start gap-4">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2" data-testid="text-achievement-hackerrank">4 Star Java Developer</h4>
                        <p className="text-sm text-muted-foreground" data-testid="text-achievement-hackerrank-desc">
                          Achieved 4-star rating on HackerRank for Java programming
                          proficiency
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 bg-accent/20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-contact">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="p-6 md:p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...form.register("name")}
                      data-testid="input-name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...form.register("email")}
                      data-testid="input-email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={6}
                      {...form.register("message")}
                      data-testid="input-message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 space-y-6" data-testid="card-contact-info">
                <div>
                  <h3 className="text-xl font-semibold mb-6" data-testid="heading-contact-info">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <a
                          href="mailto:rahulkumar21042004@gmail.com"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          data-testid="link-contact-email"
                        >
                          rahulkumar21042004@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <a
                          href="tel:+916202467060"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          data-testid="link-contact-phone"
                        >
                          +91 6202467060
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-1">Location</p>
                        <p className="text-sm text-muted-foreground" data-testid="text-contact-location">
                          Motihari, Bihar 845433, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <p className="font-medium mb-4">Connect with me</p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      data-testid="link-contact-linkedin"
                    >
                      <a
                        href="https://linkedin.com/in/rahul-kumar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      data-testid="link-contact-github"
                    >
                      <a
                        href="https://github.com/rahulkumar2104"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Badge variant="secondary" className="w-full justify-center py-2" data-testid="badge-availability">
                    Open to Opportunities
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-16 border-t" data-testid="footer-main">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-about"
              >
                About
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-projects"
              >
                Projects
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-skills"
              >
                Skills
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-experience"
              >
                Experience
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-contact"
              >
                Contact
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left" data-testid="text-footer-copyright">
                © 2025 Rahul Kumar. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-xs" data-testid="badge-footer-builtwith">
                  Built with MERN Stack
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
