import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const imageBase = 'https://motionsites.ai/assets/'
const marqueeImages = [
  'hero-space-voyage-preview-eECLH3Yc.gif',
  'hero-codenest-preview-Cgppc2qV.gif',
  'hero-vex-ventures-preview-BczMFIiw.gif',
  'hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'hero-asme-preview-B_nGDnTP.gif',
  'hero-transform-data-preview-Cx5OU29N.gif',
  'hero-vitara-preview-Cjz2QYyU.gif',
  'hero-terra-preview-BFjrCr7T.gif',
  'hero-skyelite-preview-DHaZIgUv.gif',
  'hero-aethera-preview-DknSlcTa.gif',
  'hero-designpro-preview-D8c5_een.gif',
  'hero-stellar-ai-preview-D3HL6bw1.gif',
  'hero-xportfolio-preview-D4A8maiC.gif',
  'hero-orbit-web3-preview-BXt4OttD.gif',
  'hero-nexora-preview-cx5HmUgo.gif',
  'hero-evr-ventures-preview-DZxeVFEX.gif',
  'hero-planet-orbit-preview-DWAP8Z1P.gif',
  'hero-new-era-preview-CocuDUm9.gif',
  'hero-wealth-preview-B70idl_u.gif',
  'hero-luminex-preview-CxOP7ce6.gif',
  'hero-celestia-preview-0yO3jXO8.gif',
]

