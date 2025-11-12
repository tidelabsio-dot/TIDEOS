# 🏴‍☠️ TIDEOS GENESIS

**El ecosistema Web3 definitivo para creadores, artistas y Nakamas**

TIDEOS Genesis es una plataforma revolucionaria que combina la nostalgia de los años 90 con la tecnología Web3 más avanzada. Un universo digital donde la música, los NFTs y la comunidad se encuentran en perfecta armonía.

## 🌟 Características Principales

### 🏴‍☠️ NAKAMA OS
Sistema operativo pirata completo con 14 aplicaciones integradas:
- **💰 Billetera Web3** - Gestión de tokens $Berries y $Nakamas con MetaMask
- **🎵 TUNOVA.IO** - 4 Walkmans retro con reproductores funcionales
- **💎 Genesis Mint** - Plataforma de mint de casetes NFT con 4 colecciones
- **🍺 La Taberna** - Chat comunitario con 5 canales temáticos
- **🎮 Zona Recreativa** - 6 sitios nostálgicos y juegos retro
- **🏪 Marketplace** - Intercambio de NFTs y tokens
- **🎛️ Productor Musical** - Herramientas de creación
- **🏛️ Asamblea DAO** - Gobernanza descentralizada
- **📚 Biblioteca** - Recursos y documentación
- **🗂️ Organizador** - Gestión de proyectos
- **⚙️ Configuración** - Personalización del sistema
- **🏆 Logros** - Sistema de gamificación con $Berries
- **👥 Comunidad** - Red social de Nakamas
- **📢 Anuncios** - Noticias y actualizaciones

### 🎵 TUNOVA.IO - Walkmans Retro Realistas
Experiencia musical nostálgica con walkmans ultra-realistas:
- **4 Walkmans temáticos** con marcas clásicas (Sony, Aiwa, Panasonic, Toshiba)
- **Diseño 3D realista** con ventanas de casete, bobinas giratorias y controles funcionales
- **Reproductor integrado** con controles de play/pause/stop/volumen
- **Colecciones musicales** por walkman (Crypto, Pirate, Ocean, Genesis)
- **Animaciones fluidas** de bobinas y efectos de reproducción
- **Radio pirata comunitaria** con streams en vivo

### 💎 GENESIS MINT - Casetes NFT Ultra-Realistas
Plataforma de mint con casetes NFT hiper-detallados:
- **4 Colecciones exclusivas** con diferentes raridades y precios
- **Casetes 3D realistas** con etiquetas personalizadas, bobinas y agujeros
- **Sistema de raridades** visual: Legendario (oro), Épico (púrpura), Raro (azul), Común (gris)
- **Efectos hover** y animaciones de elevación
- **Progreso de mint** en tiempo real con barras de progreso
- **Sistema de votación** con likes/dislikes
- **Estados dinámicos** (disponible, agotado, próximamente)

### 🍺 LA TABERNA - Chat Comunitario
Chat estilo MSN nostálgico:
- **5 Canales temáticos** (General, Producciones, Trading, etc.)
- **Sistema de usuarios online** con avatares personalizados
- **Mensajería en tiempo real** con timestamps
- **Colaboraciones entre artistas** y intercambio de ideas
- **Integración Web3** para intercambio de NFTs

### 🎮 ZONA RECREATIVA - Nostalgia Digital
Portal a sitios web clásicos y juegos retro:
- **6 Sitios nostálgicos** integrados (EmuOS, Floor796, etc.)
- **Sistema de ratings** y estadísticas de visitas
- **Categorías temáticas** (Emulación, Exploración, Juegos)
- **Recompensas $Berries** por exploración
- **Interfaz retro** con efectos nostálgicos

## 🚀 Stack Tecnológico Completo

### Frontend Avanzado
- **React 18.2.0** - Framework principal con Hooks y Context
- **TypeScript 5.0+** - Tipado estático completo
- **Vite 4.4+** - Build tool ultra-rápido con HMR
- **Tailwind CSS 3.3+** - Utility-first CSS framework
- **Radix UI** - Componentes accesibles y primitivos
- **Framer Motion 10+** - Animaciones fluidas y transiciones
- **Lucide React** - Iconografía moderna y consistente
- **Wouter 2.12+** - Router ligero y performante

### Backend Robusto
- **Express.js 4.18+** - API REST con middleware personalizado
- **TypeScript** - Tipado completo en backend
- **CORS** - Configuración cross-origin segura
- **Helmet** - Seguridad HTTP headers
- **Morgan** - Logging de requests
- **Compression** - Compresión gzip

### Web3 Integration
- **MetaMask SDK** - Integración nativa de billetera
- **Ethereum Web3** - Interacción con blockchain
- **LocalStorage** - Persistencia offline de datos
- **Token Standards** - ERC-20 ($Berries, $Nakamas) y ERC-721 (NFTs)

