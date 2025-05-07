"use client"
import { Trophy, Users, Clock } from 'lucide-react';



export default function ScheduleSection() {
  const tournaments = [
    { 
      name: "Valorant Championship",
      time: "To be announced",
      prize: "To be announced", 
      teamSize: "5v5",
      registrationFee: "₹79 per person",
      image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=600&q=80"
    },
    { 
      name: "BGMI Showdown",
      time: "To be announced",
      prize: "To be announced", 
      teamSize: "4-player squad",
      registrationFee: "₹59 per person",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    },
    { 
      name: "COD M Masters",
      time: "To be announced", 
      prize: "To be announced",
      teamSize: "4v4",
      registrationFee: "₹59 per person",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80"
    },
    { 
      name: "FIFA Tournament",
      time: "To be announced", 
      prize: "To be announced",
      teamSize: "1v1",
      registrationFee: "₹49 per person",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=600&q=80"
    },
    { 
      name: "eFootball Mobile",
      time: "To be announced", 
      prize: "To be announced",
      teamSize: "1v1",
      registrationFee: "₹59 per person",
      image: "https://preview.redd.it/efootball-2025-v0-k74zlrturfad1.jpeg?auto=webp&s=c54252a4b3f1b2a079433d4feefaf9e47c5c5a9c"
    },
    { 
      name: "FreeFire MAX",
      time: "To be announced",
      prize: "To be announced", 
      teamSize: "4-player squad",
      registrationFee: "₹59 per person",
      image: "https://i.scdn.co/image/ab67616d00001e02c72fc87f92c0e770bcc25ce7"
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="schedule" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-red-500">#</span> Tournament Schedule
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Mark your calendar for May 10th-11th, 2025. All tournaments will take place at HIT Auditorium.
            Come prepared to showcase your skills and compete for glory!
          </p>
        </div>
        
        <div className="backdrop-blur-md bg-black/30 border border-red-900/20 rounded-xl overflow-hidden">
          {tournaments.map((tournament, index) => (
            <div 
              key={index} 
              className={`flex flex-col p-6 ${index !== tournaments.length - 1 ? 'border-b border-red-900/20' : ''} hover:bg-black/40 transition-colors`}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4 flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-500 mr-4 flex-shrink-0 shadow-lg shadow-red-900/20">
                    <img 
                      src={tournament.image} 
                      alt={tournament.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-500">{tournament.name}</h3>
                    <div className="text-gray-400 flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-2" />
                      {tournament.time}
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="backdrop-blur-sm bg-black/20 border border-red-900/10 rounded-lg p-4 hover:border-red-500/30 transition-all">
                    <div className="text-gray-400 text-sm mb-1">Prize Pool</div>
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-white font-medium">{tournament.prize}</span>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-black/20 border border-red-900/10 rounded-lg p-4 hover:border-red-500/30 transition-all">
                    <div className="text-gray-400 text-sm mb-1">Team Size</div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-white font-medium">{tournament.teamSize}</span>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-black/20 border border-red-900/10 rounded-lg p-4 hover:border-red-500/30 transition-all">
                    <div className="text-gray-400 text-sm mb-1">Registration Fee</div>
                    <div className="flex items-center">
                      <span className="text-red-500 text-lg font-bold mr-2">₹</span>
                      <span className="text-white font-medium">{tournament.registrationFee}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 lg:ml-20">
                <button 
                  onClick={() => scrollToSection("register")}
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 py-2 px-4 rounded-lg text-sm transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Registration closes on May 9th, 2025. For more information, contact the event organizers.
          </p>
          <button 
            onClick={() => scrollToSection("rules")}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg font-medium transition-colors">
            View Full Details
          </button>
        </div>
      </div>
    </section>
  );
}