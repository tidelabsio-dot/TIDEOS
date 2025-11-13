import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Music, Users, Gamepad2, Zap, Gift, Wallet, Anchor } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  badge?: string;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'waitlist',
      label: 'WAITLIST',
      description: 'Únete a la tripulación y recluta Nakamas',
      icon: <Users size={32} />,
      path: '/waitlist',
      color: 'from-green-500 to-emerald-600',
      badge: 'NEW',
    },
    {
      id: 'tunova',
      label: 'TUNOVA.IO',
      description: 'Walkmans retro con casetes reales',
      icon: <Music size={32} />,
      path: '/tunova',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      id: 'mint',
      label: 'GENESIS MINT',
      description: 'Mintea casetes NFT únicos',
      icon: <Wallet size={32} />,
      path: '/mint',
      color: 'from-purple-500 to-pink-600',
      badge: 'HOT',
    },
    {
      id: 'taberna',
      label: 'LA TABERNA',
      description: 'Chat comunitario estilo MSN',
      icon: <Anchor size={32} />,
      path: '/taberna',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'crowdfunding',
      label: 'CROWDFUNDING',
      description: 'Financia proyectos Web3',
      icon: <Gift size={32} />,
      path: '/crowdfunding',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'games',
      label: 'ZONA RECREATIVA',
      description: 'Juega y gana $Berries',
      icon: <Gamepad2 size={32} />,
      path: '/games',
      color: 'from-pink-500 to-red-600',
    },
    {
      id: 'profile',
      label: 'MI PERFIL',
      description: 'Gestiona tu cuenta y recompensas',
      icon: <Zap size={32} />,
      path: '/profile',
      color: 'from-indigo-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-8">
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4 animate-pulse">
            TIDE OS GENESIS
          </h1>
          <p className="text-2xl text-gray-300 mb-2">🏴‍☠️ One Piece x Web3 🏴‍☠️</p>
          <p className="text-gray-400 text-lg">El Sistema Operativo Pirata del Futuro</p>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <Card
                  onClick={() => setLocation(item.path)}
                  className={`cursor-pointer transition-all transform duration-300 border-2 overflow-hidden h-full
                    ${hoveredItem === item.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'}
                    bg-gradient-to-br from-gray-900 to-black border-gray-700 hover:border-purple-500
                  `}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-10' : ''}`}></div>

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col justify-between">
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-black bg-gradient-to-r ${item.color}`}>
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`text-5xl mb-4 transition-transform duration-300 ${hoveredItem === item.id ? 'scale-125 rotate-12' : ''}`}>
                      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{item.label}</h2>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>

                    {/* Button */}
                    <Button
                      className={`w-full mt-4 transition-all duration-300 text-white font-bold
                        ${hoveredItem === item.id
                          ? `bg-gradient-to-r ${item.color} hover:shadow-lg`
                          : 'bg-gray-700 hover:bg-gray-600'
                        }
                      `}
                    >
                      Acceder →
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <Card className="bg-gradient-to-r from-black to-purple-900 border-2 border-purple-500 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-2">Total Nakamas</p>
                <p className="text-4xl font-bold text-yellow-400">1,247</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">$Berries en Circulación</p>
                <p className="text-4xl font-bold text-green-400">6.2M</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">NFTs Minteados</p>
                <p className="text-4xl font-bold text-purple-400">847</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