const services = [
  {
    number: '01',
    title: '3D Modeling',
    description: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    title: 'Rendering',
    description: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    title: 'Motion Design',
    description: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    title: 'Branding',
    description: 'Crafting cohesive visual identities, from logos to full brand systems, that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    title: 'Web Design',
    description: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

const projectData = [
  {
    number: '01',
    type: 'Client',
    name: 'Nextlevel Studio',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    number: '02',
    type: 'Personal',
    name: 'Aura Brand Identity',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    type: 'Client',
    name: 'Solaris Digital',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
]

const aboutText = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ContactButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="mailto:hello@jack.studio"
      className={`contact-button inline-flex items-center justify-center rounded-full uppercase tracking-[0.14em] text-white transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      Contact Me <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
    </a>
  )
}

function MarqueeRow({
  images,
  direction,
  offset,
}: {
  images: string[]
  direction: 'right' | 'left'
  offset: MotionValue<number>
}) {
  const rowX = useTransform(offset, (value) =>
    direction === 'right' ? value - 200 : -(value - 200),
  )
  const repeatedImages = [...images, ...images, ...images]

  return (
    <motion.div style={{ x: rowX }} className="marquee-track flex gap-3">
      {repeatedImages.map((image, index) => (
        <div className="marquee-tile" key={`${image}-${index}`}>
          <img src={`${imageBase}${image}`} alt="" loading="lazy" />
        </div>
      ))}
    </motion.div>
  )
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const offset = useMotionValue(0)

  useEffect(() => {
    function updateOffset() {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      offset.set((window.scrollY - sectionTop + window.innerHeight) * 0.3)
    }
    updateOffset()
    window.addEventListener('scroll', updateOffset, { passive: true })
    window.addEventListener('resize', updateOffset)
    return () => {
      window.removeEventListener('scroll', updateOffset)
      window.removeEventListener('resize', updateOffset)
    }
  }, [offset])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeImages.slice(0, 11)} direction="right" offset={offset} />
        <MarqueeRow images={marqueeImages.slice(11)} direction="left" offset={offset} />
      </div>
    </section>
  )
}

function AnimatedCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = (index / total) * 0.86
  const end = Math.min(start + 0.14, 1)
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className="invisible">{character === ' ' ? '\u00a0' : character}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {character === ' ' ? '\u00a0' : character}
      </motion.span>
    </span>
  )
}

function AnimatedText() {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const characters = Array.from(aboutText)

  return (
    <p ref={textRef} className="about-copy mx-auto max-w-[560px] text-center font-medium leading-relaxed">
      {characters.map((character, index) => (
        <AnimatedCharacter
          key={`${index}-${character}`}
          character={character}
          index={index}
          total={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  )
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleVideoHover = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleVideoLeave = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => undefined)
      setIsPlaying(true)
    }
  }

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => undefined)
      setIsPlaying(true)
      return
    }
    videoRef.current.pause()
    setIsPlaying(false)
  }

  return (
    <section id="top" className="hero-atmosphere relative flex h-screen min-h-[680px] flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0C0C0C]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-90"
          src="/hero-video.mp4"
          autoPlay
          loop
          playsInline
          aria-label="Jack 3D creator intro video"
          onMouseEnter={handleVideoHover}
          onMouseLeave={handleVideoLeave}
        />
        <div className="absolute inset-0 bg-[#0C0C0C]/45" />
      </div>

      <button
        type="button"
        onClick={toggleVideo}
        className="absolute right-5 top-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-8 sm:top-8"
        aria-label="Play or pause hero video"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <FadeIn className="relative z-20" y={-20}>
        <nav className="flex items-center justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] sm:px-10 sm:pt-8 sm:text-lg lg:text-[1.4rem]">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#services">Price</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="mailto:hello@jack.studio">Contact</a>
        </nav>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:px-10 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="hero-index absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/40 md:block">Scroll to explore</div>
    </section>
  )
}

function AboutSection() {
  const decor = [
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
      alt: 'Moon-shaped 3D sculpture',
      className: 'left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
      delay: 0.1,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
      alt: 'Sculptural 3D object',
      className: 'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
      delay: 0.25,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
      alt: 'Glossy 3D toy brick',
      className: 'right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
      delay: 0.15,
      x: 80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
      alt: 'Colorful 3D sculpture group',
      className: 'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
      delay: 0.3,
      x: 80,
    },
  ]

  return (
    <section id="about" className="about-atmosphere relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-24 sm:px-8 md:px-10">
      {decor.map((item) => (
        <FadeIn key={item.src} delay={item.delay} x={item.x} y={0} duration={0.9} className={`pointer-events-none absolute z-0 ${item.className}`}>
          <img src={item.src} alt={item.alt} className="h-auto w-full object-contain" loading="lazy" />
        </FadeIn>
      ))}
      <div className="relative z-10 flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">About me</h2>
        </FadeIn>
        <AnimatedText />
      </div>
      <FadeIn delay={0.15} className="relative z-10 mt-16 sm:mt-20 md:mt-24">
        <ContactButton />
      </FadeIn>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="relative z-10 rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">Services</h2>
        </FadeIn>
        <div>
          {services.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={25}>
              <article className="service-row flex items-center gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12">
                <span className="service-number shrink-0 font-black leading-none">{service.number}</span>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">{service.title}</h3>
                  <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{service.description}</p>
                </div>
              </article>
            </FadeIn>
          ))}
          <div className="border-t border-[rgba(12,12,12,0.15)]" />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projectData)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })
  const targetScale = 1 - (projectData.length - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div className="project-card-track relative h-[85vh] min-h-[640px]" ref={cardRef}>
      <motion.article
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
        className="project-card sticky mx-auto flex h-[min(78vh,760px)] min-h-[560px] w-full origin-top flex-col rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="mb-4 flex shrink-0 items-center gap-3 sm:mb-5 sm:gap-5 md:mb-6 md:gap-7">
          <span className="project-number font-black leading-none">{project.number}</span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#D7E2EA]/55 sm:text-xs">{project.type} project</p>
            <h3 className="project-title truncate font-medium uppercase leading-tight">{project.name}</h3>
          </div>
          <a href="mailto:hello@jack.studio?subject=Project%20enquiry" className="live-project inline-flex shrink-0 items-center rounded-full border-2 border-[#D7E2EA] uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10">
            Live Project <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="project-gallery grid min-h-0 flex-1 grid-cols-[0.4fr_0.6fr] gap-2 sm:gap-3">
          <div className="grid min-h-0 grid-rows-[0.42fr_0.58fr] gap-2 sm:gap-3">
            <div className="project-frame overflow-hidden rounded-[26px] sm:rounded-[36px] md:rounded-[48px]">
              <img className="project-image" src={project.images[0]} alt={`${project.name} project image one`} loading="lazy" />
            </div>
            <div className="project-frame overflow-hidden rounded-[26px] sm:rounded-[36px] md:rounded-[48px]">
              <img className="project-image" src={project.images[1]} alt={`${project.name} project image two`} loading="lazy" />
            </div>
          </div>
          <div className="project-frame min-h-0 overflow-hidden rounded-[26px] sm:rounded-[36px] md:rounded-[48px]">
            <img className="project-image" src={project.images[2]} alt={`${project.name} project image three`} loading="lazy" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="hero-heading mb-12 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20">Project</h2>
        </FadeIn>
        <div className="project-stack">
          {projectData.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="site-shell font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <footer className="flex items-center justify-between border-t border-white/15 bg-[#0C0C0C] px-5 py-8 text-xs uppercase tracking-[0.16em] text-white/50 sm:px-8 md:px-10">
        <span>Jack - 3D Creator</span>
        <a className="nav-link" href="#top">Back to top</a>
        <span>Copyright 2026</span>
      </footer>
    </main>
  )
}
