"use client";

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdOutlineWhatsapp } from "react-icons/md";
import {
  Rocket,
  Monitor,
  ShoppingCart,
  Palette,
  TrendingUp,
  Clock,
  Heart,
  ChevronDown,
  ExternalLink,
  Code2,
  Layers,
  PenTool,
  Briefcase,
} from "lucide-react";

// ============================================
// HOOKS
// ============================================

function useScrollDirection(threshold = 10) {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollDir;
}

function useInView(options = { threshold: 0.15, rootMargin: "0px" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      options
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isInView };
}

// ============================================
// DATA
// ============================================

const services = [
  {
    title: "Landing Pages",
    description:
      "Páginas de alto impacto otimizadas para conversão e performance. Design responsivo e código limpo.",
    icon: Rocket,
    gradient: "from-zinc-500 to-zinc-600",
  },
  {
    title: "Sistemas Web",
    description:
      "Aplicações web modernas com interfaces intuitivas e escaláveis. Next.js App Router.",
    icon: Monitor,
    gradient: "from-zinc-400 to-zinc-500",
  },
  {
    title: "E-commerce",
    description:
      "Lojas virtuais com experiência de compra fluida e segura. Integrações com Stripe.",
    icon: ShoppingCart,
    gradient: "from-zinc-500 to-zinc-600",
  },
  {
    title: "Interfaces UI",
    description:
      "Design de componentes e sistemas visuais consistentes. TailwindCSS com design tokens.",
    icon: Palette,
    gradient: "from-zinc-400 to-zinc-500",
  },
];

const projects = [
  {

    title: "localFlow",
    description:
      "Gestão local para organização finaceira de empresas locais, como por exemplo: serviços e lojas.",
    tags: ["Next.js", "Tailwind", "Prisma"],
    gradient: "from-zinc-700/40 to-zinc-800/40",
  },
  {
    title: "Aurora Store",
    description:
      "E-commerce premium com experiência gamificada e checkout otimizado para conversão.",
    tags: ["React", "Stripe", "Auth"],
    gradient: "from-zinc-700/40 to-zinc-800/40",
  },
  {
    title: "Pulse Metrics",
    description:
      "Plataforma de métricas para startups com dashboards customizáveis e relatórios.",
    tags: ["TypeScript", "D3.js", "API"],
    gradient: "from-zinc-700/40 to-zinc-800/40",
  },
  {
    title: "Vertex Studio",
    description:
      "Site institucional para estúdio criativo com galeria de projetos e blog integrado.",
    tags: ["Next.js", "Framer", "CMS"],
    gradient: "from-zinc-700/40 to-zinc-800/40",
  },
];

const stats = [
  { value: "50+", label: "Projetos Entregues", icon: Briefcase },
  { value: "100%", label: "Satisfação Cliente", icon: Heart },
  { value: "3+", label: "Anos de Experiência", icon: TrendingUp },
  { value: "24h", label: "Suporte Rápido", icon: Clock },
];

const techStack = [
  { name: "Next.js", icon: Code2 },
  { name: "React", icon: Layers },
  { name: "TypeScript", icon: Monitor },
  { name: "TailwindCSS", icon: Palette },
  { name: "Figma", icon: PenTool },
];

// ============================================
// COMPONENTS
// ============================================

