import { useEffect, useRef, useState } from "react";

export function useAudioAnalyzer(audioElement: HTMLAudioElement | null) {
  const [audioData, setAudioData] = useState<number>(0);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!audioElement) return;

    // Crear contexto de audio y analizador
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Conectar el elemento de audio al analizador
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    analyzerRef.current = analyzer;
    dataArrayRef.current = dataArray;

    // Función para analizar el audio en cada frame
    const analyze = () => {
      if (!analyzerRef.current || !dataArrayRef.current) return;

      analyzerRef.current.getByteFrequencyData(dataArrayRef.current);

      // Calcular el promedio de las frecuencias
      const average = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length;
      setAudioData(average);

      animationFrameRef.current = requestAnimationFrame(analyze);
    };

    analyze();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioContext.close();
    };
  }, [audioElement]);

  return audioData;
}
