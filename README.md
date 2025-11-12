# 🏴‍☠️ TIDEOS GENESIS

El ecosistema Web3 definitivo para creadores, artistas y Nakamas. Donde la música, los NFTs y la comunidad se encuentran en una experiencia nostálgica única.

## 🌟 Características Principales

### 🎮 NAKAMA OS
Sistema operativo retro inspirado en One Piece con 14 aplicaciones integradas:
- **TUNOVA.IO**: Walkmans retro con casetes musicales
- **Genesis Mint**: Plataforma de mint de casetes NFT
- **La Taberna**: Chat estilo MSN para colaboraciones
- **Zona Recreativa**: Sitios nostálgicos y juegos retro
- **Billetera Web3**: Gestión de $Berries y $Nakamas
- **Marketplace**: Trading de NFTs
- **DAO**: Gobernanza comunitaria
- Y muchas más...

### 💰 Sistema de Tokens
- **$Berries**: Puntos de gamificación por actividades
- **$Nakamas**: Tokens de gobernanza y utilidad
- **Airdrop Genesis**: Distribución para early adopters
- **Staking**: Rewards por participación

### 🎵 Experiencia Musical
- **4 Walkmans Únicos**: VAH0M4N, NAKAMAS CREW, RAZA, AZAR
- **Casetes NFT**: Coleccionables con tracks exclusivos
- **Radio Pirata**: Streaming comunitario
- **Reproductor WMP**: Con skins nostálgicas

### 🌐 Web3 Nativo
- Integración con MetaMask
- Smart contracts en Polygon
- NFTs ERC-1155
- Crowdfunding descentralizado

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- pnpm
- MetaMask (para funcionalidades Web3)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tidelabsio-dot/TIDEOS.git
cd TIDEOS

# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Producción
pnpm build
pnpm start
```

### Con Docker

```bash
# Construir y ejecutar
docker-compose up --build

# Solo ejecutar
docker-compose up -d
```

## 🎯 Navegación

### Acceso Principal
- **URL**: `http://localhost:3000`
- **Konami Code**: ↑↑↓↓←→←→BA (acceso directo a NAKAMA OS)

### Rutas Principales
- `/` - Portal de entrada
- `/nakama-os` - Sistema operativo principal
- `/tunova` - Walkmans y música
- `/genesis-mint` - Mint de NFTs
- `/la-taberna` - Chat comunitario
- `/zona-recreativa` - Juegos nostálgicos

## 🛠️ API Endpoints

### Salud del Sistema
```
GET /api/health
```

### Usuarios
```
GET /api/user/:address
POST /api/user/:address/berries
```

### NFTs
```
GET /api/nfts
POST /api/nft/mint
```

### Estadísticas
```
GET /api/stats
GET /api/leaderboard
```

## 🎮 Cómo Ganar $Berries

### Actividades Recompensadas
- **Escuchar música**: 0.1 $Berries por minuto
- **Dar likes**: 1 $Berries por like
- **Votar en encuestas**: 2 $Berries por voto
- **Usar aplicaciones**: 5 $Berries por tarea
- **Explorar sitios**: 5 $Berries por visita
- **Participar en eventos**: 10-100 $Berries

### Bono de Bienvenida
- **Primera conexión**: 100 $Berries gratis
- **Airdrop Genesis**: 100 $Nakamas para early adopters

## 🏗️ Arquitectura Técnica

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Radix UI** para componentes
- **Wouter** para routing
- **Framer Motion** para animaciones

### Backend
- **Express.js** con TypeScript
- **CORS** habilitado
- **API RESTful**
- **Almacenamiento en memoria** (demo)

### Web3
- **MetaMask** integration
- **Polygon** blockchain
- **ERC-20** tokens ($Berries, $Nakamas)
- **ERC-1155** NFTs (casetes)

## 🎨 Colecciones NFT

### Genesis Collection
- **Rareza**: Legendaria
- **Supply**: 100 unidades
- **Precio**: 0.5 ETH
- **Tracks**: 4 exclusivos

### Pirate Collection
- **Rareza**: Épica
- **Supply**: 500 unidades
- **Precio**: 0.25 ETH
- **Tracks**: 3 temáticos

### Cyberpunk Collection
- **Rareza**: Rara
- **Supply**: 1000 unidades
- **Precio**: 0.1 ETH
- **Tracks**: 5 futuristas

### Nostalgic Collection
- **Rareza**: Común
- **Supply**: 2000 unidades
- **Precio**: 0.05 ETH
- **Tracks**: 3 retro

## 🌍 Deployment

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build
pnpm build

# Deploy carpeta dist/
```

### Docker
```bash
# Producción
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Variables de Entorno

```env
NODE_ENV=production
PORT=3000
POLYGON_RPC_URL=https://polygon-rpc.com
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=0x...
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📋 Roadmap

### ✅ Fase 1 - Fundamentos (Completado)
- [x] Sistema de puntos $Berries
- [x] Billetera Web3 integrada
- [x] NAKAMA OS con 14 apps
- [x] Walkmans retro funcionales
- [x] Chat La Taberna
- [x] Zona Recreativa

### 🚧 Fase 2 - Tokens (En Desarrollo)
- [x] Airdrop de $Nakamas
- [x] Sistema de mint NFT
- [ ] Smart contracts en testnet
- [ ] Marketplace funcional

### 📅 Fase 3 - Expansión
- [ ] Crowdfunding para videoclips
- [ ] DAO y gobernanza
- [ ] Staking de tokens
- [ ] Marketplace de servicios

### 🔮 Fase 4 - Escalabilidad
- [ ] Layer 2 integration
- [ ] Mobile app
- [ ] Metaverse integration
- [ ] AI-powered features

## 🏆 Logros y Badges

- **🏴‍☠️ Nakama**: Únete a la tripulación
- **🎵 Melómano**: Escucha 100 tracks
- **💎 Coleccionista**: Mintea tu primer NFT
- **🍺 Tabernero**: Envía 50 mensajes
- **🎮 Explorador**: Visita todos los sitios retro
- **👑 Rey Pirata**: Alcanza el top 10 del leaderboard

## 📞 Soporte

- **Discord**: [TIDEOS Community](https://discord.gg/tideos)
- **Twitter**: [@TIDEOSGenesis](https://twitter.com/TIDEOSGenesis)
- **Email**: support@tidelabs.io
- **Documentación**: [docs.tideos.io](https://docs.tideos.io)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- **One Piece** por la inspiración pirata
- **Comunidad Web3** por el apoyo
- **Desarrolladores** que contribuyen al ecosistema
- **Early Adopters** que creen en la visión

---

**¡Zarpa hacia la aventura Web3 más épica! 🏴‍☠️⚓**

*TIDEOS Genesis - Donde los sueños piratas se vuelven realidad digital*
