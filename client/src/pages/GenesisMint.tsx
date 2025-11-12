import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { Web3Wallet } from '@/components/Web3Wallet';
import { useWeb3, useBerriesEarning } from '@/contexts/Web3Context';
import { Sparkles, Zap, Crown, Gem } from 'lucide-react';

interface CassetteNFT {
  id: string;
  name: string;
  artist: string;
  collection: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  supply: number;
  minted: number;
  image: string;
  tracks: string[];
  description: string;
}

const cassettes: CassetteNFT[] = [
  {
    id: 'genesis-001',
    name: 'Genesis Beats Vol.1',
    artist: 'TIDEOS Collective',
    collection: 'Genesis Collection',
    rarity: 'legendary',
    price: 0.5,
    supply: 100,
    minted: 23,
    image: '/sprites/cassette-gold.png',
    tracks: ['Digital Dawn', 'Blockchain Symphony', 'Crypto Dreams', 'Genesis Anthem'],
    description: 'La primera colección oficial de TIDEOS Genesis. Casete legendario con 4 tracks exclusivos.'
  },
  {
    id: 'pirate-001',
    name: 'Nakama Vibes',
    artist: 'Straw Hat Crew',
    collection: 'Pirate Collection',
    rarity: 'epic',
    price: 0.25,
    supply: 500,
    minted: 187,
    image: '/sprites/cassette-purple.png',
    tracks: ['One Piece Dreams', 'Grand Line Journey', 'Nakama Bond'],
    description: 'Aventuras musicales de los Nakamas. Colección épica con sonidos piratas únicos.'
  },
  {
    id: 'cyber-001',
    name: 'Neon Nights',
    artist: 'CyberSound',
    collection: 'Cyberpunk Collection',
    rarity: 'rare',
    price: 0.1,
    supply: 1000,
    minted: 456,
    image: '/sprites/cassette-cyan.png',
    tracks: ['Neon Dreams', 'Digital Rain', 'Cyber Love', 'Matrix Vibes', 'Future Funk'],
    description: 'Sonidos del futuro cyberpunk. 5 tracks que te transportan a una realidad digital.'
  },
  {
    id: 'retro-001',
    name: 'Vintage Vibes',
    artist: 'RetroWave',
    collection: 'Nostalgic Collection',
    rarity: 'common',
    price: 0.05,
    supply: 2000,
    minted: 892,
    image: '/sprites/cassette-pink.png',
    tracks: ['80s Dreams', 'Synthwave Sunset', 'Retro Love'],
    description: 'Nostalgia pura en formato casete. Sonidos vintage que te llevan a los 80s.'
  },
];

const rarityConfig = {
  common: { color: 'bg-gray-500', icon: '⚪', label: 'Común' },
  rare: { color: 'bg-blue-500', icon: '🔵', label: 'Raro' },
  epic: { color: 'bg-purple-500', icon: '🟣', label: 'Épico' },
  legendary: { color: 'bg-yellow-500', icon: '🟡', label: 'Legendario' },
};