function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isInView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StaggerReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className={`scroll-stagger ${isInView ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function ServiceCard({
  service,
  delay,
}: {
  service: (typeof services)[0];
  delay: number;
}) {
  const Icon = service.icon;

  return (
    <ScrollReveal delay={delay}>
      <div className="group relative p-8 lg:p-10 rounded-3xl glass hover-glow gap-4 flex flex-col ">
        {/* Icon */}
        <div
          className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}
        >
          <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <h3 className="text-xl lg:text-2xl font-semibold text-neutral-100 mb-4">
          {service.title}
        </h3>
        <p className="text-neutral-500 text-sm lg:text-base leading-relaxed">
          {service.description}
        </p>

        {/* Hover Line */}
        <div
          className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`}
        />
      </div>
    </ScrollReveal>
  );
}

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="group relative rounded-3xl glass overflow-hidden hover-glow cursor-pointer flex flex-col gap-8">
        {/* Image Area */}
        <div className={`h-52 lg:h-60 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden `}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-700 relative z-10">
            <Layers className="w-10 h-10 lg:w-12 lg:h-12 text-neutral-300 " strokeWidth={1} />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col gap-4">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl lg:text-2xl font-semibold text-neutral-100">
              {project.title}
            </h3>
            <ExternalLink className="w-5 h-5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
          </div>
          <p className="text-neutral-500 text-sm lg:text-base mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-neutral-400"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "5px",
                  borderRadius: "10px"
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: (typeof stats)[0];
  delay: number;
}) {
  const Icon = stat.icon;

  return (
    <ScrollReveal delay={delay}>
      <div className="glass rounded-3xl p-8 lg:p-10 hover-glow text-center">
        <Icon className="w-8 h-8 text-neutral-500 mx-auto mb-4" strokeWidth={1.5} />
        <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
          {stat.value}
        </div>
        <div className="text-sm lg:text-base text-neutral-500">{stat.label}</div>
      </div>
    </ScrollReveal>
  );
}

