import { Play, Pause, SkipBack, SkipForward, Volume2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface WalkmanProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  volume: number;
  onVolumeChange: (value: number[]) => void;
  cassetteTitle: string;
  cassetteColor: string;
  audioData: number;
}

export default function Walkman({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  volume,
  onVolumeChange,
  cassetteTitle,
  cassetteColor,
  audioData,
}: WalkmanProps) {
  const intensity = Math.min(audioData / 255, 1);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Cuerpo del walkman estilo TUNOVA */}
      <div className="relative bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-2xl p-6 shadow-2xl border-4 border-gray-500">
        
        {/* Panel superior negro con logo TUNOVA */}
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-4 mb-4 shadow-inner">
          <div className="flex justify-between items-center">
            <div 
              className="text-3xl font-bold tracking-wider"
              style={{ 
                fontFamily: "'Arial Black', sans-serif",
                color: '#d4d4d4',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              TUNOVA
            </div>
            <div className="flex gap-4">
              <div className="text-xs text-gray-400 text-right">
                <div className="font-bold">VOLUME</div>
                <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 mt-1"></div>
              </div>
              <div className="text-xs text-gray-400 text-right">
                <div className="font-bold">TONE</div>
                <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 mt-1"></div>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">• PHONES</div>
        </div>

        {/* Etiqueta "STEREO CASSETTE PLAYER" */}
        <div className="bg-gray-300 rounded-t-lg px-4 py-2 text-center border-b-2 border-gray-400">
          <div 
            className="text-sm font-bold tracking-widest"
            style={{ 
              fontFamily: "'Arial', sans-serif",
              color: '#2a2a2a',
              letterSpacing: '0.15em'
            }}
          >
            STEREO CASSETTE PLAYER
          </div>
        </div>

        {/* Ventana del casete con efecto transparente */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 mb-4 shadow-inner border-4 border-gray-400 relative overflow-hidden">
          {/* Efecto de reflexión de vidrio */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none"></div>
          
          {/* Casete transparente */}
          <div 
            className="relative rounded-md p-4 backdrop-blur-sm border-2 border-gray-400/30"
            style={{ 
              background: `linear-gradient(135deg, ${cassetteColor}15, ${cassetteColor}25, ${cassetteColor}15)`,
              boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
              transform: `scale(${1 + intensity * 0.01})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Etiqueta del casete con líneas */}
            <div className="bg-amber-50 rounded-sm p-3 mb-3 shadow-md border border-amber-200">
              <div className="border-b border-orange-300 mb-1"></div>
              <div 
                className="text-center text-xl md:text-2xl my-2"
                style={{ 
                  fontFamily: "'Permanent Marker', cursive",
                  color: '#1a1a1a',
                  transform: 'rotate(-0.5deg)',
                  textShadow: '1px 1px 0px rgba(0,0,0,0.1)'
                }}
              >
                {cassetteTitle}
              </div>
              <div className="border-b border-orange-300 mt-1"></div>
              <div className="mt-2 flex justify-between text-xs" style={{ fontFamily: "'Caveat', cursive", fontSize: '11px', color: '#666' }}>
                <span>Side A</span>
                <span>C-90</span>
              </div>
            </div>

            {/* Ventana transparente con carretes */}
            <div className="bg-black/10 backdrop-blur-sm rounded-md p-4 border border-white/20">
              <div className="flex justify-between items-center">
                {/* Carrete izquierdo con detalles realistas */}
                <div className="relative">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border-2 border-gray-500 flex items-center justify-center shadow-lg"
                    style={{
                      animation: isPlaying ? 'spin 2s linear infinite' : 'none'
                    }}
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-inner">
                      <div className="w-4 h-4 rounded-full bg-gray-900 border border-gray-700"></div>
                    </div>
                    {/* Dientes del carrete */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-5 bg-gray-600 rounded-sm"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-18px)`,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Cinta magnética con brillo */}
                <div className="flex-1 mx-3 relative">
                  <div className="h-1 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 rounded-full shadow-md relative overflow-hidden">
                    {isPlaying && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent"
                        style={{
                          animation: 'slide 1s linear infinite',
                        }}
                      />
                    )}
                  </div>
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-800 to-transparent mt-1 opacity-60"></div>
                </div>

                {/* Carrete derecho */}
                <div className="relative">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border-2 border-gray-500 flex items-center justify-center shadow-lg"
                    style={{
                      animation: isPlaying ? 'spin 2s linear infinite' : 'none'
                    }}
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-inner">
                      <div className="w-4 h-4 rounded-full bg-gray-900 border border-gray-700"></div>
                    </div>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-5 bg-gray-600 rounded-sm"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-18px)`,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tornillos del casete */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner"></div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner"></div>
          </div>
        </div>

        {/* Panel de botones físicos estilo retro */}
        <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg p-4 shadow-inner border-2 border-gray-400">
          <div className="flex justify-center items-center gap-2 mb-4">
            {/* Botón Play */}
            <button
              onClick={onPlayPause}
              className="w-16 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-md shadow-lg border-2 border-gray-600 flex items-center justify-center hover:from-gray-600 hover:to-gray-800 active:shadow-inner transition-all"
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)' }}
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 text-gray-300" fill="currentColor" />
              ) : (
                <Play className="h-7 w-7 text-gray-300" fill="currentColor" />
              )}
            </button>

            {/* Botón Pause/Stop */}
            <button
              onClick={onPlayPause}
              className="w-16 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-md shadow-lg border-2 border-gray-600 flex items-center justify-center hover:from-gray-600 hover:to-gray-800 active:shadow-inner transition-all"
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)' }}
            >
              <Square className="h-6 w-6 text-gray-300" fill="currentColor" />
            </button>

            {/* Botón Fast Forward */}
            <button
              onClick={onNext}
              className="w-16 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-md shadow-lg border-2 border-gray-600 flex items-center justify-center hover:from-gray-600 hover:to-gray-800 active:shadow-inner transition-all"
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)' }}
            >
              <SkipForward className="h-7 w-7 text-gray-300" fill="currentColor" />
            </button>

            {/* Botón Rewind */}
            <button
              onClick={onPrevious}
              className="w-16 h-16 bg-gradient-to-b from-gray-700 to-gray-900 rounded-md shadow-lg border-2 border-gray-600 flex items-center justify-center hover:from-gray-600 hover:to-gray-800 active:shadow-inner transition-all"
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)' }}
            >
              <SkipBack className="h-7 w-7 text-gray-300" fill="currentColor" />
            </button>
          </div>

          {/* Control de volumen */}
          <div className="bg-gray-100 rounded-lg p-3 shadow-inner border border-gray-300">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-gray-700" />
              <Slider
                value={[volume]}
                onValueChange={onVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-gray-700 text-sm font-mono font-bold w-12 text-right">
                {volume}%
              </span>
            </div>
          </div>
        </div>

        {/* Tornillos decorativos del walkman */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-md">
          <div className="w-full h-full rounded-full border border-gray-600 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-md">
          <div className="w-full h-full rounded-full border border-gray-600 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-md">
          <div className="w-full h-full rounded-full border border-gray-600 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-md">
          <div className="w-full h-full rounded-full border border-gray-600 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Clip para cinturón metálico */}
      <div className="mx-auto w-32 h-6 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 rounded-b-xl shadow-xl border-x-4 border-gray-500 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slide {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
