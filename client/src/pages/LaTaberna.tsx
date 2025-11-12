import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Web3Wallet } from '@/components/Web3Wallet';
import { Send, Users, Hash } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  channel: string;
}

const channels = [
  { id: 'general', name: 'General', icon: '💬', description: 'Chat general de la comunidad' },
  { id: 'producciones', name: 'Producciones', icon: '🎵', description: 'Colaboraciones musicales' },
  { id: 'trading', name: 'Trading', icon: '💱', description: 'Intercambio de NFTs y tokens' },
  { id: 'desarrollo', name: 'Desarrollo', icon: '💻', description: 'Propuestas técnicas' },
  { id: 'eventos', name: 'Eventos', icon: '🎪', description: 'Anuncios de eventos' },
];

export default function LaTaberna() {
  const [, setLocation] = useLocation();
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState(['Luffy', 'Zoro', 'Nami', 'Sanji', 'Chopper', 'Robin', 'Franky', 'Brook', 'Jinbe']);

  useEffect(() => {
    // Simulate some initial messages
    const initialMessages: Message[] = [
      { id: '1', user: 'Luffy', content: '¡Hola Nakamas! ¿Listos para la aventura?', timestamp: new Date(Date.now() - 300000), channel: 'general' },
      { id: '2', user: 'Zoro', content: 'Siempre listo para entrenar', timestamp: new Date(Date.now() - 240000), channel: 'general' },
      { id: '3', user: 'Nami', content: '¿Alguien quiere colaborar en un nuevo track?', timestamp: new Date(Date.now() - 180000), channel: 'producciones' },
      { id: '4', user: 'Sanji', content: 'Tengo un casete NFT raro para intercambiar', timestamp: new Date(Date.now() - 120000), channel: 'trading' },
    ];
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: 'Tú',
      content: newMessage,
      timestamp: new Date(),
      channel: activeChannel,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const filteredMessages = messages.filter(msg => msg.channel === activeChannel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-amber-50">
      {/* Header */}
      <div className="bg-black/20 border-b border-amber-400/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setLocation('/')}
              className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
            >
              🏠 Inicio
            </Button>
            <h1 className="text-2xl font-bold text-amber-200">🍺 LA TABERNA</h1>
            <span className="text-amber-100/70">Chat & Colaboraciones Nakamas</span>
          </div>
          <Web3Wallet />
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 border-r border-amber-400/30 p-4">
          {/* Online Users */}
          <div className="mb-6">
            <h3 className="font-bold text-amber-200 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Nakamas Online ({onlineUsers.length})
            </h3>
            <div className="space-y-1">
              {onlineUsers.map(user => (
                <div key={user} className="flex items-center space-x-2 text-sm text-amber-100/70">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{user}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div>
            <h3 className="font-bold text-amber-200 mb-3 flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              Canales
            </h3>
            <div className="space-y-1">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full text-left p-2 rounded-lg transition-all ${
                    activeChannel === channel.id
                      ? 'bg-amber-400/20 text-amber-200 border border-amber-400/50'
                      : 'text-amber-100/70 hover:bg-amber-400/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{channel.icon}</span>
                    <span className="text-sm font-medium">{channel.name}</span>
                  </div>
                  <div className="text-xs text-amber-100/50 mt-1">
                    {channel.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Channel Header */}
          <div className="bg-black/10 border-b border-amber-400/30 p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{channels.find(c => c.id === activeChannel)?.icon}</span>
              <h2 className="text-xl font-bold text-amber-200">
                #{channels.find(c => c.id === activeChannel)?.name}
              </h2>
              <span className="text-amber-100/70">
                - {channels.find(c => c.id === activeChannel)?.description}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center text-amber-100/50 py-8">
                <div className="text-4xl mb-2">💬</div>
                <p>No hay mensajes en este canal aún.</p>
                <p className="text-sm">¡Sé el primero en escribir algo!</p>
              </div>
            ) : (
              filteredMessages.map(message => (
                <div key={message.id} className="flex space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {message.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-amber-200">{message.user}</span>
                      <span className="text-xs text-amber-100/50">
                        {message.timestamp.toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="text-amber-100">{message.content}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="bg-black/10 border-t border-amber-400/30 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Mensaje en #${channels.find(c => c.id === activeChannel)?.name}...`}
                className="flex-1 bg-black/20 border border-amber-400/30 rounded-lg px-4 py-2 text-amber-100 placeholder-amber-100/50 focus:outline-none focus:border-amber-400/50"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-amber-600 hover:bg-amber-700 text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-amber-100/50 mt-2">
              💡 Tip: Usa @ para mencionar a otros Nakamas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}