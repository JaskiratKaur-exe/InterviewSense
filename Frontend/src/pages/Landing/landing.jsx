import React from 'react';
import Navbar from '../../components/layout/navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import Footer from './components/Footer';

export function Landing() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col selection:bg-purple-500/20 selection:text-purple-700">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;