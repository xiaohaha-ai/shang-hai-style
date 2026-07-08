import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Scissors, Mail, Phone, Clock, FileText, CheckCircle, Trash2, Sparkles, HelpCircle } from 'lucide-react';
import { Appointment, CustomizationChoice, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProfileViewProps {
  language: Language;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  activeCustomization: CustomizationChoice | null;
  setActiveCustomization: (choice: CustomizationChoice | null) => void;
}

export default function ProfileView({
  language,
  appointments,
  setAppointments,
  activeCustomization,
  setActiveCustomization,
}: ProfileViewProps) {
  const t = TRANSLATIONS[language];

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState<'tailored' | 'jewelry' | 'both'>('tailored');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00');
  const [specialNotes, setSpecialNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking: Appointment = {
      id: `book-${Date.now()}`,
      fullName,
      email,
      phone: phone || undefined,
      serviceInterest,
      preferredDate,
      preferredTime: preferredTime || undefined,
      specialNotes: specialNotes || undefined,
      status: 'pending',
      createdAt: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US'),
      customizationDetails: activeCustomization || undefined,
    };

    const updated = [newBooking, ...appointments];
    setAppointments(updated);
    localStorage.setItem('sh_bespoke_bookings', JSON.stringify(updated));

    // Clear active customization and form
    setActiveCustomization(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialNotes('');
    setPreferredDate('');

    setSuccessMsg(t.bookConsultationSuccess);
    setTimeout(() => {
      setSuccessMsg('');
    }, 5000);
  };

  const handleDeleteBooking = (id: string) => {
    const filtered = appointments.filter((b) => b.id !== id);
    setAppointments(filtered);
    localStorage.setItem('sh_bespoke_bookings', JSON.stringify(filtered));
  };

  return (
    <div className="bg-cream py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left" id="profile-view">
      
      {/* Left side Form (Grid span 7) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded border border-gold-900/10 shadow-sm space-y-8">
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-mono text-gold-600 uppercase block">
            {t.scheduleTitle}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-atelier-dark">
            {t.requestAppointmentTitle}
          </h2>
          <div className="h-[1.5px] w-16 bg-gold-500" />
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs flex items-start space-x-3"
            >
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Appointment form */}
        <form onSubmit={handleBookingSubmit} className="space-y-5 text-xs text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider text-gray-500 uppercase font-medium">
                {t.fullNameLabel} *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: Mathis Maky"
                className="w-full bg-cream border border-gold-900/15 rounded p-3 text-atelier-dark focus:outline-none focus:border-gold-500 font-sans"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider text-gray-500 uppercase font-medium">
                {t.emailLabel} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-cream border border-gold-900/15 rounded p-3 text-atelier-dark focus:outline-none focus:border-gold-500 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider text-gray-500 uppercase font-medium">
                {t.phoneLabel}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 00 00 00 00"
                className="w-full bg-cream border border-gold-900/15 rounded p-3 text-atelier-dark focus:outline-none focus:border-gold-500 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider text-gray-500 uppercase font-medium">
                {t.serviceInterestLabel} *
              </label>
              <select
                required
                value={serviceInterest}
                onChange={(e) => setServiceInterest(e.target.value as any)}
                className="w-full bg-cream border border-gold-900/15 rounded p-3 text-atelier-dark focus:outline-none focus:border-gold-500 font-sans uppercase tracking-wider"
              >
                <option value="tailored">{t.tailoredApparel}</option>
                <option value="jewelry">{t.fineJewelry}</option>
                <option value="both">Both Services</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider text-gray-500 uppercase font-medium">
                {t.prefDateTimeLabel} *
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-cream border border-gold-900/15 rounded p-3 text-atelier-dark focus:outline-none focus:border-gold-500 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-wider text-gray-500 uppercase font-medium">
                {language === 'fr' ? 'Heure souhaitée' : 'Time Slot'} *
              </label>
              <select
                required
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-cream border border-gold-900/15 rounded p-3 text-atelier-dark focus:outline-none focus:border-gold-500 font-mono"
              >
                <option value="10:00">10:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:30">03:30 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:30">06:30 PM</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] tracking-wider text-gray-500 uppercase font-medium">
              {t.specialNotesLabel}
            </label>
            <textarea
              rows={4}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={language === 'fr' ? 'Mesures spécifiques, préférences de couleurs, etc.' : 'Specific requests, colors, or design details...'}
              className="w-full bg-cream border border-gold-900/15 rounded p-3 text-atelier-dark focus:outline-none focus:border-gold-500 font-sans"
            />
          </div>

          {/* Render Active Customization Spec Sheet attachment inside form */}
          {activeCustomization && (
            <div className="border border-gold-500/30 bg-gold-500/5 rounded p-4 space-y-3 relative overflow-hidden" id="attached-custom-spec">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/10 flex items-center justify-center rounded-bl transform rotate-12 pointer-events-none">
                <Scissors className="w-5 h-5 text-gold-500/50" />
              </div>
              <div className="flex items-center space-x-2 text-gold-600 font-medium font-serif">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'fr' ? 'Création Interactive Attachée' : 'Attached Custom Specification Sheet'}</span>
              </div>
              <div className="text-[11px] text-gray-600 space-y-1">
                <p className="font-semibold text-atelier-dark uppercase">
                  Category:{' '}
                  {activeCustomization.category === 'suit' && t.suitCat}
                  {activeCustomization.category === 'qipao' && t.qipaoCat}
                  {activeCustomization.category === 'ring' && t.ringCat}
                  {activeCustomization.category === 'necklace' && t.necklaceCat}
                </p>
                {activeCustomization.monogramText && (
                  <p className="font-mono text-[10px] bg-white/70 inline-block px-1.5 py-0.5 rounded border border-gold-500/20">
                    Monogram: "{activeCustomization.monogramText}"
                  </p>
                )}
                <p className="font-mono font-semibold text-gold-600 mt-1">
                  Est. Value: ¥ {activeCustomization.estimatedPrice.toLocaleString()} CNY
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCustomization(null)}
                className="text-[10px] text-red-500 hover:text-red-700 underline font-semibold uppercase block"
              >
                {language === 'fr' ? 'Détacher la création' : 'Detach custom design'}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-atelier-dark font-semibold text-xs tracking-widest uppercase rounded-sm shadow-md transition-all duration-300"
          >
            {t.bookNowBtn}
          </button>
        </form>
      </div>

      {/* Right side bookings tracker (Grid span 5) */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-atelier-dark text-gold-100 p-6 sm:p-8 rounded border border-gold-900/30 space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-gold-900/20 pb-3">
            <Calendar className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-lg tracking-wide text-gold-300">
              {t.myProfile}
            </h3>
          </div>

          {appointments.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <FileText className="w-8 h-8 text-gold-900/50 mx-auto" />
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                {t.noBookings}
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {appointments.map((book) => (
                <div
                  key={book.id}
                  className="bg-atelier-charcoal border border-gold-900/20 p-4 rounded-sm space-y-3 relative text-xs"
                >
                  <button
                    onClick={() => handleDeleteBooking(book.id)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors"
                    title="Cancel request"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      <span className="font-mono text-[9px] tracking-widest uppercase text-amber-400">
                        {book.status === 'pending' && t.statusPending}
                        {book.status === 'confirmed' && t.statusConfirmed}
                        {book.status === 'cancelled' && t.statusCancelled}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-gold-100 pr-6">
                      {book.fullName}
                    </h4>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-gray-400 border-t border-b border-gold-900/10 py-2 font-light">
                    <p className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>{book.preferredDate}</span>
                      {book.preferredTime && <span>at {book.preferredTime}</span>}
                    </p>
                    <p className="flex items-center space-x-1.5">
                      <Scissors className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span className="uppercase">
                        {book.serviceInterest === 'tailored' && t.tailoredApparel}
                        {book.serviceInterest === 'jewelry' && t.fineJewelry}
                        {book.serviceInterest === 'both' && 'Apparel & Jewelry'}
                      </span>
                    </p>
                  </div>

                  {/* Render attached customization spec sheet inside history item */}
                  {book.customizationDetails && (
                    <div className="bg-atelier-dark/40 border border-gold-900/20 rounded p-2.5 text-[10px] space-y-1">
                      <p className="font-semibold text-gold-400 uppercase">
                        Spec Sheet:{' '}
                        {book.customizationDetails.category === 'suit' && t.suitCat}
                        {book.customizationDetails.category === 'qipao' && t.qipaoCat}
                        {book.customizationDetails.category === 'ring' && t.ringCat}
                        {book.customizationDetails.category === 'necklace' && t.necklaceCat}
                      </p>
                      {book.customizationDetails.monogramText && (
                        <p className="font-mono text-gray-500">
                          Monogram: "{book.customizationDetails.monogramText}"
                        </p>
                      )}
                      <p className="font-mono text-gold-200">
                        Estimated: ¥ {book.customizationDetails.estimatedPrice.toLocaleString()} CNY
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <span>
                      {t.createdAtLabel}: {book.createdAt}
                    </span>
                    <span className="font-mono text-[9px]">ID: {book.id.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
