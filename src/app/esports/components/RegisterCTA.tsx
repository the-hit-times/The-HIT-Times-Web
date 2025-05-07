"use client"
import { Trophy, Users, Gamepad, Zap } from 'lucide-react';

export default function RegisterCTA() {
  // Replace this URL with your actual Google Form URL
  const registrationFormUrl = "https://forms.gle/AD3FkxdYn2jrq77w7";
  
  const handleRegisterClick = () => {
    window.open(registrationFormUrl, '_blank');
  };

  return (
    <section id="register" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/5 rounded-full blur-3xl"></div>
      
      {/* Animated glow lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto backdrop-blur-lg bg-black/60 border border-red-900/30 rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Ready to <span className="text-red-500">compete</span>?
                </h2>
                <p className="text-gray-300 mb-6">
                  Join the ultimate gaming showdown on May 10th-11th, 2025. 
                  Register now to secure your spot in the tournament!
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center bg-black/40 px-4 py-2 rounded-lg border border-red-900/30">
                    <Trophy className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-gray-300">Epic Prizes</span>
                  </div>
                  <div className="flex items-center bg-black/40 px-4 py-2 rounded-lg border border-red-900/30">
                    <Users className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-gray-300">Pro Competition</span>
                  </div>
                  <div className="flex items-center bg-black/40 px-4 py-2 rounded-lg border border-red-900/30">
                    <Gamepad className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-gray-300">Multiple Games</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto flex flex-col items-center">
                <div className="mb-4 w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-red-500" />
                </div>
                <button 
                  onClick={handleRegisterClick}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute inset-0 w-full h-full flex items-center justify-center border-t border-b border-red-400/30"></span>
                  <span className="relative z-10">REGISTER NOW</span>
                </button>
                <p className="mt-4 text-red-500/80 text-sm">Limited spots available!</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-900/20 via-red-600/20 to-red-900/20 p-4 text-center">
            <p className="text-gray-300 text-sm">
              Registration closes on <span className="text-red-400 font-semibold">May 9th, 2025</span> • Event date: <span className="text-red-400 font-semibold">May 10th & 11th, 2025</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}