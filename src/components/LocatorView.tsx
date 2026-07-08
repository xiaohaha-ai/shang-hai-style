import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Calendar, Clock, Phone, ChevronRight, Check, Compass, Eye, Map, List, Globe } from 'lucide-react';
import { AtelierLocation, Language } from '../types';
import { LOCATIONS, TRANSLATIONS } from '../constants';

interface LocatorViewProps {
  language: Language;
}

export default function LocatorView({ language }: LocatorViewProps) {
  const t = TRANSLATIONS[language];
  const [selectedLocId, setSelectedLocId] = useState<string>('loc-1');
  const [filterType, setFilterType] = useState<'all' | 'atelier' | 'event'>('all');
  const [openNavigateId, setOpenNavigateId] = useState<string | null>(null);
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({});
  const [showRsvpModal, setShowRsvpModal] = useState<string | null>(null);

  // Form states for RSVP
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');

  const filteredLocations = LOCATIONS.filter((loc) => {
    if (filterType === 'all') return true;
    return loc.type === filterType;
  });

  const selectedLoc = LOCATIONS.find((loc) => loc.id === selectedLocId) || LOCATIONS[0];

  const handleRsvpSubmit = (e: React.FormEvent, locId: string) => {
    e.preventDefault();
    setRsvpState((prev) => ({ ...prev, [locId]: true }));
    setShowRsvpModal(null);
    setRsvpName('');
    setRsvpEmail('');
  };

  return (
    <div className="bg-atelier-dark text-gray-300 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-left" id="locator-view">
      {/* 1. Header with Filters */}
      <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-gold-900/30 pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] tracking-[0.3em] font-mono text-gold-500 uppercase block">
            {t.interactiveMapDesc}
          </span>
          <h1 className="font-serif text-3xl text-gold-100 tracking-wide">{t.locatorTitle}</h1>
        </div>

        {/* Filters and Search switcher */}
        <div className="flex space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {(['all', 'atelier', 'event'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterType(type);
                // Auto select first of filtered
                const first = LOCATIONS.find((l) => type === 'all' || l.type === type);
                if (first) setSelectedLocId(first.id);
              }}
              className={`py-1.5 px-4 rounded-full text-xs tracking-wider transition-all uppercase whitespace-nowrap shrink-0 ${
                filterType === type
                  ? 'bg-gold-500 text-atelier-dark font-semibold'
                  : 'bg-atelier-charcoal text-gray-400 border border-gold-900/15 hover:border-gold-800/50'
              }`}
            >
              {type === 'all' && t.allLocations}
              {type === 'atelier' && t.ateliersOnly}
              {type === 'event' && t.eventsOnly}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Multi-columns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[72vh]">
        {/* Left Drawer / Lists (Grid Span 4) */}
        <div className="lg:col-span-4 bg-atelier-charcoal/90 border border-gold-900/30 rounded p-4 flex flex-col h-full overflow-y-auto space-y-4">
          <div className="text-[10px] tracking-widest text-gold-400 uppercase font-mono border-b border-gold-900/20 pb-2">
            {filterType === 'atelier' 
              ? t.ateliersOnly 
              : filterType === 'event' 
              ? t.eventsOnly 
              : language === 'fr' 
              ? 'Lieux Exclusifs' 
              : 'Ateliers & Private Events'}
          </div>

          <div className="space-y-3 flex-1">
            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocId(loc.id)}
                className={`w-full text-left p-4 rounded-sm border transition-all flex items-start space-x-3.5 relative ${
                  selectedLocId === loc.id
                    ? 'border-gold-500 bg-gold-500/5 text-gold-100 shadow-md'
                    : 'border-gold-900/10 bg-atelier-dark/40 text-gray-400 hover:border-gold-900/30'
                }`}
              >
                {/* Visual marker pin color depending on type (Gold/Blue) */}
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 shadow-lg ${
                    loc.type === 'atelier' 
                      ? 'bg-gold-500 shadow-gold-500/40' 
                      : 'bg-blue-400 shadow-blue-400/40'
                  }`}
                />

                <div className="space-y-1.5 flex-1 pr-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase block text-gold-500">
                    {loc.type === 'atelier' ? 'Atelier Flagship' : 'Exclusive Event'}
                  </span>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-gold-100 line-clamp-1">
                    {loc.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{loc.address}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gold-500/70 mt-3 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Middle interactive SVG Map (Grid Span 5) */}
        <div className="lg:col-span-5 bg-atelier-dark border border-gold-900/30 rounded overflow-hidden relative h-[45vh] lg:h-full flex items-center justify-center">
          {/* Compass layout decorative background decoration */}
          <div className="absolute top-4 right-4 text-gold-500/20 font-mono text-[10px] flex items-center space-x-1.5">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>SH-GRID-31.23</span>
          </div>

          {/* Interactive vector SVG design map */}
          <svg
            viewBox="100 150 500 500"
            className="w-full h-full max-h-[450px] sm:max-h-full opacity-85 select-none"
            id="shanghai-svg-map"
          >
            {/* Grids background */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3c2f1a" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
            <rect width="1000" height="1000" fill="url(#grid)" />

            {/* Stylized Districts borders */}
            <path d="M 150 200 C 250 220 300 350 280 480" fill="none" stroke="#3c2f1a" strokeWidth="1.5" strokeDasharray="4 6" strokeOpacity="0.4" />
            <path d="M 280 480 C 270 560 380 620 400 700" fill="none" stroke="#3c2f1a" strokeWidth="1.5" strokeDasharray="4 6" strokeOpacity="0.4" />

            {/* Huangpu River (The S-Curve characteristic of Shanghai) */}
            <path
              d="M 110 650 
                 C 250 630, 310 570, 310 490
                 C 310 400, 480 380, 490 280
                 C 500 180, 580 150, 600 120"
              fill="none"
              stroke="#1e293b"
              strokeWidth="24"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            {/* Core water shimmering line */}
            <path
              d="M 110 650 
                 C 250 630, 310 570, 310 490
                 C 310 400, 480 380, 490 280
                 C 500 180, 580 150, 600 120"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.2"
            />

            {/* District Labels */}
            <text x="180" y="440" fill="#cfa861" fontSize="10" fontFamily="Playfair Display" letterSpacing="2" opacity="0.4">JING'AN</text>
            <text x="210" y="550" fill="#cfa861" fontSize="10" fontFamily="Playfair Display" letterSpacing="2" opacity="0.4">XUHUI</text>
            <text x="330" y="360" fill="#cfa861" fontSize="10" fontFamily="Playfair Display" letterSpacing="2" opacity="0.4">HUANGPU</text>
            <text x="440" y="420" fill="#cfa861" fontSize="10" fontFamily="Playfair Display" letterSpacing="2" opacity="0.4">PUDONG</text>

            {/* Landmark: The Bund historic walkway stroke */}
            <path d="M 322 360 L 322 410" stroke="#bfa36c" strokeWidth="3" opacity="0.6" />

            {/* Landmark: Oriental Pearl Tower circle */}
            <circle cx="340" cy="380" r="8" fill="#cfa861" fillOpacity="0.1" stroke="#cfa861" strokeWidth="0.8" />
            <circle cx="340" cy="380" r="2" fill="#cfa861" />

            {/* Map Interactive Pins */}
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocId === loc.id;
              const isAtelier = loc.type === 'atelier';

              return (
                <g
                  key={loc.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedLocId(loc.id)}
                >
                  {/* Glowing selection ring */}
                  {isSelected && (
                    <circle
                      cx={loc.lat}
                      cy={loc.lng}
                      r="16"
                      fill="none"
                      stroke={isAtelier ? '#bfa36c' : '#3b82f6'}
                      strokeWidth="1.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* Standard pin silhouette */}
                  <path
                    d={`M ${loc.lat} ${loc.lng - 10} 
                        C ${loc.lat - 8} ${loc.lng - 10}, ${loc.lat - 8} ${loc.lng}, ${loc.lat} ${loc.lng + 6}
                        C ${loc.lat + 8} ${loc.lng}, ${loc.lat + 8} ${loc.lng - 10}, ${loc.lat} ${loc.lng - 10} Z`}
                    fill={isSelected ? (isAtelier ? '#bfa36c' : '#3b82f6') : '#1c1f22'}
                    stroke={isAtelier ? '#bfa36c' : '#3b82f6'}
                    strokeWidth="1.5"
                    transition="fill 0.3s"
                  />

                  {/* Center pin text character */}
                  <text
                    x={loc.lat}
                    y={loc.lng - 3}
                    fill={isSelected ? '#121416' : (isAtelier ? '#bfa36c' : '#3b82f6')}
                    fontSize="7"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {isAtelier ? 'A' : 'E'}
                  </text>

                  {/* Hover tooltip text card */}
                  <rect
                    x={loc.lat - 40}
                    y={loc.lng - 26}
                    width="80"
                    height="12"
                    rx="2"
                    fill="#121416"
                    stroke="#bfa36c"
                    strokeWidth="0.5"
                    className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                  />
                  <text
                    x={loc.lat}
                    y={loc.lng - 18}
                    fill="#ffffff"
                    fontSize="5"
                    textAnchor="middle"
                    className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-mono tracking-wider"
                  >
                    {loc.name.split('-')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map legend indicator */}
          <div className="absolute bottom-4 left-4 bg-atelier-charcoal/95 border border-gold-900/30 p-2.5 rounded text-[10px] space-y-1.5 font-mono shadow-md">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-500 inline-block" />
              <span className="text-gray-300">A - Ateliers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
              <span className="text-gray-300">E - Events</span>
            </div>
          </div>
        </div>

        {/* Right Details Panel (Grid Span 3) */}
        <div className="lg:col-span-3 bg-atelier-charcoal border border-gold-900/30 rounded overflow-hidden flex flex-col justify-between h-full">
          {/* Main location content */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            <img
              src={selectedLoc.imageUrl}
              alt={selectedLoc.name}
              className="w-full h-32 object-cover rounded border border-gold-900/20"
              referrerPolicy="no-referrer"
            />

            <div className="space-y-2">
              <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded inline-block ${
                selectedLoc.type === 'atelier' ? 'bg-gold-500/10 text-gold-400' : 'bg-blue-400/10 text-blue-400'
              }`}>
                {selectedLoc.type === 'atelier' ? 'Atelier' : 'Event'}
              </span>
              <h3 className="font-serif text-base font-semibold text-gold-100 leading-snug">
                {selectedLoc.name}
              </h3>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {selectedLoc.description}
            </p>

            <div className="pt-3 border-t border-gold-900/15 space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 font-light leading-snug">{selectedLoc.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span className="text-gray-400 font-light">{selectedLoc.hoursOrDate}</span>
              </div>
              {selectedLoc.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span className="text-gray-400 font-mono font-light">{selectedLoc.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons (Navigate, RSVP) */}
          <div className="p-4 bg-atelier-dark/60 border-t border-gold-900/15 flex flex-col space-y-2">
            {/* RSVP for events */}
            {selectedLoc.type === 'event' ? (
              rsvpState[selectedLoc.id] ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2 text-center text-xs text-emerald-400 flex items-center justify-center space-x-2 font-medium">
                  <Check className="w-4 h-4" />
                  <span>RSVP CONFIRMED</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowRsvpModal(selectedLoc.id)}
                  className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs tracking-widest uppercase rounded-sm transition-all"
                >
                  {t.rsvpBtn}
                </button>
              )
            ) : null}

            {/* Navigation links popover trigger */}
            <div className="relative">
              <button
                onClick={() => setOpenNavigateId(openNavigateId === selectedLoc.id ? null : selectedLoc.id)}
                className="w-full py-2.5 border border-gold-500 hover:bg-gold-500/5 text-gold-400 text-xs tracking-widest uppercase rounded-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>{t.navigateBtn}</span>
              </button>

              <AnimatePresence>
                {openNavigateId === selectedLoc.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-12 left-0 right-0 bg-atelier-charcoal border border-gold-500/30 rounded p-1.5 shadow-xl z-20"
                  >
                    <a
                      href={selectedLoc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 hover:bg-gold-500/10 text-xs text-gold-200 hover:text-gold-400 rounded-sm"
                    >
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span>Google Maps</span>
                    </a>
                    <a
                      href={selectedLoc.appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 hover:bg-gold-500/10 text-xs text-gold-200 hover:text-gold-400 rounded-sm"
                    >
                      <Map className="w-4 h-4 text-blue-400" />
                      <span>Apple Maps</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Booking details Modal overlay */}
      <AnimatePresence>
        {showRsvpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-atelier-charcoal border border-gold-500/30 p-6 sm:p-8 rounded max-w-md w-full shadow-2xl relative space-y-6"
            >
              <button
                onClick={() => setShowRsvpModal(null)}
                className="absolute top-4 right-4 text-gold-500 hover:text-gold-300"
              >
                <ChevronRight className="w-5 h-5 rotate-90" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] tracking-widest font-mono text-gold-400 uppercase block">RSVP VIP invitation</span>
                <h3 className="font-serif text-xl text-gold-100 leading-snug">
                  {LOCATIONS.find((l) => l.id === showRsvpModal)?.name}
                </h3>
              </div>

              <form onSubmit={(e) => handleRsvpSubmit(e, showRsvpModal)} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase block">{t.fullNameLabel}</label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full bg-atelier-dark border border-gold-900/30 rounded p-2.5 text-gold-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase block">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    className="w-full bg-atelier-dark border border-gold-900/30 rounded p-2.5 text-gold-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase block">
                    {language === 'fr' ? 'Nombre d\'invités' : 'Guests Count'}
                  </label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full bg-atelier-dark border border-gold-900/30 rounded p-2.5 text-gold-100 focus:outline-none focus:border-gold-500"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People (VIP Double)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gold-500 text-atelier-dark font-semibold tracking-widest uppercase rounded-sm shadow-md transition-all"
                >
                  {language === 'fr' ? 'CONFIRMER L\'INVITATION' : 'SUBMIT RSVP REGISTRATION'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
