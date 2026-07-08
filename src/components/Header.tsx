import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, User, Scissors, MapPin, Sparkles } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenCustomizer: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenCustomizer,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const menuItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'services', label: t.navServices },
    { id: 'map', label: t.navMap },
    { id: 'profile', label: t.navProfile },
  ];

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-50 bg-atelier-dark/95 border-b border-gold-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex flex-col cursor-pointer group"
            id="brand-logo"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-gold-400 group-hover:text-gold-300 transition-colors">
              SHANGHAI
            </span>
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.4em] text-gold-100/70 -mt-1 uppercase">
              {t.brandSubtitle}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-1 py-2 font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${
                  activeTab === item.id
                    ? 'text-gold-400 font-medium'
                    : 'text-gray-400 hover:text-gold-200'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Lang Switch + Customizer Shortcut + Profile */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Selector */}
            <div className="flex items-center space-x-2 border-r border-gold-900/40 pr-6">
              <Globe className="w-3.5 h-3.5 text-gold-500/80" />
              <div className="flex space-x-1.5 text-[10px] font-mono tracking-wider">
                {(['fr', 'en', 'cn'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-1.5 py-0.5 rounded transition-all uppercase ${
                      language === lang
                        ? 'bg-gold-500 text-atelier-dark font-semibold'
                        : 'text-gray-400 hover:text-gold-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Online Customizer Button */}
            <button
              id="header-customize-btn"
              onClick={onOpenCustomizer}
              className="flex items-center space-x-2 px-3.5 py-1.5 border border-gold-500/50 hover:border-gold-400 bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 rounded-sm text-[10px] tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(191,163,108,0.15)] hover:shadow-[0_0_20px_rgba(191,163,108,0.3)]"
            >
              <Scissors className="w-3 h-3 animate-pulse" />
              <span>{t.customizeBtn}</span>
            </button>

            {/* Profile trigger */}
            <button
              id="header-profile-btn"
              onClick={() => setActiveTab('profile')}
              className={`p-2 rounded-full border border-gold-900/30 hover:border-gold-500/50 transition-colors ${
                activeTab === 'profile' ? 'bg-gold-500 text-atelier-dark' : 'text-gold-400 bg-atelier-charcoal'
              }`}
            >
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Language shortcut icon */}
            <button
              onClick={() => {
                const nextLang: Record<Language, Language> = { fr: 'en', en: 'cn', cn: 'fr' };
                changeLanguage(nextLang[language]);
              }}
              className="p-1.5 text-gold-400 flex items-center space-x-1"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-mono">{language}</span>
            </button>

            {/* Interactive Customizer trigger */}
            <button
              onClick={onOpenCustomizer}
              className="p-1.5 text-gold-400"
              title={t.customizeBtn}
            >
              <Scissors className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gold-400 hover:text-gold-300"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-atelier-charcoal border-b border-gold-900/40"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2.5 rounded-sm font-sans text-xs tracking-widest uppercase transition-colors ${
                    activeTab === item.id
                      ? 'bg-gold-500/15 text-gold-400 border-l-2 border-gold-400 font-semibold'
                      : 'text-gray-300 hover:bg-atelier-slate/50 hover:text-gold-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-gold-900/20 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    onOpenCustomizer();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gold-500 text-atelier-dark text-xs tracking-widest font-semibold uppercase rounded-sm shadow-md"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>{t.customizeBtn}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase rounded-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t.navProfile}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
