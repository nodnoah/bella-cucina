import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion"
import {
  Menu, X, Phone, Mail, MapPin, Clock,
  UtensilsCrossed, ChefHat, Star, Heart,
  MessageCircle, Award, Leaf, Users, ArrowDown,
  Quote, ExternalLink,
} from "lucide-react"
import { Player } from "@remotion/player"
import { MarkerHighlight } from "@/components/ui/marker-highlight"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ─── Data ─────────────────────────────────────────────────────────────────────

const menuItems = [
  {
    id: 1,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon, lemon-herb butter, caperberry tapenade, grilled broccolini",
    price: "$28",
    category: "Secondi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=420&fit=crop&q=85",
  },
  {
    id: 2,
    name: "Truffle Tagliolini",
    description: "Handmade egg pasta, black truffle, aged parmesan, white wine reduction",
    price: "$24",
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=420&fit=crop&q=85",
  },
  {
    id: 3,
    name: "Burrata & Prosciutto",
    description: "Creamy burrata, 24-month San Daniele, heirloom tomatoes, aged balsamic",
    price: "$18",
    category: "Antipasti",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=420&fit=crop&q=85",
  },
  {
    id: 4,
    name: "Wagyu Bistecca",
    description: "200-day grain-fed wagyu, rosemary butter, roasted bone marrow, truffle salt",
    price: "$48",
    category: "Secondi",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=420&fit=crop&q=85",
  },
  {
    id: 5,
    name: "Tiramisu Classico",
    description: "Venetian recipe, Marsala-soaked savoiardi, mascarpone cream, Valrhona cocoa",
    price: "$12",
    category: "Dolci",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=420&fit=crop&q=85",
  },
  {
    id: 6,
    name: "Lobster Bisque",
    description: "Slow-simmered Maine lobster, cognac cream, crème fraîche, micro tarragon",
    price: "$22",
    category: "Zuppa",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=420&fit=crop&q=85",
  },
]

const reviews = [
  {
    id: 1,
    text: "An evening at Bella Cucina is pure magic. The truffle tagliolini alone is worth the pilgrimage. Every detail — the candlelight, the sommelier's guidance, the unhurried pace — speaks to a kitchen that cares deeply.",
    name: "Sarah M.",
    role: "Food Critic, Manhattan Eats",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=85",
    date: "March 2024",
  },
  {
    id: 2,
    text: "I've dined across Rome, Florence and Milan — Bella Cucina rivals them all. The wagyu bistecca is exceptional, and the wine list is among the finest I've encountered outside of Italy.",
    name: "James R.",
    role: "Wine & Dining Enthusiast",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=85",
    date: "February 2024",
  },
  {
    id: 3,
    text: "We celebrated our anniversary here and left with memories that will last a lifetime. The chef came to our table — a genuinely touching gesture. The burrata was the most sublime thing I've ever tasted.",
    name: "Emma L.",
    role: "Regular Guest, 5 years",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=85",
    date: "January 2024",
  },
]

const instagramPosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop&q=85", likes: 1842, comments: 47, caption: "Tonight's special: wood-fired pizza margherita 🍕" },
  { id: 2, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=500&fit=crop&q=85", likes: 2103, comments: 62, caption: "Saffron risotto, slowly stirred to perfection ✨" },
  { id: 3, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=500&fit=crop&q=85", likes: 3241, comments: 89, caption: "Candlelit evenings at Bella Cucina 🕯️" },
  { id: 4, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=500&fit=crop&q=85", likes: 1567, comments: 38, caption: "Where every table tells a story 🍽️" },
  { id: 5, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=500&fit=crop&q=85", likes: 2890, comments: 71, caption: "Our cellar holds over 400 Italian labels 🍷" },
  { id: 6, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop&q=85", likes: 1923, comments: 44, caption: "Freshness is our philosophy, every single day 🌿" },
]

const features = [
  { icon: <Award className="h-5 w-5" />, title: "Michelin Recommended", desc: "Recognised for culinary excellence since 2018" },
  { icon: <Leaf className="h-5 w-5" />, title: "Farm to Table", desc: "Direct relationships with Italian artisan producers" },
  { icon: <Users className="h-5 w-5" />, title: "Private Dining", desc: "Intimate rooms for up to 30 guests" },
  { icon: <ChefHat className="h-5 w-5" />, title: "15 Years of Craft", desc: "Three generations of Italian culinary tradition" },
]

// ─── Animation variants ────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
}

const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)" />
    </svg>
  )
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.73_0.13_70)] text-[oklch(0.73_0.13_70)]" />
      ))}
    </div>
  )
}

