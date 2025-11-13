import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Heart, Share2, Users } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  creator: string;
  description: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  category: string;
  image: string;
  rewards: string[];
}

export default function Crowdfunding() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Videoclip One Piece x Web3',
      creator: 'Luffy Studios',
      description: 'Producción de un videoclip épico combinando One Piece con la estética Web3',
      goal: 50,
      raised: 32.5,
      backers: 1247,
      daysLeft: 15,
      category: 'Music',
      image: '🎬',
      rewards: ['NFT Exclusivo', 'Créditos en el video', 'Acceso anticipado'],
    },
    {
      id: '2',
      title: 'Álbum de Música Retro Pirata',
      creator: 'Nami Records',
      description: 'Lanzamiento de un álbum completo con sonidos retro y temática pirata',
      goal: 30,
      raised: 18.7,
      backers: 823,
      daysLeft: 22,
      category: 'Music',
      image: '🎵',
      rewards: ['Álbum Digital', 'Casete NFT', 'Merch Exclusivo'],
    },
    {
      id: '3',
      title: 'Juego Web3 - Pirate Quest',
      creator: 'Zoro Games',
      description: 'Desarrollo de un juego retro estilo 8-bit con economía Web3 integrada',
      goal: 75,
      raised: 45.2,
      backers: 2156,
      daysLeft: 8,
      category: 'Gaming',
      image: '🎮',
      rewards: ['Early Access', 'NFT de Personaje', 'Tokens de Juego'],
    },
    {
      id: '4',
      title: 'Colección de Arte Digital',
      creator: 'Robin Art Collective',
      description: 'Serie de 100 obras de arte digital inspiradas en la cultura pirata',
      goal: 20,
      raised: 12.3,
      backers: 456,
      daysLeft: 30,
      category: 'Art',
      image: '🎨',
      rewards: ['NFT de Obra', 'Print Físico', 'Acceso a Galería Virtual'],
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [backAmount, setBackAmount] = useState('');
  const [userBacked, setUserBacked] = useState<string[]>([]);

  const handleBack = () => {
    if (selectedCampaign && backAmount && parseFloat(backAmount) > 0) {
      const newRaised = selectedCampaign.raised + parseFloat(backAmount);
      const updatedCampaigns = campaigns.map((c) =>
        c.id === selectedCampaign.id
          ? { ...c, raised: newRaised, backers: c.backers + 1 }
          : c
      );
      setCampaigns(updatedCampaigns);
      setUserBacked([...userBacked, selectedCampaign.id]);
      setBackAmount('');
    }
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-2">
            CROWDFUNDING WEB3
          </h1>
          <p className="text-gray-400 text-lg">Financia proyectos épicos de la comunidad TIDE OS</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Total Recaudado</p>
            <p className="text-3xl font-bold text-cyan-400">108.7 ETH</p>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Proyectos Activos</p>
            <p className="text-3xl font-bold text-blue-400">{campaigns.length}</p>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Backers Totales</p>
            <p className="text-3xl font-bold text-purple-400">4,682</p>
          </Card>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className={`cursor-pointer transition-all transform hover:scale-105 border-2 overflow-hidden ${
                selectedCampaign?.id === campaign.id
                  ? 'border-cyan-400 bg-gradient-to-br from-cyan-900 to-black'
                  : 'border-gray-700 bg-gradient-to-br from-gray-900 to-black hover:border-cyan-500'
              }`}
            >
              <div className="p-6">
                {/* Campaign Image */}
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-12 mb-4 flex items-center justify-center h-32">
                  <div className="text-6xl">{campaign.image}</div>
                </div>

                {/* Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{campaign.title}</h3>
                    <span className="text-xs bg-cyan-500 text-black px-2 py-1 rounded font-bold">
                      {campaign.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{campaign.creator}</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{campaign.description}</p>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-cyan-400 font-bold">{campaign.raised} ETH</span>
                    <span className="text-gray-400 text-sm">de {campaign.goal} ETH</span>
                  </div>
                  <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} className="h-2" />
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{Math.round(getProgressPercentage(campaign.raised, campaign.goal))}%</span>
                    <span>{campaign.daysLeft} días restantes</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
                  <Users size={16} />
                  <span>{campaign.backers} backers</span>
                </div>

                {/* Select Button */}
                <Button
                  className={`w-full ${
                    selectedCampaign?.id === campaign.id
                      ? 'bg-cyan-600 hover:bg-cyan-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  } text-white`}
                >
                  {selectedCampaign?.id === campaign.id ? '✓ Seleccionado' : 'Ver Detalles'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Campaign Details */}
        {selectedCampaign && (
          <Card className="bg-gradient-to-br from-cyan-900 to-black border-2 border-cyan-400 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Campaign Details */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-16 mb-6 flex items-center justify-center h-64">
                  <div className="text-8xl">{selectedCampaign.image}</div>
                </div>

                <h2 className="text-4xl font-bold text-white mb-2">{selectedCampaign.title}</h2>
                <p className="text-gray-400 text-lg mb-6">{selectedCampaign.creator}</p>

                <div className="bg-black bg-opacity-50 border border-cyan-500 rounded p-6 mb-6">
                  <h3 className="text-white font-bold mb-3">Descripción</h3>
                  <p className="text-gray-300">{selectedCampaign.description}</p>
                </div>

                <div className="bg-black bg-opacity-50 border border-cyan-500 rounded p-6">
                  <h3 className="text-white font-bold mb-4">Recompensas</h3>
                  <ul className="space-y-2">
                    {selectedCampaign.rewards.map((reward, idx) => (
                      <li key={idx} className="text-gray-300 flex items-center gap-2">
                        <span className="text-cyan-400">✓</span> {reward}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Backing Panel */}
              <div className="space-y-6">
                {/* Progress Card */}
                <Card className="bg-black border-2 border-cyan-500 p-6">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-bold">Progreso</span>
                      <span className="text-cyan-400 font-bold">
                        {Math.round(getProgressPercentage(selectedCampaign.raised, selectedCampaign.goal))}%
                      </span>
                    </div>
                    <Progress value={getProgressPercentage(selectedCampaign.raised, selectedCampaign.goal)} className="h-3" />
                  </div>

                  <div className="space-y-2 text-gray-300 text-sm">
                    <div className="flex justify-between">
                      <span>Recaudado:</span>
                      <span className="text-cyan-400 font-bold">{selectedCampaign.raised} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meta:</span>
                      <span className="text-white font-bold">{selectedCampaign.goal} ETH</span>
                    </div>
                    <div className="flex justify-between border-t border-cyan-500 pt-2 mt-2">
                      <span>Backers:</span>
                      <span className="text-cyan-400 font-bold">{selectedCampaign.backers}</span>
                    </div>
                  </div>
                </Card>

                {/* Back Button */}
                <Card className="bg-black border-2 border-cyan-500 p-6">
                  <h3 className="text-white font-bold mb-4">Respalda este Proyecto</h3>

                  <div className="mb-4">
                    <label className="text-gray-400 text-sm block mb-2">Cantidad (ETH)</label>
                    <Input
                      type="number"
                      value={backAmount}
                      onChange={(e) => setBackAmount(e.target.value)}
                      placeholder="0.1"
                      step="0.01"
                      min="0"
                      className="bg-gray-900 border-cyan-500 text-white"
                    />
                  </div>

                  <Button
                    onClick={handleBack}
                    disabled={!backAmount || parseFloat(backAmount) <= 0}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold mb-4"
                  >
                    Respaldar Proyecto
                  </Button>

                  {userBacked.includes(selectedCampaign.id) && (
                    <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded p-3 text-green-400 text-sm">
                      ✓ ¡Gracias por tu apoyo!
                    </div>
                  )}
                </Card>

                {/* Share */}
                <Button
                  variant="outline"
                  className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-900"
                >
                  <Share2 size={16} className="mr-2" />
                  Compartir Proyecto
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
