"use client"
import { useState, useEffect } from 'react';
import { ChevronDown, Trophy, Users, Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// Component imports

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import GamesSection from './components/GamesSection';
import ScheduleSection from './components/ScheduleSection';
import RulesSection from './components/RulesSection';
import RegisterCTA from './components/RegisterCTA';


export default function EsportsLandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section
      const sections = ["hero", "about", "games", "schedule", "rules", "register"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Quick navigation function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background with cyberpunk-inspired elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black">
          {/* Animated grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #ff000015 1px, transparent 1px),
              linear-gradient(to bottom, #ff000015 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Gaming-themed color glow elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-blue-700 rounded-full filter blur-3xl opacity-15 animate-pulse delay-2000"></div>
        </div>
      </div>
      
      {/* Navbar (new component) */}
      {/* <Navbar activeSection={activeSection} scrollToSection={scrollToSection} /> */}
      
      {/* Quick navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-4">
        {["hero", "about", "games", "schedule", "rules", "register"].map((section) => (
          <button 
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? "bg-red-500 w-4 h-4" 
                : "bg-gray-500 hover:bg-red-400"
            }`}
            aria-label={`Scroll to ${section} section`}
          />
        ))}
      </div>
      
      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Games Section */}
      <GamesSection />
      
      {/* Tournament Schedule */}
      <ScheduleSection />

      {/* Rules Section (new) */}
      <RulesSection />
        
        
        {/* Registration CTA */}
        <RegisterCTA  />
      
     
    </div>
  );
}