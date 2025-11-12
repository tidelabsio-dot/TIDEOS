import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Web3Wallet } from '@/components/Web3Wallet';
import { useBerriesEarning } from '@/contexts/Web3Context';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
}

interface Walkman {
  id: string;
  name: string;
  color: string;
  collection: string;
  tracks: Track[];
}

const walkmans: Walkman[] = [
  {
    id: 'vah0m4n',
    name: 'VAH0M4N',
    color: 'from-yellow-400 to-amber-600',
    collection: 'Crypto Collection',
    tracks: [
      { id: '1', title: 'Digital Gold', artist: 'CryptoBeats', duration: '3:45', url: '/audio/sample1.mp3' },
      { id: '2', title: 'Blockchain Dreams', artist: 'VAH0M4N', duration: '4:12', url: '/audio/sample2.mp3' },
      { id: '3', title: 'Satoshi\'s Vision', artist: 'BitSound', duration: '3:28', url: '/audio/sample3.mp3' },
    ]
  },
  {
    id: 'nakamas-crew',
    name: 'NAKAMAS CREW',
    color: 'from-purple-400 to-pink-600',
    collection: 'Pirate Collection',
    tracks: [
      { id: '4', title: 'One Piece Dreams', artist: 'Nakama Beats', duration: '4:05', url: '/audio/sample4.mp3' },
      { id: '5', title: 'Grand Line Voyage', artist: 'Straw Hat Crew', duration: '3:52', url: '/audio/sample5.mp3' },
      { id: '6', title: 'Pirate King Anthem', artist: 'Luffy Sound', duration: '4:33', url: '/audio/sample6.mp3' },
    ]
  },
  {
    id: 'raza',
    name: 'RAZA',
    color: 'from-gray-300 to-gray-600',
    collection: 'Urban Collection',
    tracks: [
      { id: '7', title: 'Street Vibes', artist: 'RAZA Collective', duration: '3:18', url: '/audio/sample7.mp3' },
      { id: '8', title: 'Urban Legends', artist: 'City Sounds', duration: '4:01', url: '/audio/sample8.mp3' },
      { id: '9', title: 'Concrete Jungle', artist: 'Metro Beats', duration: '3:44', url: '/audio/sample9.mp3' },
    ]
  },
  {
    id: 'azar',
    name: 'AZAR',
    color: 'from-cyan-400 to-blue-600',
    collection: 'Cosmic Collection',
    tracks: [
      { id: '10', title: 'Cosmic Drift', artist: 'AZAR Waves', duration: '5:12', url: '/audio/sample10.mp3' },
      { id: '11', title: 'Stellar Journey', artist: 'Space Sounds', duration: '4:28', url: '/audio/sample11.mp3' },
      { id: '12', title: 'Galaxy Dreams', artist: 'Astro Beats', duration: '3:56', url: '/audio/sample12.mp3' },
    ]
  },
];

