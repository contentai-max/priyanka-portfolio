import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Mail, Compass, Star, Sun, Moon, Menu, X } from 'lucide-react';
import { GeneralInfo } from '../types';

interface HeaderProps {
  info: GeneralInfo;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Header({ info, theme, onToggleTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-10 w-10 bg-emerald-600 text-white flex items-center justify-center rounded-lg font-bold text-lg shadow-md border border-emerald-500">
              P
            </div>
            <div>
              <span className="font-sans font-bold text-lg sm:text-xl tracking-tight text-white block">
                {info.headerName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block -mt-1 font-mono">
                Content Strategist
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollTo('about')}
              className="text-xs font-extrabold text-slate-200 hover:text-white transition-colors uppercase tracking-wider font-mono"
            >
              {info.headerNavAbout}
            </button>
            <button 
              onClick={() => scrollTo('featured')}
              className="text-xs font-extrabold text-slate-200 hover:text-white transition-colors uppercase tracking-wider font-mono flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Key Work
            </button>
            <button 
              onClick={() => scrollTo('portfolio')}
              className="text-xs font-extrabold text-slate-200 hover:text-white transition-colors uppercase tracking-wider font-mono flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" /> {info.headerNavPortfolio}
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="text-xs font-extrabold text-slate-200 hover:text-white transition-colors uppercase tracking-wider font-mono flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" /> {info.headerNavContact}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              id="theme-toggler"
              aria-label="Toggle Theme"
              className="p-2.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Mobile Menu Action Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 cursor-pointer flex md:hidden items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-emerald-400" /> : <Menu className="w-4 h-4" />}
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-emerald-500 text-xs font-bold uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-500 transition-all rounded-lg shadow-sm"
            >
              {info.heroCtaButton}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Dropdown Menu for Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-slate-800/90 bg-[#0F172A] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <button 
                onClick={() => scrollTo('about')}
                className="w-full text-left px-3 py-3 text-sm font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all uppercase tracking-wider font-mono"
              >
                {info.headerNavAbout}
              </button>
              <button 
                onClick={() => scrollTo('featured')}
                className="w-full text-left px-3 py-3 text-sm font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all uppercase tracking-wider font-mono flex items-center gap-2"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Key Work Highlights
              </button>
              <button 
                onClick={() => scrollTo('portfolio')}
                className="w-full text-left px-3 py-3 text-sm font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all uppercase tracking-wider font-mono flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-400" /> Complete {info.headerNavPortfolio}
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="w-full text-left px-3 py-3 text-sm font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all uppercase tracking-wider font-mono flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-slate-400" /> {info.headerNavContact}
              </button>
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full inline-flex items-center justify-center py-3.5 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md font-mono"
                >
                  {info.heroCtaButton}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
