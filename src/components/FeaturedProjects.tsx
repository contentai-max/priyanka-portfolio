import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, FileText, ArrowRight, CornerDownRight } from 'lucide-react';
import { Project } from '../types';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Map each vertical category to a representative project from dynamic list
  const highlights = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const selectedList: { label: string; project: Project }[] = [];
    const usedIds = new Set<string>();

    const getProj = (filterFn: (p: Project) => boolean) => {
      const found = projects.find(p => !usedIds.has(p.id) && filterFn(p)) 
                 || projects.find(p => filterFn(p)); // fall back to allow reuse if none unused
      if (found) {
        usedIds.add(found.id);
      }
      return found;
    };

    // 1. Healthcare Highlight: Exact matches to Healthcare
    const hc = getProj(p => p.category === 'Healthcare & Wellness' || p.category === 'Healthcare');
    if (hc) selectedList.push({ label: 'Healthcare', project: hc });

    // 2. B2B & Technology Highlight: Specific B2B SaaS, Technology, or pricing platform copy
    const b2bTech = getProj(p => {
      const catLower = p.category.toLowerCase();
      const clientLower = p.client.toLowerCase();
      return (
        catLower.includes('b2b') ||
        catLower === 'b2b' ||
        catLower.includes('technology') ||
        catLower === 'tech' ||
        catLower === 'technology' ||
        clientLower.includes('pricing') ||
        clientLower.includes('bridgeway') ||
        clientLower.includes('compass')
      );
    });
    if (b2bTech) selectedList.push({ label: 'B2B & Technology', project: b2bTech });

    // 3. Real Estate Highlight: Match Real Estate category precisely, and exclude beauty or personal care fallbacks
    const re = getProj(p => {
      const catLower = p.category.toLowerCase();
      const isRE = catLower === 'real estate' || catLower.includes('estate') || catLower.includes('realty');
      const isBeautyOrMassage = catLower.includes('beauty') || catLower.includes('personal care') || catLower.includes('massage') || catLower.includes('hair');
      return isRE && !isBeautyOrMassage;
    });
    if (re) selectedList.push({ label: 'Real Estate', project: re });

    // 4. Insurance Highlight: Match Insurance category precisely or GoDaddy/VALPAK campaign terms
    const ins = getProj(p => p.category === 'Insurance' || p.client.toLowerCase().includes('godaddy') || p.client.toLowerCase().includes('valpak') || p.client.toLowerCase().includes('insurance'));
    if (ins) selectedList.push({ label: 'Insurance', project: ins });

    // 5. Personal Branding Highlight: Match Personal Branding category precisely
    const pb = getProj(p => p.category === 'Personal Branding' || p.category.toLowerCase().includes('personal branding'));
    if (pb) selectedList.push({ label: 'Personal Branding', project: pb });

    return selectedList;
  }, [projects]);

  if (highlights.length === 0) return null;

  return (
    <section id="featured" className="pt-10 pb-20 sm:pt-16 sm:pb-32 bg-[#0B1220]/90 border-b border-slate-800/85 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-950/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-950/20 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Group */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#34d399] font-bold font-mono flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 animate-pulse" /> Curated Collection
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white mt-2">
              Key Project Highlights
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm sm:text-base leading-relaxed">
            A precise selection of highly targeted content strategies demonstrating robust SEO results, direct brand connection, and empathetic niche positioning.
          </p>
        </div>

        {/* Tab/Selector Bar with swipe scroll optimized for mobile */}
        <div className="flex overflow-x-auto whitespace-nowrap md:flex-wrap gap-2 mb-10 border-b border-slate-800 pb-4 custom-scrollbar snap-x scroll-smooth">
          {highlights.map((hl, idx) => (
            <button
              key={`feat-tab-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`snap-start shrink-0 px-4 py-2.5 text-xs uppercase tracking-widest font-mono font-bold transition-all duration-300 rounded-lg ${
                activeIndex === idx
                  ? 'text-white bg-emerald-600 font-extrabold border border-emerald-500 shadow-md shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-white bg-slate-900/50 border border-transparent'
              }`}
            >
              0{idx + 1}. {hl.label}
            </button>
          ))}
        </div>

        {/* Featured Card Showcase with Motion */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {highlights.map((hl, idx) => {
              if (idx !== activeIndex) return null;
              
              const proj = hl.project;
              
              return (
                <motion.div
                  key={`feat-card-${proj.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                >
                  
                  {/* Accent Panel / Marquee block */}
                  <div className="lg:col-span-5 bg-emerald-950/80 backdrop-blur-md text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-r border-slate-800">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <FileText className="w-64 h-64 -mr-16 -mt-16" />
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                      <span className="px-3 py-1 bg-emerald-600/30 text-emerald-300 border border-emerald-500/20 text-[10px] uppercase tracking-widest font-mono font-bold rounded-full">
                        Curated Showcase
                      </span>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 block mb-1">
                          Industry Niche
                        </span>
                        <p className="text-sm font-semibold tracking-wide text-white/90">
                          {hl.label.toLowerCase() === proj.category.toLowerCase()
                            ? hl.label
                            : `${hl.label} (${proj.category})`}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 block mb-1">
                          Client Partner
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white leading-snug">
                          {proj.client}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-12 relative z-10">
                      {proj.excerpt && (
                        <div className="border-l-2 border-emerald-500 pl-4 py-1 italic font-sans text-emerald-100 text-sm leading-relaxed">
                          "{proj.excerpt.replace(/^"|"$/g, '')}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details block */}
                  <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 flex flex-col justify-between bg-slate-900">
                    <div className="space-y-6">
                      
                      <div>
                        <h4 className="text-xs uppercase font-mono font-extrabold tracking-widest text-slate-500 flex items-center gap-1.5">
                          <CornerDownRight className="w-3.5 h-3.5 text-emerald-400" /> Project Scope & Strategy
                        </h4>
                        <p className="mt-2 text-white font-sans text-lg leading-relaxed font-semibold">
                          {proj.scope}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-800">
                        <h4 className="text-xs uppercase font-mono font-extrabold tracking-widest text-slate-500 flex items-center gap-1.5">
                          <CornerDownRight className="w-3.5 h-3.5 text-emerald-400" /> Core Contribution & Outcomes
                        </h4>
                        <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                          {proj.contribution}
                        </p>
                      </div>

                    </div>

                    <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                        <span>Read full copy deck</span>
                        <span>•</span>
                        <span>Google Doc Verified</span>
                      </div>
                      
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all rounded-lg border border-emerald-500 shadow-sm shadow-emerald-500/10"
                        >
                          View Project Copy <ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
