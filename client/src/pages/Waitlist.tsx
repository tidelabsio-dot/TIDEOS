import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(1247);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> TIDE OS GENESIS v1.0.0',
    '> Initializing Nakama Recruitment System...',
    '> Loading One Piece Crew Database...',
    '> Ready for new recruits!',
    '',
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && username) {
      const newOutput = [
        ...terminalOutput,
        `$ recruit_nakama --email=${email} --username=${username}`,
        `✓ Nakama "${username}" added to crew!`,
        `✓ Position in waitlist: #${waitlistCount + 1}`,
        `✓ Welcome aboard, ${username}! 🏴‍☠️`,
        '',
      ];
      setTerminalOutput(newOutput);
      setWaitlistCount(waitlistCount + 1);
      setSubmitted(true);
      setEmail('');
      setUsername('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 overflow-hidden">
      {/* Efecto de escaneo CRT */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-10 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,0,.03) 0px, rgba(0,255,0,.03) 1px, transparent 1px, transparent 2px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 border-2 border-green-400 p-4 bg-black">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 animate-pulse">
              ╔═══════════════════════════════════╗
            </h1>
            <h1 className="text-4xl font-bold mb-2">
              TIDE OS GENESIS - NAKAMA RECRUITMENT
            </h1>
            <h1 className="text-4xl font-bold mb-4 animate-pulse">
              ╚═══════════════════════════════════╝
            </h1>
            <p className="text-green-300 text-lg mb-2">
              "Únete a la tripulación más épica del Web3"
            </p>
            <p className="text-yellow-400 text-sm">
              One Piece x Web3 | Genesis Collection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Terminal Principal */}
          <div className="lg:col-span-2">
            <Card className="bg-black border-2 border-green-400 rounded-none p-4">
              <div className="h-96 overflow-y-auto bg-black text-green-400 font-mono text-sm space-y-1">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap break-words">
                    {line}
                  </div>
                ))}
                {!submitted && (
                  <div className="animate-pulse">
                    <span className="text-yellow-400">_</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Panel de Reclutamiento */}
          <div className="lg:col-span-1">
            <Card className="bg-black border-2 border-green-400 rounded-none p-4 h-full">
              <div className="space-y-4">
                <div className="border-b border-green-400 pb-2">
                  <h2 className="text-lg font-bold text-yellow-400">CREW STATUS</h2>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Nakamas:</span>
                    <span className="text-yellow-400 font-bold">{waitlistCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Genesis Phase:</span>
                    <span className="text-red-400 font-bold">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Airdrop Ready:</span>
                    <span className="text-green-400 font-bold">100 $NAKAMAS</span>
                  </div>
                </div>

                <div className="border-t border-green-400 pt-2 mt-4">
                  <h3 className="text-sm font-bold text-cyan-400 mb-2">RECRUITMENT FORM</h3>
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                      <label className="text-xs text-green-300">Username:</label>
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="nakama_name"
                        className="bg-black border-green-400 text-green-400 font-mono text-xs h-8 placeholder-green-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-green-300">Email:</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-black border-green-400 text-green-400 font-mono text-xs h-8 placeholder-green-700"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-400 text-black font-bold hover:bg-yellow-400 rounded-none h-8 text-xs"
                    >
                      JOIN CREW
                    </Button>
                  </form>
                </div>

                <div className="border-t border-green-400 pt-2 mt-4 text-xs text-green-300">
                  <p className="mb-2">🏴‍☠️ Benefits:</p>
                  <ul className="space-y-1 text-green-400">
                    <li>✓ 100 $NAKAMAS Airdrop</li>
                    <li>✓ Genesis NFT Collection</li>
                    <li>✓ Early Access</li>
                    <li>✓ Exclusive Merch</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-4 border-2 border-green-400 p-4 bg-black text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">CREW MEMBERS</h4>
              <p className="text-green-300">Luffy, Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook, Jinbe</p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">GENESIS COLLECTION</h4>
              <p className="text-green-300">Limited to 10,000 Nakamas | Polygon Network | ERC-1155 Standard</p>
            </div>
          </div>
        </div>

        {/* Confetti effect on submit */}
        {submitted && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce"
                style={{
                  left: Math.random() * 100 + '%',
                  top: -10 + '%',
                  animation: `fall ${2 + Math.random() * 2}s linear`,
                }}
              >
                🏴‍☠️
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
