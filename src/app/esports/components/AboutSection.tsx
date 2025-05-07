"use client"
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="backdrop-blur-md bg-black/30 border border-red-900/20 rounded-xl p-6 md:p-10 shadow-xl shadow-red-900/5 hover:shadow-red-900/10 transition-all">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-red-500">#</span> About The Event
              </h2>
              <p className="text-gray-300 mb-6">
                The HIT Times is proud to present the grandest E-sports event of the season, where speed meets strategy and legends are made. Whether you&apos;a master tactician or a brave-hearted contender, this is your moment to showcase greatness.
              </p>
              <p className="text-gray-300 mb-6">
                Join the adrenaline rush as teams battle it out across various gaming titles. Feel the intensity, build your strategies, and compete for glory and exciting prizes.
              </p>
              <p className="text-gray-300 mb-6">
                MAR certificates will be awarded to all participants of HIT .
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <div className="flex items-center bg-black/30 px-3 py-2 rounded-lg border border-red-900/10">
                  <Calendar className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-gray-300">May 10th-11th, 2025</span>
                </div>
                <div className="flex items-center bg-black/30 px-3 py-2 rounded-lg border border-red-900/10">
                  <MapPin className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-gray-300">HIT Campus</span>
                </div>
                <div className="flex items-center bg-black/30 px-3 py-2 rounded-lg border border-red-900/10">
                  <Clock className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-gray-300">9:30 AM onwards</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=500&q=80" 
                  alt="Esports tournament" 
                  className="rounded-lg border border-red-900/50 relative z-10 shadow-lg shadow-red-900/20 group-hover:scale-[1.02] transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}