### DevOps y Deployment
- **Docker 24+** - Containerización completa
- **Docker Compose** - Orquestación multi-servicio
- **Nginx** - Proxy reverso y load balancer
- **PM2** - Process manager para Node.js
- **GitHub Actions** - CI/CD automatizado

## 📦 Instalación y Desarrollo

### Prerrequisitos Técnicos
```bash
# Versiones requeridas
Node.js >= 18.0.0
npm >= 9.0.0 o pnpm >= 8.0.0
Docker >= 24.0.0 (opcional)
Git >= 2.40.0
```

### Instalación Rápida
```bash
# Clonar repositorio
git clone https://github.com/tidelabsio-dot/TIDEOS.git
cd TIDEOS

# Instalar dependencias (recomendado pnpm)
pnpm install
# o npm install

# Variables de entorno
cp .env.example .env.local

# Desarrollo frontend (puerto 5173)
pnpm dev

# Desarrollo backend (puerto 3001)
pnpm dev:server

# Desarrollo completo (ambos servicios)
pnpm dev:full
```

### Scripts Disponibles
```bash
# Desarrollo
pnpm dev              # Frontend Vite dev server
pnpm dev:server       # Backend Express server
pnpm dev:full         # Frontend + Backend concurrentemente

# Build
pnpm build            # Build optimizado para producción
pnpm build:server     # Compilar TypeScript backend
pnpm preview          # Preview del build local

# Testing
pnpm test             # Jest test suite
pnpm test:watch       # Tests en modo watch
pnpm test:coverage    # Coverage report

# Linting y formato
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier format
pnpm type-check       # TypeScript check

# Docker
pnpm docker:dev       # Docker development
pnpm docker:prod      # Docker production
pnpm docker:clean     # Limpiar containers
```

## 🌐 Deployment Completo

### Variables de Entorno Críticas
```env
# Frontend (.env.local)
VITE_API_URL=http://localhost:3001
VITE_ENVIRONMENT=development
VITE_WEB3_NETWORK=ethereum
VITE_METAMASK_REQUIRED=true
VITE_BERRIES_CONTRACT=0x...
VITE_NAKAMAS_CONTRACT=0x...

# Backend (.env)
PORT=3001
NODE_ENV=production
CORS_ORIGIN=http://localhost:5173,https://tideos.io
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgresql://user:pass@localhost:5432/tideos
REDIS_URL=redis://localhost:6379

# Web3 (.env)
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR-PROJECT-ID
PRIVATE_KEY=your-deployment-private-key
ETHERSCAN_API_KEY=your-etherscan-api-key
```

### Docker Production Setup
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=https://api.tideos.io
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=tideos
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Deployment Commands
```bash
# Producción con Docker
docker-compose -f docker-compose.prod.yml up --build -d

# Verificar servicios
docker-compose ps
docker-compose logs -f

# Deploy manual
pnpm build
pnpm start:server

# Con PM2
pm2 start ecosystem.config.js
pm2 monit
```

## 🔗 APIs y Integraciones Necesarias

### APIs Externas Requeridas
```javascript
// Web3 APIs
const WEB3_APIS = {
  ethereum: {
    mainnet: "https://mainnet.infura.io/v3/YOUR-PROJECT-ID",
    goerli: "https://goerli.infura.io/v3/YOUR-PROJECT-ID",
    polygon: "https://polygon-rpc.com"
  },
  nft: {
    opensea: "https://api.opensea.io/api/v1/",
    moralis: "https://deep-index.moralis.io/api/v2/",
    alchemy: "https://eth-mainnet.alchemyapi.io/v2/YOUR-API-KEY"
  }
};

// Music APIs
const MUSIC_APIS = {
  spotify: "https://api.spotify.com/v1/",
  soundcloud: "https://api.soundcloud.com/",
  youtube: "https://www.googleapis.com/youtube/v3/"
};

// Nostalgic Sites APIs
const RETRO_APIS = {
  emuos: "https://emupedia.net/beta/emuos/",
  floor796: "https://floor796.com/",
  internetarchive: "https://archive.org/wayback/"
};
```

### Smart Contracts Necesarios
```solidity
// Contratos a deployar
contracts/
├── BerryToken.sol          // Token ERC-20 $Berries
├── NakamaToken.sol         // Token ERC-20 $Nakamas  
├── CassetteNFT.sol         // NFTs ERC-721 Casetes
├── TideosMarketplace.sol   // Marketplace
├── TideosDAO.sol           // Governance DAO
└── StakingRewards.sol      // Staking y rewards
```

