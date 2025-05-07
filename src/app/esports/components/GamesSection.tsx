"use client"
import { Trophy } from 'lucide-react';

export default function GamesSection() {
  const games = [
    { 
      name: "VALORANT", 
      image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=600&q=80", 
      description: "5v5 tactical shooter with precise gunplay and unique agent abilities.",
      format: "Team-based",
      teamSize: "5v5" 
    },
    { 
      name: "BGMI", 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80", 
      description: "Battle royale where strategy and survival determine the last team standing.",
      format: "Battle Royale",
      teamSize: "4-player squad" 
    },
    { 
      name: "Call of Duty", 
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80", 
      description: "Fast-paced action with cutting-edge weapons and team-based objectives.",
      format: "Team-based",
      teamSize: "4v4" 
    },
    { 
      name: "FIFA", 
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=600&q=80", 
      description: "The world's most popular football simulation with realistic gameplay.",
      format: "1v1 Tournament",
      teamSize: "Individual" 
    },
    { 
      name: "FreeFire", 
      image: "https://i.scdn.co/image/ab67616d00001e02c72fc87f92c0e770bcc25ce7", 
      description: "Battle royale where strategy and survival determine the last team standing.",
      format: "Battle Royale",
      teamSize: "4 Player squad" 
    },
    { 
      name: "eFootball", 
      image: "https://preview.redd.it/efootball-2025-v0-k74zlrturfad1.jpeg?auto=webp&s=c54252a4b3f1b2a079433d4feefaf9e47c5c5a9c", 
      description: "The world's most popular football simulation with realistic gameplay.",
      format: "1v1 Tournament",
      teamSize: "Individual" 
    },
  ];

  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-red-500">#</span> Featured Games
          </h2>
          <div className="flex justify-center items-center">
            <div className="backdrop-blur-md bg-black/30 border border-red-500/30 rounded-full px-6 py-2 inline-flex items-center">
              <Trophy className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
                Total Prize Pool: ₹XX,999
              </span>
            </div>
          </div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Individual game prizes to be announced at the event. Prepare to compete and take home the glory!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div 
              key={index}
              className="backdrop-blur-md bg-black/30 border border-red-900/20 rounded-xl overflow-hidden transition-all hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/10 group"
            >
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{game.name}</h3>
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {index + 1}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 mb-3">{game.description}</p>
                <div className="flex flex-col gap-2">
                  <div className="text-sm bg-black/30 rounded px-3 py-1 border border-red-900/10 text-gray-300">
                    <span className="text-red-500 font-medium">Format:</span> {game.format}
                  </div>
                  <div className="text-sm bg-black/30 rounded px-3 py-1 border border-red-900/10 text-gray-300">
                    <span className="text-red-500 font-medium">Team Size:</span> {game.teamSize}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}