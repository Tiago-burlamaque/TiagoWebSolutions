"use client";

import Img from '../images/logo.png'

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdOutlineWhatsapp } from "react-icons/md";
import {
  Rocket,
  Monitor,
  Palette,
  TrendingUp,
  Clock,
  Heart,
  ChevronDown,
  ExternalLink,
  Code2,
  Layers,
  Database,
} from "lucide-react";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

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
  const { threshold, rootMargin } = options;

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
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

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
    image: Img,
    link: "https://github.com/tiago-burlamaque/localFlow"
  },

];

const stats = [
  { value: "100%", label: "Satisfação Cliente", icon: Heart },
  { value: "2", label: "Anos de Experiência", icon: TrendingUp },
  { value: "24h", label: "Suporte Rápido", icon: Clock },
];

const techStack = [
  { name: "Next.js", icon: Code2 },
  { name: "React", icon: Layers },
  { name: "TypeScript", icon: Monitor },
  { name: "TailwindCSS", icon: Palette },
  { name: "Prisma", icon: Database },
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
    <div
      ref={ref}
      className={`scroll-stagger ${isInView ? "is-visible" : ""} ${className}`}
    >
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
      <div className="group relative flex flex-col gap-4 rounded-3xl glass p-8 lg:p-10 hover-glow">
        <div
          className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br lg:h-16 lg:w-16 ${service.gradient} transition-transform duration-500 group-hover:scale-110`}
        >
          <Icon className="h-7 w-7 text-white lg:h-8 lg:w-8" strokeWidth={1.5} />
        </div>

        <h3 className="mb-4 text-xl font-semibold text-neutral-100 lg:text-2xl">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-500 lg:text-base">
          {service.description}
        </p>

        <div
          className={`absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r opacity-0 transition-all duration-500 group-hover:opacity-100 ${service.gradient}`}
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
      <div className="group relative flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl glass hover-glow" onClick={() => window.location.href=project.link}>
        <div
          className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br lg:h-60 ${project.image ? '' : 'bg-neutral-800'}`}
        >
          <div className="absolute inset-0 " />
                    {/* <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl glass transition-transform duration-700 group-hover:scale-110 lg:h-24 lg:w-24">

            <Layers className="h-10 w-10 text-neutral-300 lg:h-12 lg:w-12" strokeWidth={1} />
          </div> */}
        </div>

        <div className="flex flex-col gap-4 p-8 lg:p-10">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-xl font-semibold text-neutral-100 lg:text-2xl">
              {project.title}
            </h3>
            <ExternalLink className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-neutral-300" />
          </div>
          <p className="mb-6 text-sm leading-relaxed text-neutral-500 lg:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full px-4 py-2 text-xs font-medium text-neutral-400 lg:text-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "4px 12px",
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
      <div className="rounded-3xl glass p-8 text-center lg:p-10 hover-glow">
        <Icon className="mx-auto mb-4 h-8 w-8 text-neutral-500" strokeWidth={1.5} />
        <div className="mb-2 text-4xl font-bold gradient-text lg:text-5xl">{stat.value}</div>
        <div className="text-sm text-neutral-500 lg:text-base">{stat.label}</div>
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
      <div className="group flex items-center gap-5 rounded-2xl glass-card px-8 py-6 hover-glow">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/50 transition-colors group-hover:bg-neutral-700/50">
          <Icon
            className="h-6 w-6 text-neutral-400 transition-colors group-hover:text-neutral-200"
            strokeWidth={1.5}
          />
        </div>
        <span className="text-lg font-medium text-neutral-300">{tech.name}</span>
      </div>
    </ScrollReveal>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function Home() {
  const mounted = true;
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const scrollDir = useScrollDirection();
  const bodyRef = useRef<HTMLDivElement>(null);


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
      await axios.post("http://localhost:3001/contact", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      toast.success("Email enviado com sucesso.")
      setFormStatus({ type: "success", message: "Mensagem enviada com sucesso!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { error?: string }; status?: number };
      };
      const backendError =
        axiosError.response?.data?.error || "Erro ao enviar mensagem. Tente novamente.";
      toast.error("Erro ao enviar Email.");
      setFormStatus({
        type: "error",
        message: `Falha no envio${axiosError.response?.status ? ` (${axiosError.response.status})` : ""}: ${backendError}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div ref={bodyRef} className="relative min-h-screen overflow-hidden">
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-blob bg-blob-4" />

      <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full ">
          <ScrollReveal>
            <nav className="glass flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6 lg:gap-8 lg:px-8 lg:py-4">
              <span className="text-lg font-bold gradient-text sm:text-xl lg:text-2xl">Tiago.dev</span>

              <div className="hidden items-center gap-12 lg:flex">
                {[
                  { label: "Sobre", href: "#sobre" },
                  { label: "Serviços", href: "#servicos" },
                  { label: "Projetos", href: "#projetos" },
                  { label: "Contato", href: "#contato" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-neutral-400 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <a
                href="#contato"
                className="btn-primary rounded-full px-4 py-2 text-xs font-semibold text-white sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3"
              >
                Vamos Conversar
              </a>
            </nav>
          </ScrollReveal>
        </div>
      </header>

      <main>
        <section
          id="sobre"
          className="flex min-h-[85vh] flex-col items-center justify-center px-4 pt-6 text-center sm:px-6 lg:px-8 gap"
        >
          <div className="mx-auto w-full max-w-6xl ">
            <ScrollReveal className="flex items-center justify-center flex-col gap-6 lg:gap-10 ">
              <div className="glass-strong rounded-3xl flex flex-col gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20" >
                <div className="badge mb-10 inline lg:mb-12 flex flex  justify-center" >
                  <span className="badge-dot" />
                  Disponível para novos projetos
                </div>

                <h1 className="mb-10 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:mb-12 lg:text-7xl">
                  <span className="gradient-text">Desenvolvimento</span>
                  <br />
                  <span className="text-neutral-100">Frontend de Alto Impacto</span>
                </h1>

                <p className="mx-auto mb-14 px-4 text-base leading-relaxed text-neutral-500 sm:text-lg lg:mb-16 lg:max-w-3xl lg:text-xl text-center w-full">
                  Transformo ideias em experiências digitais extraordinárias com design inovador e código de alta performance. Vamos criar algo incrível juntos!
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                  <a
                    href="#projetos"
                    className="btn-primary w-full rounded-full px-8 py-3.5 text-base font-semibold text-white sm:w-auto lg:px-12 lg:py-5"
                  >
                    Ver Projetos
                  </a>
                  <a
                    href="#contato"
                    className="btn-secondary w-full rounded-full px-8 py-3.5 text-base font-medium text-neutral-300 sm:w-auto lg:px-12 lg:py-5"
                  >
                    Entrar em Contato
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16 flex justify-center">
              <a
                href="#stack"
                className="flex flex-col items-center gap-3 text-neutral-600 transition-colors hover:text-neutral-400"
              >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
              </a>
            </div>

            <StaggerReveal className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-8">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} delay={index * 100} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section
          id="stack"
          className="flex w-full flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10">
            <ScrollReveal className="mb-16 text-center lg:mb-20">
              <span className="mb-5 inline-block text-xs font-medium uppercase tracking-widest text-neutral-500 sm:text-sm">
                  
              </span>
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                <span className="gradient-text">Stack Principal</span>
              </h2>
            </ScrollReveal>

            <StaggerReveal className="flex flex-wrap justify-center gap-5 lg:gap-8">
              {techStack.map((tech, index) => (
                <TechCard key={index} tech={tech} delay={index * 75} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section
          id="servicos"
          className="flex w-full flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
        >
          <div className="mx-auto w-full max-w-6xl">
            <ScrollReveal className="mb-16 flex flex-col items-center justify-center gap-4 text-center lg:mb-20 w-full">
              <span className="inline-block text-xs font-medium uppercase tracking-widest text-neutral-500 sm:text-sm">
                O que faço
              </span>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:mb-8 lg:text-5xl">
                <span className="gradient-text">Serviços</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-500 lg:text-lg">
                Soluções especializadas em desenvolvimento frontend para transformar sua presença
                digital.
              </p>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 lg:gap-10">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} delay={index * 100} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="projetos"
          className="flex flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4">
            <ScrollReveal className="mb-16 flex flex-col gap-4 text-center lg:mb-20">
              <span className="mb-5 inline-block text-xs font-medium uppercase tracking-widest text-neutral-500 sm:text-sm">
                Portfólio
              </span>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:mb-8 lg:text-5xl">
                <span className="gradient-text">Projetos</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-500 lg:text-lg">
                Uma seleção dos meus trabalhos mais recentes em desenvolvimento frontend.
              </p>
            </ScrollReveal>

            <div className="grid w-full gap-8 md:grid-cols-2 lg:gap-12">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} delay={index * 150} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="contato"
          className="flex w-full flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
        >
          <div className="mx-auto w-full max-w-3xl">
            <ScrollReveal>
              <div className="glass-strong flex flex-col gap-8 rounded-3xl px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
                <div className="mb-14 flex flex-col gap-4 w-full items-center justify-center text-center lg:mb-16">
                  <span className="mb-5 inline-block text-xs font-medium uppercase tracking-widest text-neutral-500 sm:text-sm">
                    Contato
                  </span>
                  <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
                    <span className="gradient-text">Vamos Criar Algo Incrível?</span>
                  </h2>
                  <p className="mx-auto max-w-lg text-base leading-relaxed text-neutral-500 lg:text-lg">
                    Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar
                    sua ideia em realidade.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mx-auto  space-y-6 text-left flex flex-col justify-center w-full ">
                  <div>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full rounded-2xl glass px-6 py-4 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500/30 lg:px-8 lg:py-5 lg:text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Seu email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full rounded-2xl glass px-6 py-4 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500/30 lg:px-8 lg:py-5 lg:text-base"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Conte sobre seu projeto..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full resize-none rounded-2xl glass px-6 py-4 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500/30 lg:px-8 lg:py-5 lg:text-base"
                    />
                  </div>
                  {formStatus.message && (
                    <div
                      className={`rounded-xl px-4 py-3 text-center ${formStatus.type === "success"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {formStatus.message}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 w-full rounded-2xl btn-primary px-8 py-4 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 lg:px-10 lg:py-5"
                  >
                    {isLoading ? "Enviando..." : "Enviar Mensagem"}
                  </button>
                  <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                  />
                </form>

                <div className="mt-16 border-t border-white/10 pt-12 lg:mt-20 lg:pt-14">
                  <p className="mb-8 text-center text-sm text-neutral-600">Ou me encontre em</p>
                  <div className="flex justify-center gap-5 lg:gap-8">
                    <a
                      href="mailto:tiagoburlamaque79@gmail.com"
                      className="flex h-14 w-14 items-center justify-center rounded-full glass hover-glow transition-all duration-300"
                      aria-label="Email"
                    >
                      <MdEmail className="h-6 w-6 text-neutral-400" />
                    </a>
                    <a
                      href="https://linkedin.com/in/tiago-burlamaque-1600b225a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-full glass hover-glow transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn className="h-6 w-6 text-neutral-400" />
                    </a>
                    <a
                      href="https://github.com/Tiago-burlamaque"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-full glass hover-glow transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <FaGithub className="h-6 w-6 text-neutral-400" />
                    </a>
                    <a
                      href="https://api.whatsapp.com/send?phone=5548991440327"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-full glass hover-glow transition-all duration-300"
                      aria-label="Whatsapp"
                    >
                      <MdOutlineWhatsapp className="h-6 w-6 text-neutral-400" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <span className="text-sm text-neutral-600">
            © 2026 Tiago.dev — Todos os direitos reservados.
          </span>
          <span className="text-sm text-neutral-700">Feito com Next.js e TailwindCSS</span>
        </div>
      </footer>
    </div>
  );
}