### Backend API Endpoints
```typescript
// API Routes implementadas
const API_ROUTES = {
  // Usuarios
  'GET /api/users/profile': 'Perfil usuario',
  'POST /api/users/register': 'Registro',
  'POST /api/users/login': 'Login',
  
  // NFTs
  'GET /api/nfts': 'Lista NFTs',
  'POST /api/nfts/mint': 'Mint NFT',
  'GET /api/nfts/:id': 'Detalle NFT',
  
  // Tokens
  'GET /api/tokens/balance': 'Balance tokens',
  'POST /api/tokens/transfer': 'Transferir tokens',
  'GET /api/tokens/history': 'Historial',
  
  // Música
  'GET /api/music/walkmans': 'Lista walkmans',
  'GET /api/music/tracks': 'Tracks disponibles',
  'POST /api/music/play': 'Reproducir track',
  
  // Chat
  'GET /api/chat/channels': 'Canales chat',
  'POST /api/chat/message': 'Enviar mensaje',
  'GET /api/chat/history': 'Historial chat',
  
  // Stats
  'GET /api/stats/general': 'Estadísticas generales',
  'GET /api/stats/leaderboard': 'Ranking usuarios'
};
```

## 💰 Recursos y Costos Estimados

### Infraestructura Cloud (AWS/GCP)
```yaml
# Costos mensuales estimados
Compute:
  - EC2 t3.medium (2 vCPU, 4GB RAM): $30/mes
  - Load Balancer: $20/mes
  - Auto Scaling: $10/mes

Storage:
  - S3 Bucket (100GB): $5/mes
  - EBS Volume (50GB SSD): $5/mes
  - CloudFront CDN: $15/mes

Database:
  - RDS PostgreSQL (db.t3.micro): $15/mes
  - ElastiCache Redis: $15/mes

Networking:
  - Data Transfer: $10/mes
  - Route 53 DNS: $1/mes

Total estimado: ~$126/mes
```

### APIs y Servicios Externos
```yaml
# Costos de APIs
Web3 Services:
  - Infura (100k requests/día): $50/mes
  - Alchemy (300k requests/mes): $49/mes
  - Moralis (25M requests): $69/mes

Music Services:
  - Spotify API: Gratis (rate limited)
  - SoundCloud API: $15/mes
  - YouTube API: Gratis (10k requests/día)

Monitoring:
  - Sentry Error Tracking: $26/mes
  - DataDog Monitoring: $15/mes
  - Uptime Robot: $7/mes

Total estimado: ~$231/mes
```

### Desarrollo y Herramientas
```yaml
# Herramientas necesarias
Development:
  - GitHub Pro: $4/mes
  - Vercel Pro: $20/mes
  - Figma Professional: $12/mes

Security:
  - SSL Certificate: Gratis (Let's Encrypt)
  - Security Audit: $500 (una vez)
  - Penetration Testing: $1000 (una vez)

Marketing:
  - Domain (.io): $35/año
  - Email Service (SendGrid): $15/mes
  - Analytics (Mixpanel): $25/mes

Total mensual: ~$76/mes
Total inicial: ~$1500
```

## 🎯 Roadmap Detallado

### Fase 1: Genesis Launch ✅ (Completado)
- [x] **Interfaz completa NAKAMA OS** con 14 aplicaciones
- [x] **Sistema Web3 básico** con MetaMask integration
- [x] **TUNOVA.IO** con 4 walkmans ultra-realistas
- [x] **Genesis Mint** con casetes NFT hiper-detallados
- [x] **La Taberna** chat comunitario funcional
- [x] **Zona Recreativa** con sitios nostálgicos
- [x] **Sistema $Berries** con gamificación
- [x] **Docker deployment** completo
- [x] **API backend** con todos los endpoints

### Fase 2: Web3 Integration 🚧 (En Desarrollo)
- [ ] **Smart contracts deployment** en Ethereum mainnet
- [ ] **Mint real de NFTs** con metadata IPFS
- [ ] **Token $Berries** ERC-20 en blockchain
- [ ] **Token $Nakamas** governance token
- [ ] **Staking y rewards** automáticos
- [ ] **Marketplace descentralizado** con royalties
- [ ] **Integración IPFS** para assets NFT
- [ ] **Multi-wallet support** (WalletConnect, Coinbase)

### Fase 3: Community Features 📋 (Q1 2024)
- [ ] **DAO governance** completa con propuestas
- [ ] **Voting system** on-chain para decisiones
- [ ] **Colaboraciones P2P** entre artistas
- [ ] **Sistema de reputación** basado en actividad
- [ ] **Eventos comunitarios** con rewards especiales
- [ ] **Referral program** con incentivos
- [ ] **Creator monetization** tools
- [ ] **Social features** avanzadas

