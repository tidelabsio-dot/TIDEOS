import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioData: number;
  isPlaying: boolean;
}

export default function AudioVisualizer({ audioData, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    if (!isPlaying) return;

    // Crear gradiente de fondo
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    gradient.addColorStop(0, `rgba(255, 215, 0, ${audioData / 512})`);
    gradient.addColorStop(0.5, `rgba(255, 107, 53, ${audioData / 768})`);
    gradient.addColorStop(1, "rgba(0, 188, 212, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Dibujar círculos pulsantes
    const numCircles = 5;
    for (let i = 0; i < numCircles; i++) {
      const radius = (audioData / 255) * 50 + i * 30;
      const opacity = 0.3 - i * 0.05;

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [audioData, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
