import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLocation } from 'wouter';
import { Web3Wallet } from '@/components/Web3Wallet';
import { useBerriesEarning } from '@/contexts/Web3Context';
import { ExternalLink, Star, Clock, Users } from 'lucide-react';

interface RetroSite {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  rating: number;
  visits: number;
  image: string;
  isActive: boolean;
}

const retroSites: RetroSite[] = [
  {
    id: 'emuos',
    name: 'EmuOS',
    description: 'Sistema operativo emulado retro con juegos clásicos de 8-bit y 16-bit',
    url: 'https://emupedia.net/beta/emuos/',
    category: 'Emulación',
    rating: 4.8,
    visits: 1250,
    image: '/sprites/emuos-preview.png',
    isActive: true,
  },
  {
    id: 'floor796',
    name: 'Floor796',
    description: 'Experiencia interactiva pixel art con exploración de mundos retro',
    url: 'https://floor796.com/',
    category: 'Exploración',
    rating: 4.9,
    visits: 890,
    image: '/sprites/floor796-preview.png',
    isActive: true,
  },
  {
    id: 'kongregate',
    name: 'Kongregate',
    description: 'Arcade de juegos flash clásicos y modernos',
    url: 'https://www.kongregate.com/',
    category: 'Juegos',
    rating: 4.6,
    visits: 2100,
    image: '/sprites/kongregate-preview.png',
    isActive: true,
  },
  {
    id: 'neopets',
    name: 'Neopets',
    description: 'Simulador de mascotas virtuales nostálgico',
    url: 'https://www.neopets.com/',
    category: 'Simulación',
    rating: 4.4,
    visits: 750,
    image: '/sprites/neopets-preview.png',
    isActive: true,
  },
  {
    id: 'habbo',
    name: 'Habbo Hotel',
    description: 'Mundo virtual retro con chat y personalización',
    url: 'https://www.habbo.com/',
    category: 'Social',
    rating: 4.2,
    visits: 650,
    image: '/sprites/habbo-preview.png',
    isActive: true,
  },
  {
    id: 'runescape',
    name: 'Old School RuneScape',
    description: 'MMORPG clásico en su versión original',
    url: 'https://oldschool.runescape.com/',
    category: 'MMORPG',
    rating: 4.7,
    visits: 1800,
    image: '/sprites/runescape-preview.png',
    isActive: true,
  },
];

const categories = ['Todos', 'Emulación', 'Exploración', 'Juegos', 'Simulación', 'Social', 'MMORPG'];

export default function ZonaRecreativa() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedSite, setSelectedSite] = useState<RetroSite | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { earnFromTask } = useBerriesEarning();

  const filteredSites = selectedCategory === 'Todos' 
    ? retroSites 
    : retroSites.filter(site => site.category === selectedCategory);

  const handleSiteClick = (site: RetroSite) => {
    setSelectedSite(site);
    earnFromTask(`Explorar ${site.name}`, 'easy');
    
    // Increment visit count (in real app, this would be persisted)
    site.visits += 1;
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-amber-50">
      {/* Header */}
      <div className="bg-black/20 border-b border-amber-400/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setLocation('/')}
              className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
            >
              🏠 Inicio
            </Button>
            <h1 className="text-2xl font-bold text-amber-200">🎮 ZONA RECREATIVA</h1>
            <span className="text-amber-100/70">Sitios Nostálgicos & Juegos Retro</span>
          </div>
          <Web3Wallet />
        </div>
      </div>

      <div className="p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-200 mb-4">
            Explora el Internet Nostálgico
          </h2>
          <p className="text-amber-100/80 max-w-2xl mx-auto">
            Revive la magia de los sitios web clásicos y juegos retro. Cada exploración te recompensa con $Berries.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-amber-600 hover:bg-amber-700 text-black" 
                : "border-amber-400/50 text-amber-200 hover:bg-amber-400/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-yellow-400">{retroSites.length}</div>
            <div className="text-sm text-amber-200">Sitios Disponibles</div>
          </div>
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {retroSites.reduce((sum, site) => sum + site.visits, 0)}
            </div>
            <div className="text-sm text-amber-200">Visitas Totales</div>
          </div>
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-cyan-400">
              {categories.length - 1}
            </div>
            <div className="text-sm text-amber-200">Categorías</div>
          </div>
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-green-400">
              {(retroSites.reduce((sum, site) => sum + site.rating, 0) / retroSites.length).toFixed(1)}
            </div>
            <div className="text-sm text-amber-200">Rating Promedio</div>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map(site => (
            <div
              key={site.id}
              className="bg-black/20 rounded-lg border border-amber-400/30 overflow-hidden hover:border-amber-400/50 transition-all group cursor-pointer"
              onClick={() => handleSiteClick(site)}
            >
              {/* Site Preview */}
              <div className="relative h-48 bg-gradient-to-br from-amber-400/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-6xl opacity-50">🎮</div>
                <div className="absolute top-2 left-2">
                  <span className="bg-amber-600 text-black px-2 py-1 rounded text-xs font-bold">
                    {site.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-white">{site.rating}</span>
                  </div>
                </div>
              </div>

              {/* Site Info */}
              <div className="p-4">
                <h3 className="font-bold text-amber-200 mb-2">{site.name}</h3>
                <p className="text-sm text-amber-100/70 mb-3 line-clamp-2">
                  {site.description}
                </p>

                <div className="flex items-center justify-between text-xs text-amber-100/50 mb-3">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{site.visits} visitas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Activo</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSiteClick(site);
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Explorar Sitio
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Site Modal */}
        {selectedSite && (
          <Dialog open={!!selectedSite} onOpenChange={() => setSelectedSite(null)}>
            <DialogContent className={`bg-slate-900 border-amber-400/30 text-amber-50 ${
              isFullscreen ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl max-h-[80vh]'
            }`}>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-amber-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🎮</span>
                    <span>{selectedSite.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={handleFullscreen}
                      variant="outline"
                      size="sm"
                      className="border-amber-400/50 text-amber-200"
                    >
                      {isFullscreen ? '🗗' : '🗖'} {isFullscreen ? 'Ventana' : 'Pantalla Completa'}
                    </Button>
                    <Button
                      onClick={() => window.open(selectedSite.url, '_blank')}
                      variant="outline"
                      size="sm"
                      className="border-amber-400/50 text-amber-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Abrir Original
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="text-amber-100/70">
                  {selectedSite.description}
                </div>

                {/* Embedded Site */}
                <div className={`bg-white rounded-lg overflow-hidden ${
                  isFullscreen ? 'h-[80vh]' : 'h-96'
                }`}>
                  <iframe
                    src={selectedSite.url}
                    className="w-full h-full"
                    title={selectedSite.name}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-amber-100/70">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{selectedSite.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedSite.visits} visitas</span>
                    </div>
                  </div>
                  <span className="bg-amber-600 text-black px-2 py-1 rounded text-xs">
                    {selectedSite.category}
                  </span>
                </div>

                <div className="text-center text-amber-200/70 text-sm">
                  🍓 +5 Berries por explorar este sitio
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}