### Fase 4: Advanced Features 🔮 (Q2-Q3 2024)
- [ ] **Metaverso 3D** con Three.js/WebGL
- [ ] **VR/AR integration** para experiencias inmersivas
- [ ] **AI music generation** con modelos propios
- [ ] **Cross-chain support** (Polygon, BSC, Solana)
- [ ] **Mobile app** React Native
- [ ] **Desktop app** con Electron
- [ ] **Advanced analytics** y machine learning
- [ ] **Enterprise solutions** para labels musicales

## 🛡️ Seguridad y Auditorías

### Medidas de Seguridad Implementadas
```typescript
// Seguridad Frontend
const SECURITY_MEASURES = {
  csp: "Content Security Policy headers",
  xss: "XSS protection con DOMPurify",
  csrf: "CSRF tokens en formularios",
  https: "HTTPS obligatorio en producción",
  wallet: "Validación de firmas Web3"
};

// Seguridad Backend
const BACKEND_SECURITY = {
  helmet: "Security headers automáticos",
  rateLimit: "Rate limiting por IP",
  cors: "CORS configurado específicamente",
  jwt: "JWT tokens con expiración",
  validation: "Input validation con Joi"
};
```

### Auditorías Requeridas
- **Smart Contract Audit** - CertiK o ConsenSys Diligence ($5k-15k)
- **Security Penetration Test** - Profesional ($1k-3k)
- **Code Review** - Senior developers ($500-1k)
- **Infrastructure Audit** - DevSecOps expert ($1k-2k)

## 🤝 Contribuir al Proyecto

### Guía de Contribución
```bash
# Setup desarrollo
git clone https://github.com/tidelabsio-dot/TIDEOS.git
cd TIDEOS
pnpm install
pnpm dev:full

# Crear feature branch
git checkout -b feature/amazing-feature

# Commit con conventional commits
git commit -m "feat: add amazing feature"

# Push y crear PR
git push origin feature/amazing-feature
```

### Estándares de Código
- **ESLint + Prettier** configurados
- **Conventional Commits** obligatorios
- **TypeScript strict mode** activado
- **Test coverage** mínimo 80%
- **Code review** requerido para merge

## 📄 Licencia y Legal

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para detalles completos.

### Términos Importantes
- ✅ Uso comercial permitido
- ✅ Modificación permitida
- ✅ Distribución permitida
- ✅ Uso privado permitido
- ❌ Sin garantía
- ❌ Sin responsabilidad del autor

## 🏴‍☠️ Equipo TIDEOS

### Core Team
- **🏴‍☠️ Capitán** - Arquitectura y desarrollo full-stack
- **🗺️ Navegante** - UI/UX design y experiencia usuario
- **👨‍🍳 Cocinero** - Backend APIs y infraestructura
- **👨‍⚕️ Médico** - Testing, QA y debugging
- **📚 Arqueólogo** - Documentación técnica
- **🎵 Músico** - Audio engineering y UX sonora
- **⚓ Timonel** - DevOps, deployment y monitoring

### Colaboradores
- **Web3 Developers** - Smart contracts y DeFi
- **Frontend Specialists** - React y TypeScript
- **Backend Engineers** - Node.js y databases
- **UI/UX Designers** - Figma y design systems
- **Community Managers** - Discord y redes sociales

## 🌊 Únete a la Tripulación

### Enlaces Oficiales
- **🌐 Website**: [tidelabs.io](https://tidelabs.io)
- **💬 Discord**: [Únete a la tripulación](https://discord.gg/tideos)
- **🐦 Twitter**: [@TideLabs_io](https://twitter.com/TideLabs_io)
- **📱 Telegram**: [t.me/tideos](https://t.me/tideos)
- **📧 Email**: hello@tidelabs.io
- **🐙 GitHub**: [tidelabsio-dot](https://github.com/tidelabsio-dot)

### Comunidad
- **👥 Nakamas activos**: 2,500+
- **🏴‍☠️ Países**: 45+
- **🎵 Artistas**: 150+
- **💎 NFTs minteados**: 1,558+
- **🍓 $Berries en circulación**: 2.5M+

---

## 🚀 Quick Start

```bash
# Instalación rápida
git clone https://github.com/tidelabsio-dot/TIDEOS.git
cd TIDEOS && pnpm install && pnpm dev:full

# Acceder a la aplicación
open http://localhost:5173

# Código Konami para acceso directo a NAKAMA OS
# ↑↑↓↓←→←→BA
```

---

*"En el vasto océano digital, solo los verdaderos Nakamas encuentran el One Piece de la Web3"* 🏴‍☠️

**TIDEOS Genesis v1.0.0** - *Ready for Launch* 🚀