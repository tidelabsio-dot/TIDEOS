import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Zap, Music, Wallet, Check } from 'lucide-react';

interface Cassette {
  id: string;
  name: string;
  collection: string;
  color: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  price: number;
  tracks: number;
  image: string;
}

export default function GenesisMint() {
  const [selectedCassette, setSelectedCassette] = useState<Cassette | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [walletConnected, setWalletConnected] = useState(false);
  const [minting, setMinting] = useState(false);
  const [mintedNFTs, setMintedNFTs] = useState<string[]>([]);
  const [userBerries, setUserBerries] = useState(5000);

  const cassettes: Cassette[] = [
    {
      id: '1',
      name: 'Digital Gold',
      collection: 'Crypto Collection',
      color: 'from-yellow-400 to-orange-500',
      rarity: 'Legendary',
      price: 0.5,
      tracks: 4,
      image: '🟨',
    },
    {
      id: '2',
      name: 'Blockchain Dreams',
      collection: 'Nakamas Crew',
      color: 'from-blue-400 to-purple-500',
      rarity: 'Epic',
      price: 0.25,
      tracks: 3,
      image: '🟦',
    },
    {
      id: '3',
      name: 'Satoshi\'s Vision',
      collection: 'Bitcoin Vibes',
      color: 'from-orange-400 to-red-500',
      rarity: 'Rare',
      price: 0.1,
      tracks: 5,
      image: '🟧',
    },
    {
      id: '4',
      name: 'Web3 Nostalgia',
      collection: 'Retro Vibes',
      color: 'from-pink-400 to-red-500',
      rarity: 'Common',
      price: 0.05,
      tracks: 3,
      image: '🟩',
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-yellow-400 border-yellow-400';
      case 'Epic':
        return 'text-purple-400 border-purple-400';
      case 'Rare':
        return 'text-blue-400 border-blue-400';
      case 'Common':
        return 'text-green-400 border-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleMint = async () => {
    if (!selectedCassette || !walletConnected) return;

    setMinting(true);
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newNFTId = `CASSETTE-${Date.now()}`;
    setMintedNFTs([...mintedNFTs, newNFTId]);
    setUserBerries(userBerries - Math.floor(selectedCassette.price * 100));
    setMinting(false);
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2">
            GENESIS MINT
          </h1>
          <p className="text-gray-400 text-lg">Colecciona casetes NFT únicos del universo TIDE OS</p>
        </div>

        {/* Wallet Status */}
        <div className="flex justify-center gap-4 mb-8">
          <Card className="bg-gradient-to-r from-gray-900 to-black border-2 border-purple-500 p-4">
            <div className="flex items-center gap-4">
              <Wallet className="text-purple-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Wallet Status</p>
                {walletConnected ? (
                  <p className="text-green-400 font-bold flex items-center gap-2">
                    <Check size={16} /> Connected (Polygon)
                  </p>
                ) : (
                  <p className="text-yellow-400 font-bold">Disconnected</p>
                )}
              </div>
              {!walletConnected && (
                <Button
                  onClick={handleConnectWallet}
                  className="ml-4 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Connect MetaMask
                </Button>
              )}
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-gray-900 to-black border-2 border-yellow-500 p-4">
            <div className="flex items-center gap-4">
              <Zap className="text-yellow-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">$Berries Balance</p>
                <p className="text-yellow-400 font-bold text-lg">{userBerries} $Berries</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Cassettes Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cassettes.map((cassette) => (
            <Card
              key={cassette.id}
              onClick={() => setSelectedCassette(cassette)}
              className={`cursor-pointer transition-all transform hover:scale-105 border-2 ${
                selectedCassette?.id === cassette.id
                  ? 'border-purple-400 bg-gradient-to-br from-purple-900 to-black'
                  : 'border-gray-700 bg-gradient-to-br from-gray-900 to-black hover:border-purple-500'
              }`}
            >
              <div className="p-6">
                {/* Cassette Visual */}
                <div className={`bg-gradient-to-br ${cassette.color} rounded-lg p-8 mb-4 flex items-center justify-center h-40 shadow-lg`}>
                  <div className="text-6xl animate-bounce">{cassette.image}</div>
                </div>

                {/* Info */}
                <h3 className="text-white font-bold text-lg mb-1">{cassette.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{cassette.collection}</p>

                {/* Rarity Badge */}
                <div className={`border-2 rounded px-2 py-1 text-xs font-bold mb-3 inline-block ${getRarityColor(cassette.rarity)}`}>
                  {cassette.rarity}
                </div>

                {/* Stats */}
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Tracks:</span>
                    <span className="text-purple-400">{cassette.tracks}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Price:</span>
                    <span className="text-yellow-400 font-bold">{cassette.price} ETH</span>
                  </div>
                </div>

                {/* Select Button */}
                <Button
                  className={`w-full ${
                    selectedCassette?.id === cassette.id
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  } text-white`}
                >
                  {selectedCassette?.id === cassette.id ? '✓ Selected' : 'Select'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Mint Panel */}
        {selectedCassette && (
          <Card className="bg-gradient-to-br from-purple-900 to-black border-2 border-purple-400 p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview */}
              <div className="flex flex-col items-center justify-center">
                <div className={`bg-gradient-to-br ${selectedCassette.color} rounded-2xl p-16 mb-6 shadow-2xl`}>
                  <div className="text-8xl animate-pulse">{selectedCassette.image}</div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedCassette.name}</h2>
                <p className="text-gray-400 mb-4">{selectedCassette.collection}</p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Rarity</p>
                    <p className={`text-lg font-bold ${getRarityColor(selectedCassette.rarity)}`}>
                      {selectedCassette.rarity}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Tracks</p>
                    <p className="text-lg font-bold text-purple-400">{selectedCassette.tracks}</p>
                  </div>
                </div>
              </div>

              {/* Mint Controls */}
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Mint Your Cassette</h3>
                  <p className="text-gray-400 mb-6">
                    Cada casete NFT incluye acceso exclusivo a los tracks y beneficios comunitarios.
                  </p>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="text-white font-bold mb-2 block">Cantidad</label>
                  <Slider
                    value={[quantity]}
                    onValueChange={(value) => setQuantity(value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-purple-400 font-bold mt-2">{quantity} casete(s)</p>
                </div>

                {/* Price Breakdown */}
                <div className="bg-black bg-opacity-50 border border-purple-500 rounded p-4">
                  <div className="space-y-2 text-gray-300 mb-4">
                    <div className="flex justify-between">
                      <span>Precio unitario:</span>
                      <span>{selectedCassette.price} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cantidad:</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="border-t border-purple-500 pt-2 mt-2 flex justify-between font-bold text-white">
                      <span>Total:</span>
                      <span>{(selectedCassette.price * quantity).toFixed(3)} ETH</span>
                    </div>
                  </div>
                </div>

                {/* Mint Button */}
                {walletConnected ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={minting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6"
                      >
                        {minting ? 'Minting...' : `Mint ${quantity} Casete(s)`}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black border-2 border-purple-500">
                      <AlertDialogTitle className="text-white">Confirmar Mint</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        Estás a punto de mintear {quantity} {selectedCassette.name} NFT(s) por {(selectedCassette.price * quantity).toFixed(3)} ETH en la red Polygon.
                      </AlertDialogDescription>
                      <div className="flex gap-4">
                        <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleMint}
                          className="bg-purple-600 text-white hover:bg-purple-700"
                        >
                          Confirmar Mint
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-gray-700 text-gray-400 cursor-not-allowed"
                  >
                    Conecta tu billetera primero
                  </Button>
                )}

                {/* Minted NFTs */}
                {mintedNFTs.length > 0 && (
                  <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded p-4">
                    <h4 className="text-green-400 font-bold mb-2">✓ NFTs Minteados</h4>
                    <div className="space-y-1 text-green-300 text-sm">
                      {mintedNFTs.map((nft) => (
                        <p key={nft}>{nft}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
