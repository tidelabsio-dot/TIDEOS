#!/bin/bash

# Script de inicio para TIDE OS Genesis
# Este script inicia un servidor HTTP simple para servir los archivos estáticos

echo "🏴‍☠️ Iniciando TIDE OS Genesis..."
echo "📂 Sirviendo archivos desde: client/public"
echo "🌐 Puerto: 9000"
echo ""

cd "$(dirname "$0")"

# Crear el servidor Node.js si no existe
if [ ! -f "server.mjs" ]; then
    cat > server.mjs << 'EOF'
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 9000;
const PUBLIC_DIR = path.join(__dirname, 'client', 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Error del servidor: ' + err.code, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🏴‍☠️ TIDE OS Genesis está listo para zarpar!`);
});
EOF
fi

# Iniciar el servidor
node server.mjs