// ─── Remotion animated statement scene ────────────────────────────────────────
// Runs inside @remotion/player — must use remotion hooks, cannot use React state

import { AbsoluteFill } from "remotion"
function AnimatedStatement() {
  return (
    <AbsoluteFill
      style={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        <MarkerHighlight
          before="Your "
          highlight="dining experience"
          after=" is waiting."
          markerColor="#e41212"
          baseColor="#F0E6D0"
          highlightedTextColor="#0A0805"
          backgroundColor="#0A0805"
          fontSize={88}
          fontWeight={400}
          speed={0.85}
        />
      </div>
    </AbsoluteFill>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <div className="grain-overlay min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="h-9 w-9 rounded-full bg-primary flex items-center justify-center"
            >
              <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-semibold tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
              Bella Cucina
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {["menu", "reviews", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground capitalize tracking-wider transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollTo("contact")}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 tracking-wide"
            >
              Reserve a Table
            </Button>
          </div>

          <button className="flex md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile menu ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <span className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Bella Cucina</span>
              <button onClick={() => setMobileOpen(false)}><X className="h-6 w-6" /></button>
            </div>
            <motion.nav variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-2 px-6 pt-8">
              {["menu", "reviews", "contact"].map((item) => (
                <motion.button
                  key={item}
                  variants={fadeUp}
                  onClick={() => scrollTo(item)}
                  className="text-left py-4 text-2xl capitalize border-b border-border hover:text-primary transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item}
                </motion.button>
              ))}
              <motion.div variants={fadeUp} className="pt-6">
                <Button
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-primary hover:bg-primary/90 rounded-full h-12 text-base"
                >
                  Reserve a Table
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroImageY }} className="absolute inset-0 scale-110 will-change-transform">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1280&fit=crop&q=90"
            alt="Bella Cucina interior"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.73_0.13_70)/40%] bg-[oklch(0.73_0.13_70)/10%] px-4 py-1.5">
                <ChefHat className="h-3.5 w-3.5 text-[oklch(0.73_0.13_70)]" />
                <span className="text-xs font-medium tracking-[0.15em] uppercase text-[oklch(0.73_0.13_70)]">
                  Authentic Italian Cuisine
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(3rem,7vw,5.5rem)] font-light leading-[1.05] tracking-tight text-white mb-6"
            >
              Experience the{" "}
              <em className="italic font-light block gold-text">Taste of Italy</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-white/72 font-light max-w-xl leading-relaxed mb-10 tracking-wide"
            >
              Fresh ingredients. Timeless recipes. A passion for excellence passed down
              through three generations of Italian culinary craft.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo("menu")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 tracking-wide"
              >
                Explore the Menu
              </Button>
              <Button
                onClick={() => scrollTo("contact")}
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white tracking-wide"
              >
                Reserve a Table
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mt-12 pt-8 border-t border-white/15"
            >
              <div className="flex -space-x-2">
                {[
                  "photo-1494790108377-be9c29b29330",
                  "photo-1472099645785-5658abf4ff4e",
                  "photo-1438761681033-6461ffad8d80",
                  "photo-1500648767791-00dcc994a43e",
                ].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${id}?w=64&h=64&fit=crop&q=80`}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <Stars />
                <p className="text-sm text-white/58 mt-0.5">Loved by 500+ guests · 4.9 average</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.button
          onClick={() => scrollTo("features")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-light">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </section>

      {/* ── Features strip ──────────────────────────────────────────────── */}
      <section id="features" className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center gap-3 group">
                <div className="h-11 w-11 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {f.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm tracking-wide">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Chef quote ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Quote className="h-8 w-8 text-primary/40 mx-auto mb-6" />
          <blockquote
            className="text-[clamp(1.4rem,3vw,2rem)] font-light leading-relaxed text-foreground/90 italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "We cook with love, using the finest ingredients Italy has to offer.
            Every plate is a letter home."
          </blockquote>
          <p className="mt-6 text-xs text-muted-foreground tracking-widest uppercase font-light">
            — Marco Russo, Executive Chef
          </p>
          <div className="warm-divider mt-8 mx-auto max-w-xs" />
        </motion.div>
      </section>

      {/* ── Menu ────────────────────────────────────────────────────────── */}
      <section id="menu" className="py-20 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase text-primary mb-3 font-medium">
              La Cucina
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-light tracking-tight"
            >
              Our Signature Dishes
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-md mx-auto font-light text-sm leading-relaxed tracking-wide">
              Seasonal menus crafted from produce delivered each morning from our partner farms.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {menuItems.map((item) => (
              <motion.article
                key={item.id}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
                className="group overflow-hidden rounded-2xl border border-border bg-card hover:shadow-[0_20px_60px_oklch(0.56_0.19_42/12%)] transition-shadow duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                    {item.price}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary">
                    {item.category}
                  </span>
                  <h3
                    className="text-xl font-medium mt-1 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 font-light">
                    {item.description}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 hover:border-primary rounded-full transition-all duration-300 tracking-wide"
                  >
                    Order Now
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border text-muted-foreground hover:text-foreground hover:border-primary/50 tracking-wide px-10"
            >
              View Full Menu
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase text-primary mb-3 font-medium">
              Testimonials
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-light tracking-tight"
            >
              What Our Guests Say
            </motion.h2>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mt-6">
              <Stars />
              <span className="text-[oklch(0.73_0.13_70)] font-semibold text-lg">4.9</span>
              <span className="text-muted-foreground text-sm">· Based on 500+ verified reviews</span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={scaleIn}
                className="relative rounded-2xl border border-border bg-card p-8 flex flex-col gap-5 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="absolute top-5 right-6 text-5xl font-serif text-primary/12 leading-none select-none pointer-events-none">
                  "
                </div>
                <Stars count={review.rating} />
                <blockquote
                  className="text-[15px] leading-[1.85] text-foreground/80 italic font-light flex-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  "{review.text}"
                </blockquote>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Animated statement ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-border">
        <Player
          component={AnimatedStatement}
          inputProps={{}}
          durationInFrames={150}
          fps={30}
          compositionWidth={1400}
          compositionHeight={340}
          controls={false}
          autoPlay
          loop
          acknowledgeRemotionLicense
          style={{ width: "100%", height: "clamp(180px, 24vw, 340px)", display: "block" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >

        </motion.div>
        <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 rounded-full bg-primary/15 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/40 hover:border-primary px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-sm"
          >
            Reserve Your Table Tonight
          </button>
      </section>

      {/* ── Instagram ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-card/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4">
              <InstagramIcon size={22} />
              <span className="text-sm font-medium tracking-wide text-muted-foreground">@bellacucina.nyc</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-light tracking-tight"
            >
              Follow Our Story
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-3 max-w-md mx-auto text-sm font-light tracking-wide">
              Daily life behind the pass — from market mornings to candlelit service.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4"
          >
            {instagramPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={scaleIn}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                />
                <AnimatePresence>
                  {hoveredPost === post.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="absolute inset-0 bg-black/62 flex flex-col items-center justify-center gap-3"
                    >
                      <div className="flex items-center gap-5 text-white">
                        <div className="flex items-center gap-1.5">
                          <Heart className="h-5 w-5 fill-white" />
                          <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="h-5 w-5 fill-white" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </div>
                      </div>
                      <p className="text-white/78 text-xs text-center px-4 font-light leading-relaxed max-w-[160px]">
                        {post.caption}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-border px-7 py-3 text-sm font-medium tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300 group"
            >
              <InstagramIcon size={16} />
              Follow on Instagram
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Contact / Reservation ───────────────────────────────────────── */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.25em] uppercase text-primary mb-3 font-medium">
              Reservations
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-light tracking-tight"
            >
              Join Us at the Table
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: contact info */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-muted-foreground font-light leading-relaxed max-w-sm">
                We'd be honoured to welcome you. Reach us directly or fill in
                the form to secure your table.
              </p>

              <div className="space-y-5">
                {[
                  { icon: <MapPin className="h-4 w-4" />, label: "Location", value: "123 Italian Street, Food District, New York, NY 10001" },
                  { icon: <Phone className="h-4 w-4" />, label: "Telephone", value: "+1 (212) 555-0192" },
                  { icon: <Mail className="h-4 w-4" />, label: "Email", value: "reservations@bellacucina.com" },
                  { icon: <Clock className="h-4 w-4" />, label: "Hours", value: "Monday – Sunday · 12 PM – 11 PM" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex items-start gap-4"
                  >
                    <div className="h-9 w-9 shrink-0 rounded-full border border-border flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-0.5">{item.label}</p>
                      <p className="text-sm font-light">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map image */}
              <div className="rounded-2xl overflow-hidden border border-border h-48 relative">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop&q=80"
                  alt="New York City"
                  className="w-full h-full object-cover opacity-55"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    Food District, New York
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: reservation form */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-8 lg:p-10"
            >
              <h3
                className="text-2xl font-light mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Reserve Your Table
              </h3>
              <p className="text-sm text-muted-foreground mb-8 font-light">
                Complete the form and we'll confirm within 2 hours.
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-wider uppercase text-muted-foreground">First name</label>
                    <Input placeholder="Marco" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-wider uppercase text-muted-foreground">Last name</label>
                    <Input placeholder="Russo" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs tracking-wider uppercase text-muted-foreground">Email</label>
                  <Input type="email" placeholder="marco@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs tracking-wider uppercase text-muted-foreground">Phone</label>
                  <Input type="tel" placeholder="+1 (212) 000-0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-wider uppercase text-muted-foreground">Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-wider uppercase text-muted-foreground">Guests</label>
                    <Input type="number" placeholder="2" min={1} max={20} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs tracking-wider uppercase text-muted-foreground">Special requests</label>
                  <Textarea
                    placeholder="Dietary requirements, allergies, anniversaries, preferred seating…"
                    className="resize-none"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full tracking-wide mt-1"
                  >
                    Confirm Reservation
                  </Button>
                </motion.div>
                <p className="text-center text-xs text-muted-foreground font-light">
                  Or call us at{" "}
                  <a href="tel:+12125550192" className="text-primary hover:underline">+1 (212) 555-0192</a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                  <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  Bella Cucina
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-light max-w-xs leading-relaxed">
                Authentic Italian cuisine crafted with love and the finest ingredients.
                Serving New York since 2009.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-all duration-300"
                >
                  <InstagramIcon size={15} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-4">Navigate</p>
              {[{ label: "Menu", id: "menu" }, { label: "Reviews", id: "reviews" }, { label: "Contact", id: "contact" }].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Hours */}
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-4">Opening Hours</p>
              {[
                { day: "Mon – Thu", time: "12:00 – 22:30" },
                { day: "Fri – Sat", time: "12:00 – 23:30" },
                { day: "Sunday", time: "12:00 – 22:00" },
              ].map((h, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">{h.day}</span>
                  <span className="text-foreground">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="warm-divider mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-light">
              © {new Date().getFullYear()} Bella Cucina. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground font-light">
              123 Italian Street, Food District, New York, NY 10001
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
