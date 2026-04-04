/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Linkedin, Users, Share2, PenTool, Globe, Mail, MapPin, ExternalLink } from 'lucide-react';

const translations = {
  EN: {
    name: "ALI KOHANTORABI",
    nav: {
      profile: "PROFILE",
      education: "EDUCATION",
      research: "RESEARCH",
      experience: "EXPERIENCE",
      skills: "SKILLS",
      contact: "CONTACT"
    },
    hero: {
      headline: "I WAS CREATED TO CREATE",
      body: ""
    },
    bento: {
      card1: { title: "Digital Diaspora", subtitle: "TÜBİTAK Research Project", tag: "Research" },
      card2: { title: "1500+", subtitle: "Women Trained in Digital Skills", tag: "Impact" },
      card3: { title: "Social Media Strategy", subtitle: "Crafting engaging digital narratives", tag: "Expertise" },
      card4: { title: "Content Creation", subtitle: "Visual & Written", tag: "Creative" }
    },
    pencilText: "NEW MEDIA & COMMUNICATION STUDENT | SOCIAL MEDIA SPECIALIST",
    sections: {
      education: "EDUCATION",
      research: "RESEARCH",
      experience: "EXPERIENCE",
      skills: "SKILLS",
      certifications: "CERTIFICATIONS",
      contact: "CONTACT"
    },
    education: [
      {
        school: "Üsküdar University",
        degree: "B.A., Expected Feb 2027",
        gpa: "GPA: 3.52"
      },
      {
        school: "Ramsar University",
        degree: "Associate Degree in Architecture, 2017",
        gpa: ""
      }
    ],
    research: [
      "TÜBİTAK Project: Digital Diaspora",
      "Culinary Content Article (under review)",
      "LGBTQ+ visibility article (in progress)"
    ],
    experience: [
      {
        company: "Docsplain",
        role: "Social Media Specialist",
        period: "Present",
        desc: ""
      },
      {
        company: "Freelance",
        role: "Social Media Specialist",
        period: "2024-2025",
        desc: ""
      },
      {
        company: "CandoGroup.ir",
        role: "Media Content Manager & Team Lead",
        period: "2020-2024",
        desc: "Trained 1500+ women."
      }
    ],
    skills: [
      { name: "Research (Qualitative, Content Analysis)", level: 90 },
      { name: "Design Tools (Canva, Adobe Suite)", level: 85 },
      { name: "Social Media Strategy", level: 95 },
      { name: "AI (Generative, Content)", level: 80 }
    ],
    certifications: [
      "Coursera",
      "Generative AI",
      "News Workshop"
    ],
    contact: {
      location: "Istanbul, Turkey",
      email: "Ali.kohantorabi@st.edu.uskudar.tr",
      linkedin: "#",
      portfolio: "https://b2n.ir/ALICV",
      portfolioText: "PORTFOLIO"
    }
  },
  TR: {
    name: "ALI KOHANTORABI",
    nav: {
      profile: "PROFİL",
      education: "EĞİTİM",
      research: "ARAŞTIRMA",
      experience: "DENEYİM",
      skills: "YETENEKLER",
      contact: "İLETİŞİM"
    },
    hero: {
      headline: "YARATMAK İÇİN YARATILDIM",
      body: ""
    },
    bento: {
      card1: { title: "Dijital Diaspora", subtitle: "TÜBİTAK Araştırma Projesi", tag: "Araştırma" },
      card2: { title: "1500+", subtitle: "Dijital Beceriler Eğitimi Alan Kadın", tag: "Etki" },
      card3: { title: "Sosyal Medya Stratejisi", subtitle: "Etkileşimli dijital hikayeler oluşturma", tag: "Uzmanlık" },
      card4: { title: "İçerik Üretimi", subtitle: "Görsel ve Yazılı", tag: "Yaratıcı" }
    },
    pencilText: "YENİ MEDYA VE İLETİŞİM öğrencisi | SOSYAL MEDYA UZMANI",
    sections: {
      education: "EĞİTİM",
      research: "ARAŞTIRMA",
      experience: "DENEYİM",
      skills: "YETENEKLER",
      certifications: "SERTİFİKALAR",
      contact: "İLETİŞİM"
    },
    education: [
      {
        school: "Üsküdar Üniversitesi",
        degree: "Lisans, Beklenen Mezuniyet: Şub 2027",
        gpa: "GNO: 3.52"
      },
      {
        school: "Ramsar Üniversitesi",
        degree: "Mimarlık Önlisans, 2017",
        gpa: ""
      }
    ],
    research: [
      "TÜBİTAK Projesi: Dijital Diaspora",
      "Mutfak İçeriği Makalesi (Hakem Değerlendirmesinde)",
      "LGBTİ+ Görünürlüğü Makalesi (devam ediyor)"
    ],
    experience: [
      {
        company: "Docsplain",
        role: "Sosyal Medya Uzmanı",
        period: "Günümüz",
        desc: ""
      },
      {
        company: "Serbest Çalışan",
        role: "Sosyal Medya Uzmanı",
        period: "2024-2025",
        desc: ""
      },
      {
        company: "CandoGroup.ir",
        role: "Medya İçerik Yöneticisi ve Takım Lideri",
        period: "2020-2024",
        desc: "1500'den fazla kadına eğitim verildi."
      }
    ],
    skills: [
      { name: "Araştırma (Nitel, İçerik Analizi)", level: 90 },
      { name: "Tasarım Araçları (Canva, Adobe Suite)", level: 85 },
      { name: "Sosyal Medya Stratejisi", level: 95 },
      { name: "Yapay Zeka (Üretken, İçerik)", level: 80 }
    ],
    certifications: [
      "Coursera",
      "Üretken Yapay Zeka",
      "Haber Atölyesi"
    ],
    contact: {
      location: "İstanbul, Türkiye",
      email: "Ali.kohantorabi@st.edu.uskudar.tr",
      linkedin: "#",
      portfolio: "https://b2n.ir/ALICV",
      portfolioText: "PORTFOLYO"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'EN' | 'TR'>('EN');
  const [theme, setTheme] = useState<'day' | 'dark'>('day');

  const isDark = theme === 'dark';

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms
  const pencilRotateX = useTransform(smoothY, [-1, 1], [10, -10]);
  const pencilRotateY = useTransform(smoothX, [-1, 1], [-10, 10]);
  const pencilTranslateX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const pencilTranslateY = useTransform(smoothY, [-1, 1], [-30, 30]);

  const textTranslateX = useTransform(smoothX, [-1, 1], [20, -20]);
  const textTranslateY = useTransform(smoothY, [-1, 1], [20, -20]);

  const cardImgX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const cardImgY = useTransform(smoothY, [-1, 1], [-15, 15]);

  const mouseXPos = useTransform(smoothX, [-1, 1], [0, 100]);
  const mouseYPos = useTransform(smoothY, [-1, 1], [0, 100]);
  const bgGradient = useMotionTemplate`radial-gradient(circle at ${mouseXPos}% ${mouseYPos}%, ${isDark ? 'rgba(255,215,0,0.12)' : 'rgba(0,0,0,0.06)'}, transparent 50%)`;

  const t = translations[lang];

  const bgColor = isDark ? 'bg-[#0A1128]' : 'bg-[#FFD700]';
  const textColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const mutedTextColor = isDark ? 'text-white/80' : 'text-[#1a1a1a]/80';
  const lineColor = isDark ? '#FFD700' : '#1a1a1a';
  const navHover = isDark ? 'hover:text-[#FFD700]' : 'hover:opacity-60';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgColor} ${textColor} selection:bg-black selection:text-[#FFD700] relative overflow-hidden`}>
      {/* Global Mouse Spotlight */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: bgGradient }}
      />

      {/* Header */}
      <header className="w-full px-8 md:px-16 py-12 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col justify-center items-start">
            <h1 className={`text-[2rem] md:text-[2.5rem] font-extrabold tracking-tight leading-none px-3 py-1 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
              {t.name}
            </h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <nav className="hidden md:flex flex-wrap items-center gap-x-10 gap-y-4 text-sm font-mono tracking-widest">
            <a href="#profile" className="relative pb-2">
              {t.nav.profile}
              <span className={`absolute left-0 right-0 bottom-0 h-[3px] ${isDark ? 'bg-[#FFD700]' : 'bg-[#1a1a1a]'}`}></span>
            </a>
            <a href="#education" className={`transition-colors pb-2 ${navHover}`}>{t.nav.education}</a>
            <a href="#research" className={`transition-colors pb-2 ${navHover}`}>{t.nav.research}</a>
            <a href="#experience" className={`transition-colors pb-2 ${navHover}`}>{t.nav.experience}</a>
            <a href="#skills" className={`transition-colors pb-2 ${navHover}`}>{t.nav.skills}</a>
            <a href="#contact" className={`transition-colors pb-2 ${navHover}`}>{t.nav.contact}</a>
          </nav>

          {/* Toggles */}
          <div className="flex items-center gap-4 text-sm font-bold tracking-widest">
            <button 
              onClick={() => setLang(lang === 'EN' ? 'TR' : 'EN')}
              className={`px-3 py-1 border-2 rounded-full transition-colors ${isDark ? 'border-white/20 hover:border-[#FFD700]' : 'border-black/20 hover:border-black'}`}
            >
              {lang === 'EN' ? 'TR' : 'EN'}
            </button>
            <button 
              onClick={() => setTheme(isDark ? 'day' : 'dark')}
              className={`px-3 py-1 border-2 rounded-full transition-colors ${isDark ? 'bg-[#FFD700] border-[#FFD700] text-black hover:bg-white hover:border-white' : 'bg-black border-black text-[#FFD700] hover:bg-black/80 hover:border-black/80'}`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col w-full pb-24 z-10">
        
        {/* Hero Section */}
        <section id="profile" className="w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-12 md:pt-24 pb-32 relative z-10">
          {/* Pencil */}
          <div style={{ perspective: 1000 }} className="relative z-10">
            <motion.div 
              className="w-full h-12 md:h-[4.5rem] flex items-center relative" 
              style={{ 
                filter: isDark ? 'drop-shadow(0 20px 40px rgba(255,215,0,0.3))' : 'drop-shadow(0 30px 40px rgba(0,0,0,0.4))',
                rotateX: pencilRotateX,
                rotateY: pencilRotateY,
                x: pencilTranslateX,
                y: pencilTranslateY,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Tip */}
            <div className="h-full w-24 md:w-32 relative flex items-center justify-end">
              {/* Graphite */}
              <div className="absolute left-0 w-8 h-full bg-[#2a2a2a] z-20" style={{ clipPath: 'polygon(0 50%, 100% 35%, 100% 65%)' }}></div>
              {/* Wood */}
              <div className="absolute left-0 w-full h-full bg-[#e6c29a] z-10" style={{ clipPath: 'polygon(0 50%, 100% 0%, 100% 100%)' }}></div>
              {/* Wood shading */}
              <div className="absolute left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/30 z-10" style={{ clipPath: 'polygon(0 50%, 100% 0%, 100% 100%)' }}></div>
            </div>

            {/* Body */}
            <div className="flex-1 h-full bg-[#FFD700] relative flex items-center border-y border-black/10 shadow-[inset_0_10px_20px_rgba(255,255,255,0.3),inset_0_-10px_20px_rgba(0,0,0,0.1)]">
              {/* Top yellow stripe */}
              <div className="absolute top-0 left-0 right-0 h-[25%] bg-[#FFD700] border-b border-black/20"></div>
              
              {/* Black Stripe */}
              <div className="absolute left-0 right-0 top-[25%] bottom-[25%] bg-[#1a1a1a] flex items-center justify-end pr-4 md:pr-12 z-10 shadow-inner overflow-hidden">
                <span className="text-white/90 font-bold tracking-widest text-xs md:text-sm lg:text-base whitespace-nowrap">
                  {t.pencilText}
                </span>
              </div>

              {/* Bottom yellow stripe */}
              <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-[#FFD700] border-t border-black/20"></div>
              
              {/* Overall Body shading */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 pointer-events-none z-20"></div>
            </div>

            {/* Ferrule (Metal part) */}
            <div className="w-8 md:w-12 h-full bg-gradient-to-b from-[#d4d4d4] via-[#f5f5f5] to-[#a3a3a3] border-l border-r border-black/20 flex flex-col justify-evenly relative z-10">
              <div className="w-full h-[2px] bg-black/20 shadow-[0_1px_0_rgba(255,255,255,0.5)]"></div>
              <div className="w-full h-[2px] bg-black/20 shadow-[0_1px_0_rgba(255,255,255,0.5)]"></div>
              <div className="w-full h-[2px] bg-black/20 shadow-[0_1px_0_rgba(255,255,255,0.5)]"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none"></div>
            </div>

            {/* Eraser */}
            <div className="w-6 md:w-10 h-[85%] bg-[#e03c3c] rounded-r-xl border-y border-r border-black/20 relative overflow-hidden shadow-inner">
               <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/30 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>

          {/* Leader Line & Text */}
          <div className="w-full relative mt-8 flex flex-col md:flex-row justify-end md:pr-[10%]">
            <div className="hidden md:flex items-start pt-6 pr-6">
               <svg className="w-16 h-16 overflow-visible z-0 pointer-events-none shrink-0">
                 <circle cx="10" cy="10" r="6" fill={lineColor} />
                 <path d="M 10 10 L 30 30 L 60 30" fill="none" stroke={lineColor} strokeWidth="1.5" />
               </svg>
            </div>

            <motion.div 
              className="w-full md:w-[500px] relative z-10"
              style={{ x: textTranslateX, y: textTranslateY }}
            >
              <h2 className="text-3xl md:text-[3rem] font-bold tracking-widest leading-[1.2] uppercase text-left">
                {t.hero.headline}
              </h2>
              {t.hero.body && (
                <p className={`font-serif text-base md:text-[1.1rem] leading-relaxed mt-6 ${mutedTextColor}`}>
                  {t.hero.body}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="w-full max-w-[1200px] mx-auto px-8 md:px-16 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense">
            
            {/* Card 1: Large */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl p-6 md:p-8 relative overflow-hidden group flex flex-col justify-end shadow-sm hover:shadow-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}
            >
              <motion.div style={{ x: cardImgX, y: cardImgY }} className="absolute -inset-8 z-0">
                <img src="https://picsum.photos/seed/digital/800/800?blur=2" alt="Digital" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-[#FFD700]" />
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#FFD700] text-black rounded-full inline-block">{t.bento.card1.tag}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{t.bento.card1.title}</h3>
                <p className="text-white/80 font-serif text-lg">{t.bento.card1.subtitle}</p>
              </div>
            </motion.div>

            {/* Card 2: Medium */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`col-span-1 md:col-span-3 lg:col-span-2 row-span-1 rounded-3xl p-6 md:p-8 relative overflow-hidden group flex flex-col justify-center shadow-sm hover:shadow-xl ${isDark ? 'bg-[#FFD700] text-black' : 'bg-[#1a1a1a] text-white'}`}
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 inline-block ${isDark ? 'bg-black text-white' : 'bg-[#FFD700] text-black'}`}>{t.bento.card2.tag}</span>
                  <h3 className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">{t.bento.card2.title}</h3>
                  <p className="font-serif opacity-90 text-sm md:text-base">{t.bento.card2.subtitle}</p>
                </div>
                <Users className={`w-16 h-16 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ${isDark ? 'text-black' : 'text-white'}`} />
              </div>
            </motion.div>

            {/* Card 3: Small */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-xl ${isDark ? 'bg-white/10' : 'bg-black/5'}`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#FFD700]' : 'text-black/50'}`}>{t.bento.card3.tag}</span>
                <Share2 className={`w-5 h-5 ${isDark ? 'text-[#FFD700]' : 'text-black/30'}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight mb-2">{t.bento.card3.title}</h3>
                <p className={`text-sm font-serif ${mutedTextColor}`}>{t.bento.card3.subtitle}</p>
              </div>
            </motion.div>

            {/* Card 4: Small with image */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-end shadow-sm hover:shadow-xl ${isDark ? 'bg-white/5' : 'bg-black/10'}`}
            >
              <motion.div style={{ x: cardImgX, y: cardImgY }} className="absolute -inset-8 z-0">
                <img src="https://picsum.photos/seed/creative/400/400" alt="Creative" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="relative z-10 text-white">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block">{t.bento.card4.tag}</span>
                  <PenTool className="w-5 h-5 text-white/50" />
                </div>
                <h3 className="text-lg font-bold leading-tight">{t.bento.card4.title}</h3>
              </div>
            </motion.div>

          </div>
        </section>

        {/* CV Sections */}
        <div className="w-full max-w-[1000px] mx-auto px-8 md:px-16 flex flex-col gap-24">
          
          {/* Education */}
          <section id="education" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`inline-block px-3 py-1 text-sm font-bold tracking-[0.2em] uppercase ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {t.sections.education}
              </h3>
            </div>
            <div className="md:col-span-2 flex flex-col gap-8">
              {t.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col">
                  <h4 className="text-xl font-bold tracking-wide">{edu.school}</h4>
                  <p className={`font-serif mt-2 ${mutedTextColor}`}>{edu.degree}</p>
                  {edu.gpa && <p className={`text-sm font-bold mt-2 ${isDark ? 'text-[#FFD700]' : 'text-black/60'}`}>{edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Research */}
          <section id="research" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`inline-block px-3 py-1 text-sm font-bold tracking-[0.2em] uppercase ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {t.sections.research}
              </h3>
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              {t.research.map((item, idx) => (
                <div key={idx} className={`pl-4 border-l-2 ${isDark ? 'border-[#FFD700]' : 'border-black'}`}>
                  <p className="font-serif text-lg">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`inline-block px-3 py-1 text-sm font-bold tracking-[0.2em] uppercase ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {t.sections.experience}
              </h3>
            </div>
            <div className="md:col-span-2 flex flex-col gap-10">
              {t.experience.map((exp, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <h4 className="text-xl font-bold tracking-wide">{exp.company}</h4>
                    <span className={`text-sm font-bold tracking-widest ${isDark ? 'text-[#FFD700]' : 'text-black/50'}`}>{exp.period}</span>
                  </div>
                  <p className={`font-mono text-sm mt-1 uppercase tracking-wider ${isDark ? 'text-[#FFD700]' : 'text-black/70'}`}>{exp.role}</p>
                  {exp.desc && <p className={`font-serif mt-3 ${mutedTextColor}`}>{exp.desc}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`inline-block px-3 py-1 text-sm font-bold tracking-[0.2em] uppercase ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {t.sections.skills}
              </h3>
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              {t.skills.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="font-bold tracking-wide text-sm">{skill.name}</span>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${isDark ? 'bg-[#FFD700]' : 'bg-black'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`inline-block px-3 py-1 text-sm font-bold tracking-[0.2em] uppercase ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {t.sections.certifications}
              </h3>
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-4">
              {t.certifications.map((cert, idx) => (
                <span key={idx} className={`px-4 py-2 text-sm font-bold tracking-wider rounded-full border ${isDark ? 'border-white/20' : 'border-black/20'}`}>
                  {cert}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pt-12 border-t border-current/10">
            <div className="mb-8">
              <h3 className={`inline-block px-3 py-1 text-sm font-bold tracking-[0.2em] uppercase ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {t.sections.contact}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
              {/* Email Card */}
              <motion.a 
                href={`mailto:${t.contact.email}`}
                whileHover={{ scale: 0.98 }}
                className={`col-span-1 md:col-span-2 rounded-3xl p-6 flex flex-col justify-between group shadow-sm hover:shadow-xl ${isDark ? 'bg-[#FFD700] text-black' : 'bg-[#1a1a1a] text-white'}`}
              >
                <div className="flex justify-between items-start">
                  <Mail className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-widest uppercase mb-1 opacity-70">Email</p>
                  <h4 className="text-lg md:text-2xl font-bold truncate">{t.contact.email}</h4>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className={`col-span-1 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-xl ${isDark ? 'bg-white/10' : 'bg-black/5'}`}
              >
                <motion.div style={{ x: cardImgX, y: cardImgY }} className="absolute -inset-8 z-0">
                  <img src="https://picsum.photos/seed/istanbul/400/400?blur=2" alt="Location" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                </motion.div>
                <div className="relative z-10 flex justify-between items-start">
                  <MapPin className={`w-8 h-8 ${isDark ? 'text-[#FFD700]' : 'text-black/50'}`} />
                </div>
                <div className="relative z-10">
                  <p className={`text-sm font-bold tracking-widest uppercase mb-1 ${isDark ? 'text-[#FFD700]' : 'text-black/50'}`}>Location</p>
                  <h4 className="text-xl font-bold">{t.contact.location}</h4>
                </div>
              </motion.div>

              {/* LinkedIn Card */}
              <motion.a 
                href={t.contact.linkedin} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 0.98 }}
                className={`col-span-1 rounded-3xl p-6 flex flex-col justify-between group shadow-sm hover:shadow-xl bg-[#0077b5] text-white`}
              >
                <div className="flex justify-between items-start">
                  <Linkedin className="w-8 h-8" />
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">LinkedIn</h4>
                </div>
              </motion.a>

              {/* Portfolio Card */}
              <motion.a 
                href={t.contact.portfolio} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 0.98 }}
                className={`col-span-1 md:col-span-2 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-xl ${isDark ? 'bg-white/5' : 'bg-black/10'}`}
              >
                <motion.div style={{ x: cardImgX, y: cardImgY }} className="absolute -inset-8 z-0">
                  <img src="https://picsum.photos/seed/portfolio/800/400?blur=1" alt="Portfolio" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                <div className="relative z-10 flex justify-between items-start text-white">
                  <PenTool className="w-8 h-8 text-[#FFD700]" />
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative z-10 text-white">
                  <p className="text-sm font-bold tracking-widest uppercase mb-1 text-[#FFD700]">Explore</p>
                  <h4 className="text-2xl font-bold">{t.contact.portfolioText}</h4>
                </div>
              </motion.a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}


