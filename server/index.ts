import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for demo (use database in production)
const userData = new Map();
const nftData = new Map();
const transactionData = new Map();

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // User data endpoints
  app.get('/api/user/:address', (req, res) => {
    const { address } = req.params;
    const user = userData.get(address) || {
      address,
      berriesBalance: 0,
      nakamasBalance: 0,
      nfts: [],
      transactions: [],
      createdAt: new Date().toISOString()
    };
    res.json(user);
  });

  app.post('/api/user/:address/berries', (req, res) => {
    const { address } = req.params;
    const { amount, reason } = req.body;
    
    const user = userData.get(address) || {
      address,
      berriesBalance: 0,
      nakamasBalance: 0,
      nfts: [],
      transactions: []
    };
    
    user.berriesBalance += amount;
    user.transactions.push({
      id: Date.now().toString(),
      type: 'berries_earned',
      amount,
      reason,
      timestamp: new Date().toISOString()
    });
    
    userData.set(address, user);
    res.json({ success: true, newBalance: user.berriesBalance });
  });

  // NFT endpoints
  app.get('/api/nfts', (_req, res) => {
    const nfts = Array.from(nftData.values());
    res.json(nfts);
  });

  app.post('/api/nft/mint', (req, res) => {
    const { userAddress, cassetteId, amount } = req.body;
    
    const nftId = `${cassetteId}-${Date.now()}`;
    const nft = {
      id: nftId,
      cassetteId,
      owner: userAddress,
      mintedAt: new Date().toISOString(),
      amount
    };
    
    nftData.set(nftId, nft);
    
    // Update user data
    const user = userData.get(userAddress) || { nfts: [] };
    user.nfts = user.nfts || [];
    user.nfts.push(nftId);
    userData.set(userAddress, user);
    
    res.json({ success: true, nft });
  });

  // Leaderboard endpoint
  app.get('/api/leaderboard', (_req, res) => {
    const users = Array.from(userData.values())
      .sort((a, b) => (b.berriesBalance || 0) - (a.berriesBalance || 0))
      .slice(0, 100)
      .map(user => ({
        address: user.address,
        berriesBalance: user.berriesBalance || 0,
        nakamasBalance: user.nakamasBalance || 0,
        nftCount: (user.nfts || []).length
      }));
    
    res.json(users);
  });

  // Stats endpoint
  app.get('/api/stats', (_req, res) => {
    const totalUsers = userData.size;
    const totalBerries = Array.from(userData.values())
      .reduce((sum, user) => sum + (user.berriesBalance || 0), 0);
    const totalNFTs = nftData.size;
    const totalTransactions = Array.from(userData.values())
      .reduce((sum, user) => sum + (user.transactions || []).length, 0);
    
    res.json({
      totalUsers,
      totalBerries,
      totalNFTs,
      totalTransactions,
      timestamp: new Date().toISOString()
    });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`🚀 TIDEOS Genesis Server running on http://localhost:${port}/`);
    console.log(`📡 API endpoints available at http://localhost:${port}/api/`);
  });
}

startServer().catch(console.error);
