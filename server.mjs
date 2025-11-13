import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
};

const PORT = 9000;
const PUBLIC_DIR = join(__dirname, 'client', 'public');

const server = createServer(async (req, res) => {
  try {
    let filePath = join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Intentar servir el archivo
    try {
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        filePath = join(filePath, 'index.html');
      }
    } catch (err) {
      // Si no existe, intentar con index.html para SPA routing
      if (req.url.indexOf('.') === -1) {
        filePath = join(PUBLIC_DIR, 'index.html');
      }
    }

    const content = await readFile(filePath);
    const ext = extname(filePath);
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(content);
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - 200 (${mimeType})`);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - 404`);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Serving files from: ${PUBLIC_DIR}`);
});