export default function Tunova() {
  const [, setLocation] = useLocation();
  const [selectedWalkman, setSelectedWalkman] = useState<Walkman>(walkmans[0]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { earnFromListening, earnFromLike } = useBerriesEarning();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentTrack]);

  // Earn berries for listening
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        earnFromListening(1); // 1 minute of listening
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack, earnFromListening]);

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume;
          audioRef.current.play();
        }
      }, 100);
    }
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = selectedWalkman.tracks.findIndex(t => t.id === currentTrack.id);
    const nextTrack = selectedWalkman.tracks[currentIndex + 1] || selectedWalkman.tracks[0];
    handlePlay(nextTrack);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = selectedWalkman.tracks.findIndex(t => t.id === currentTrack.id);
    const prevTrack = selectedWalkman.tracks[currentIndex - 1] || selectedWalkman.tracks[selectedWalkman.tracks.length - 1];
    handlePlay(prevTrack);
  };

  const handleLike = (trackId: string) => {
    const newLikedTracks = new Set(likedTracks);
    if (likedTracks.has(trackId)) {
      newLikedTracks.delete(trackId);
    } else {
      newLikedTracks.add(trackId);
      earnFromLike();
    }
    setLikedTracks(newLikedTracks);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
            <h1 className="text-2xl font-bold text-amber-200">🎵 TUNOVA.IO</h1>
            <span className="text-amber-100/70">Walkmans Retro & Radio Pirata</span>
          </div>
          <Web3Wallet />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Walkman Selection */}
        <div className="lg:w-1/3 p-6 border-r border-amber-400/30">
          <h2 className="text-xl font-bold text-amber-200 mb-6">Selecciona tu Walkman</h2>
          <div className="space-y-4">
            {walkmans.map((walkman) => (
              <div
                key={walkman.id}
                onClick={() => setSelectedWalkman(walkman)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedWalkman.id === walkman.id
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-amber-400/30 bg-black/20 hover:border-amber-400/50'
                }`}
              >
                <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${walkman.color} mb-3 flex items-center justify-center`}>
                  <div className="text-4xl">📻</div>
                </div>
                <h3 className="font-bold text-amber-200">{walkman.name}</h3>
                <p className="text-sm text-amber-100/70">{walkman.collection}</p>
                <p className="text-xs text-amber-100/50">{walkman.tracks.length} tracks</p>
              </div>
            ))}
          </div>
        </div>

        {/* Player & Tracklist */}
        <div className="lg:w-2/3 p-6">
          {/* Current Walkman Info */}
          <div className="mb-6">
            <div className={`w-full h-48 rounded-lg bg-gradient-to-r ${selectedWalkman.color} mb-4 flex items-center justify-center relative overflow-hidden`}>
              <div className="text-8xl opacity-20 absolute">📻</div>
              <div className="text-center z-10">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">{selectedWalkman.name}</h2>
                <p className="text-white/80 drop-shadow">{selectedWalkman.collection}</p>
              </div>
            </div>
          </div>

          {/* Player Controls */}
          {currentTrack && (
            <div className="bg-black/30 rounded-lg p-6 mb-6 border border-amber-400/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-amber-200">{currentTrack.title}</h3>
                  <p className="text-amber-100/70">{currentTrack.artist}</p>
                </div>
                <Button
                  onClick={() => handleLike(currentTrack.id)}
                  variant="ghost"
                  size="sm"
                  className={likedTracks.has(currentTrack.id) ? 'text-red-400' : 'text-amber-200'}
                >
                  <Heart className={`w-5 h-5 ${likedTracks.has(currentTrack.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Button onClick={handlePrevious} variant="ghost" size="sm">
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => currentTrack && handlePlay(currentTrack)}
                  className="bg-amber-600 hover:bg-amber-700 text-black"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button onClick={handleNext} variant="ghost" size="sm">
                  <SkipForward className="w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-2 flex-1">
                  <Volume2 className="w-4 h-4" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      setVolume(newVolume);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-amber-200">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1 bg-amber-400/20 rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full transition-all"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Tracklist */}
          <div className="bg-black/20 rounded-lg border border-amber-400/30">
            <div className="p-4 border-b border-amber-400/30">
              <h3 className="font-bold text-amber-200">Lista de Reproducción</h3>
            </div>
            <div className="p-4 space-y-2">
              {selectedWalkman.tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => handlePlay(track)}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all ${
                    currentTrack?.id === track.id
                      ? 'bg-amber-400/20 border border-amber-400/50'
                      : 'hover:bg-amber-400/10'
                  }`}
                >
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-amber-200">{track.title}</div>
                    <div className="text-sm text-amber-100/70">{track.artist}</div>
                  </div>
                  <div className="text-sm text-amber-100/50">{track.duration}</div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(track.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className={likedTracks.has(track.id) ? 'text-red-400' : 'text-amber-200/50'}
                  >
                    <Heart className={`w-4 h-4 ${likedTracks.has(track.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />
    </div>
  );
}