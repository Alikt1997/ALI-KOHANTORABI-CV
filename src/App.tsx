/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowDown, Globe, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { locales, Language } from './locales';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const cycleLanguage = () => {
    const langs: Language[] = ['en', 'tr', 'fa'];
    const currentIndex = langs.indexOf(lang);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  if (!mounted) return null;

  const t = locales[lang];
  const isRtl = lang === 'fa';

  const renderLang = (langStr: string) => {
    const parts = langStr.split(' - ');
    const name = parts[0];
    const level = parts[1] || '';
    return (
      <div className="flex justify-between items-center py-2 border-b grid-border last:border-0">
        <span className="font-medium">{name}</span>
        <span className="micro-text">{level}</span>
      </div>
    );
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 flex justify-center font-sans ${isRtl ? 'dir-rtl' : 'dir-ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-[1600px] border-l border-t grid-border grid grid-cols-1 md:grid-cols-4">
        
        {/* Row 1: Header / Nav */}
        <div className="col-span-1 md:col-span-2 border-r border-b grid-border p-4 md:p-6 flex flex-col justify-between min-h-[120px]">
          <span className="micro-text">DOCUMENT</span>
          <span className="text-sm font-medium tracking-wide">CURRICULUM VITAE<br/>PORTFOLIO 2026</span>
        </div>
        <div className="col-span-1 border-r border-b grid-border p-4 md:p-6 flex flex-col justify-between min-h-[120px] items-center justify-center">
           <ArrowDown className="w-4 h-4 text-[var(--muted)]" />
        </div>
        <div className="col-span-1 border-r border-b grid-border p-4 md:p-6 flex flex-col justify-between items-end min-h-[120px] text-right">
          <div className="flex gap-4 mb-4">
            <button onClick={cycleLanguage} className="hover:text-[var(--muted)] transition-colors flex items-center gap-2 micro-text">
              <Globe className="w-4 h-4" /> {lang.toUpperCase()}
            </button>
            <button onClick={toggleTheme} className="hover:text-[var(--muted)] transition-colors">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-sm font-medium tracking-wide">APPLICANT<br/>ALI KOHANTORABI</span>
        </div>

        {/* Row 2: Hero Image + Massive Text */}
        <div className="col-span-1 md:col-span-4 border-r border-b grid-border relative min-h-[50vh] flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 z-0 bg-black">
            <img 
              src="https://picsum.photos/seed/cinema/1920/1080?grayscale" 
              className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105" 
              alt="Background" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="massive-text relative z-10 text-center text-white mix-blend-overlay"
          >
            ALI KOHANTORABI
          </motion.h1>
          <div className="absolute top-4 left-4 micro-text z-10 text-white/70">NEW MEDIA &<br/>COMMUNICATION</div>
          <div className="absolute bottom-4 right-4 micro-text z-10 text-right text-white/70">BASED IN<br/>ISTANBUL, TURKEY</div>
        </div>

        {/* Row 3: Contact & About */}
        <div className="col-span-1 border-r border-b grid-border p-6 md:p-8 min-h-[200px] flex flex-col justify-between">
           <div className="micro-text mb-4">CONTACT</div>
           <div className="space-y-2 text-sm">
             <a href={`mailto:${t.email}`} className="block hover:text-[var(--muted)] transition-colors flex items-center gap-1">
               {t.email} <ArrowUpRight className="w-3 h-3" />
             </a>
             <a href={`https://${t.linkedin}`} target="_blank" rel="noopener noreferrer" className="block hover:text-[var(--muted)] transition-colors flex items-center gap-1">
               LinkedIn Profile <ArrowUpRight className="w-3 h-3" />
             </a>
             <p className="text-[var(--muted)] mt-4">{t.location}</p>
           </div>
        </div>
        <div className="col-span-1 border-r border-b grid-border p-6 md:p-8 min-h-[200px] flex items-center justify-center">
           <ArrowDown className="w-4 h-4 text-[var(--muted)]" />
        </div>
        <div className="col-span-1 md:col-span-2 border-r border-b grid-border p-6 md:p-8 min-h-[200px] flex flex-col justify-between">
           <div className="micro-text mb-4">ABOUT</div>
           <p className="text-sm md:text-base leading-relaxed max-w-xl">
             {t.title}. {t.edu1_title} at {t.edu1_school}. Focused on {t.int1.toLowerCase()} and {t.int2.toLowerCase()}.
           </p>
        </div>

        {/* Row 4: Experience */}
        <div className="col-span-1 md:col-span-4 border-r border-b grid-border p-6 md:p-10">
           <div className="micro-text mb-8 md:mb-12">{t.experience}</div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col">
                <h4 className="text-lg font-medium leading-tight mb-1">{t.exp1_title}</h4>
                <p className="text-[var(--muted)] text-sm mb-4">{t.exp1_company}</p>
                <div className="micro-text mb-4">{t.exp1_date}</div>
                <ul className="text-sm space-y-2 text-[var(--muted)] mt-auto">
                  <li>— {t.exp1_desc1}</li>
                  <li>— {t.exp1_desc2}</li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg font-medium leading-tight mb-1">{t.exp2_title}</h4>
                <p className="text-[var(--muted)] text-sm mb-4">{t.exp2_company}</p>
                <div className="micro-text mb-4">{t.exp2_date}</div>
                <ul className="text-sm space-y-2 text-[var(--muted)] mt-auto">
                  <li>— {t.exp2_desc1}</li>
                  <li>— {t.exp2_desc2}</li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg font-medium leading-tight mb-1">{t.exp3_title}</h4>
                <p className="text-[var(--muted)] text-sm mb-4">{t.exp3_company}</p>
                <div className="micro-text mb-4">{t.exp3_date}</div>
                <ul className="text-sm space-y-2 text-[var(--muted)] mt-auto">
                  <li>— {t.exp3_desc1}</li>
                  <li>— {t.exp3_desc2}</li>
                  {t.exp3_desc3 && <li>— {t.exp3_desc3}</li>}
                </ul>
              </div>
           </div>
        </div>

        {/* Row 5: Research & Education */}
        <div className="col-span-1 md:col-span-2 border-r border-b grid-border p-6 md:p-10">
           <div className="micro-text mb-8">{t.research}</div>
           <div className="space-y-8">
             <div>
               <h4 className="text-base font-medium mb-1">{t.res1_title}</h4>
               <p className="text-sm text-[var(--muted)] mb-2">{t.res1_desc}</p>
               <span className="micro-text">{t.res1_meta}</span>
             </div>
             <div>
               <h4 className="text-base font-medium mb-1">{t.res2_title}</h4>
               <p className="text-sm text-[var(--muted)] mb-2">{t.res2_desc}</p>
               <span className="micro-text">{t.res2_meta}</span>
             </div>
             <div>
               <h4 className="text-base font-medium mb-1">{t.res3_title}</h4>
               <p className="text-sm text-[var(--muted)] mb-2">{t.res3_desc}</p>
               <span className="micro-text">{t.res3_meta}</span>
             </div>
           </div>
        </div>
        <div className="col-span-1 md:col-span-2 border-r border-b grid-border p-6 md:p-10">
           <div className="micro-text mb-8">{t.education}</div>
           <div className="space-y-8">
             <div>
               <h4 className="text-base font-medium mb-1">{t.edu1_title}</h4>
               <p className="text-sm text-[var(--muted)] mb-2">{t.edu1_school}</p>
               <span className="micro-text">{t.edu1_date}</span>
             </div>
             <div>
               <h4 className="text-base font-medium mb-1">{t.edu2_title}</h4>
               <p className="text-sm text-[var(--muted)] mb-2">{t.edu2_school}</p>
               <span className="micro-text">{t.edu2_date}</span>
             </div>
           </div>
        </div>

        {/* Row 6: Skills, Certs, Languages */}
        <div className="col-span-1 md:col-span-4 border-r border-b grid-border p-6 md:p-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="micro-text mb-6">{t.skills}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">{t.skill_cat1}</h5>
                    <ul className="text-[var(--muted)] space-y-1">
                      <li>{t.skill1_1}</li>
                      <li>{t.skill1_2}</li>
                      <li>{t.skill1_3}</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">{t.skill_cat2}</h5>
                    <ul className="text-[var(--muted)] space-y-1">
                      <li>{t.skill2_1}</li>
                      <li>{t.skill2_2}</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">{t.skill_cat3}</h5>
                    <ul className="text-[var(--muted)] space-y-1">
                      <li>{t.skill3_1}</li>
                      <li>{t.skill3_2}</li>
                      <li>{t.skill3_3}</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">{t.skill_cat4}</h5>
                    <ul className="text-[var(--muted)] space-y-1">
                      <li>{t.skill4_1}</li>
                      <li>{t.skill4_2}</li>
                      <li>{t.skill4_3}</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="micro-text mb-6">{t.certifications}</div>
                <ul className="text-sm space-y-4">
                  <li>
                    <span className="block font-medium">{t.cert1}</span>
                  </li>
                  <li>
                    <span className="block font-medium">{t.cert2}</span>
                  </li>
                  <li>
                    <span className="block font-medium">{t.cert3}</span>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <div className="micro-text mb-6">{t.languages}</div>
                <div className="space-y-2">
                  {renderLang(t.lang1)}
                  {renderLang(t.lang2)}
                  {renderLang(t.lang3)}
                </div>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="col-span-1 md:col-span-4 border-r border-b grid-border p-4 flex justify-between items-center text-xs text-[var(--muted)]">
          <span>© {new Date().getFullYear()} {t.name}</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

      </div>
    </div>
  );
}

