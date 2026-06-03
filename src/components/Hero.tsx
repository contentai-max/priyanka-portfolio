import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, ArrowDown } from 'lucide-react';
import { GeneralInfo } from '../types';

interface HeroProps {
  info: GeneralInfo;
}

export default function Hero({ info }: HeroProps) {
  // Replace the placeholder class with our elegant color style
  const displayTitle = "Strategy-Led Content. <span class='text-emerald-400 font-sans font-bold'>Revenue-Driven Results.</span>";

  // Ensure subtitle uses the updated concise search-optimized phrasing
  let displaySubtitle = info.heroSubtitle || "";
  if (!displaySubtitle || displaySubtitle.includes("5+ years writing SEO")) {
    displaySubtitle = "5+ years of experience producing search-optimized, user-focused content that drives visibility, engagement, and conversions.";
  }

  const onCtaClick = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#0F172A] pt-12 pb-10 sm:pt-20 sm:pb-16 border-b border-slate-800">
      {/* Abstract Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
      
      {/* Decorative luxury gradient spots */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-900/10 blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-emerald-950/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/50 border border-emerald-800/40 rounded-full text-xs font-semibold text-emerald-300 tracking-wider font-mono mb-6 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> Let's craft narratives that convert
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-4xl font-sans font-bold text-white tracking-tight leading-[1.15]"
          >
            <span dangerouslySetInnerHTML={{ __html: displayTitle }} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            {displaySubtitle}
          </motion.p>

          {/* CTA actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white text-sm font-semibold uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-md rounded-lg border border-emerald-500"
            >
              Explore Portfolio
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/40 text-slate-200 text-sm font-semibold uppercase tracking-widest hover:bg-slate-800 transition-all rounded-lg border border-slate-700 flex items-center justify-center gap-2 font-mono"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> Let’s Chat
            </button>
          </motion.div>

          {/* Marquee clients band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 pt-6 border-t border-slate-800"
          >
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold font-mono">
              Projects done for:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75">
              <span className="font-sans font-bold text-lg sm:text-xl text-slate-400 tracking-tight hover:text-emerald-400 transition-colors">
                GoDaddy
              </span>
              <span className="font-sans font-extrabold text-lg sm:text-xl text-slate-400 tracking-tight hover:text-emerald-400 transition-colors">
                BlueCorona
              </span>
              <span className="font-sans font-black text-lg sm:text-xl text-slate-400 tracking-wide hover:text-emerald-400 transition-colors">
                VALPAK
              </span>
              <span className="font-sans font-semibold text-lg sm:text-xl text-slate-400 tracking-tight hover:text-emerald-400 transition-colors">
                Turbify
              </span>
              <span className="font-sans font-bold text-lg sm:text-xl text-slate-400 tracking-tight hover:text-emerald-400 transition-colors">
                Contractor Gorilla
              </span>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <div className="mt-8 flex justify-center animate-bounce">
            <ArrowDown className="text-emerald-400 w-5 h-5 opacity-40 cursor-pointer" onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
