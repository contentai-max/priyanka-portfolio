import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Target, 
  Sparkles, 
  Layers, 
  Zap, 
  PenTool 
} from 'lucide-react';
import { GeneralInfo, Competency } from '../types';

interface AboutProps {
  info: GeneralInfo;
  competencies: Competency[];
}

export default function About({ info, competencies }: AboutProps) {
  // Map index to a meaningful Lucide icon for competencies
  const getIcon = (index: number) => {
    switch (index % 6) {
      case 0: return <Compass className="w-5 h-5 text-emerald-400" />;
      case 1: return <Target className="w-5 h-5 text-rose-400" />;
      case 2: return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 3: return <Layers className="w-5 h-5 text-emerald-400" />;
      case 4: return <Zap className="w-5 h-5 text-purple-400" />;
      case 5: return <PenTool className="w-5 h-5 text-emerald-400" />;
      default: return <Compass className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="about" className="pt-10 pb-12 sm:pt-16 sm:pb-16 bg-[#0F172A] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Column Left: Decorative Card & Title */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">
              About the Strategist
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white leading-tight">
              {info.aboutTitle}
            </h2>
            
            <div className="h-1.5 w-20 bg-emerald-500 rounded-full"></div>
            

          </div>

          {/* Column Right: Paragraphs */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            <p className="font-medium text-white">
              {info.aboutParagraph1}
            </p>
            <p className="font-medium text-white">
              {info.aboutParagraph2}
            </p>
          </div>
        </div>

        {/* Competencies Sub-section split */}
        <div className="mt-12 sm:mt-16 pt-12 border-t border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-extrabold font-mono">
              Core Competencies
            </span>
            <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white mt-2">
              {info.competenciesTitle}
            </h3>
            <p className="text-slate-400 mt-3 sm:text-lg">
              {info.competenciesSubtitle}
            </p>
          </div>

          {/* Bento-styled Grid items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {competencies.map((comp, idx) => (
              <motion.div
                key={`comp-${idx}`}
                whileHover={{ y: -6, boxShadow: "0 12px 30px -10px rgba(16,185,129,0.2)" }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-8 shadow-sm flex flex-col justify-between group transition-colors duration-300 hover:border-emerald-500/50"
              >
                <div>
                  <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-emerald-950 transition-colors">
                    {getIcon(idx)}
                  </div>
                  <h4 className="text-lg sm:text-xl font-sans font-bold text-white mb-3 group-hover:text-emerald-300">
                    {comp.title}
                  </h4>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">
                    Value Pillar 0{idx + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
