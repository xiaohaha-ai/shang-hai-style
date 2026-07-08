import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, Appointment, CustomizationChoice, Language } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import LocatorView from './components/LocatorView';
import ProfileView from './components/ProfileView';
import InteractiveCustomizer from './components/InteractiveCustomizer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('fr'); // Default to French as requested in prompt!
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeCustomization, setActiveCustomization] = useState<CustomizationChoice | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Load bookings from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sh_bespoke_bookings');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse bookings from localStorage', err);
      }
    }
  }, []);

  // Handle attaching a customization to the booking
  const handleAttachToBooking = (choice: CustomizationChoice) => {
    setActiveCustomization(choice);
    setActiveTab('profile'); // Automatically direct to profile booking form!
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream" id="app-root-container">
      {/* Premium Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Main Content Area with elegant fade-in transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomeView
                language={language}
                setActiveTab={setActiveTab}
                onOpenCustomizer={() => setCustomizerOpen(true)}
              />
            )}

            {activeTab === 'services' && (
              <ServicesView
                language={language}
                onOpenCustomizer={() => setCustomizerOpen(true)}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'map' && (
              <LocatorView language={language} />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                language={language}
                appointments={appointments}
                setAppointments={setAppointments}
                activeCustomization={activeCustomization}
                setActiveCustomization={setActiveCustomization}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive Customizer Overlay Modal */}
      <InteractiveCustomizer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        language={language}
        onAttachToBooking={handleAttachToBooking}
      />

      {/* Luxury Footer */}
      <Footer setActiveTab={setActiveTab} language={language} />
    </div>
  );
}
