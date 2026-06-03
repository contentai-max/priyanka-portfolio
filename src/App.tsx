import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Library, FileText, Heart, Globe, AlertCircle, Compass } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProjects from './components/FeaturedProjects';
import PortfolioGrid from './components/PortfolioGrid';
import Contact from './components/Contact';
import { GeneralInfo, Competency, Project } from './types';
import { fetchGeneralInfo, fetchCompetencies, fetchPortfolio } from './utils/sheetLoader';

export default function App() {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo | null>(null);
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Load everything in parallel
        const [infoResult, competenciesResult, portfolioResult] = await Promise.all([
          fetchGeneralInfo(),
          fetchCompetencies(),
          fetchPortfolio()
        ]);
        
        setGeneralInfo(infoResult);
        setCompetencies(competenciesResult);
        setProjects(portfolioResult);
      } catch (err) {
        console.error('Critical error loading portfolio data:', err);
        setError('Failed to fetch the latest Google Sheet data. Using offline portfolio templates.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-8 text-slate-200 transition-colors duration-300">
        <div className="text-center space-y-6 max-w-sm">
          {/* Custom vector loading shape */}
          <div className="relative h-16 w-16 mx-auto">
            <div className="absolute inset-0 rounded-lg border-2 border-dashed border-indigo-500 animate-spin"></div>
            <div className="absolute inset-2 bg-indigo-600 text-white rounded flex items-center justify-center font-sans font-extrabold text-lg shadow-lg">
              P
            </div>
          </div>
          <div className="space-y-2 animate-pulse">
            <h3 className="font-sans font-bold text-xl text-white tracking-tight">Syncing Copy Engine</h3>
            <p className="text-xs text-indigo-400 font-mono uppercase tracking-widest">
              Connecting to Google Sheets...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback state if everything is empty
  const activeInfo = generalInfo || {
    headerName: "Priyanka Chauhan",
    headerNavAbout: "About",
    headerNavPortfolio: "Portfolio",
    headerNavContact: "Contact",
    heroTitle: "Strategy-Led Content. Revenue-Driven Results.",
    heroSubtitle: "5+ years of experience producing search-optimized, user-focused content that drives visibility, engagement, and conversions.",
    heroCtaButton: "Work With Me",
    aboutTitle: "I write content that ranks, converts, and builds trust.",
    aboutParagraph1: "My approach blends storytelling, UX communication, and thoughtful use of AI — not as a gimmick, but as a tool to refine language, structure, and strategy.",
    aboutParagraph2: "I help SaaS, tech, and digital-first brands clarify how they speak to their users. With 5+ years of experience, I partner with teams to simplify product messaging, shape positioning, and craft clear, user-first narratives that actually connect.",
    competenciesTitle: "How I Add Value",
    competenciesSubtitle: "A multi-faceted approach to content that ensures quality, visibility, and impact.",
    portfolioSectionTitle: "Portfolio Highlights",
    portfolioSectionSubtitle: "A selection of projects showcasing versatility across numerous industries.",
    contactTitle: "Looking to scale your content strategy?",
    contactSubtitle: "Send me a message, and we’ll discuss how to simplify your product messaging.",
    contactEmail: "Priyacwriter@gmail.com",
    contactCtaButton: "Let's Connect",
    footerCopyright: "Priyanka Chauhan. All Rights Reserved."
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans selection:bg-indigo-500/20 selection:text-indigo-300 overflow-x-hidden antialiased transition-colors duration-350">
      
      {/* Toast Alert error banner if sheet loading fails */}
      {error && (
        <div className="bg-amber-500/10 text-amber-800 border-b border-amber-500/20 px-4 py-3 text-xs font-mono font-bold flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Structural Layout */}
      <Header info={activeInfo} theme={theme} onToggleTheme={toggleTheme} />
      
      <main>
        <Hero info={activeInfo} />
        
        <About info={activeInfo} competencies={competencies} />
        
        <FeaturedProjects projects={projects} />
        
        <PortfolioGrid projects={projects} />
        
        <Contact info={activeInfo} />
      </main>

    </div>
  );
}
