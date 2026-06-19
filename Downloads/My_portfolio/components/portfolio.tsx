"use client"

import { useState, useEffect, useRef } from "react"

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"]

const SKILLS = {
  Frontend: [
    { name: "React.js", level: 90, desc: "Scalable SPAs, component architecture, state management & API integration" },
    { name: "React Native", level: 82, desc: "Cross-platform mobile apps for Android & iOS used at production scale" },
    { name: "TypeScript", level: 75, desc: "Type-safe codebases, interfaces, generics for robust frontend systems" },
    { name: "JavaScript (ES6+)", level: 88, desc: "Async/await, closures, event delegation, performance optimization" },
    { name: "Redux", level: 78, desc: "Global state management for complex enterprise applications" },
    { name: "React Hooks", level: 90, desc: "useState, useEffect, custom hooks for clean functional components" },
    { name: "HTML / CSS", level: 92, desc: "Semantic HTML, responsive layouts, CSS Grid & Flexbox" },
    { name: "Next.js", level: 75, desc: "Server-side rendering (SSR), static site generation (SSG), API routes, and SEO-optimized React applications" },
  ],
  "Tools & Others": [
    { name: "Git / GitHub", level: 85, desc: "Version control, branching strategies, code reviews" },
    { name: "RESTful APIs", level: 88, desc: "Integration, data fetching, error handling across stacks" },
    { name: "OpenCV / Python", level: 70, desc: "Computer vision, ML-based detection systems" },
    { name: "Arduino / Embedded C", level: 72, desc: "IoT prototypes, sensor-based automation systems" },
    { name: "Java (OOP)", level: 75, desc: "Data structures, algorithms, object-oriented design" },
  ],
} as const

const EXPERIENCE = [
  {
    role: "Frontend Developer",
    company: "Kshema General Insurance",
    period: "Nov 2024 – Present",
    type: "Full-time",
    color: "#6366f1",
    achievements: [
      "Built responsive React.js web apps and React Native mobile apps serving thousands of crop insurance users across India.",
      "Implemented reusable form architecture with React Hooks — reduced form development time by ~40%.",
      "Integrated multiple RESTful APIs, handling complex data pipelines for real-time insurance policy management.",
      "Collaborated cross-functionally with backend engineers and designers to ship production features end-to-end.",
    ],
    tech: ["React.js", "React Native", "React Hooks", "RESTful APIs", "TypeScript", "Redux"],
  },
  {
    role: "Software Engineer Intern",
    company: "Microsoft India",
    period: "May 2023 – July 2023",
    type: "Internship",
    color: "#0ea5e9",
    achievements: [
      "Built a custom Microsoft Edge browser extension to track third-party URL activity across the internal network — an enterprise security solution.",
      "Integrated real-time REST APIs for data capture, processing, and audit logging of user interactions.",
      "Implemented Office 365 integration for unified monitoring of internal and external user activity.",
      "Optimised event logging for high-frequency URL tracking with minimal browser performance impact.",
    ],
    tech: ["Browser Extensions", "REST APIs", "JavaScript", "Office 365", "Enterprise Security"],
  },
]

