import { useEffect, useRef } from "react";

interface CassetteProps {
  title: string;
  color: string;
  isPlaying: boolean;
  audioData?: number;
}

export default function Cassette({ title, color, isPlaying, audioData = 0 }: CassetteProps) {
  const leftReelRef = useRef<HTMLDivElement>(null);
  const rightReelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying) {
      leftReelRef.current?.classList.add("animate-spin-slow");
      rightReelRef.current?.classList.add("animate-spin-slow");
    } else {
      leftReelRef.current?.classList.remove("animate-spin-slow");
      rightReelRef.current?.classList.remove("animate-spin-slow");
    }
  }, [isPlaying]);

  const intensity = Math.min(audioData / 255, 1);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Casete principal */}
      <div 
        className="relative rounded-lg p-6 shadow-2xl"
        style={{ 
          backgroundColor: color,
          transform: `scale(${1 + intensity * 0.02})`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Etiqueta superior */}
        <div className="bg-amber-50 rounded-sm p-4 mb-4 shadow-inner">
          <div 
            className="text-center text-2xl md:text-3xl"
            style={{ 
              fontFamily: "'Permanent Marker', cursive",
              color: '#1a1a1a',
              transform: 'rotate(-1deg)',
              textShadow: '1px 1px 0px rgba(0,0,0,0.1)'
            }}
          >
            {title}
          </div>
          <div className="mt-2 flex justify-between text-xs" style={{ fontFamily: "'Caveat', cursive", fontSize: '14px' }}>
            <span>Side A</span>
            <span>C-90</span>
          </div>
        </div>

        {/* Ventana transparente con carretes */}
        <div className="bg-black/20 rounded-md p-4 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            {/* Carrete izquierdo */}
            <div className="relative">
              <div 
                ref={leftReelRef}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center"
                style={{
                  animation: isPlaying ? 'spin 2s linear infinite' : 'none'
                }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-900 flex items-center justify-center">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-800"></div>
                </div>
                {/* Dientes del carrete */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-6 bg-gray-700"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Cinta magnética */}
            <div className="flex-1 mx-2 h-1 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 relative overflow-hidden">
              {isPlaying && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600 to-transparent"
                  style={{
                    animation: 'slide 1s linear infinite',
                  }}
                />
              )}
            </div>

            {/* Carrete derecho */}
            <div className="relative">
              <div 
                ref={rightReelRef}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center"
                style={{
                  animation: isPlaying ? 'spin 2s linear infinite' : 'none'
                }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-900 flex items-center justify-center">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-800"></div>
                </div>
                {/* Dientes del carrete */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-6 bg-gray-700"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tornillos decorativos */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gray-400 shadow-inner"></div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-400 shadow-inner"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gray-400 shadow-inner"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-400 shadow-inner"></div>
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
