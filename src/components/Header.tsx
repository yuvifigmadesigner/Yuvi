
import React, { useState, useEffect } from 'react';
import { Briefcase, Linkedin, Instagram, Menu, X } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS, NAV_LINKS } from '../constants';

interface HeaderProps {
  onNavigate: (page: 'home' | 'work' | 'about') => void;
  currentPage: 'home' | 'work' | 'about';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (label: string) => {
    onNavigate(label.toLowerCase() as 'home' | 'work' | 'about');
    setIsMenuOpen(false);
  };

  const getLink = (label: string) => SOCIAL_LINKS.find(l => l.label === label)?.href || '#';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? 'py-2 bg-[#1a1512]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl supports-[backdrop-filter]:bg-[#1a1512]/50'
          : 'py-6 md:py-8 bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 w-full max-w-screen-2xl 2xl:max-w-[1800px] mx-auto">

          {/* LEFT: Logo Animation */}
          <div
            className="cursor-pointer hover:opacity-80 transition-opacity z-50 relative"
            onClick={() => handleNavClick('home')}
          >
            <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'scale-75 origin-left' : 'scale-100'} w-[180px] h-[60px] -ml-4 flex items-center`}>
              <DotLottieReact
                src="https://lottie.host/6f33a9cb-c6c4-4a3d-9363-3cff17fa93ca/uiviswzgrj.lottie"
                loop
                autoplay
              />
            </div>
          </div>

          {/* CENTER: Floating Island Nav (Desktop) */}
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden md:block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'scale-90 origin-center' : 'scale-100'}`}>
            <nav className={`flex items-center ${scrolled ? 'p-1' : 'p-1.5'} rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg ring-1 ring-white/5 transition-all duration-500`}>
              {NAV_LINKS.map((link) => {
                const isActive = currentPage === link.label.toLowerCase();
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.label)}
                    className={`relative ${scrolled ? 'px-5 py-2' : 'px-6 py-2.5'} text-sm font-medium transition-colors duration-300 rounded-full ${isActive ? 'text-black' : 'text-white/70 hover:text-white'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 font-sans tracking-wide">{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT: Social Icons & Menu */}
          <div className={`flex items-center gap-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'scale-90 origin-right' : 'scale-100'}`}>
            {/* Desktop Social Icons - Circular Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {[
                { label: 'Upwork', icon: Briefcase },
                { label: 'LinkedIn', icon: Linkedin },
                { label: 'Instagram', icon: Instagram }
              ].map((social) => (
                <a
                  key={social.label}
                  href={getLink(social.label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative ${scrolled ? 'w-9 h-9' : 'w-10 h-10'} rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black hover:border-transparent`}
                  aria-label={social.label}
                >
                  <social.icon size={scrolled ? 16 : 18} strokeWidth={1.5} />

                  {/* Tooltip */}
                  <span className="absolute top-full mt-3 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-wider rounded opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button - Glassy Square */}
            <button
              className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#0f0a06] z-[60] flex flex-col p-6 md:p-12"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-12">
              <div
                className="cursor-pointer"
                onClick={() => handleNavClick('home')}
              >
                <div className="w-[160px] h-[50px] -ml-4 flex items-center">
                  <DotLottieReact
                    src="https://lottie.host/6f33a9cb-c6c4-4a3d-9363-3cff17fa93ca/uiviswzgrj.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>

              <button
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col items-center justify-center flex-1 space-y-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => handleNavClick(link.label)}
                  className={`text-3xl md:text-5xl font-light tracking-tight transition-colors duration-300 ${currentPage === link.label.toLowerCase() ? 'text-white' : 'text-white/40 active:text-white'
                    }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-6 mt-12 mb-8"
            >
              {[
                { label: 'Upwork', icon: Briefcase },
                { label: 'LinkedIn', icon: Linkedin },
                { label: 'Instagram', icon: Instagram }
              ].map((social) => (
                <a
                  key={social.label}
                  href={getLink(social.label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 active:scale-95 active:bg-white active:text-black transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
