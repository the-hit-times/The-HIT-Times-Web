"use client"
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection: FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black to-black"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80')"
          }}
        ></div>
        
        {/* Gaming-themed overlay elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent opacity-70"></div>
      </div>
      
      <div className="container mx-auto z-10 text-center pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse inline-block px-4 py-1 rounded-full bg-red-900/30 backdrop-blur-sm border border-red-500/30 text-red-500 mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span>THE HIT TIMES PRESENTS</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-text">LOCK&apos;D DOWN</span>
            <span className="block text-3xl md:text-4xl text-gray-300 mt-2">THE ULTIMATE E-SPORTS SHOWDOWN</span>
          </h1>
          
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
            Gear up, warriors! The virtual battlefield is calling, and only the best will rise. 
            An electrifying clash of challengers. An arena of fire. A showdown like no other.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button 
              onClick={() => scrollToSection("register")}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-md font-medium transition-all transform hover:scale-105 border border-red-500/50 shadow-lg shadow-red-700/20 flex items-center justify-center group"
            >
              <span>Register Now</span>
              <span className="ml-2 w-5 h-5 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              onClick={() => scrollToSection("schedule")} 
              className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white px-8 py-3 rounded-md font-medium transition-all border border-purple-500/30 hover:border-purple-500/50 hover:text-purple-300"
            >
              See Schedule
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="backdrop-blur-md bg-black/20 border border-red-900/20 rounded-lg p-4 hover:bg-black/30 hover:border-red-500/30 transition-all">
              <div className="text-xl font-bold text-red-500">Unlimited</div>
              <div className="text-gray-400">Teams</div>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-red-900/20 rounded-lg p-4 hover:bg-black/30 hover:border-red-500/30 transition-all">
              <div className="text-xl font-bold text-red-500">6</div>
              <div className="text-gray-400">Games</div>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-red-900/20 rounded-lg p-4 hover:bg-black/30 hover:border-red-500/30 transition-all">
              <div className="text-xl font-bold text-red-500">EPIC</div>
              <div className="text-gray-400">Prize Pool</div>
            </div>
            <div className="backdrop-blur-md bg-black/20 border border-red-900/20 rounded-lg p-4 hover:bg-black/30 hover:border-red-500/30 transition-all">
              <div className="text-xl font-bold text-red-500">2</div>
              <div className="text-gray-400">Epic Days</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated arrow down */}
      <button 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce bg-black/30 p-2 rounded-full hover:bg-black/50 transition-all"
        aria-label="Scroll to About section"
      >
        <ChevronDown className="w-6 h-6 text-red-500" />
      </button>
    </section>
  );
};

export default HeroSection;