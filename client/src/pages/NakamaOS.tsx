import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLocation } from 'wouter';
import { Web3Wallet } from '@/components/Web3Wallet';
import { useWeb3, useBerriesEarning } from '@/contexts/Web3Context';

interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  component?: React.ComponentType;
}

const apps: App[] = [
  { id: 'tunova', name: 'TUNOVA.IO', icon: '🎵', description: 'Walkmans retro y radio pirata' },
  { id: 'genesis-mint', name: 'Genesis Mint', icon: '💎', description: 'Mint de casetes NFT' },
  { id: 'la-taberna', name: 'La Taberna', icon: '🍺', description: 'Chat y colaboraciones' },
  { id: 'zona-recreativa', name: 'Zona Recreativa', icon: '🎮', description: 'Juegos nostálgicos' },
  { id: 'billetera', name: 'Billetera', icon: '💰', description: 'Gestión de tokens' },
  { id: 'marketplace', name: 'Marketplace', icon: '🏪', description: 'Trading de NFTs' },
  { id: 'productor', name: 'Productor', icon: '🎛️', description: 'DAW integrado' },
  { id: 'dao', name: 'Asamblea DAO', icon: '🏛️', description: 'Gobernanza y votaciones' },
  { id: 'biblioteca', name: 'Biblioteca', icon: '📚', description: 'Gestor de archivos' },
  { id: 'organizador', name: 'Organizador', icon: '🗂️', description: 'Tareas y notas' },
  { id: 'configuracion', name: 'Configuración', icon: '⚙️', description: 'Ajustes del sistema' },
  { id: 'logros', name: 'Logros', icon: '🏆', description: 'Badges y trofeos' },
  { id: 'comunidad', name: 'Comunidad', icon: '👥', description: 'Directorio de Nakamas' },
  { id: 'anuncios', name: 'Anuncios', icon: '📢', description: 'Noticias del ecosistema' },
];

const wallpapers = [
  { id: 'mar-abierto', name: 'Mar Abierto', class: 'bg-mar-abierto' },
  { id: 'atardecer', name: 'Atardecer', class: 'bg-atardecer' },
  { id: 'noche-tranquila', name: 'Noche Tranquila', class: 'bg-noche-tranquila' },
  { id: 'crew-1', name: 'Crew 1', class: 'bg-crew-1' },
  { id: 'crew-2', name: 'Crew 2', class: 'bg-crew-2' },
  { id: 'luffy-epic', name: 'Luffy Epic', class: 'bg-luffy-epic' },
];

