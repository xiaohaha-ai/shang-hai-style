import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, Check, ChevronRight, HelpCircle, Shield, Award, AwardIcon } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import shanghaiBg from '../../assets/shanghai_atelier_bg.webp';

interface ServicesViewProps {
  language: Language;
  onOpenCustomizer: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function ServicesView({ language, onOpenCustomizer, setActiveTab }: ServicesViewProps) {
  const t = TRANSLATIONS[language];
  const [activeCategory, setActiveCategory] = useState<'apparel' | 'jewelry'>('apparel');

  const processSteps = [
    {
      num: '1',
      title: t.stepConsult,
      desc: t.stepConsultDesc,
    },
    {
      num: '2',
      title: t.stepMaterial,
      desc: t.stepMaterialDesc,
    },
    {
      num: '3',
      title: t.stepFitting,
      desc: t.stepFittingDesc,
    },
    {
      num: '4',
      title: t.stepDelivery,
      desc: t.stepDeliveryDesc,
    },
  ];

  return (
    <div className="bg-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 text-left" id="services-view-container">
      {/* 1. Header Banner */}
      <div className="relative rounded overflow-hidden shadow-xl bg-atelier-dark" id="services-hero-banner">
        <div className="absolute inset-0">
          <img
            src={shanghaiBg}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1542397284385-601017642475?q=80&w=1200&auto=format&fit=crop";
            }}
            alt="Shanghai Atelier Skyline"
            className="w-full h-full object-cover filter brightness-[0.45] blur-[1px] transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="relative z-10 px-6 py-20 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] tracking-[0.3em] font-mono text-gold-400 uppercase">
            {language === 'fr' ? 'Services Exclusifs' : 'ATELIER SERVICES'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-gold-100 tracking-wide leading-tight">
            {language === 'fr' 
              ? 'Détails des Services: Votre Vision, Notre Artisanat' 
              : 'Customization Services Detail: Your Vision, Our Craft.'}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-300 font-light tracking-wide leading-relaxed">
            {language === 'fr' 
              ? 'Faites l\'expérience de la haute couture et de la haute joaillerie personnalisée, conçues pour les connaisseurs internationaux les plus exigeants.' 
              : 'Experience bespoke fashion and fine jewelry, curated for international connoisseurs.'}
          </p>
        </div>
      </div>

      {/* 2. Service Categories switcher (apparel vs jewelry) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-gold-900/15 pb-4">
          <h2 className="font-serif text-2xl tracking-wide text-atelier-dark">{t.serviceCategoriesTitle}</h2>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <button
              onClick={() => setActiveCategory('apparel')}
              className={`pb-2 text-xs tracking-widest uppercase transition-all border-b-2 ${
                activeCategory === 'apparel'
                  ? 'border-gold-500 text-gold-600 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.tailoredApparel}
            </button>
            <button
              onClick={() => setActiveCategory('jewelry')}
              className={`pb-2 text-xs tracking-widest uppercase transition-all border-b-2 ${
                activeCategory === 'jewelry'
                  ? 'border-gold-500 text-gold-600 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.fineJewelry}
            </button>
          </div>
        </div>

        {/* Dynamic Service details cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeCategory === 'apparel' ? (
            <>
              {/* Apparel Card 1: Suit */}
              <div className="bg-white rounded p-6 sm:p-8 border border-gold-900/10 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <span className="text-[10px] tracking-widest text-gold-600 uppercase font-mono">Bespoke Suiting</span>
                  </div>
                  <h3 className="font-serif text-xl text-atelier-dark">
                    {language === 'fr' ? 'Le Costume Classique sur Mesure' : 'The Classic Bespoke Suit'}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {language === 'fr' 
                      ? 'Des coupes architecturales parfaites, adaptées à votre morphologie avec les tissus les plus renommés d\'Italie et d\'Angleterre.' 
                      : 'Perfect architectural cuts, suited to your body posture using the most renowned materials from Italy and the United Kingdom.'}
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Double essayage en atelier' : 'Double fitting process in showroom'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Plus de 4000 étoffes d\'exception' : 'Over 4,000 premium luxury fabrics'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Initiales brodées à la main' : 'Hand-stitched customized monogramming'}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-gold-900/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">{t.priceStarting}</span>
                    <span className="font-mono text-sm font-semibold text-gold-600">¥18,800 CNY</span>
                  </div>
                  <button
                    onClick={onOpenCustomizer}
                    className="flex items-center space-x-1 px-4 py-2 bg-atelier-dark text-gold-400 hover:text-gold-200 text-xs tracking-wider uppercase rounded-sm transition-all"
                  >
                    <span>{t.customizeBtn}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Apparel Card 2: Qipao */}
              <div className="bg-white rounded p-6 sm:p-8 border border-gold-900/10 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <span className="text-[10px] tracking-widest text-gold-600 uppercase font-mono">Haute Couture Qipao</span>
                  </div>
                  <h3 className="font-serif text-xl text-atelier-dark">
                    {language === 'fr' ? 'La Robe Qipao Impériale' : 'The Imperial Silk Qipao'}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {language === 'fr' 
                      ? 'L\'expression pure du style Haipai de Shanghai. Soie fine brodée aux fils d\'or avec des motifs floraux traditionnels complexes.' 
                      : 'The pure essence of Shanghai Haipai fashion. Exquisite mulberry silk decorated with complex gold thread floral patterns.'}
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Fermoirs grenouille noués main' : 'Hand-tied traditional frog fasteners'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Soies de Suzhou peintes à la main' : 'Hand-painted Suzhou mulberry silk canvas'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Col montant traditionnel doublé' : 'Classic structured mandarin collar'}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-gold-900/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">{t.priceStarting}</span>
                    <span className="font-mono text-sm font-semibold text-gold-600">¥12,800 CNY</span>
                  </div>
                  <button
                    onClick={onOpenCustomizer}
                    className="flex items-center space-x-1 px-4 py-2 bg-atelier-dark text-gold-400 hover:text-gold-200 text-xs tracking-wider uppercase rounded-sm transition-all"
                  >
                    <span>{t.customizeBtn}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Jewelry Card 1: Ring */}
              <div className="bg-white rounded p-6 sm:p-8 border border-gold-900/10 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <span className="text-[10px] tracking-widest text-gold-600 uppercase font-mono">Bespoke Ring</span>
                  </div>
                  <h3 className="font-serif text-xl text-atelier-dark">
                    {language === 'fr' ? 'Solitaire et Bague d\'Exception' : 'Bespoke Solitaire Ring'}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {language === 'fr' 
                      ? 'Façonnez une monture unique en platine ou or jaune sertie d\'un diamant d\'une pureté D, de jadeite impériale ou de saphir de Ceylan.' 
                      : 'Craft a unique mount in platinum or imperial gold set with pristine D-grade diamonds, rare jadeite, or royal blue Ceylon sapphires.'}
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Garantie de certification GIA' : 'Official GIA certification guarantee'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Moulage en cire unique perdu' : 'Lost-wax casting individual process'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Gravure personnalisée intérieure' : 'Complimentary interior micro-engraving'}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-gold-900/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">{t.priceStarting}</span>
                    <span className="font-mono text-sm font-semibold text-gold-600">¥45,000 CNY</span>
                  </div>
                  <button
                    onClick={onOpenCustomizer}
                    className="flex items-center space-x-1 px-4 py-2 bg-atelier-dark text-gold-400 hover:text-gold-200 text-xs tracking-wider uppercase rounded-sm transition-all"
                  >
                    <span>{t.customizeBtn}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Jewelry Card 2: Necklace */}
              <div className="bg-white rounded p-6 sm:p-8 border border-gold-900/10 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <span className="text-[10px] tracking-widest text-gold-600 uppercase font-mono">Diamond Garland</span>
                  </div>
                  <h3 className="font-serif text-xl text-atelier-dark">
                    {language === 'fr' ? 'Parure de Diamants Cascade' : 'The Cascading Diamond Garland'}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {language === 'fr' 
                      ? 'Un drapé de lumière étincelant. Collier majestueux articulé à la main, conçu pour s\'adapter harmonieusement au buste.' 
                      : 'A cascade of shimmering light. Fully articulated hand-crafted necklace designed to rest harmoniously on your collar.'}
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Plus de 20 carats de diamants fins' : 'Over 20 carats of fine cascading gems'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Montures invisibles sans métal' : 'Prongless invisible diamond settings'}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{language === 'fr' ? 'Consultation privée exclusive' : 'Private secure showroom viewing'}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-gold-900/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">{t.priceStarting}</span>
                    <span className="font-mono text-sm font-semibold text-gold-600">¥88,000 CNY</span>
                  </div>
                  <button
                    onClick={onOpenCustomizer}
                    className="flex items-center space-x-1 px-4 py-2 bg-atelier-dark text-gold-400 hover:text-gold-200 text-xs tracking-wider uppercase rounded-sm transition-all"
                  >
                    <span>{t.customizeBtn}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Craftsmanship Spotlight section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-atelier-dark text-gold-100 p-8 sm:p-12 rounded shadow-2xl relative overflow-hidden" id="craft-spotlight-section">
        {/* Decorative corner lines */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-500/20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-500/20" />

        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-[10px] tracking-widest text-gold-400 uppercase font-mono">
              {t.craftspotlightTitle}
            </span>
          </div>
          <h3 className="font-serif text-3xl tracking-wide text-gold-100">
            {t.craftspotlightSubtitle}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            {t.craftspotlightDesc}
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-light">
            <div className="border-l-2 border-gold-500 pl-3">
              <span className="text-gold-400 font-serif font-bold uppercase block">100% Traceable</span>
              <span className="text-gray-500">{language === 'fr' ? 'Origines certifiées' : 'Certified gold & gems'}</span>
            </div>
            <div className="border-l-2 border-gold-500 pl-3">
              <span className="text-gold-400 font-serif font-bold uppercase block">Imperial Jade</span>
              <span className="text-gray-500">{language === 'fr' ? 'Jadeite d\'exception' : 'A-grade authentic carvings'}</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop"
            alt="Silks and fabrics textures"
            className="w-full h-64 object-cover rounded shadow-md border border-gold-500/20"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 4. Process Flow chart */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] tracking-[0.3em] text-gold-600 font-mono uppercase block">{t.processFlowTitle}</span>
          <h3 className="font-serif text-2xl text-atelier-dark">{language === 'fr' ? 'La Confection d\'un Chef-d’œuvre' : 'A Connoisseur\'s Timeline'}</h3>
          <div className="h-[1px] w-16 bg-gold-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded border border-gold-900/10 shadow-sm relative flex flex-col justify-between">
              <div className="absolute top-4 right-4 text-gold-200 font-serif text-3xl font-extrabold opacity-70">
                {step.num}
              </div>
              <div className="space-y-3">
                <h4 className="font-serif text-sm tracking-wide text-atelier-dark pr-6">{step.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Booking Form redirect trigger */}
      <div className="bg-white border border-gold-900/10 rounded p-8 sm:p-12 text-center shadow-md space-y-6">
        <h3 className="font-serif text-2xl text-atelier-dark">{t.requestAppointmentTitle}</h3>
        <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
          {language === 'fr'
            ? 'Rencontrez nos tailleurs et artisans joailliers dans le cadre intime de notre salon privé.'
            : 'Initiate your master measurements or gemstone casting session overlooking the Shanghai Bund.'}
        </p>
        <button
          onClick={() => setActiveTab('profile')}
          className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-atelier-dark text-xs font-semibold tracking-widest uppercase rounded-sm transition-all shadow-[0_4px_14px_rgba(191,163,108,0.2)]"
        >
          {t.reqConsultationBtn}
        </button>
      </div>
    </div>
  );
}
