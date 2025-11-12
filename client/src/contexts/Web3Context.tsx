import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Web3ContextType {
  // Wallet connection
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  
  // Tokens
  berriesBalance: number;
  nakamasBalance: number;
  
  // Functions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addBerries: (amount: number, reason: string) => void;
  spendBerries: (amount: number, reason: string) => boolean;
  claimAirdrop: () => Promise<void>;
  
  // Transaction history
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'berries_earned' | 'berries_spent' | 'airdrop_claimed' | 'nft_minted';
  amount: number;
  reason: string;
  timestamp: Date;
  txHash?: string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [berriesBalance, setBerriesBalance] = useState(0);
  const [nakamasBalance, setNakamasBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('tideos_web3_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setBerriesBalance(data.berriesBalance || 0);
      setNakamasBalance(data.nakamasBalance || 0);
      setTransactions(data.transactions || []);
    }

    // Check if wallet was previously connected
    checkWalletConnection();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      berriesBalance,
      nakamasBalance,
      transactions,
    };
    localStorage.setItem('tideos_web3_data', JSON.stringify(dataToSave));
  }, [berriesBalance, nakamasBalance, transactions]);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainId, 16));
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Por favor instala MetaMask para conectar tu billetera');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));

        // Welcome bonus for new users
        const isNewUser = localStorage.getItem('tideos_welcome_bonus') === null;
        if (isNewUser) {
          addBerries(100, 'Bono de bienvenida - Primera conexión');
          localStorage.setItem('tideos_welcome_bonus', 'claimed');
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    setChainId(null);
  };

  const addBerries = (amount: number, reason: string) => {
    setBerriesBalance(prev => prev + amount);
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'berries_earned',
      amount,
      reason,
      timestamp: new Date(),
    };
    
    setTransactions(prev => [transaction, ...prev].slice(0, 100)); // Keep last 100 transactions
  };

  const spendBerries = (amount: number, reason: string): boolean => {
    if (berriesBalance >= amount) {
      setBerriesBalance(prev => prev - amount);
      
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'berries_spent',
        amount,
        reason,
        timestamp: new Date(),
      };
      
      setTransactions(prev => [transaction, ...prev].slice(0, 100));
      return true;
    }
    return false;
  };

  const claimAirdrop = async () => {
    // Simulate airdrop claim
    const airdropAmount = 100;
    setNakamasBalance(prev => prev + airdropAmount);
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'airdrop_claimed',
      amount: airdropAmount,
      reason: 'Airdrop Genesis - Early Adopter',
      timestamp: new Date(),
      txHash: '0x' + Math.random().toString(16).substr(2, 64), // Mock transaction hash
    };
    
    setTransactions(prev => [transaction, ...prev].slice(0, 100));
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(parseInt(chainId, 16));
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const value: Web3ContextType = {
    isConnected,
    account,
    chainId,
    berriesBalance,
    nakamasBalance,
    connectWallet,
    disconnectWallet,
    addBerries,
    spendBerries,
    claimAirdrop,
    transactions,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// Utility functions for earning berries
export const useBerriesEarning = () => {
  const { addBerries } = useWeb3();

  const earnFromListening = (minutes: number) => {
    const berries = Math.floor(minutes * 0.1);
    if (berries > 0) {
      addBerries(berries, `Escuchando música - ${minutes} minutos`);
    }
  };

  const earnFromLike = () => {
    addBerries(1, 'Like en canción');
  };

  const earnFromVote = () => {
    addBerries(2, 'Voto en encuesta Genesis Mint');
  };

  const earnFromTask = (taskName: string, difficulty: 'easy' | 'medium' | 'hard') => {
    const amounts = { easy: 5, medium: 25, hard: 50 };
    addBerries(amounts[difficulty], `Tarea completada: ${taskName}`);
  };

  return {
    earnFromListening,
    earnFromLike,
    earnFromVote,
    earnFromTask,
  };
};

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}