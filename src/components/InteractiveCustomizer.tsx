import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scissors, Check, Sparkles, AlertCircle, Info, PenTool } from 'lucide-react';
import { CustomizationChoice, Language } from '../types';
import { CUSTOM_OPTIONS, TRANSLATIONS } from '../constants';

interface InteractiveCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAttachToBooking: (choice: CustomizationChoice) => void;
}

export default function InteractiveCustomizer({
  isOpen,
  onClose,
  language,
  onAttachToBooking,
}: InteractiveCustomizerProps) {
  const [category, setCategory] = useState<'suit' | 'qipao' | 'ring' | 'necklace'>('suit');
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedLining, setSelectedLining] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedGemstone, setSelectedGemstone] = useState('');
  const [monogramText, setMonogramText] = useState('');
  const [monogramFont, setMonogramFont] = useState('font-serif');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const t = TRANSLATIONS[language];

  // Initialize options based on category
  useEffect(() => {
    if (category === 'suit') {
      setSelectedFabric(CUSTOM_OPTIONS.suit.fabrics[0].id);
      setSelectedLining(CUSTOM_OPTIONS.suit.linings[0].id);
      setSelectedButton(CUSTOM_OPTIONS.suit.buttons[0].id);
      setSelectedMetal('');
      setSelectedGemstone('');
    } else if (category === 'qipao') {
      setSelectedFabric(CUSTOM_OPTIONS.qipao.fabrics[0].id);
      setSelectedLining(CUSTOM_OPTIONS.qipao.linings[0].id);
      setSelectedButton(CUSTOM_OPTIONS.qipao.buttons[0].id);
      setSelectedMetal('');
      setSelectedGemstone('');
    } else if (category === 'ring') {
      setSelectedMetal(CUSTOM_OPTIONS.ring.metals[0].id);
      setSelectedGemstone(CUSTOM_OPTIONS.ring.gemstones[0].id);
      setSelectedFabric('');
      setSelectedLining('');
      setSelectedButton('');
    } else if (category === 'necklace') {
      setSelectedMetal(CUSTOM_OPTIONS.necklace.metals[0].id);
      setSelectedGemstone(CUSTOM_OPTIONS.necklace.gemstones[0].id);
      setSelectedFabric('');
      setSelectedLining('');
      setSelectedButton('');
    }
  }, [category]);

  if (!isOpen) return null;

  // Calculate price dynamically
  const calculatePrice = () => {
    let price = 0;
    if (category === 'suit') {
      price += CUSTOM_OPTIONS.suit.basePrice;
      const f = CUSTOM_OPTIONS.suit.fabrics.find((item) => item.id === selectedFabric);
      const l = CUSTOM_OPTIONS.suit.linings.find((item) => item.id === selectedLining);
      const b = CUSTOM_OPTIONS.suit.buttons.find((item) => item.id === selectedButton);
      if (f) price += f.priceModifier;
      if (l) price += l.priceModifier;
      if (b) price += b.priceModifier;
    } else if (category === 'qipao') {
      price += CUSTOM_OPTIONS.qipao.basePrice;
      const f = CUSTOM_OPTIONS.qipao.fabrics.find((item) => item.id === selectedFabric);
      const l = CUSTOM_OPTIONS.qipao.linings.find((item) => item.id === selectedLining);
      const b = CUSTOM_OPTIONS.qipao.buttons.find((item) => item.id === selectedButton);
      if (f) price += f.priceModifier;
      if (l) price += l.priceModifier;
      if (b) price += b.priceModifier;
    } else if (category === 'ring') {
      price += CUSTOM_OPTIONS.ring.basePrice;
      const m = CUSTOM_OPTIONS.ring.metals.find((item) => item.id === selectedMetal);
      const g = CUSTOM_OPTIONS.ring.gemstones.find((item) => item.id === selectedGemstone);
      if (m) price += m.priceModifier;
      if (g) price += g.priceModifier;
    } else if (category === 'necklace') {
      price += CUSTOM_OPTIONS.necklace.basePrice;
      const m = CUSTOM_OPTIONS.necklace.metals.find((item) => item.id === selectedMetal);
      const g = CUSTOM_OPTIONS.necklace.gemstones.find((item) => item.id === selectedGemstone);
      if (m) price += m.priceModifier;
      if (g) price += g.priceModifier;
    }
    return price;
  };

  const currentPrice = calculatePrice();

  // Selected Options labels for visualization
  const getSelectedLabels = () => {
    const details: string[] = [];
    if (category === 'suit') {
      const f = CUSTOM_OPTIONS.suit.fabrics.find((item) => item.id === selectedFabric);
      const l = CUSTOM_OPTIONS.suit.linings.find((item) => item.id === selectedLining);
      const b = CUSTOM_OPTIONS.suit.buttons.find((item) => item.id === selectedButton);
      if (f) details.push(f.name);
      if (l) details.push(`${t.liningOption}: ${l.name}`);
      if (b) details.push(`${t.buttonOption}: ${b.name}`);
    } else if (category === 'qipao') {
      const f = CUSTOM_OPTIONS.qipao.fabrics.find((item) => item.id === selectedFabric);
      const l = CUSTOM_OPTIONS.qipao.linings.find((item) => item.id === selectedLining);
      const b = CUSTOM_OPTIONS.qipao.buttons.find((item) => item.id === selectedButton);
      if (f) details.push(f.name);
      if (l) details.push(`${t.liningOption}: ${l.name}`);
      if (b) details.push(`${t.buttonOption}: ${b.name}`);
    } else if (category === 'ring') {
      const m = CUSTOM_OPTIONS.ring.metals.find((item) => item.id === selectedMetal);
      const g = CUSTOM_OPTIONS.ring.gemstones.find((item) => item.id === selectedGemstone);
      if (m) details.push(m.name);
      if (g) details.push(g.name);
    } else if (category === 'necklace') {
      const m = CUSTOM_OPTIONS.necklace.metals.find((item) => item.id === selectedMetal);
      const g = CUSTOM_OPTIONS.necklace.gemstones.find((item) => item.id === selectedGemstone);
      if (m) details.push(m.name);
      if (g) details.push(g.name);
    }
    if (monogramText.trim()) {
      details.push(`Monogram: "${monogramText}"`);
    }
    return details;
  };

  const handleSave = () => {
    const choice: CustomizationChoice = {
      category,
      fabricId: selectedFabric,
      liningId: selectedLining || undefined,
      buttonId: selectedButton || undefined,
      metalId: selectedMetal || undefined,
      gemstoneId: selectedGemstone || undefined,
      monogramText,
      monogramFont,
      estimatedPrice: currentPrice,
    };
    onAttachToBooking(choice);
    setFeedbackMsg(language === 'fr' ? 'Ajouté à vos spécifications de rendez-vous!' : 'Attached to your appointment specs!');
    setTimeout(() => {
      setFeedbackMsg('');
      onClose();
    }, 1200);
  };

  // Hex colors helper for display
  const getSelectedColorHex = () => {
    if (category === 'suit') {
      const f = CUSTOM_OPTIONS.suit.fabrics.find((item) => item.id === selectedFabric);
      return f?.colorHex || '#1d2330';
    } else if (category === 'qipao') {
      const f = CUSTOM_OPTIONS.qipao.fabrics.find((item) => item.id === selectedFabric);
      return f?.colorHex || '#e1dcd3';
    } else if (category === 'ring') {
      const g = CUSTOM_OPTIONS.ring.gemstones.find((item) => item.id === selectedGemstone);
      return g?.colorHex || '#e0f2fe';
    } else if (category === 'necklace') {
      const g = CUSTOM_OPTIONS.necklace.gemstones.find((item) => item.id === selectedGemstone);
      return g?.colorHex || '#e0f2fe';
    }
    return '#bfa36c';
  };

  const getLiningColorHex = () => {
    if (category === 'suit') {
      const l = CUSTOM_OPTIONS.suit.linings.find((item) => item.id === selectedLining);
      return l?.colorHex || '#800c14';
    } else if (category === 'qipao') {
      const l = CUSTOM_OPTIONS.qipao.linings.find((item) => item.id === selectedLining);
      return l?.colorHex || '#f5e3e6';
    }
    return '';
  };

  const getMetalColorHex = () => {
    if (category === 'ring') {
      const m = CUSTOM_OPTIONS.ring.metals.find((item) => item.id === selectedMetal);
      return m?.colorHex || '#e5e5e5';
    } else if (category === 'necklace') {
      const m = CUSTOM_OPTIONS.necklace.metals.find((item) => item.id === selectedMetal);
      return m?.colorHex || '#e5e5e5';
    }
    return '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 sm:px-6">
      <div 
        className="relative bg-atelier-charcoal border border-gold-900/40 rounded shadow-2xl w-full max-w-5xl h-[90vh] md:h-[85vh] flex flex-col md:flex-row overflow-hidden"
        id="customizer-container"
      >
        {/* Header bar */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-1.5 bg-atelier-dark/60 rounded-full text-gold-400 hover:text-gold-200 hover:bg-gold-500/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Left Side: Dynamic Visual Preview */}
        <div className="w-full md:w-5/12 bg-atelier-dark p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gold-900/30 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scissors className="w-4 h-4 text-gold-500" />
              <span className="text-[10px] tracking-[0.3em] font-mono text-gold-300 uppercase">
                {t.customizerTitle}
              </span>
            </div>
            <h2 className="font-serif text-2xl tracking-wide text-gold-100">
              {category === 'suit' && t.suitCat}
              {category === 'qipao' && t.qipaoCat}
              {category === 'ring' && t.ringCat}
              {category === 'necklace' && t.necklaceCat}
            </h2>
          </div>

          {/* Interactive render mask representation */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-6 flex items-center justify-center">
            {/* Outer golden circular portal */}
            <div className="absolute inset-0 rounded-full border border-gold-900/30 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-gold-500/10 pointer-events-none" />

            {/* Simulated 3D-styled render swatch */}
            <motion.div
              key={category + selectedFabric + selectedGemstone}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(191,163,108,0.25)] border-2 border-gold-500/30 flex flex-col items-center justify-center"
              style={{ backgroundColor: getSelectedColorHex() }}
            >
              {/* Internal texture blend or shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 mix-blend-overlay" />
              
              {/* If it has lining, draw a stylish split representation */}
              {(category === 'suit' || category === 'qipao') && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 border-t border-gold-400/30 backdrop-blur-[1px]"
                  style={{ backgroundColor: getLiningColorHex() }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
                  <span className="absolute bottom-1 right-2 text-[8px] font-mono tracking-widest text-gold-200/50 uppercase">
                    {t.liningOption}
                  </span>
                </div>
              )}

              {/* Metal bezel or mount representation for rings/necklaces */}
              {(category === 'ring' || category === 'necklace') && (
                <div 
                  className="absolute w-24 h-24 rounded-full border-8 shadow-inner flex items-center justify-center"
                  style={{ borderColor: getMetalColorHex(), backgroundColor: 'rgba(0,0,0,0.3)' }}
                >
                  <div className="w-10 h-10 rounded-full shadow-lg bg-white/10 animate-pulse flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gold-200" />
                  </div>
                </div>
              )}

              {/* Dynamic Monogram Rendering inside the fabric pocket */}
              {monogramText.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute top-10 text-center tracking-widest text-gold-200/90 ${monogramFont} drop-shadow-md`}
                >
                  <span className="text-xs uppercase border-b border-gold-500/30 pb-0.5 px-2">
                    {monogramText}
                  </span>
                </motion.div>
              )}

              <span className="absolute top-3 right-4 font-mono text-[8px] text-white/40 tracking-wider">
                REF-{category.toUpperCase().slice(0,3)}-{selectedFabric || selectedGemstone || 'MA'}
              </span>
            </motion.div>
          </div>

          {/* Pricing Box */}
          <div className="bg-atelier-charcoal/80 border border-gold-900/30 rounded p-4 space-y-2 mt-auto">
            <span className="text-[10px] tracking-widest text-gray-500 uppercase block">
              {t.estPrice}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl font-semibold text-gold-400">
                ¥ {currentPrice.toLocaleString()} CNY
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                ~ € {(currentPrice / 7.8).toFixed(0)} EUR
              </span>
            </div>
            <div className="text-[10px] text-gray-500 flex items-center space-x-1.5">
              <Info className="w-3 h-3 text-gold-500/80 shrink-0" />
              <span>
                {language === 'fr' 
                  ? 'Les prix réels varient en fonction des mesures exactes et des finesses choisies en atelier.' 
                  : 'Final pricing varies on measurements and finer options selected at the showroom.'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Options Customizer Panel */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            {/* Tab selection for Category */}
            <div>
              <label className="text-[10px] tracking-widest text-gray-500 uppercase block mb-3">
                {t.selectCategory}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['suit', 'qipao', 'ring', 'necklace'] as const).map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-3 border text-center text-xs tracking-wider rounded-sm transition-all uppercase relative overflow-hidden ${
                      category === cat
                        ? 'border-gold-500 text-gold-400 font-semibold'
                        : 'border-gold-900/20 text-gray-400 hover:border-gold-800/60'
                    }`}
                  >
                    {category === cat && (
                      <motion.div
                        layoutId="activeCustomizerCategoryBg"
                        className="absolute inset-0 bg-gold-500/10"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">
                      {cat === 'suit' && (language === 'fr' ? 'Costume' : language === 'cn' ? '绅士西装' : 'Suit')}
                      {cat === 'qipao' && (language === 'fr' ? 'Qipao' : language === 'cn' ? '海派旗袍' : 'Qipao')}
                      {cat === 'ring' && (language === 'fr' ? 'Bague' : language === 'cn' ? '定制戒指' : 'Ring')}
                      {cat === 'necklace' && (language === 'fr' ? 'Collier' : language === 'cn' ? '高定吊坠' : 'Necklace')}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Customizer Option 1: Fabric (for apparel) or Metals (for jewelry) */}
            {(category === 'suit' || category === 'qipao') && (
              <div className="space-y-3">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase block">
                  {t.fabricOption}
                </label>
                <div className="space-y-2">
                  {(category === 'suit' ? CUSTOM_OPTIONS.suit.fabrics : CUSTOM_OPTIONS.qipao.fabrics).map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setSelectedFabric(item.id)}
                      className={`w-full flex items-center justify-between p-3 border rounded-sm text-xs text-left transition-all relative ${
                        selectedFabric === item.id
                          ? 'border-gold-500 bg-gold-500/5 text-gold-100'
                          : 'border-gold-900/10 hover:border-gold-900/40 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-sm"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="font-sans font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gold-400">
                          {item.priceModifier > 0 ? `+¥${item.priceModifier.toLocaleString()}` : 'Standard'}
                        </span>
                        {selectedFabric === item.id && <Check className="w-3.5 h-3.5 text-gold-500 animate-pulse" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {(category === 'ring' || category === 'necklace') && (
              <div className="space-y-3">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase block">
                  {t.metalOption}
                </label>
                <div className="space-y-2">
                  {(category === 'ring' ? CUSTOM_OPTIONS.ring.metals : CUSTOM_OPTIONS.necklace.metals).map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setSelectedMetal(item.id)}
                      className={`w-full flex items-center justify-between p-3 border rounded-sm text-xs text-left transition-all relative ${
                        selectedMetal === item.id
                          ? 'border-gold-500 bg-gold-500/5 text-gold-100'
                          : 'border-gold-900/10 hover:border-gold-900/40 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-sm"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="font-sans font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gold-400">
                          {item.priceModifier > 0 ? `+¥${item.priceModifier.toLocaleString()}` : 'Standard'}
                        </span>
                        {selectedMetal === item.id && <Check className="w-3.5 h-3.5 text-gold-500 animate-pulse" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Customizer Option 2: Lining (for apparel) or Gemstone (for jewelry) */}
            {(category === 'suit' || category === 'qipao') && (
              <div className="space-y-3">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase block">
                  {t.liningOption}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(category === 'suit' ? CUSTOM_OPTIONS.suit.linings : CUSTOM_OPTIONS.qipao.linings).map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedLining(item.id)}
                      className={`flex flex-col p-3 border rounded-sm text-xs text-left transition-all ${
                        selectedLining === item.id
                          ? 'border-gold-500 bg-gold-500/5 text-gold-100 font-medium'
                          : 'border-gold-900/10 hover:border-gold-900/40 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-sm"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="font-sans line-clamp-1">{item.name}</span>
                      </div>
                      <div className="flex items-center justify-between w-full mt-auto pt-1">
                        <span className="font-mono text-[10px] text-gold-400">
                          {item.priceModifier > 0 ? `+¥${item.priceModifier.toLocaleString()}` : 'Standard'}
                        </span>
                        {selectedLining === item.id && <Check className="w-3 h-3 text-gold-500" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {(category === 'ring' || category === 'necklace') && (
              <div className="space-y-3">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase block">
                  {t.gemstoneOption}
                </label>
                <div className="space-y-2">
                  {(category === 'ring' ? CUSTOM_OPTIONS.ring.gemstones : CUSTOM_OPTIONS.necklace.gemstones).map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => setSelectedGemstone(item.id)}
                      className={`w-full flex items-center justify-between p-3 border rounded-sm text-xs text-left transition-all relative ${
                        selectedGemstone === item.id
                          ? 'border-gold-500 bg-gold-500/5 text-gold-100'
                          : 'border-gold-900/10 hover:border-gold-900/40 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-sm"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="font-sans font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gold-400">
                          {item.priceModifier > 0 ? `+¥${item.priceModifier.toLocaleString()}` : 'Standard'}
                        </span>
                        {selectedGemstone === item.id && <Check className="w-3.5 h-3.5 text-gold-500 animate-pulse" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Customizer Option 3: Buttons/Fasteners (apparel only) */}
            {(category === 'suit' || category === 'qipao') && (
              <div className="space-y-3">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase block">
                  {t.buttonOption}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(category === 'suit' ? CUSTOM_OPTIONS.suit.buttons : CUSTOM_OPTIONS.qipao.buttons).map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedButton(item.id)}
                      className={`p-3 border rounded-sm text-xs text-left flex flex-col justify-between transition-all ${
                        selectedButton === item.id
                          ? 'border-gold-500 bg-gold-500/5 text-gold-100 font-medium shadow-md'
                          : 'border-gold-900/10 hover:border-gold-900/40 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 shrink-0 shadow-sm"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="font-sans line-clamp-1">{item.name}</span>
                      </div>
                      <div className="flex items-center justify-between w-full mt-auto pt-1 border-t border-gold-500/5">
                        <span className="font-mono text-[10px] text-gold-400">
                          {item.priceModifier > 0 ? `+¥${item.priceModifier.toLocaleString()}` : 'Standard'}
                        </span>
                        {selectedButton === item.id && <Check className="w-3 h-3 text-gold-500" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Customizer Option 4: Complimentary Monogramming */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase block">
                  {t.monogramLabel}
                </label>
                <span className="text-[9px] text-gold-500 font-mono tracking-wider">
                  {language === 'fr' ? 'GRATUIT' : language === 'cn' ? '限时免费' : 'COMPLIMENTARY'}
                </span>
              </div>
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <PenTool className="absolute left-3 top-2.5 w-4 h-4 text-gold-500/60" />
                  <input
                    type="text"
                    maxLength={5}
                    value={monogramText}
                    onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                    placeholder={t.monogramPlaceholder}
                    className="w-full bg-atelier-dark/60 border border-gold-900/30 rounded px-10 py-2.5 text-xs text-gold-100 placeholder-gray-600 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="flex space-x-1.5 border border-gold-900/30 rounded p-1">
                  {[
                    { font: 'font-serif', label: 'Serif' },
                    { font: 'font-sans', label: 'Sans' },
                    { font: 'font-mono', label: 'Mono' },
                  ].map((f) => (
                    <button
                      key={f.font}
                      onClick={() => setMonogramFont(f.font)}
                      className={`px-2 py-1 rounded text-[10px] transition-all ${
                        monogramFont === f.font
                          ? 'bg-gold-500 text-atelier-dark font-semibold'
                          : 'text-gray-400 hover:text-gold-300'
                      }`}
                    >
                      Aa
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-gold-900/20 mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gold-900/40 text-gray-400 hover:text-gold-200 text-xs tracking-widest uppercase transition-all"
            >
              {t.closeBtn}
            </button>
            <button
              id="customizer-save-btn"
              onClick={handleSave}
              className="flex-[2] py-3 bg-gold-500 hover:bg-gold-400 text-atelier-dark font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_4px_14px_rgba(191,163,108,0.25)] flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>{t.addToAppointment}</span>
            </button>
          </div>

          {/* Toast Notification representation */}
          <AnimatePresence>
            {feedbackMsg && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute bottom-6 right-6 z-50 bg-gold-500 text-atelier-dark px-4 py-2.5 rounded shadow-lg text-xs font-semibold flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{feedbackMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