function TechCard({
  tech,
  delay,
}: {
  tech: (typeof techStack)[0];
  delay: number;
}) {
  const Icon = tech.icon;

  return (
    <ScrollReveal delay={delay}>
      <div className="group glass-card rounded-2xl px-8 py-6 flex items-center gap-5 hover-glow">
        <div className="w-15 h-12 rounded-xl bg-neutral-800/50 flex flex-col items-center justify-center group-hover:bg-neutral-700/50 transition-colors ">
          <Icon className="w-6 h-6 text-neutral-400 group-hover:text-neutral-200 transition-colors" strokeWidth={1.5} />
        </div>
        <span className="text-lg font-medium text-neutral">{tech.name}</span>
      </div>
    </ScrollReveal>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const scrollDir = useScrollDirection();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.setAttribute("data-scroll-dir", scrollDir);
    }
  }, [scrollDir]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ type: null, message: "" });

    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ type: "success", message: "Mensagem enviada com sucesso!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setFormStatus({ type: "error", message: data.error || "Erro ao enviar mensagem." });
      }
    } catch {
      setFormStatus({ type: "error", message: "Erro ao enviar mensagem. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div ref={bodyRef} className="min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-blob bg-blob-4" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 lg:p-8">
        <div className="w-full mx-auto flex flex-col justify-center items-center">
          <ScrollReveal>
            <div className="glass rounded-2xl lg:px-8 py-4 lg:py-5 flex items-center justify-between gap-8">
              <span className="text-xl lg:text-2xl font-bold gradient-text">Tiago.dev</span>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-12">
                {["Sobre", "Serviços", "Projetos", "Contato"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <a
                href="#contato"
                className="btn-primary px-5 lg:px-6 py-2.5 lg:py-3 rounded-full text-white font-semibold text-sm"
              >
                Vamos Conversar
              </a>
            </div>
          </ScrollReveal>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="sobre" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-5xl mx-auto w-full">
          <ScrollReveal>
            <div className="glass rounded-3xl px-10 sm:px-14 lg:px-20 py-16 lg:py-24 text-center hover-glow">
              {/* Badge */}
              <div className="badge inline-flex mb-10 lg:mb-12">
                <span className="badge-dot" />
                Disponível para novos projetos
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 lg:mb-12 leading-tight tracking-tight">
                <span className="gradient-text">Desenvolvimento</span>
                <br />
                <span className="text-neutral-100">Frontend de Alto Impacto</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-neutral-500 w-full mx-auto mb-14 lg:mb-16 leading-relaxed px-4">
                Transformo ideias em experiências digitais extraordinárias com Next.js e TailwindCSS.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href="#projetos"
                  className="btn-primary px-10 lg:px-12 py-4 lg:py-5 rounded-full text-white font-semibold text-base"
                >
                  Ver Projetos
                </a>
                <a
                  href="#contato"
                  className="btn-secondary px-10 lg:px-12 py-4 lg:py-5 rounded-full text-neutral-300 font-medium text-base"
                >
                  Entrar em Contato
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-16">
            <a href="#stack" className="flex flex-col items-center gap-3 text-neutral-600 hover:text-neutral-400 transition-colors">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>

          {/* Stats Grid */}
          <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 mt-20 lg:mt-24">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} delay={index * 100} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center gap-10 mx-auto">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <span className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-neutral-500 mb-5">
              Tecnologias
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="gradient-text">Stack Principal</span>
            </h2>
          </ScrollReveal>

          <StaggerReveal className="flex flex-wrap justify-center gap-5 lg:gap-8 ">
            {techStack.map((tech, index) => (
              <TechCard key={index} tech={tech} delay={index * 75} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16 lg:mb-20 flex flex-col items-center justify-center gap-4 ">
            <span className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-neutral-500 ">
              O que faço
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">
              <span className="gradient-text">Serviços</span>
            </h2>
            <p className="text-neutral-500 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Soluções especializadas em desenvolvimento frontend para transformar sua presença digital.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ">
        <div className="w-full flex flex-col items-center justify-center gap-4 mx-auto ">
          <ScrollReveal className="text-center mb-16 lg:mb-20 flex flex-col gap-4">
            <span className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-neutral-500 mb-5">
              Portfólio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">
              <span className="gradient-text">Projetos</span>
            </h2>
            <p className="text-neutral-500 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Uma seleção dos meus trabalhos mais recentes em desenvolvimento frontend.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} delay={index * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 flex flex-col justify-center w-full items-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="glass-strong rounded-3xl px-10 sm:px-14 lg:px-20 py-16 lg:py-24 flex flex-col gap-8">
              <div className="text-center mb-14 lg:mb-16 flex flex-col gap-4">
                <span className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-neutral-500 mb-5">
                  Contato
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="gradient-text">Vamos Criar Algo Incrível?</span>
                </h2>
                <p className="text-neutral-500 text-base lg:text-lg max-w-lg mx-auto leading-relaxed">
                  Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-xl mx-auto">
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl glass text-neutral-100 placeholder:text-neutral-600 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-neutral-500/30 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Seu email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl glass text-neutral-100 placeholder:text-neutral-600 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-neutral-500/30 transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Conte sobre seu projeto..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl glass text-neutral-100 placeholder:text-neutral-600 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-neutral-500/30 transition-all duration-300 resize-none"
                  />
                </div>
                {formStatus.message && (
                  <div className={`text-center py-3 px-4 rounded-xl ${formStatus.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {formStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary px-8 lg:px-10 py-4 lg:py-5 rounded-2xl text-white font-semibold text-base mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>

              {/* Social Links */}
              <div className="mt-16 lg:mt-20 pt-12 lg:pt-14 border-t border-white/10">
                <p className="text-neutral-600 text-sm text-center mb-8">Ou me encontre em</p>
                <div className="flex justify-center gap-5 lg:gap-8">
                  <a
                    href="mailto:tiagoburlamaque79@gmail.com"
                    className="w-14 h-14 rounded-full glass flex items-center justify-center hover-glow transition-all duration-300"
                    aria-label="Email"
                  >
                    <MdEmail className="w-6 h-6 text-neutral-400" />
                  </a>
                  <a
                    href="https://linkedin.com/in/tiago-burlamaque-1600b225a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass flex items-center justify-center hover-glow transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="w-6 h-6 text-neutral-400" />
                  </a>
                  <a
                    href="https://github.com/Tiago-burlamaque"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass flex items-center justify-center hover-glow transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-6 h-6 text-neutral-400" />
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=5548991440327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full glass flex items-center justify-center hover-glow transition-all duration-300"
                    aria-label="Whatsapp"
                    >
                    
                    <MdOutlineWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-sm">
            © 2026 Tiago.dev — Todos os direitos reservados.
          </span>
          <span className="text-neutral-700 text-sm">
            Feito com Next.js e TailwindCSS
          </span>
        </div>
      </footer>
    </div>
  );
}
