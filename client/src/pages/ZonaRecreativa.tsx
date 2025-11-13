import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gamepad2, Trophy, Zap } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxScore: number;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  berries: number;
  avatar: string;
}

export default function ZonaRecreativa() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [totalBerries, setTotalBerries] = useState(5000);

  const games: Game[] = [
    {
      id: '1',
      name: 'Pirate Runner',
      description: 'Corre y evita obstáculos en el océano pirata',
      icon: '🏴‍☠️',
      maxScore: 1000,
      reward: 50,
      difficulty: 'Easy',
    },
    {
      id: '2',
      name: 'Cassette Collector',
      description: 'Recolecta casetes mientras evitas enemigos',
      icon: '📼',
      maxScore: 5000,
      reward: 100,
      difficulty: 'Medium',
    },
    {
      id: '3',
      name: 'Web3 Puzzle',
      description: 'Resuelve acertijos sobre blockchain y criptografía',
      icon: '🧩',
      maxScore: 2000,
      reward: 75,
      difficulty: 'Medium',
    },
    {
      id: '4',
      name: 'Walkman Rhythm',
      description: 'Sigue el ritmo de la música en un juego retro',
      icon: '🎵',
      maxScore: 3000,
      reward: 80,
      difficulty: 'Hard',
    },
    {
      id: '5',
      name: 'Treasure Hunt',
      description: 'Busca tesoros escondidos en el mapa',
      icon: '💎',
      maxScore: 4000,
      reward: 120,
      difficulty: 'Hard',
    },
    {
      id: '6',
      name: 'Memory Cards',
      description: 'Encuentra parejas de cartas en este clásico',
      icon: '🎴',
      maxScore: 1500,
      reward: 60,
      difficulty: 'Easy',
    },
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'Luffy', score: 9800, berries: 50000, avatar: '🏴‍☠️' },
    { rank: 2, username: 'Zoro', score: 8500, berries: 42000, avatar: '⚔️' },
    { rank: 3, username: 'Nami', score: 7200, berries: 38000, avatar: '🧡' },
    { rank: 4, username: 'Sanji', score: 6800, berries: 35000, avatar: '🚬' },
    { rank: 5, username: 'You', score: userScore, berries: totalBerries, avatar: '👤' },
  ];

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    setGameRunning(true);
    setGameOver(false);
    setCurrentScore(0);
  };

  const simulateGameplay = () => {
    const interval = setInterval(() => {
      setCurrentScore((prev) => {
        const newScore = prev + Math.floor(Math.random() * 50);
        if (newScore >= selectedGame!.maxScore) {
          clearInterval(interval);
          endGame(selectedGame!.maxScore);
          return selectedGame!.maxScore;
        }
        return newScore;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      if (currentScore < selectedGame!.maxScore) {
        endGame(currentScore);
      }
    }, 10000);
  };

  const endGame = (finalScore: number) => {
    setGameRunning(false);
    setGameOver(true);
    setUserScore(finalScore);
    const earned = Math.floor((finalScore / selectedGame!.maxScore) * selectedGame!.reward);
    setTotalBerries(totalBerries + earned);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 border-green-400';
      case 'Medium':
        return 'text-yellow-400 border-yellow-400';
      case 'Hard':
        return 'text-red-400 border-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-2">
            ZONA RECREATIVA
          </h1>
          <p className="text-gray-400 text-lg">Juega, diviértete y gana $Berries</p>
        </div>

        {/* User Stats */}
        <div className="flex justify-center gap-4 mb-8">
          <Card className="bg-gradient-to-r from-gray-900 to-black border-2 border-purple-500 p-4">
            <div className="flex items-center gap-4">
              <Zap className="text-yellow-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">$Berries</p>
                <p className="text-yellow-400 font-bold text-lg">{totalBerries}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-gray-900 to-black border-2 border-purple-500 p-4">
            <div className="flex items-center gap-4">
              <Trophy className="text-purple-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Mejor Puntuación</p>
                <p className="text-purple-400 font-bold text-lg">{userScore}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Games Grid */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-6">Juegos Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <Card
                key={game.id}
                className={`cursor-pointer transition-all transform hover:scale-105 border-2 ${
                  selectedGame?.id === game.id
                    ? 'border-purple-400 bg-gradient-to-br from-purple-900 to-black'
                    : 'border-gray-700 bg-gradient-to-br from-gray-900 to-black hover:border-purple-500'
                }`}
              >
                <div className="p-6">
                  {/* Game Icon */}
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-8 mb-4 flex items-center justify-center h-32">
                    <div className="text-6xl">{game.icon}</div>
                  </div>

                  {/* Info */}
                  <h3 className="text-white font-bold text-lg mb-2">{game.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{game.description}</p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Max Score:</span>
                      <span className="text-purple-400 font-bold">{game.maxScore}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Recompensa:</span>
                      <span className="text-yellow-400 font-bold">{game.reward} $Berries</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Dificultad:</span>
                      <span className={`font-bold ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button
                    onClick={() => handlePlayGame(game)}
                    className={`w-full ${
                      selectedGame?.id === game.id
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-700 hover:bg-gray-600'
                    } text-white`}
                  >
                    <Gamepad2 size={16} className="mr-2" />
                    {selectedGame?.id === game.id ? 'Seleccionado' : 'Jugar'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 p-6">
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded ${
                    entry.username === 'You'
                      ? 'bg-purple-900 border-2 border-purple-500'
                      : 'bg-black border border-gray-700 hover:border-purple-500'
                  }`}
                >
                  <div className="text-2xl">{entry.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{entry.username}</p>
                    <p className="text-gray-400 text-xs">{entry.score} pts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold text-sm">#{entry.rank}</p>
                    <p className="text-gray-400 text-xs">{entry.berries} $B</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Game Panel */}
      {selectedGame && (
        <div className="max-w-7xl mx-auto mt-12">
          <Card className="bg-gradient-to-br from-purple-900 to-black border-2 border-purple-400 p-8">
            <div className="text-center">
              <div className="text-8xl mb-6">{selectedGame.icon}</div>
              <h2 className="text-4xl font-bold text-white mb-2">{selectedGame.name}</h2>
              <p className="text-gray-400 mb-8">{selectedGame.description}</p>

              {!gameRunning && !gameOver && (
                <Button
                  onClick={simulateGameplay}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6"
                >
                  <Gamepad2 size={24} className="mr-2" />
                  Iniciar Juego
                </Button>
              )}

              {gameRunning && (
                <div className="space-y-6">
                  <div className="bg-black bg-opacity-50 border-2 border-purple-500 rounded p-8">
                    <p className="text-gray-400 text-sm mb-2">Puntuación Actual</p>
                    <p className="text-6xl font-bold text-purple-400">{currentScore}</p>
                    <p className="text-gray-400 text-sm mt-2">de {selectedGame.maxScore}</p>
                  </div>
                  <div className="h-2 bg-black rounded-full overflow-hidden border-2 border-purple-500">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{ width: `${(currentScore / selectedGame.maxScore) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 animate-pulse">Jugando...</p>
                </div>
              )}

              {gameOver && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-900 to-black border-2 border-green-500 rounded p-8">
                    <p className="text-green-400 font-bold text-lg mb-2">¡Juego Finalizado!</p>
                    <p className="text-gray-400 text-sm mb-4">Puntuación Final</p>
                    <p className="text-6xl font-bold text-green-400 mb-4">{currentScore}</p>
                    <p className="text-yellow-400 font-bold text-lg">
                      +{Math.floor((currentScore / selectedGame.maxScore) * selectedGame.reward)} $Berries
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setGameOver(false);
                      setCurrentScore(0);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-6 w-full"
                  >
                    Jugar de Nuevo
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
