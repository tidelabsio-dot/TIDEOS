import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Share2, Trophy, Zap, Link as LinkIcon } from 'lucide-react';

interface UserStats {
  username: string;
  avatar: string;
  berries: number;
  nakamas: number;
  level: number;
  joinDate: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface SocialConnection {
  platform: string;
  icon: string;
  connected: boolean;
  username?: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserStats>({
    username: 'Nakama_001',
    avatar: '👤',
    berries: 5000,
    nakamas: 250,
    level: 5,
    joinDate: '2024-01-15',
  });

  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    { platform: 'Twitter', icon: '𝕏', connected: false },
    { platform: 'Discord', icon: '💬', connected: false },
    { platform: 'Telegram', icon: '✈️', connected: false },
    { platform: 'Instagram', icon: '📷', connected: false },
    { platform: 'GitHub', icon: '🐙', connected: false },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Steps',
      description: 'Únete a la tripulación',
      icon: '🏴‍☠️',
      unlocked: true,
      date: '2024-01-15',
    },
    {
      id: '2',
      name: 'Berry Collector',
      description: 'Recolecta 1000 $Berries',
      icon: '💰',
      unlocked: true,
      date: '2024-01-20',
    },
    {
      id: '3',
      name: 'Nakama Recruiter',
      description: 'Recluta 10 Nakamas',
      icon: '👥',
      unlocked: false,
    },
    {
      id: '4',
      name: 'NFT Collector',
      description: 'Mintea 5 Casetes NFT',
      icon: '📼',
      unlocked: false,
    },
    {
      id: '5',
      name: 'Social Butterfly',
      description: 'Conecta 3 redes sociales',
      icon: '🦋',
      unlocked: false,
    },
    {
      id: '6',
      name: 'Web3 Master',
      description: 'Participa en Crowdfunding',
      icon: '🎓',
      unlocked: false,
    },
  ]);

  const handleConnectSocial = (platform: string) => {
    setSocialConnections(
      socialConnections.map((conn) =>
        conn.platform === platform
          ? { ...conn, connected: !conn.connected, username: !conn.connected ? `@user_${platform}` : undefined }
          : conn
      )
    );
  };

  const connectedCount = socialConnections.filter((c) => c.connected).length;
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-indigo-900 to-black border-2 border-indigo-500 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="text-9xl">{user.avatar}</div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
              <p className="text-gray-400 mb-6">Miembro desde {user.joinDate}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black bg-opacity-50 border border-indigo-500 rounded p-4">
                  <p className="text-gray-400 text-sm">Level</p>
                  <p className="text-3xl font-bold text-indigo-400">{user.level}</p>
                </div>
                <div className="bg-black bg-opacity-50 border border-yellow-500 rounded p-4">
                  <p className="text-gray-400 text-sm">$Berries</p>
                  <p className="text-3xl font-bold text-yellow-400">{user.berries}</p>
                </div>
                <div className="bg-black bg-opacity-50 border border-purple-500 rounded p-4">
                  <p className="text-gray-400 text-sm">$Nakamas</p>
                  <p className="text-3xl font-bold text-purple-400">{user.nakamas}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Gift size={16} className="mr-2" />
                Claim Airdrop
              </Button>
              <Button variant="outline" className="border-indigo-500 text-indigo-400">
                <Share2 size={16} className="mr-2" />
                Compartir Perfil
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="social" className="space-y-6">
          <TabsList className="bg-black border-2 border-indigo-500 p-1">
            <TabsTrigger value="social" className="data-[state=active]:bg-indigo-600">
              Redes Sociales
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-indigo-600">
              Logros
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-indigo-600">
              Recompensas
            </TabsTrigger>
          </TabsList>

          {/* Social Connections */}
          <TabsContent value="social" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-indigo-500 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Conecta tus Redes Sociales</h2>
              <p className="text-gray-400 mb-8">
                Conecta tus redes sociales para desbloquear recompensas y compartir tu progreso
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialConnections.map((social) => (
                  <div
                    key={social.platform}
                    className={`border-2 rounded p-4 flex items-center justify-between ${
                      social.connected
                        ? 'border-green-500 bg-green-900 bg-opacity-20'
                        : 'border-gray-700 bg-black'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{social.icon}</span>
                      <div>
                        <p className="text-white font-bold">{social.platform}</p>
                        {social.connected && (
                          <p className="text-green-400 text-sm">{social.username}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleConnectSocial(social.platform)}
                      className={`${
                        social.connected
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      } text-white`}
                    >
                      <LinkIcon size={16} className="mr-2" />
                      {social.connected ? 'Conectado' : 'Conectar'}
                    </Button>
                  </div>
                ))}
              </div>

              {/* Social Rewards */}
              <div className="mt-8 bg-black bg-opacity-50 border border-indigo-500 rounded p-6">
                <h3 className="text-white font-bold mb-4">Recompensas por Redes Sociales</h3>
                <div className="space-y-2 text-gray-300">
                  <p>✓ Conectar 1 red social: +100 $Berries</p>
                  <p>✓ Conectar 3 redes sociales: +500 $Berries + Achievement</p>
                  <p>✓ Conectar 5 redes sociales: +1000 $Berries + 100 $Nakamas</p>
                  <p className="text-indigo-400 font-bold mt-4">
                    Progreso: {connectedCount}/5 redes conectadas
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-indigo-500 p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Logros Desbloqueados</h2>
              <p className="text-gray-400 mb-6">
                {unlockedAchievements}/{achievements.length} logros completados
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`border-2 rounded p-4 ${
                      achievement.unlocked
                        ? 'border-yellow-500 bg-yellow-900 bg-opacity-20'
                        : 'border-gray-700 bg-black opacity-50'
                    }`}
                  >
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <h3 className="text-white font-bold mb-1">{achievement.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <p className="text-yellow-400 text-xs">
                        ✓ Desbloqueado el {achievement.date}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-xs">Bloqueado</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Rewards */}
          <TabsContent value="rewards" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-indigo-500 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Sistema de Recompensas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* $Berries Info */}
                <div className="border-2 border-yellow-500 rounded p-6 bg-yellow-900 bg-opacity-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="text-yellow-400" size={24} />
                    <h3 className="text-xl font-bold text-yellow-400">$Berries</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Moneda de juego para actividades en TIDE OS. Gana $Berries jugando, completando tareas y participando en la comunidad.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>• Juegos: 50-120 por partida</p>
                    <p>• Tareas diarias: 100-500</p>
                    <p>• Redes sociales: 100-1000</p>
                    <p>• Referrals: 500 por amigo</p>
                  </div>
                </div>

                {/* $Nakamas Info */}
                <div className="border-2 border-purple-500 rounded p-6 bg-purple-900 bg-opacity-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="text-purple-400" size={24} />
                    <h3 className="text-xl font-bold text-purple-400">$Nakamas</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Token de gobernanza y utilidad. Obtén $Nakamas a través de airdrops, staking de $Berries y participación en el ecosistema.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>• Airdrop Genesis: 100</p>
                    <p>• Staking: 1 $Nakama por 1000 $Berries</p>
                    <p>• Crowdfunding: Recompensas variables</p>
                    <p>• Governance: Vota en decisiones</p>
                  </div>
                </div>
              </div>

              {/* Airdrop Status */}
              <div className="mt-8 bg-gradient-to-r from-green-900 to-black border-2 border-green-500 rounded p-6">
                <h3 className="text-white font-bold mb-4">Estado del Airdrop Genesis</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Tokens Disponibles</p>
                    <p className="text-3xl font-bold text-green-400">100</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Requisitos</p>
                    <p className="text-green-400 font-bold">✓ Completado</p>
                  </div>
                  <div className="text-center">
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                      Reclamar Airdrop
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