export default function GenesisMint() {
  const [, setLocation] = useLocation();
  const [selectedCassette, setSelectedCassette] = useState<CassetteNFT | null>(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const { isConnected, spendBerries, berriesBalance } = useWeb3();
  const { earnFromVote } = useBerriesEarning();

  const handleMint = async (cassette: CassetteNFT) => {
    if (!isConnected) {
      alert('Por favor conecta tu billetera primero');
      return;
    }

    setIsMinting(true);
    
    // Simulate minting process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful mint
      alert(`¡Felicidades! Has minteado ${mintAmount}x ${cassette.name} NFT`);
      
      // Update minted count (in real app, this would come from blockchain)
      cassette.minted += mintAmount;
      
    } catch (error) {
      alert('Error al mintear NFT. Inténtalo de nuevo.');
    } finally {
      setIsMinting(false);
      setSelectedCassette(null);
    }
  };

  const handleVote = (cassetteId: string, vote: 'up' | 'down') => {
    earnFromVote();
    alert(`Voto registrado para ${cassetteId}: ${vote === 'up' ? '👍' : '👎'}`);
  };

  const canAffordMint = (price: number) => {
    const totalCost = price * mintAmount;
    return berriesBalance >= totalCost * 100; // Assuming 1 ETH = 100 berries for demo
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
            <h1 className="text-2xl font-bold text-amber-200">💎 GENESIS MINT</h1>
            <span className="text-amber-100/70">Casetes NFT Exclusivos</span>
          </div>
          <Web3Wallet />
        </div>
      </div>

      <div className="p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-200 mb-4">
            Colecciona Casetes NFT Únicos
          </h2>
          <p className="text-xl text-amber-100/80 max-w-2xl mx-auto">
            Cada casete NFT contiene tracks exclusivos, artwork único y utilidades especiales en el ecosistema TIDEOS.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {cassettes.reduce((sum, c) => sum + c.minted, 0)}
            </div>
            <div className="text-sm text-amber-200">Total Minteados</div>
          </div>
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {cassettes.length}
            </div>
            <div className="text-sm text-amber-200">Colecciones</div>
          </div>
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-cyan-400">
              {cassettes.reduce((sum, c) => sum + c.tracks.length, 0)}
            </div>
            <div className="text-sm text-amber-200">Tracks Únicos</div>
          </div>
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30 text-center">
            <div className="text-2xl font-bold text-green-400">
              {Math.min(...cassettes.map(c => c.price))} ETH
            </div>
            <div className="text-sm text-amber-200">Precio Mínimo</div>
          </div>
        </div>

        {/* Cassette Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cassettes.map((cassette) => (
            <div
              key={cassette.id}
              className="bg-black/20 rounded-lg border border-amber-400/30 overflow-hidden hover:border-amber-400/50 transition-all group"
            >
              {/* Cassette Image */}
              <div className="relative h-48 bg-gradient-to-br from-amber-400/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-8xl opacity-50">📼</div>
                <div className="absolute top-2 right-2">
                  <Badge className={`${rarityConfig[cassette.rarity].color} text-white`}>
                    {rarityConfig[cassette.rarity].icon} {rarityConfig[cassette.rarity].label}
                  </Badge>
                </div>
              </div>

              {/* Cassette Info */}
              <div className="p-4">
                <h3 className="font-bold text-amber-200 mb-1">{cassette.name}</h3>
                <p className="text-sm text-amber-100/70 mb-2">{cassette.artist}</p>
                <p className="text-xs text-amber-100/50 mb-3">{cassette.collection}</p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-amber-200 mb-1">
                    <span>Minteados</span>
                    <span>{cassette.minted}/{cassette.supply}</span>
                  </div>
                  <div className="w-full bg-amber-400/20 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all"
                      style={{ width: `${(cassette.minted / cassette.supply) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-bold text-amber-200">
                    {cassette.price} ETH
                  </div>
                  <div className="text-sm text-amber-100/70">
                    {cassette.tracks.length} tracks
                  </div>
                </div>

                <div className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedCassette(cassette)}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700"
                      >
                        <Gem className="w-4 h-4 mr-2" />
                        Mintear NFT
                      </Button>
                    </DialogTrigger>
                  </Dialog>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleVote(cassette.id, 'up')}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-green-400/50 text-green-400 hover:bg-green-400/10"
                    >
                      👍 Me gusta
                    </Button>
                    <Button
                      onClick={() => handleVote(cassette.id, 'down')}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-red-400/50 text-red-400 hover:bg-red-400/10"
                    >
                      👎 No me gusta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mint Modal */}
        {selectedCassette && (
          <Dialog open={!!selectedCassette} onOpenChange={() => setSelectedCassette(null)}>
            <DialogContent className="max-w-md bg-slate-900 border-amber-400/30 text-amber-50">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2 text-amber-200">
                  <Gem className="w-5 h-5" />
                  <span>Mintear {selectedCassette.name}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Cassette Preview */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-400/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-6xl">📼</div>
                  </div>
                  <h3 className="font-bold text-amber-200">{selectedCassette.name}</h3>
                  <p className="text-amber-100/70">{selectedCassette.artist}</p>
                  <Badge className={`${rarityConfig[selectedCassette.rarity].color} text-white mt-2`}>
                    {rarityConfig[selectedCassette.rarity].icon} {rarityConfig[selectedCassette.rarity].label}
                  </Badge>
                </div>

                {/* Tracks List */}
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">Tracks incluidos:</h4>
                  <div className="space-y-1">
                    {selectedCassette.tracks.map((track, index) => (
                      <div key={index} className="text-sm text-amber-100/70 flex items-center space-x-2">
                        <span className="text-amber-400">{index + 1}.</span>
                        <span>{track}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mint Amount */}
                <div>
                  <label className="block text-sm font-medium text-amber-200 mb-2">
                    Cantidad a mintear:
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
                      variant="outline"
                      size="sm"
                      className="border-amber-400/50"
                    >
                      -
                    </Button>
                    <span className="px-4 py-2 bg-black/20 rounded border border-amber-400/30 min-w-[60px] text-center">
                      {mintAmount}
                    </span>
                    <Button
                      onClick={() => setMintAmount(Math.min(10, mintAmount + 1))}
                      variant="outline"
                      size="sm"
                      className="border-amber-400/50"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Total Cost */}
                <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-200">Total:</span>
                    <span className="text-xl font-bold text-amber-200">
                      {(selectedCassette.price * mintAmount).toFixed(3)} ETH
                    </span>
                  </div>
                  {!canAffordMint(selectedCassette.price) && (
                    <p className="text-red-400 text-sm mt-2">
                      No tienes suficientes berries para esta transacción
                    </p>
                  )}
                </div>

                {/* Mint Button */}
                <Button
                  onClick={() => handleMint(selectedCassette)}
                  disabled={isMinting || !isConnected || !canAffordMint(selectedCassette.price)}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 disabled:opacity-50"
                >
                  {isMinting ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Minteando...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Mintear NFT
                    </>
                  )}
                </Button>

                {!isConnected && (
                  <p className="text-amber-200/70 text-sm text-center">
                    Conecta tu billetera para mintear NFTs
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}