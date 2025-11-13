# 🏴‍☠️ TIDE OS Genesis - El Galeón Digital

**Sistema Operativo Web Retro-Futurista con Navegación Web3**

---

## 📋 Descripción

TIDE OS Genesis es un ecosistema digital completo que incluye:

- **🏴‍☠️ NAKAMA OS**: Sistema operativo pirata completo con escritorio funcional, 14 aplicaciones integradas, sistema de puntos ($Berries), chat, retrospectivas y personalización
- **💎 GENESIS MINT**: Plataforma de minteo de NFTs de casetes limitados con royalties compartidos y sistema de votación para videoclips
- **📻 TUNOVA.IO**: Plataforma musical Web3 con radio pirata, walkmans digitales y sistema de likes para financiamiento de contenido

---

## 🚀 Características Principales

### NAKAMA OS
- **Escritorio funcional** con iconos animados y barra de tareas
- **14 aplicaciones integradas** temáticas de One Piece
- **Sistema de puntos** ($Berries) basado en productividad
- **Bitácora de Capitán** para retrospectivas ágiles
- **La Taberna** (sistema de chat con salas temáticas)
- **Cofre del Tesoro** (gestor de archivos)
- **NAKAMA.DAO** (votación descentralizada)
- **Flota Aliada** (ecosistema de aplicaciones)
- **Taller de personalización** (fondos y cursores)
- **Konami Code** para easter egg especial

### GENESIS MINT
- **3 colecciones de NFTs** de casetes limitados
- **Royalties compartidos** para los minters
- **Sistema de votación** para financiar videoclips
- **Diseño cyberpunk** con bordes neón
- **Integración Web3** para minteo

### TUNOVA.IO
- **Walkmans digitales** con diseño retro-futurista
- **Radio Pirata** integrada
- **Sistema de likes** para tracks
- **Top 10 de tracks** más votados
- **Financiamiento comunitario** para videoclips

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19, Vite
- **Estilos**: CSS personalizado con diseño retro-futurista
- **Servidor**: Node.js (servidor HTTP estático)
- **Arquitectura**: SPA (Single Page Application) con múltiples páginas HTML

---

## 📦 Estructura del Proyecto

```
tide-os-genesis/
├── client/
│   └── public/
│       ├── index.html                      # Portal de entrada
│       ├── nakama-os.html                  # Sistema operativo pirata
│       ├── genesis_mint_platform.html      # Plataforma de minteo NFT
│       ├── tunova_con_radio_pirata.html    # Plataforma musical
│       └── assets/                         # Archivos JS, CSS, imágenes
├── server.mjs                              # Servidor Node.js
├── start-server.sh                         # Script de inicio
├── todo.md                                 # Lista de tareas del proyecto
└── README.md                               # Este archivo
```

---

## 🎮 Uso

### Iniciar el servidor

```bash
cd /home/ubuntu/tide-os-genesis
./start-server.sh
```

El servidor se iniciará en el puerto **9000**.

### Acceder al sitio web

Abre tu navegador y visita:
```
http://localhost:9000
```

O en el entorno de desarrollo de Manus:
```
https://9000-[tu-sandbox-id].manusvm.computer
```

---

## 🎨 Diseño

El proyecto utiliza un estilo **retro-futurista** con las siguientes características:

- **Colores**: Paleta de dorados, marrones, azules oscuros, verdes neón y rosas
- **Tipografía**: Courier New (monospace) para efecto retro
- **Efectos**: Resplandores, sombras, animaciones de estrellas
- **Temática**: Piratas + Web3 + Cyberpunk + One Piece

---

## 🏴‍☠️ Easter Eggs

- **Konami Code**: Presiona la secuencia ↑ ↑ ↓ ↓ ← → ← → B A en la página de inicio para activar un easter egg especial

---

## 📝 Notas Técnicas

### Problema Resuelto

El build original de React no se inicializaba correctamente debido a problemas con la configuración de Vite y las dependencias de Supabase. La solución implementada fue:

1. Mantener las páginas HTML funcionales (nakama-os, genesis_mint_platform, tunova_con_radio_pirata)
2. Crear una página de inicio personalizada como portal de navegación
3. Servir todos los archivos estáticos mediante un servidor Node.js simple con tipos MIME correctos

### Servidor

El servidor Node.js (`server.mjs`) está configurado para:
- Servir archivos estáticos desde `client/public`
- Manejar correctamente los tipos MIME para módulos ES
- Responder con 404 para archivos no encontrados
- Escuchar en todas las interfaces de red (0.0.0.0)

---

## 🤝 Créditos

- **Desarrollado por**: TIDElabs
- **Powered by**: Manus AI 🤖
- **Temática**: One Piece (Eiichiro Oda)
- **Concepto**: Sistema operativo web pirata con integración Web3

---

## 📄 Licencia

Este proyecto es parte del ecosistema TIDE OS Genesis.

---

## 🚢 ¡Zarpa hacia la Aventura!

**¡Bienvenido a bordo del Galeón Digital!** 🏴‍☠️⚓

*"El tesoro más grande no es el oro, sino la libertad de navegar por los mares digitales."*