export default function NakamaOS() {
  const [, setLocation] = useLocation();
  const [currentWallpaper, setCurrentWallpaper] = useState('mar-abierto');
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const { earnFromTask } = useBerriesEarning();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Add wallpaper classes to body
    document.body.className = '';
    document.body.classList.add(wallpapers.find(w => w.id === currentWallpaper)?.class || 'bg-mar-abierto');
    
    return () => {
      document.body.className = '';
    };
  }, [currentWallpaper]);

  const handleAppClick = (appId: string) => {
    // Earn berries for using apps
    earnFromTask(`Usar aplicación ${apps.find(a => a.id === appId)?.name}`, 'easy');
    
    // Navigate to specific apps
    switch (appId) {
      case 'tunova':
        setLocation('/tunova');
        break;
      case 'genesis-mint':
        setLocation('/genesis-mint');
        break;
      case 'la-taberna':
        setLocation('/la-taberna');
        break;
      case 'zona-recreativa':
        setLocation('/zona-recreativa');
        break;
      case 'billetera':
      case 'marketplace':
      case 'productor':
      case 'dao':
      case 'biblioteca':
      case 'organizador':
      case 'configuracion':
      case 'logros':
      case 'comunidad':
      case 'anuncios':
        setOpenApp(appId);
        break;
      default:
        setOpenApp(appId);
    }
  };

  const AppModal = ({ appId }: { appId: string }) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return null;

    return (
      <Dialog open={openApp === appId} onOpenChange={() => setOpenApp(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-slate-900 border-amber-400/30 text-amber-50">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-amber-200">
              <span className="text-2xl">{app.icon}</span>
              <span>{app.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">{app.icon}</div>
            <h3 className="text-2xl font-bold text-amber-200 mb-2">{app.name}</h3>
            <p className="text-amber-100 mb-6">{app.description}</p>
            
            {appId === 'billetera' && (
              <div className="text-left">
                <Web3Wallet />
              </div>
            )}
            
            {appId === 'marketplace' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
                      <div className="text-4xl mb-2">📼</div>
                      <div className="text-sm text-amber-200">Casete #{i}</div>
                      <div className="text-xs text-amber-100/70">0.1 ETH</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {appId === 'dao' && (
              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
                  <h4 className="font-bold text-amber-200 mb-2">Propuesta Activa</h4>
                  <p className="text-sm text-amber-100 mb-4">
                    Implementar sistema de staking para $Nakamas con APY del 12%
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      ✅ A favor (67%)
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      ❌ En contra (33%)
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 text-amber-200/70 text-sm">
              🚧 Aplicación en desarrollo - Próximamente disponible
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Header - Puente de Mando */}
      <div className="puente-de-mando h-16 flex items-center justify-between px-6 relative z-10">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setLocation('/')}
            className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
          >
            🏴‍☠️ TIDEOS
          </Button>
          
          <div className="text-amber-100 font-bold">
            {time.toLocaleTimeString('es-ES')}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Web3Wallet />
          
          <select
            value={currentWallpaper}
            onChange={(e) => setCurrentWallpaper(e.target.value)}
            className="bg-black/20 border border-amber-400/50 text-amber-100 rounded px-2 py-1 text-sm"
          >
            {wallpapers.map(wp => (
              <option key={wp.id} value={wp.id} className="bg-slate-800">
                {wp.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Area */}
      <div className="flex-1 p-8 relative z-10" style={{ height: 'calc(100vh - 8rem)' }}>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 h-full">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="dock-icon group cursor-pointer transform transition-all duration-200 hover:scale-110 hover:-translate-y-2"
              title={app.description}
            >
              <div className="text-center">
                <div className="text-4xl mb-1">{app.icon}</div>
                <div className="text-xs font-bold text-black group-hover:text-amber-800">
                  {app.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Puerto */}
      <div className="puerto h-16 flex items-center justify-center px-6 relative z-10">
        <div className="flex items-center space-x-6">
          <div className="text-amber-100 text-sm">
            🏴‍☠️ NAKAMA OS - Edición Rey de los Piratas
          </div>
          <div className="text-amber-200 text-sm">
            {apps.length} aplicaciones disponibles
          </div>
        </div>
      </div>

      {/* App Modals */}
      {apps.map(app => (
        <AppModal key={app.id} appId={app.id} />
      ))}

      <style jsx>{`
        .puente-de-mando {
          background-color: #581c0d;
          border-bottom: 6px solid #000000;
        }
        
        .puerto {
          background-color: #7c2d12;
          border-top: 6px solid #000000;
        }
        
        .dock-icon {
          border: 4px solid #000000;
          background-color: #fdf2e3;
          width: 80px;
          height: 80px;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .dock-icon:hover {
          background-color: #fef9c3;
          box-shadow: 0 0 20px #fef9c3;
        }

        .bg-mar-abierto {
          background: linear-gradient(-45deg, #a5f3fc, #67e8f9, #0ea5e9, #a5f3fc);
          background-size: 400% 400%;
          animation: marAbierto 30s ease infinite;
        }
        
        .bg-atardecer {
          background: linear-gradient(-45deg, #f97316, #fde047, #ef4444, #f97316);
          background-size: 400% 400%;
          animation: marAbierto 40s ease infinite;
        }
        
        .bg-noche-tranquila {
          background: linear-gradient(-45deg, #1e1b4b, #312e81, #0c0a09, #1e1b4b);
          background-size: 400% 400%;
          animation: marAbierto 60s ease infinite;
        }
        
        .bg-crew-1 {
          background: url('/wallpapers/crew_1.jpg') no-repeat center center fixed;
          background-size: cover;
        }
        
        .bg-crew-2 {
          background: url('/wallpapers/crew_2.jpg') no-repeat center center fixed;
          background-size: cover;
        }
        
        .bg-luffy-epic {
          background: url('/wallpapers/luffy_epic.jpg') no-repeat center center fixed;
          background-size: cover;
        }

        @keyframes marAbierto {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}