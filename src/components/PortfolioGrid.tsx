import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, BookOpen, ExternalLink, SlidersHorizontal, ChevronRight, Check, X } from 'lucide-react';
import { Project } from '../types';

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Default to All for directory overview
  const [activeGroup, setActiveGroup] = useState<{ categoryName: string; projects: Project[] } | null>(null);

  // Extract all categories dynamically and count them based on total project database
  const categoriesWithCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    
    // Sort categories by project count desc, then alphabetically
    const sortedCats = Object.keys(counts).sort((a, b) => {
      if (counts[b] !== counts[a]) {
        return counts[b] - counts[a];
      }
      return a.localeCompare(b);
    });

    return sortedCats.map(cat => ({
      name: cat,
      count: counts[cat]
    }));
  }, [projects]);

  // Clean or search filtered projects
  const filteredProjects = useMemo(() => {
    let result = projects;
    
    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    return result;
  }, [projects, selectedCategory]);

  // Group filtered projects by category name
  const groupedProjects = useMemo(() => {
    const groups: { [key: string]: Project[] } = {};
    filteredProjects.forEach(proj => {
      if (!groups[proj.category]) {
        groups[proj.category] = [];
      }
      groups[proj.category].push(proj);
    });

    // Sort matching categories to stay in the same visual order as categoriesWithCounts
    const orderedCategories = categoriesWithCounts
      .filter(cat => groups[cat.name] !== undefined)
      .map(cat => ({
        categoryName: cat.name,
        projects: groups[cat.name],
        count: groups[cat.name].length
      }));

    // Add any remaining groups just in case
    Object.keys(groups).forEach(catName => {
      if (!orderedCategories.some(c => c.categoryName === catName)) {
        orderedCategories.push({
          categoryName: catName,
          projects: groups[catName],
          count: groups[catName].length
        });
      }
    });

    return orderedCategories;
  }, [filteredProjects, categoriesWithCounts]);

  return (
    <section id="portfolio" className="py-20 sm:py-32 bg-[#0F172A] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Mobile Horizontal Carousel Category Selectors (Smooth Swipe) */}
        <div className="block lg:hidden mb-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2 px-1">
            Browse Industry Niches ({categoriesWithCounts.length + 1})
          </span>
          <div className="flex overflow-x-auto gap-2 pb-3 custom-scrollbar snap-x scroll-smooth">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`snap-start shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 border ${
                selectedCategory === 'All'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              All • {projects.length}
            </button>
            {categoriesWithCounts.map((cat, idx) => (
              <button
                key={`cat-mob-${idx}`}
                onClick={() => setSelectedCategory(cat.name)}
                className={`snap-start shrink-0 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 border whitespace-nowrap ${
                  selectedCategory === cat.name
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Layout split: Left Side bar (Categories), Right details (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar / Category selectors */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" /> Select Industry
              </h3>
              
              {/* Desktop list of tags */}
              <div className="space-y-1 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                <button
                  id="category-btn-all"
                  onClick={() => { setSelectedCategory('All'); }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                    selectedCategory === 'All'
                      ? 'bg-emerald-600 text-white border border-emerald-500 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center gap-1.5 font-mono">
                    <Compass className="w-3.5 h-3.5 text-amber-400" /> All Categories
                  </span>
                  <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full font-bold border border-slate-700">
                    {projects.length}
                  </span>
                </button>

                {categoriesWithCounts.map((cat, idx) => (
                  <button
                    key={`cat-list-${idx}`}
                    id={`category-btn-${idx}`}
                    onClick={() => { setSelectedCategory(cat.name); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg tracking-wide text-left transition-all duration-200 ${
                      selectedCategory === cat.name
                        ? 'bg-emerald-600 text-white font-bold border border-emerald-500 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="truncate pr-2 flex items-center gap-1.5">
                      {selectedCategory === cat.name && <Check className="w-3 h-3 text-amber-400 shrink-0" />}
                      {cat.name}
                    </span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full border ${
                      selectedCategory === cat.name 
                        ? 'bg-emerald-900 border-emerald-800 text-emerald-100 font-extrabold' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 font-bold'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Dynamic scroll note */}
              <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
                Scroll to view all categories
              </div>
            </div>
          </div>

          {/* Cards Dynamic Grid displaying filtered project categories */}
          <div className="lg:col-span-9 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <h3 className="text-xs uppercase tracking-widest font-mono font-extrabold text-slate-500">
                Browsing: <span className="text-emerald-400 font-sans font-bold normal-case text-sm ml-2">{selectedCategory === 'All' ? 'Complete Directory' : `${selectedCategory}`}</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {groupedProjects.length} {groupedProjects.length === 1 ? 'industry niche' : 'industry niches'} found
              </span>
            </div>

            {groupedProjects.length === 0 ? (
              <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner p-10">
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="font-sans font-bold text-white text-xl">No Matches Found</h4>
                <p className="text-slate-400 mt-2 text-sm max-w-sm mx-auto">
                  No copywriting niches found in this category. Try exploring another vertical!
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); }}
                  className="mt-6 px-4 py-2 border border-slate-700 text-xs uppercase tracking-widest text-white bg-slate-800 hover:bg-emerald-600 transition-all rounded-lg"
                >
                  Reset Category Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {groupedProjects.map((group) => {
                    // Extract first available project excerpt as pull quote
                    const firstExcerpt = group.projects.find(p => p.excerpt && p.excerpt.trim() !== '')?.excerpt || '';
                    const displayExcerpt = firstExcerpt 
                      ? firstExcerpt.replace(/^"|"$/g, '') 
                      : group.projects[0]?.scope || 'Strategic conversion copy decks & user narrative blueprints.';

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        key={group.categoryName}
                        id={`category-card-${group.categoryName.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setActiveGroup(group)}
                        className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative group cursor-pointer hover:border-emerald-500/55 hover:bg-slate-800/70 transition-all duration-300"
                        title="Click to view all projects inside this category"
                      >
                        <div>
                          {/* Top badge row */}
                          <div className="flex items-center justify-between mb-5 border-b border-slate-700/50 pb-3">
                            <span className="text-[10px] uppercase tracking-widest text-[#34d399] font-extrabold font-mono flex items-center gap-1.5">
                              <Compass className="w-3.5 h-3.5 text-emerald-400" />
                              Niche Vertical
                            </span>
                            <span className="text-[11px] font-mono font-extrabold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                              {group.count} {group.count === 1 ? 'Project' : 'Projects'}
                            </span>
                          </div>

                          {/* Category Title */}
                          <h4 className="text-xl font-sans font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                            {group.categoryName}
                          </h4>

                          {/* Excerpt Pull Quote directly on the card */}
                          <div className="mt-5 relative p-4 bg-slate-900/60 border-l-4 border-emerald-500 rounded-r-xl">
                            <span className="absolute -top-3 left-4 text-4xl text-emerald-500/10 font-serif pointer-events-none">“</span>
                            <p className="font-sans italic text-slate-350 text-sm leading-relaxed pl-1">
                              "{displayExcerpt}"
                            </p>
                          </div>

                          <p className="text-xs text-slate-400 font-sans mt-5 pl-1 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
                            Client copy sets: <strong className="text-slate-300 ml-1 font-semibold">{group.projects.map(p => p.client).slice(0, 3).join(', ')}{group.projects.length > 3 ? '...' : ''}</strong>
                          </p>
                        </div>

                        {/* Footer trigger */}
                        <div className="mt-8 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors">
                            Explore dynamic decks
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono font-bold group-hover:text-emerald-300 transition-colors">
                            View {group.count} {group.count === 1 ? 'Project' : 'Projects'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Modern Pop-up Detail Modal showing individual projects (Desktop & Mobile compliant) */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          >
            {/* Click backdrop to close */}
            <div 
              className="absolute inset-0 cursor-default" 
              onClick={() => setActiveGroup(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-800 flex items-start justify-between bg-slate-900/40">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold font-mono block">
                    Dynamic Copy Selection
                  </span>
                  <h3 className="text-xl sm:text-3xl font-sans font-extrabold text-white mt-1">
                    {activeGroup.categoryName} ({activeGroup.projects.length} {activeGroup.projects.length === 1 ? 'Project' : 'Projects'})
                  </h3>
                </div>
                <button
                  onClick={() => setActiveGroup(null)}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors cursor-pointer shrink-0 ml-4"
                  title="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Feed of Individual Projects */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar max-h-[60vh]">
                {activeGroup.projects.map((proj, idx) => (
                  <div 
                    key={proj.id}
                    id={`modal-project-item-${idx}`}
                    className={`pb-8 ${idx !== activeGroup.projects.length - 1 ? 'border-b border-slate-800/80' : ''} space-y-4`}
                  >
                    {/* Client Name & Case study badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                       <h4 className="text-lg sm:text-xl font-sans font-bold text-white flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {proj.client}
                      </h4>
                      {proj.isFeatured && (
                        <span className="text-[9px] uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2 py-0.5 border border-amber-500/30 rounded font-mono font-bold flex items-center gap-1">
                          ★ Key Case Study
                        </span>
                      )}
                    </div>

                    {/* Scope of Work */}
                    <div className="text-xs sm:text-sm text-slate-400 font-sans italic border-l-2 border-emerald-500/50 pl-3">
                      <span className="text-[10px] uppercase font-mono font-extrabold text-slate-500 tracking-wider block not-italic mb-0.5">Scope / Requirements</span>
                      {proj.scope}
                    </div>

                    {/* Contribution */}
                    <div>
                      <span className="text-[10px] uppercase font-mono font-extrabold text-slate-500 tracking-wider block mb-1">Copywriting Strategy & Deliverables</span>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                        {proj.contribution}
                      </p>
                    </div>

                    {/* Excerpt Pull Quote inside Modal list */}
                    {proj.excerpt && (
                      <div>
                        <span className="text-[10px] uppercase font-mono font-extrabold text-slate-500 tracking-wider block mb-1">Featured Copy Highlight</span>
                        <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl italic text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                          "{proj.excerpt.replace(/^"|"$/g, '')}"
                        </div>
                      </div>
                    )}

                    {/* Impact / Result block from CSV */}
                    {proj.result && (
                      <div>
                        <span className="text-[10px] uppercase font-mono font-extrabold text-slate-500 tracking-wider block mb-1">Impact & Key Result</span>
                        <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm">
                            {proj.result}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Deliverable/Deck Live Link */}
                    {proj.link && (
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 font-bold">
                          Interactive Workspace Copy Deck
                        </span>
                        <a
                          href={proj.link}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold text-xs uppercase tracking-widest font-mono transition-colors"
                        >
                          Open Live Deck <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/40 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Click outside or press X to close</span>
                {activeGroup.projects.length > 1 && (
                  <span className="animate-pulse">Scroll down for all clients ↓</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