const PROJECTS = [
  {
    title: "Cosmetic Recommendation System",
    emoji: "💄",
    tag: "ML / NLP",
    color: "#ec4899",
    overview: "An NLP-powered system that analyses thousands of user reviews to surface the highest-rated cosmetic products.",
    problem: "Shoppers struggle to find reliable recommendations among thousands of products with conflicting reviews.",
    tech: ["Python", "NLP", "Sentiment Analysis", "Machine Learning", "Pandas"],
    highlights: [
      "Processed and scored raw review text via sentiment analysis pipeline",
      "Ranked products by aggregated positive sentiment score",
      "Demonstrated practical ML application on real-world consumer data",
    ],
  },
  {
    title: "Eyeball Detection System",
    emoji: "👁️",
    tag: "Computer Vision",
    color: "#8b5cf6",
    overview: "Real-time eye tracking system using OpenCV and Python for accurate eye movement detection in images and video streams.",
    problem: "Reliable real-time eye tracking requires fast, accurate image processing without heavy hardware.",
    tech: ["Python", "OpenCV", "Machine Learning", "Image Processing", "Video Streams"],
    highlights: [
      "Optimised detection algorithms for real-time performance",
      "Achieved reliable accuracy across varying lighting conditions",
      "Applicable to assistive tech, accessibility, and driver monitoring",
    ],
  },
  {
    title: "Vehicle Accident Prevention",
    emoji: "🚗",
    tag: "IoT / Hardware",
    color: "#f59e0b",
    overview: "Driver drowsiness detection system using eye blink sensor and Arduino — automatically stops the vehicle when the driver is unresponsive.",
    problem: "Drowsy driving is a leading cause of road accidents, especially on long-haul routes.",
    tech: ["Arduino", "Embedded C", "Eye Blink Sensor", "Relay Module", "IoT"],
    highlights: [
      "Real-time drowsiness monitoring with configurable threshold",
      "Automatic vehicle shutdown via relay module for safety",
      "Prototype validated the concept for real-world road safety",
    ],
  },
  {
    title: "RFID Door Access System",
    emoji: "🔐",
    tag: "Embedded / Security",
    color: "#10b981",
    overview: "Automated door access and attendance tracking system using RFID reader, tags, and Arduino programmed in Embedded C.",
    problem: "Manual attendance recording is error-prone and insecure for access-controlled environments.",
    tech: ["Arduino", "Embedded C", "RFID", "Database", "Automation"],
    highlights: [
      "Authenticated users and recorded attendance in a secure database",
      "Eliminated manual effort, improved accuracy and security",
      "Demonstrated real-world automation at institutional scale",
    ],
  },
]

const STATS = [
  { value: "1.5+", label: "Years of Experience" },
  { value: "4+", label: "Projects Shipped" },
  { value: "2", label: "Companies" },
  { value: "12+", label: "Technologies" },
]

const ABOUT_CARDS = [
  {
    icon: "🎓",
    title: "The Foundation",
    body: "Graduated from KL University with a B.Tech in ECE and a 9.07 GPA, building a rigorous foundation in electronics, programming, and systems thinking — skills that directly translate to how I architect UIs today.",
  },
  {
    icon: "🏢",
    title: "Microsoft & Enterprise Scale",
    body: "As a Software Engineering Intern at Microsoft India, I built enterprise browser tooling used for internal network security — working with REST APIs, Office 365 integrations, and real performance constraints.",
  },
  {
    icon: "🌾",
    title: "Building at Production Scale",
    body: "At Kshema General Insurance, I develop React.js web apps and React Native mobile apps for crop insurance — a high-stakes domain where performance, reliability, and usability directly impact farmers.",
  },
  {
    icon: "🛠️",
    title: "What Drives Me",
    body: "I care deeply about the space where design meets engineering — building interfaces that feel effortless to use, regardless of the complexity underneath. My goal is to contribute to products that solve real problems.",
  },
]

const EDUCATION = [
  { degree: "B.Tech in Electronics & Communication Engineering", school: "KL University", period: "2020 – 2024", gpa: "9.07 / 10" },
  { degree: "Intermediate — Mathematics, Physics & Chemistry", school: "Narayana Junior College", period: "2018 – 2020", gpa: "9.3 / 10" },
  { degree: "Secondary School Certificate", school: "Munnangi High School", period: "2017 – 2018", gpa: "9.2 / 10" },
]

const CONTACTS = [
  { icon: "📧", label: "Email", value: "siri161329@gmail.com", href: "mailto:siri161329@gmail.com" },
  { icon: "📱", label: "Phone", value: "+91 7993469244", href: "tel:+917993469244" },
  { icon: "💼", label: "LinkedIn", value: "View Profile", href: "https://www.linkedin.com/in/kshatri-reshmasree-59b603219/" },
]

