import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import Button from '../ui/Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ede3f0] bg-white/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6e4876] via-[#8c60a2] to-[#fa846e] flex items-center justify-center text-white shadow-md shadow-[#8c60a2]/25 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#2b1d30] font-['Plus_Jakarta_Sans']">
            Interview<span className="text-[#8c60a2]">Sense</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6e5975]">
          <a href="#features" className="hover:text-[#8c60a2] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#8c60a2] transition-colors">How It Works</a>
          <a href="#ai-models" className="hover:text-[#8c60a2] transition-colors">AI Models</a>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button variant="primary" size="sm" rightIcon={ArrowRight}>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#6e5975] hover:text-[#2b1d30] hover:bg-[#faf8fb] transition"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#ede3f0] bg-white px-4 pt-2 pb-6 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#6e5975] hover:text-[#8c60a2]"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#6e5975] hover:text-[#8c60a2]"
          >
            How It Works
          </a>
          <div className="pt-4 border-t border-[#ede3f0] flex flex-col gap-2.5">
            <Link to={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">Sign In</Button>
            </Link>
            <Link to={ROUTES.REGISTER} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
