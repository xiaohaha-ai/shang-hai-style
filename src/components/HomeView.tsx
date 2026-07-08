import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Sparkles, Clock, MapPin, Calendar, Heart, Shield, ArrowRight, BookOpen, PenTool, Gift } from 'lucide-react';
import { ActiveTab, CustomizationChoice, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import shanghaiBg from '../../assets/shanghai_atelier_bg.webp';

interface HomeViewProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCustomizer: () => void;
}

export default function HomeView({ language, setActiveTab, onOpenCustomizer }: HomeViewProps) {
  const t = TRANSLATIONS[language];

  const [activeHeritageTab, setActiveHeritageTab] = useState<'tailoring' | 'qipao' | 'jewelry'>('tailoring');
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(1);

  const heritageTabs = {
    tailoring: {
      title: language === 'fr' 
        ? 'Costume sur Mesure d\'Exception' 
        : language === 'cn' 
        ? '海派西服手工定制' 
        : 'Bespoke Suit Tailoring',
      subtitle: language === 'fr' ? 'Coupe Italienne & Finitions de Soie' : 'Italian Silhouette & Silk Trims',
      para1: language === 'fr' 
        ? 'Nos costumes sur mesure s\'inspirent de l\'école historique de Shanghai, fusionnant des coupes impeccables de style milanais à une adaptation morphologique minutieuse.' 
        : language === 'cn' 
        ? '承袭二十世纪初红帮裁缝之正统衣钵，将经典英伦意式剪裁与东方神韵绝妙融合，独创贴合体态的黄金流线。' 
        : 'Our bespoke suiting draws inspiration from the legendary Shanghai Red-Band tailoring school, blending razor-sharp Italian lines with perfect bespoke adaptation.',
      para2: language === 'fr' 
        ? 'Chaque boutonnière est méticuleusement brodée au fil de soie lourd à la main. Les boutonnières de revers "milanese" sont un gage absolu de distinction et d\'artisanat authentique.' 
        : language === 'cn' 
        ? '每一处扣眼皆由熟练匠人以重磅真丝绣线手工锁制，其立体挺拔的“米兰眼”设计更是优雅绅士的不二勋章。' 
        : 'Every lapel buttonhole is sculpted using premium hand-twisted heavy silk cord. The traditional "milanese" lapel eye represents the absolute pinnacle of sartorial elegance.',
      img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
      label: language === 'fr' ? 'Art Tailleur' : language === 'cn' ? '精工剪裁' : 'Tailoring Art',
    },
    qipao: {
      title: language === 'fr' 
        ? 'L\'Art du Qipao Haipai' 
        : language === 'cn' 
        ? '海派传世旗袍手作' 
        : 'The Art of Haipai Qipao',
      subtitle: language === 'fr' ? 'Broderie de Suzhou & Soie Impériale' : 'Suzhou Embroidery & Imperial Silk',
      para1: language === 'fr' 
        ? 'Chaque robe Qipao est entièrement façonnée à la main en soie naturelle de mûrier selon l\'héritage de Suzhou, demandant plus de 36 points de mesures corporelles uniques.' 
        : language === 'cn' 
        ? '每一领旗袍均选用江南顶级桑蚕丝及织锦缎，由非遗传承导师亲领缝制，三十六处量体细则，只为勾勒最绰约的东方身姿。' 
        : 'Each Qipao gown is sculpted by hand from pure Suzhou mulberry silk, requiring 36 unique anatomical measurement coordinates for a bespoke fit.',
      para2: language === 'fr' 
        ? 'Les broderies complexes de grues impériales ou de fleurs de prunier prennent plus de cent heures de travail d\'aiguille fine par nos artisans les plus expérimentés.' 
        : language === 'cn' 
        ? '繁复考究的盘金绣、平针绣仙鹤或折枝梅，均历经百小时以上的纤细手针琢磨，一针一线皆是江南风华。' 
        : 'Our signature crane or plum blossom patterns are hand-stitched over a hundred hours using ancestral silk-weaving techniques for a truly celestial texture.',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
      label: language === 'fr' ? 'Savoir-Faire Soie' : language === 'cn' ? '苏绣丝绸' : 'Silk Heritage',
    },
    jewelry: {
      title: language === 'fr' 
        ? 'Haute Joaillerie & Or Filigrané' 
        : language === 'cn' 
        ? '宫廷掐丝高定珠宝' 
        : 'High Jewelry & Filigree Gold',
      subtitle: language === 'fr' ? 'Pierres d\'Exception & Or 18K' : 'Heirloom Gemstones & 18K Gold',
      para1: language === 'fr' 
        ? 'Nos gemmes sont rigoureusement sourcées à l\'échelle mondiale : jadeite impériale, saphir de Ceylan royal et diamants certifiés, sertis dans du platine ou de l\'or lourd.' 
        : language === 'cn' 
        ? '甄选国际最顶级的罕见矿石，包括顶级帝王绿翡翠、斯里兰卡皇家蓝宝石等，在手工贵金属底座上折射最深邃的星芒。' 
        : 'We source only heirloom-grade stones worldwide: premium Imperial Jadeite, royal Ceylon Sapphire, and certified conflict-free diamonds set in noble metals.',
      para2: language === 'fr' 
        ? 'Nous perpétuons la technique de la filigrane d\'or, un art ancestral où de fins fils d\'or pur sont torsadés et soudés pour créer des pièces légères et magiques.' 
        : language === 'cn' 
        ? '传承中国古代宫廷“花丝镶嵌”绝技，以细若游丝的金丝经过捏、填、攒、焊等数十道工序，再造具有收藏价值的皇家艺术杰作。' 
        : 'We preserve the delicate technique of gold filigree casting, creating intricate wire works that are woven and welded into museum-grade fine ornaments.',
      img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      label: language === 'fr' ? 'Joaillerie' : language === 'cn' ? '宫廷花丝' : 'Fine Jewelry',
    }
  };

  const timelineDetails = {
    1: {
      title: t.exp1Title,
      subtitle: language === 'fr' ? 'Rencontre & Consultation' : language === 'cn' ? '首诊：灵感咨询' : 'Private Ideation & Consultation',
      desc: t.exp1Desc,
      icon: BookOpen,
      fullStory: language === 'fr' 
        ? "Nous vous accueillons dans notre salon privé au Bund avec du thé Longjing ou du champagne de réserve pour cerner votre style de vie et vos désirs de silhouette."
        : language === 'cn'
        ? "在黄浦江畔的私密沙龙，我们为您奉上顶级西湖龙井或庄园香槟，高级着装顾问细心聆听您的生活场景、审美偏好与着装愿景。"
        : "We welcome you to our private Bund flagship salon with premium hand-picked Longjing tea or reserve champagne to explore your lifestyle and sartorial desires.",
      stats: { label: language === 'fr' ? 'Durée' : 'Duration', value: '60 - 90 mins' }
    },
    2: {
      title: t.exp2Title,
      subtitle: language === 'fr' ? 'Prise de Mesure & Dessin' : language === 'cn' ? '测量：人体雕塑与纸样' : 'Measurement & Custom Drafting',
      desc: t.exp2Desc,
      icon: PenTool,
      fullStory: language === 'fr'
        ? "Le maître tailleur prend plus de 30 mesures corporelles précises et étudie votre posture unique pour créer un patron en papier unique à votre nom."
        : language === 'cn'
        ? "首席版型师亲自测量您身体的三十余处核心维度，深入观察脊椎弧度与两肩平衡等微姿态特征，为您单独精绘一份专属的纸样图册。"
        : "The master sartor records over 30 physical metrics and meticulously analyzes your gait and posture to draft an individual custom cardstock pattern in your name.",
      stats: { label: language === 'fr' ? 'Points de mesure' : 'Coordinates', value: '36+' }
    },
    3: {
      title: t.exp3Title,
      subtitle: language === 'fr' ? 'Premier Essayage (Basting)' : language === 'cn' ? '匠造：假缝与毛样试穿' : 'Crafting & Canvas Fitting',
      desc: t.exp3Desc,
      icon: Scissors,
      fullStory: language === 'fr'
        ? "Votre tissu sélectionné est découpé à la craie et cousu de manière temporaire pour un premier essayage de toile (basting) afin d'ajuster parfaitement la structure."
        : language === 'cn'
        ? "精选全球顶级面料经手工断料后，以特种毛衬及白棉线作初版假缝试穿（Basting），让您在动态行走中对垫肩、收腰处进行极微调整。"
        : "Your chosen fabric is chalk-cut and basted together with temporary white threads for an interim toile fitting to custom-calibrate shoulder lines and chest drape.",
      stats: { label: language === 'fr' ? 'Points d\'ajustement' : 'Adjustments', value: '2' }
    },
    4: {
      title: t.exp4Title,
      subtitle: language === 'fr' ? 'Finitions & Remise du Coffret' : language === 'cn' ? '交授：重铁整烫与专属交付' : 'Hand-Finishing & Presentation',
      desc: t.exp4Desc,
      icon: Gift,
      fullStory: language === 'fr'
        ? "Après deux essayages minutieux, votre pièce finale est repassée au fer lourd traditionnel et livrée dans un coffret de cèdre personnalisé."
        : language === 'cn'
        ? "历经两次严苛试穿修正，作品交由整烫大师使用数公斤传统重铁斗精熨成型，附带定制香氛雪松木防尘礼盒，由专车专人为您送达。"
        : "Following rigorous quality evaluations, your masterpiece is hand-pressed using traditional heavy cast-irons and safely housed in an aromatic cedarwood box.",
      stats: { label: language === 'fr' ? 'Garantie' : 'Guarantee', value: language === 'fr' ? 'À vie (Ajustements)' : 'Lifetime Fit' }
    }
  } as const;

  // Curated premium Unsplash assets for the gallery
  const galleryItems = [
    {
      title: t.tailoredEvening,
      subtitle: 'Bespoke Evening Wear',
      imgUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
      id: 'qipao',
    },
    {
      title: t.fineGemstone,
      subtitle: 'Unique Gemstones',
      imgUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      id: 'necklace',
    },
    {
      title: language === 'fr' ? 'Costumes d\'Exception' : 'Bespoke Suiting',
      subtitle: 'Premium Italian Fabrics',
      imgUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
      id: 'suit',
    },
    {
      title: t.personalizedAcc,
      subtitle: 'Bespoke Leather Goods',
      imgUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop',
      id: 'suit',
    },
  ];

  return (
    <div className="space-y-0" id="home-view-container">
      {/* 1. Hero Landing Banner */}
      <section className="relative h-[85vh] sm:h-[90vh] flex items-center justify-center overflow-hidden bg-atelier-dark">
        {/* Background Image with elegant overlay matching Shanghai Skyline / Bespoke suit */}
        <div className="absolute inset-0 z-0">
          <img
            src={shanghaiBg}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1542397284385-601017642475?q=80&w=1600&auto=format&fit=crop";
            }}
            alt="Shanghai Skyline"
            className="w-full h-full object-cover scale-105 filter brightness-[0.4] contrast-[1.1] transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette grad */}
          <div className="absolute inset-0 bg-gradient-to-t from-atelier-dark via-transparent to-atelier-dark/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-gold-400 font-serif text-sm tracking-[0.4em] uppercase block">
              {t.brandSubtitle}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-gold-100 tracking-wide leading-[1.15] drop-shadow-lg">
              {t.heroTitle}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-300 tracking-wider max-w-2xl mx-auto font-light leading-relaxed">
              {t.heroSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => setActiveTab('services')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-atelier-dark font-sans text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(191,163,108,0.25)] hover:shadow-[0_4px_30px_rgba(191,163,108,0.4)]"
            >
              {t.beginJourney}
            </button>
            <button
              onClick={onOpenCustomizer}
              className="w-full sm:w-auto px-8 py-3.5 border border-gold-500/50 hover:border-gold-400 text-gold-400 hover:text-gold-200 hover:bg-gold-500/10 text-xs font-medium tracking-[0.2em] uppercase rounded-sm transition-all duration-300"
            >
              {t.customizeBtn}
            </button>
          </motion.div>
        </div>

        {/* Scroll cue Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 z-10 pointer-events-none">
          <span className="text-[9px] tracking-widest text-gold-500/60 uppercase font-mono">
            {language === 'fr' ? 'Faites Défiler' : 'Scroll Down'}
          </span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-gold-500/60 to-transparent animate-bounce" />
        </div>
      </section>

      {/* 2. Haipai Heritage / Story Section */}
      <section className="bg-cream py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-4 mb-12 text-center">
          <span className="text-[10px] tracking-[0.3em] text-gold-600 font-mono font-semibold uppercase block">
            {language === 'fr' ? 'HÉRITAGE D\'EXCEPTION' : 'HAIPAI HERITAGE & CRAFT'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-atelier-dark">
            {language === 'fr' ? 'Artisanat Historique de Shanghai' : language === 'cn' ? '海派历史传承与手作工艺' : 'Historical Craft of Shanghai'}
          </h2>
          <div className="h-[1.5px] w-20 bg-gold-500 mx-auto" />
          
          {/* Interactive Aspect Switcher Tab Buttons */}
          <div className="flex justify-center space-x-2 pt-4 max-w-lg mx-auto border-b border-gold-500/20 pb-1">
            {(['tailoring', 'qipao', 'jewelry'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveHeritageTab(tab)}
                className={`py-2 px-4 text-xs font-mono tracking-widest uppercase transition-all duration-300 border-b-2 relative ${
                  activeHeritageTab === tab
                    ? 'border-gold-500 text-gold-600 font-semibold'
                    : 'border-transparent text-gray-400 hover:text-atelier-dark'
                }`}
              >
                {heritageTabs[tab].label}
                {activeHeritageTab === tab && (
                  <motion.div
                    layoutId="activeHeritageIndicator"
                    className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gold-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[460px]">
          {/* Image Craft side with AnimatePresence */}
          <div className="lg:col-span-5 relative" id="heritage-image-wrapper">
            <div className="absolute -inset-2 border border-gold-500/20 rounded-sm pointer-events-none transform -rotate-1" />
            <div className="w-full h-[400px] rounded overflow-hidden shadow-lg relative bg-atelier-dark">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeHeritageTab}
                  src={heritageTabs[activeHeritageTab].img}
                  alt={heritageTabs[activeHeritageTab].title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover filter brightness-95"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            
            {/* Corner Badge */}
            <div className="absolute bottom-4 left-4 bg-atelier-dark/95 border border-gold-500/30 p-4 rounded text-left shadow-lg">
              <span className="text-[10px] tracking-widest text-gold-400 uppercase font-mono block">
                {language === 'fr' ? 'Savoir-Faire Unique' : 'Bespoke Atelier'}
              </span>
              <span className="font-serif text-xs text-gold-100 block mt-0.5">
                {activeHeritageTab === 'jewelry' 
                  ? (language === 'fr' ? 'Art du Filigrane d\'Or' : 'Filigree Gold Artisan') 
                  : 'Suzhou Handcraft, Shanghai'}
              </span>
            </div>
          </div>

          {/* Description Content Side with AnimatePresence */}
          <div className="lg:col-span-7 text-left lg:pl-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeritageTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <span className="text-xs font-mono font-semibold text-gold-600 tracking-widest block uppercase">
                  {heritageTabs[activeHeritageTab].subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-atelier-dark tracking-wide leading-tight">
                  {heritageTabs[activeHeritageTab].title}
                </h3>
                <div className="h-[1.5px] w-12 bg-gold-500" />
                <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
                  {heritageTabs[activeHeritageTab].para1}
                </p>
                <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
                  {heritageTabs[activeHeritageTab].para2}
                </p>

                {/* Micro interactivity highlight specs */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold-500/10">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gold-100 rounded text-gold-600 mt-0.5 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs tracking-wider uppercase text-atelier-dark">
                        {activeHeritageTab === 'jewelry' 
                          ? (language === 'fr' ? '200+ Heures' : '200+ Hours') 
                          : (language === 'fr' ? '300+ Heures' : '300+ Hours')}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {language === 'fr' ? 'Par création d\'artisanat' : 'Dedicated per masterwork'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gold-100 rounded text-gold-600 mt-0.5 shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs tracking-wider uppercase text-atelier-dark">
                        {activeHeritageTab === 'jewelry' 
                          ? (language === 'fr' ? 'Gemmes Certifiées' : 'Certified Gems') 
                          : (language === 'fr' ? 'Étoffes Nobles' : 'Heritage Silks & Wools')}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {language === 'fr' ? 'Qualité origine certifiée' : 'Direct certified provenance'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. Customization Gallery Section */}
      <section className="bg-atelier-dark py-24 text-center border-t border-b border-gold-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold-500 font-mono uppercase">
              {t.galleryTitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-gold-100 tracking-wide">
              {language === 'fr' ? 'Galerie de Personnalisation' : 'CUSTOMIZATION GALLERY'}
            </h2>
            <div className="h-[1.5px] w-24 bg-gold-500 mx-auto" />
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="home-gallery-grid">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="group relative h-96 rounded overflow-hidden shadow-lg border border-gold-900/30 cursor-pointer"
                onClick={onOpenCustomizer}
              >
                {/* Image */}
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                />

                {/* Solid Overlay Frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                {/* Bottom Card Title Sheet (matching layout screenshot 1 & 4) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-atelier-charcoal/90 border-t border-gold-500/20 backdrop-blur-sm flex flex-col items-center text-center transition-all group-hover:bg-gold-500/10">
                  <span className="text-[10px] tracking-widest text-gold-400 font-mono uppercase mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-sm text-gold-100 tracking-wider">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full collection Button */}
          <div className="pt-12">
            <button
              onClick={() => setActiveTab('services')}
              className="px-8 py-3 border border-gold-500 hover:bg-gold-500 hover:text-atelier-dark text-gold-400 font-sans text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-300"
            >
              {t.viewFullCollection}
            </button>
          </div>
        </div>
      </section>

      {/* 4. The Bespoke Experience Timeline */}
      <section className="bg-cream py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.3em] text-gold-600 font-mono uppercase">
            {language === 'fr' ? 'Le Parcours Client' : 'THE BESPOKE EXPERIENCE'}
          </span>
          <h2 className="font-serif text-3xl text-atelier-dark tracking-wide">
            {t.experienceTitle}
          </h2>
          <div className="h-[1.5px] w-20 bg-gold-500 mx-auto" />
        </div>

        {/* Timeline Interactive Header Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative max-w-5xl mx-auto mb-10 z-10">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-[43px] left-[12%] right-[12%] h-[1px] bg-gold-500/30 -z-10" />

          {([1, 2, 3, 4] as const).map((stepNum) => {
            const stepInfo = timelineDetails[stepNum];
            const StepIcon = stepInfo.icon;
            const isActive = activeTimelineStep === stepNum;
            return (
              <button
                key={stepNum}
                onClick={() => setActiveTimelineStep(stepNum)}
                className="group flex flex-col items-center text-center space-y-3 cursor-pointer outline-none focus:outline-none"
              >
                {/* Outer Ring with springy active badge */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.08, 1] : 1,
                      borderColor: isActive ? '#bfa36c' : 'rgba(191, 163, 108, 0.2)',
                    }}
                    transition={{ duration: 0.4 }}
                    className={`w-20 h-20 rounded-full border-2 bg-atelier-dark flex items-center justify-center text-gold-400 relative transition-colors duration-300 ${
                      isActive 
                        ? 'border-gold-500 shadow-xl shadow-gold-500/10' 
                        : 'border-gold-900/20 hover:border-gold-500/50'
                    }`}
                  >
                    <AnimatePresence>
                      {isActive ? (
                        <motion.div
                          layoutId="activeTimelineGlow"
                          className="absolute -inset-1.5 border border-gold-500/40 rounded-full pointer-events-none"
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      ) : null}
                    </AnimatePresence>
                    <span className="font-serif text-lg">{`0${stepNum}`}</span>
                  </motion.div>
                  {/* Small floating icon indicator */}
                  <div className={`absolute -bottom-1 -right-1 p-1 bg-gold-100 rounded-full border border-gold-500/20 text-gold-600 transition-transform duration-300 ${isActive ? 'scale-110 rotate-12' : 'scale-75 opacity-0 group-hover:opacity-100'}`}>
                    <StepIcon className="w-3 h-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className={`font-serif text-sm uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-gold-600 font-bold' : 'text-atelier-dark group-hover:text-gold-500'
                  }`}>
                    {stepInfo.title}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {stepNum === 1 && (language === 'fr' ? 'Étape Initiale' : 'Phase One')}
                    {stepNum === 2 && (language === 'fr' ? 'Précision' : 'Phase Two')}
                    {stepNum === 3 && (language === 'fr' ? 'Assemblage' : 'Phase Three')}
                    {stepNum === 4 && (language === 'fr' ? 'Signature' : 'Final Delivery')}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Card Area */}
        <div className="max-w-4xl mx-auto mt-6 bg-white border border-gold-500/15 rounded shadow-xl overflow-hidden min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTimelineStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left"
            >
              {/* Icon side */}
              <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-3 md:border-r md:border-gold-500/10 md:pr-6 text-center md:text-left">
                <div className="p-4 bg-gold-50 rounded-full text-gold-600 shadow-inner">
                  {React.createElement(timelineDetails[activeTimelineStep].icon, { className: "w-8 h-8" })}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase block">
                    {language === 'fr' ? `PHASE 0${activeTimelineStep}` : `STAGE 0${activeTimelineStep}`}
                  </span>
                  <span className="text-[11px] font-sans text-gray-400">
                    {timelineDetails[activeTimelineStep].stats.label}: <strong className="text-atelier-dark">{timelineDetails[activeTimelineStep].stats.value}</strong>
                  </span>
                </div>
              </div>

              {/* Main Text Content */}
              <div className="md:col-span-9 space-y-3">
                <h4 className="font-serif text-lg font-semibold tracking-wide text-atelier-dark">
                  {timelineDetails[activeTimelineStep].subtitle}
                </h4>
                <p className="font-sans text-sm text-gold-600 leading-relaxed font-medium">
                  {timelineDetails[activeTimelineStep].desc}
                </p>
                <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                  {timelineDetails[activeTimelineStep].fullStory}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Quick Schedule Private Appointment Banner */}
      <section className="bg-atelier-dark py-20 px-4 sm:px-6 lg:px-8 border-t border-gold-900/30 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-gold-100 tracking-wide">
            {language === 'fr' ? 'RÉSERVEZ VOTRE ESSAYAGE PRIVÉ' : 'SCHEDULE YOUR PRIVATE APPOINTMENT'}
          </h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto tracking-widest uppercase">
            {language === 'fr' 
              ? 'Laissez-nous sculpter votre élégance dans notre salon sur le Bund.' 
              : 'Experience private master-craft curation overlooking Shanghai waterfront.'}
          </p>
          <div className="pt-4">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-atelier-dark font-sans text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-300"
            >
              {t.reqConsultationBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
