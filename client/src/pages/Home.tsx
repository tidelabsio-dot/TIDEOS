import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...konamiSequence, event.code].slice(-10);
      setKonamiSequence(newSequence);
      
      if (newSequence.join(',') === konamiCode.join(',')) {
        setLocation('/nakama-os');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence, setLocation]);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push(
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-yellow-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-amber-50 relative overflow-hidden">
      {/* Estrellas de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        {createStars()}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Logo y título */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              TIDE OS
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-amber-200">
              GENESIS
            </h2>
            <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
              El ecosistema Web3 definitivo para creadores, artistas y Nakamas. 
              Donde la música, los NFTs y la comunidad se encuentran.
            </p>
          </div>

          {/* Navegación principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Button
              onClick={() => setLocation('/nakama-os')}
              className="h-24 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 border-2 border-purple-400"
            >
              🏴‍☠️ NAKAMA OS
              <span className="block text-sm opacity-80">Sistema Operativo Pirata</span>
            </Button>

            <Button
              onClick={() => setLocation('/tunova')}
              className="h-24 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 border-2 border-cyan-400"
            >
              🎵 TUNOVA.IO
              <span className="block text-sm opacity-80">Walkmans & Radio Pirata</span>
            </Button>

            <Button
              onClick={() => setLocation('/genesis-mint')}
              className="h-24 text-lg font-semibold bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 border-2 border-amber-400"
            >
              💎 GENESIS MINT
              <span className="block text-sm opacity-80">Casetes NFT</span>
            </Button>

            <Button
              onClick={() => setLocation('/la-taberna')}
              className="h-24 text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border-2 border-green-400"
            >
              🍺 LA TABERNA
              <span className="block text-sm opacity-80">Chat & Colaboraciones</span>
            </Button>

            <Button
              onClick={() => setLocation('/zona-recreativa')}
              className="h-24 text-lg font-semibold bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-500 hover:to-pink-700 border-2 border-pink-400"
            >
              🎮 ZONA RECREATIVA
              <span className="block text-sm opacity-80">Juegos Nostálgicos</span>
            </Button>

            <Button
              onClick={() => window.open('https://tidelabs.io', '_blank')}
              className="h-24 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 border-2 border-indigo-400"
            >
              🌊 TIDELABS.IO
              <span className="block text-sm opacity-80">Ecosistema Completo</span>
            </Button>
          </div>

          {/* Información del Konami Code */}
          <div className="mt-12 p-4 bg-black/20 rounded-lg border border-amber-400/30">
            <p className="text-amber-200 text-sm">
              💡 <strong>Secreto Pirata:</strong> Usa el código Konami (↑↑↓↓←→←→BA) para acceso directo a NAKAMA OS
            </p>
          </div>

          {/* Stats del ecosistema */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
              <div className="text-2xl font-bold text-yellow-400">14</div>
              <div className="text-sm text-amber-200">Apps NAKAMA OS</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
              <div className="text-2xl font-bold text-cyan-400">4</div>
              <div className="text-sm text-amber-200">Walkmans Retro</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-amber-200">Casetes NFT</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
              <div className="text-2xl font-bold text-green-400">Web3</div>
              <div className="text-sm text-amber-200">Nativo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