function useWindowWidth() {
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200)
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return width
}

function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function FadeIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function SkillBar({ name, level, desc, dark }: { name: string; level: number; desc: string; dark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 16, color: dark ? "#f1f5f9" : "#1e293b" }}>{name}</span>
        <span style={{ fontSize: 15, color: dark ? "#94a3b8" : "#64748b", flexShrink: 0 }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: dark ? "#1e293b" : "#e2e8f0", borderRadius: 99 }}>
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            width: visible ? `${level}%` : "0%",
            transition: "width 1.1s cubic-bezier(.4,0,.2,1) 0.2s",
          }}
        />
      </div>
      <p style={{ fontSize: 14, color: dark ? "#64748b" : "#94a3b8", marginTop: 4 }}>{desc}</p>
    </div>
  )
}

export default function Portfolio() {
  const [dark, setDark] = useState(true)
  const [active] = useState("About")
  const [menuOpen, setMenuOpen] = useState(false)

  const width = useWindowWidth()
  const isMobile = width < 768
  const isTablet = width < 1024

  const bg = dark ? "#0a0a0f" : "#f8fafc"
  const surface = dark ? "#111118" : "#ffffff"
  const card = dark ? "#16161f" : "#f1f5f9"
  const border = dark ? "#1e2030" : "#e2e8f0"
  const text = dark ? "#f1f5f9" : "#0f172a"
  const muted = dark ? "#94a3b8" : "#64748b"
  const accent = "#6366f1"

  const sectionPadX = isMobile ? 16 : 24
  const sectionPadY = isMobile ? 56 : 80
  const cardPad = isMobile ? 20 : 28

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <div
      style={{
        fontFamily: "'Inter','Segoe UI',sans-serif",
        background: bg,
        color: text,
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
        overflowX: "hidden",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: dark ? "rgba(10,10,15,0.85)" : "rgba(248,250,252,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${border}`,
          padding: `0 ${sectionPadX}px`,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 20,
            background: "linear-gradient(135deg,#6366f1,#a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          KR
        </span>

        <div style={{ display: "flex", gap: isMobile ? 8 : 28, alignItems: "center" }}>
          {!isMobile && (
            <div style={{ display: "flex", gap: 20 }}>
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l.toLowerCase())}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 500,
                    color: active === l ? accent : muted,
                    transition: "color 0.2s",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            style={{
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 8,
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {isMobile && (
            <button
              onClick={() => setMenuOpen((m) => !m)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 8,
                width: 36,
                height: 36,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: text,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              right: 0,
              background: dark ? "rgba(10,10,15,0.97)" : "rgba(248,250,252,0.97)",
              backdropFilter: "blur(12px)",
              borderBottom: `1px solid ${border}`,
              display: "flex",
              flexDirection: "column",
              padding: "8px 0",
            }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 17,
                  fontWeight: 500,
                  color: active === l ? accent : muted,
                  padding: "14px 24px",
                  textAlign: "left",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="about"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${isMobile ? 88 : 80}px ${sectionPadX}px 40px`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: isMobile ? 220 : 400,
            height: isMobile ? 220 : 400,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(99,102,241,0.18),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: isMobile ? 200 : 350,
            height: isMobile ? 200 : 350,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 720, textAlign: "center", position: "relative", width: "100%" }}>
          <div
            style={{
              width: isMobile ? 90 : 110,
              height: isMobile ? 90 : 110,
              borderRadius: "50%",
              margin: "0 auto 28px",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? 32 : 38,
              fontWeight: 700,
              color: "#fff",
              boxShadow: "0 0 40px rgba(99,102,241,0.4)",
            }}
          >
            KR
          </div>

          <div
            style={{
              display: "inline-block",
              background: dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)",
              border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.25)"}`,
              borderRadius: 99,
              padding: "4px 16px",
              marginBottom: 20,
              fontSize: 15,
              color: accent,
              fontWeight: 500,
            }}
          >
            Available for Opportunities
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem,6vw,3.4rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Kshatri{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#6366f1,#a78bfa,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Reshmasree
            </span>
          </h1>

          <p style={{ fontSize: "clamp(1rem,3vw,1.25rem)", fontWeight: 600, color: accent, marginBottom: 16 }}>
            Frontend Developer · React.js & React Native
          </p>

          <p
            style={{
              fontSize: "clamp(0.95rem,2.5vw,1.1rem)",
              color: muted,
              maxWidth: 560,
              margin: "0 auto 36px",
              lineHeight: 1.75,
            }}
          >
            I turn complex product requirements into intuitive, performant interfaces — from crop insurance platforms to
            enterprise browser tools at Microsoft.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "View Projects", action: () => scrollTo("projects"), primary: true },
              { label: "Contact Me", action: () => scrollTo("contact"), primary: false },
            ].map(({ label, action, primary }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  padding: "12px 28px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 17,
                  cursor: "pointer",
                  border: primary ? "none" : `1px solid ${border}`,
                  background: primary ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
                  color: primary ? "#fff" : text,
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = primary ? "0 8px 24px rgba(99,102,241,0.4)" : "none"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
              gap: 16,
              marginTop: 56,
              maxWidth: 560,
              marginInline: "auto",
            }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: `1px solid ${border}`,
                  borderRadius: 12,
                  padding: "16px 8px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 13, color: muted, marginTop: 4, lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STORY */}
      <section style={{ padding: `${sectionPadY}px ${sectionPadX}px`, maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: accent,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            My Story
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, marginBottom: 28, letterSpacing: "-0.02em" }}>
            From ECE grad to shipping real products at scale
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 32 }}>
          {ABOUT_CARDS.map(({ icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: cardPad, height: "100%" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 16, color: muted, lineHeight: 1.75 }}>{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{ padding: `${sectionPadY}px ${sectionPadX}px`, background: dark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: accent,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Technical Depth
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, marginBottom: 40, letterSpacing: "-0.02em" }}>
              Skills & Proficiency
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 40 }}>
            {Object.entries(SKILLS).map(([cat, skills]) => (
              <FadeIn key={cat}>
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: cardPad }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 24, color: accent }}>{cat}</h3>
                  {skills.map((s) => (
                    <SkillBar key={s.name} {...s} dark={dark} />
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" style={{ padding: `${sectionPadY}px ${sectionPadX}px`, maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: accent,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Career
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, marginBottom: 48, letterSpacing: "-0.02em" }}>
            Experience
          </h2>
        </FadeIn>
        <div style={{ position: "relative", paddingLeft: isMobile ? 24 : 32 }}>
          <div
            style={{
              position: "absolute",
              left: isMobile ? 5 : 11,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(180deg,${accent},#8b5cf6,transparent)`,
              borderRadius: 2,
            }}
          />
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 0.15}>
              <div style={{ position: "relative", marginBottom: 48 }}>
                <div
                  style={{
                    position: "absolute",
                    left: isMobile ? -24 : -32,
                    top: 6,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: exp.color,
                    boxShadow: `0 0 12px ${exp.color}80`,
                  }}
                />
                <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: cardPad }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 2 }}>{exp.role}</h3>
                      <p style={{ fontWeight: 600, color: exp.color, fontSize: 14 }}>{exp.company}</p>
                    </div>
                    <div style={{ textAlign: isMobile ? "left" : "right" }}>
                      <span style={{ fontSize: 15, color: muted }}>{exp.period}</span>
                      <div
                        style={{
                          marginTop: 4,
                          display: "inline-block",
                          background: dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)",
                          borderRadius: 99,
                          padding: "2px 10px",
                          fontSize: 13,
                          color: accent,
                          fontWeight: 500,
                          marginLeft: isMobile ? 0 : 8,
                        }}
                      >
                        {exp.type}
                      </div>
                    </div>
                  </div>
                  <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: "none" }}>
                    {exp.achievements.map((a, j) => (
                      <li
                        key={j}
                        style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 16, color: muted, lineHeight: 1.7 }}
                      >
                        <span style={{ color: accent, flexShrink: 0, marginTop: 3 }}>▸</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          background: dark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
                          color: accent,
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: `1px solid rgba(99,102,241,0.2)`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ padding: `${sectionPadY}px ${sectionPadX}px`, background: dark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)" }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: accent,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Work
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, marginBottom: 40, letterSpacing: "-0.02em" }}>
              Projects
            </h2>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "repeat(2,1fr)",
              gap: 24,
            }}
          >
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div
                  style={{
                    background: surface,
                    border: `1px solid ${border}`,
                    borderRadius: 16,
                    padding: cardPad,
                    height: "100%",
                    borderTop: `3px solid ${p.color}`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,${dark ? 0.4 : 0.1})`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ fontSize: 32 }}>{p.emoji}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        background: `${p.color}20`,
                        color: p.color,
                        padding: "3px 10px",
                        borderRadius: 99,
                        border: `1px solid ${p.color}40`,
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 19, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 16, color: muted, lineHeight: 1.7, marginBottom: 14 }}>{p.overview}</p>
                  <div
                    style={{
                      background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      marginBottom: 16,
                    }}
                  >
                    <p style={{ fontSize: 14, fontWeight: 600, color: p.color, marginBottom: 4 }}>Problem Solved</p>
                    <p style={{ fontSize: 15, color: muted, lineHeight: 1.6 }}>{p.problem}</p>
                  </div>
                  <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 18 }}>
                    {p.highlights.map((h, j) => (
                      <li key={j} style={{ fontSize: 15, color: muted, display: "flex", gap: 8, marginBottom: 6, lineHeight: 1.6 }}>
                        <span style={{ color: p.color }}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          background: card,
                          color: muted,
                          padding: "3px 8px",
                          borderRadius: 6,
                          border: `1px solid ${border}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={{ padding: `${sectionPadY}px ${sectionPadX}px`, maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: accent,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Education
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, marginBottom: 36, letterSpacing: "-0.02em" }}>
            Academic Background
          </h2>
        </FadeIn>
        {EDUCATION.map((e, i) => (
          <FadeIn key={e.school} delay={i * 0.1}>
            <div
              style={{
                display: "flex",
                gap: isMobile ? 14 : 20,
                marginBottom: 20,
                alignItems: "flex-start",
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 14,
                padding: isMobile ? 18 : 22,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                🎓
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{e.degree}</h3>
                <p style={{ fontSize: 16, color: accent, fontWeight: 600, marginBottom: 6 }}>{e.school}</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, color: muted }}>{e.period}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#10b981" }}>GPA: {e.gpa}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{ padding: `${sectionPadY}px ${sectionPadX}px`, background: dark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)" }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: accent,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Let&apos;s Talk
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.02em" }}>
              Open to new opportunities
            </h2>
            <p style={{ fontSize: 17, color: muted, lineHeight: 1.75, marginBottom: 40 }}>
              Whether you&apos;re hiring, collaborating, or just want to connect — I&apos;d love to hear from you.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
                gap: 16,
                marginBottom: 40,
              }}
            >
              {CONTACTS.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: surface,
                    border: `1px solid ${border}`,
                    borderRadius: 14,
                    padding: "20px 16px",
                    textDecoration: "none",
                    transition: "transform 0.15s, border-color 0.15s",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)"
                    e.currentTarget.style.borderColor = accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.borderColor = border
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                  <p style={{ fontSize: 14, color: muted, marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: text, wordBreak: "break-all" }}>{value}</p>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 15, color: muted }}>© 2025 Kshatri Reshmasree · Built with React · Guntur, AP, India</p>
      </footer>
    </div>
  )
}
