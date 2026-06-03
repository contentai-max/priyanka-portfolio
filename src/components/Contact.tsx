import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Calendar, CheckCircle2, MessageSquare, Linkedin } from 'lucide-react';
import { GeneralInfo } from '../types';

interface ContactProps {
  info: GeneralInfo;
}

export default function Contact({ info }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', industry: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate response
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '', industry: '' });
  };

  return (
    <section id="contact" className="py-20 sm:py-32 bg-[#090D1A] text-slate-200 relative overflow-hidden">
      {/* Decorative dark vector grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Column Left: Text Pitch */}
          <div className="lg:col-span-5 space-y-8">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">
              Let's craft your strategy
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white leading-tight">
              {info.contactTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {info.contactSubtitle}
            </p>
            
            <div className="h-1.5 w-20 bg-emerald-500 rounded-full"></div>

            {/* Direct Channel and Stats */}
            <div className="space-y-4 pt-6 text-sm">
              <a
                href={`mailto:${info.contactEmail}`}
                className="flex items-center gap-3 text-slate-300 hover:text-emerald-300 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <span>{info.contactEmail}</span>
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                </div>
                <span>Response time: Usually within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Column Right: Elegant Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-800 shadow-2xl">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-sans font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" /> Send a Direct Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-industry" className="block text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-2">
                      Industry Vertical (Optional)
                    </label>
                    <input
                      type="text"
                      id="contact-industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="e.g. Real Estate, Healthcare, B2B SaaS"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-2">
                      Project Goals & Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Tell me about your product, your current conversion obstacles, or content strategy objectives..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white text-xs font-bold uppercase tracking-widest transition-all rounded-lg shadow-md"
                  >
                    <span>{info.contactCtaButton}</span> <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="h-16 w-16 bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto border border-emerald-800 border-emerald-500">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-sans font-bold text-white">Message Dispatched</h3>
                    <p className="text-slate-350 text-slate-300 text-sm max-w-sm mx-auto animate-pulse">
                      Thank you for connecting! Your strategy interest has been received. Priyanka will review and respond shortly.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-800">
                    <a
                      href={`mailto:${info.contactEmail}`}
                      className="inline-flex items-center gap-2 text-emerald-400 hover:text-white font-mono font-bold text-xs uppercase tracking-widest transition-colors mb-4"
                    >
                      Or Email Directly <Send className="w-3.5 h-3.5" />
                    </a>
                    <div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs text-slate-400 underline hover:text-white transition-colors"
                      >
                        Send another dispatch
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </div>

        </div>

        {/* Brand Footer */}
        <div className="mt-20 sm:mt-32 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {info.footerCopyright}</p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
              B2B SaaS Content Framework
            </span>
            <span>•</span>
            <a 
              href={`mailto:${info.contactEmail}`}
              className="hover:text-emerald-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
