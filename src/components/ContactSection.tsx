import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Building, User, Globe, ArrowRight } from 'lucide-react';
import { ContactFormState } from '../types';

export const ContactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conversation' | 'ecosystem'>('conversation');
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    organization: '',
    areaOfInterest: 'Artificial Intelligence',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative border-t border-white/5 bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Headline & Scope */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-white/10 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Communications</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Let's build what comes next.
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light mb-8">
                Whether you are a researcher, engineer, educator, founder, investor or organization exploring emerging technology, we'd like to hear from you.
              </p>

              {/* Mode Toggle Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  id="btn-tab-conversation"
                  onClick={() => setActiveTab('conversation')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                    activeTab === 'conversation'
                      ? 'bg-white text-black font-semibold border-white shadow-lg'
                      : 'bg-zinc-900/50 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  Start a conversation
                </button>
                <button
                  id="btn-tab-ecosystem"
                  onClick={() => setActiveTab('ecosystem')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                    activeTab === 'ecosystem'
                      ? 'bg-white text-black font-semibold border-white shadow-lg'
                      : 'bg-zinc-900/50 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  Join our ecosystem
                </button>
              </div>
            </div>

            {/* Direct Channel Specifications */}
            <div className="p-6 rounded-xl bg-zinc-950/80 border border-white/5 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span className="text-zinc-500">PRIMARY ENCRYPTED CHANNEL:</span>
                <span className="text-white hover:text-cyan-400 cursor-pointer">inquiries@planeriac.com</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span className="text-zinc-500">RESPONSE LATENCY:</span>
                <span className="text-zinc-300">Within 24 Hours</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span className="text-zinc-500">SECURE DISCLOSURE:</span>
                <span className="text-zinc-300">PGP Key Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Technical Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#080a0f] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Transmission Received</h3>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto">
                    Your transmission has been securely logged with reference <span className="font-mono text-cyan-400">PLN-{Math.floor(100000 + Math.random() * 900000)}</span>. A member of our technical staff or research leadership will follow up.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        organization: '',
                        areaOfInterest: 'Artificial Intelligence',
                        message: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white"
                  >
                    Transmit Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="font-mono text-xs text-zinc-400 pb-3 border-b border-white/5 flex items-center justify-between">
                    <span>TRANSMISSION PROTOCOL: {activeTab.toUpperCase()}</span>
                    <span className="text-cyan-400">ALL FIELDS VERIFIED</span>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Elena Vance"
                        className="w-full bg-[#0d0f17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 font-sans transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Official Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@institute.org"
                        className="w-full bg-[#0d0f17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 font-sans transition-all"
                      />
                    </div>
                  </div>

                  {/* Organization & Area of Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-org" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Organization / University
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Advanced Systems Lab"
                        className="w-full bg-[#0d0f17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 font-sans transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-interest" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Area of Interest
                      </label>
                      <select
                        id="contact-interest"
                        value={formData.areaOfInterest}
                        onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                        className="w-full bg-[#0d0f17] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 font-sans transition-all"
                      >
                        <option value="Artificial Intelligence">Artificial Intelligence &amp; ML</option>
                        <option value="Robotics & Control">Robotics &amp; Autonomous Systems</option>
                        <option value="Surgical Robotics">Surgical Robotics Program</option>
                        <option value="Computing & Semiconductors">Computing &amp; Semiconductor Architecture</option>
                        <option value="Biomedical & Genomics">Biomedical &amp; Computational Biology</option>
                        <option value="Asmita Education">Asmita Professional &amp; Tech Education</option>
                        <option value="Venture Incubation">Technology Ventures &amp; Incubation</option>
                        <option value="General Exploration">General Research Collaboration</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Brief Message or Research Proposal *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your research inquiries, potential technical synergies, or questions..."
                      className="w-full bg-[#0d0f17] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 font-sans transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="btn-submit-contact"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Encrypting &amp; Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
