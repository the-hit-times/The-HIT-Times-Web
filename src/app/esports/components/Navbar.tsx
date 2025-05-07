// "use client"
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';

// interface NavbarProps {
//   activeSection: string;
//   scrollToSection: (sectionId: string) => void;
// }

// export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   const navItems = [
//     { id: "hero", label: "Home" },
//     { id: "about", label: "About" },
//     { id: "games", label: "Games" },
//     { id: "schedule", label: "Schedule" },
//     { id: "rules", label: "Rules" },
//     { id: "register", label: "Register" }
//   ];
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-red-900/20 transition-all duration-300">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex items-center">
//             <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
//               LOCK'D DOWN
//             </span>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className={`text-sm font-medium transition-colors hover:text-red-500 ${
//                   activeSection === item.id ? "text-red-500" : "text-gray-300"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
          
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-gray-300 hover:text-red-500 focus:outline-none"
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-black/90 backdrop-blur-md border-b border-red-900/20 animate-fadeIn">
//           <div className="px-4 py-4 space-y-4">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   scrollToSection(item.id);
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-red-900/20 ${
//                   activeSection === item.id ? "text-red-500 bg-red-900/10" : "text-gray-300"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }