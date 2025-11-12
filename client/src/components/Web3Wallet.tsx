import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWeb3 } from '@/contexts/Web3Context';
import { Wallet, Coins, Gift, History, ExternalLink } from 'lucide-react';

export const Web3Wallet: React.FC = () => {
  const {
    isConnected,
    account,
    berriesBalance,
    nakamasBalance,
    connectWallet,
    disconnectWallet,
    claimAirdrop,
    transactions,
  } = useWeb3();

  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'berries_earned':
        return '🍓';
      case 'berries_spent':
        return '💸';
      case 'airdrop_claimed':
        return '🎁';
      case 'nft_minted':
        return '💎';
      default:
        return '📝';
    }
  };

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Conectar Billetera
      </Button>
    );
  }

  return (
    <Dialog open={isWalletOpen} onOpenChange={setIsWalletOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black/20 border-amber-400/50 text-amber-100 hover:bg-amber-400/10"
        >
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 font-bold">{berriesBalance} 🍓</span>
                <span className="text-purple-400 font-bold">{nakamasBalance} 👥</span>
              </div>
              <span className="text-xs opacity-70">{formatAddress(account!)}</span>
            </div>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-slate-900 border-amber-400/30 text-amber-50">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-amber-200">
            <Wallet className="w-5 h-5" />
            <span>Billetera TIDEOS</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Account Info */}
          <div className="bg-black/20 p-4 rounded-lg border border-amber-400/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-amber-200">Cuenta conectada:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnectWallet}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                Desconectar
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <code className="text-xs bg-black/30 px-2 py-1 rounded">{account}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(`https://polygonscan.com/address/${account}`, '_blank')}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Balances */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 p-4 rounded-lg border border-yellow-400/30">
              <div className="flex items-center space-x-2 mb-2">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-200">$Berries</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{berriesBalance}</div>
              <div className="text-xs text-yellow-200/70">Puntos de gamificación</div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-4 rounded-lg border border-purple-400/30">
              <div className="flex items-center space-x-2 mb-2">
                <Gift className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-200">$Nakamas</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{nakamasBalance}</div>
              <div className="text-xs text-purple-200/70">Tokens de gobernanza</div>
            </div>
          </div>

          {/* Airdrop Section */}
          <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 p-4 rounded-lg border border-green-400/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-200">Airdrop Genesis</h3>
                <p className="text-xs text-green-200/70">Reclama tus tokens de early adopter</p>
              </div>
              <Button
                onClick={claimAirdrop}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Gift className="w-4 h-4 mr-1" />
                Reclamar
              </Button>
            </div>
          </div>

          <Separator className="bg-amber-400/30" />

          {/* Transaction History */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <History className="w-4 h-4 text-amber-400" />
              <h3 className="font-semibold text-amber-200">Historial</h3>
            </div>

            <ScrollArea className="h-48">
              <div className="space-y-2">
                {transactions.length === 0 ? (
                  <p className="text-sm text-amber-200/50 text-center py-4">
                    No hay transacciones aún
                  </p>
                ) : (
                  transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-2 bg-black/20 rounded border border-amber-400/20"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getTransactionIcon(tx.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-amber-100">
                            {tx.type === 'berries_earned' ? '+' : tx.type === 'berries_spent' ? '-' : ''}
                            {tx.amount} {tx.type.includes('berries') ? '🍓' : '👥'}
                          </div>
                          <div className="text-xs text-amber-200/70">{tx.reason}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-amber-200/50">
                          {formatDate(tx.timestamp)}
                        </div>
                        {tx.txHash && (
                          <Badge variant="outline" className="text-xs">
                            <ExternalLink className="w-2 h-2 mr-1" />
                            TX
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-400/50 text-amber-200 hover:bg-amber-400/10"
              onClick={() => window.open('https://app.uniswap.org', '_blank')}
            >
              💱 Intercambiar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-400/50 text-amber-200 hover:bg-amber-400/10"
              onClick={() => setIsWalletOpen(false)}
            >
              📊 Staking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};