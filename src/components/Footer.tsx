import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Globe } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
}

export default function Footer({ setActiveTab, language }: FooterProps) {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-atelier-dark text-gray-400 border-t border-gold-900/40 font-sans" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.25em] text-gold-400">SHANGHAI</h3>
            <p className="text-xs tracking-widest text-gold-200/60 uppercase">{t.brandSubtitle}</p>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mt-4">
              {language === 'fr'
                ? 'Une maison de couture et de haute joaillerie d\'exception, mêlant savoir-faire artisanal traditionnel chinois de l\'école Haipai et élégance contemporaine.'
                : language === 'cn'
                ? '海派传统高级定制服饰与高端珠宝工坊，致敬匠心精工，交融东西方传世艺术与璀璨格调。'
                : 'A house of bespoke couture and high-jewelry craftsmanship, marrying traditional Chinese Haipai heritage with exquisite contemporary style.'}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-serif text-sm tracking-widest text-gold-300 uppercase mb-5 border-b border-gold-900/20 pb-2">
              Atelier
            </h4>
            <ul className="space-y-3 text-xs tracking-wider">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-gold-400 transition-colors uppercase"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-gold-400 transition-colors uppercase"
                >
                  {t.navServices}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('map')}
                  className="hover:text-gold-400 transition-colors uppercase"
                >
                  {t.navMap}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="hover:text-gold-400 transition-colors uppercase"
                >
                  {t.navProfile}
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge Contacts */}
          <div>
            <h4 className="font-serif text-sm tracking-widest text-gold-300 uppercase mb-5 border-b border-gold-900/20 pb-2">
              {language === 'fr' ? 'Conciergerie' : language === 'cn' ? '尊宾专线' : 'Concierge'}
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start space-x-3.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="tracking-wide text-gray-400">+86 21 1234 5678</span>
              </li>
              <li className="flex items-start space-x-3.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="tracking-wide text-gray-400">concierge@shanghaibespoke.com</span>
              </li>
              <li className="flex items-start space-x-3.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-400">
                  No. 18, The Bund, Huangpu District, Shanghai
                </span>
              </li>
            </ul>
          </div>

          {/* Experience hours / social */}
          <div>
            <h4 className="font-serif text-sm tracking-widest text-gold-300 uppercase mb-5 border-b border-gold-900/20 pb-2">
              {language === 'fr' ? 'Horaires' : language === 'cn' ? '营业时间' : 'Salons Hours'}
            </h4>
            <p className="text-xs leading-relaxed mb-6">
              {language === 'cn'
                ? '旗舰工坊：每日 10:00 – 20:00'
                : language === 'fr'
                ? 'Atelier Flagship: Tous les jours, 10:00 – 20:00'
                : 'Flagship Atelier: Daily, 10:00 AM – 8:00 PM'}
              <br />
              <span className="text-gold-500/80">
                {language === 'cn'
                  ? '私人订制沙龙：仅限预约预约咨询'
                  : language === 'fr'
                  ? 'Salons privés: Uniquement sur rendez-vous'
                  : 'Private Salons: Strictly by appointment'}
              </span>
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-atelier-charcoal rounded-full text-gold-500 hover:bg-gold-500 hover:text-atelier-dark transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-atelier-charcoal rounded-full text-gold-500 hover:bg-gold-500 hover:text-atelier-dark transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-atelier-charcoal rounded-full text-gold-500 hover:bg-gold-500 hover:text-atelier-dark transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal copyrights */}
        <div className="mt-16 pt-8 border-t border-gold-900/15 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-600 tracking-wider">
          <p>© 2026 Shanghai Bespoke Atelier. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold-500 transition-colors">
              {language === 'fr' ? 'Confidentialité' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-gold-500 transition-colors">
              {language === 'fr' ? 'Conditions d\'utilisation' : 'Terms & Conditions'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
