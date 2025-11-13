import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Users, Settings, X } from 'lucide-react';

interface Message {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Contact {
  id: string;
  username: string;
  status: 'online' | 'away' | 'offline';
  avatar: string;
  berries: number;
}

export default function LaTaberna() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      username: 'Luffy',
      avatar: '🏴‍☠️',
      message: '¡Bienvenido a La Taberna! 🍺',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: '2',
      username: 'Nami',
      avatar: '🧡',
      message: 'Este es el mejor lugar para conectar con la tripulación',
      timestamp: new Date(Date.now() - 240000),
      isOwn: false,
    },
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', username: 'Luffy', status: 'online', avatar: '🏴‍☠️', berries: 5000 },
    { id: '2', username: 'Zoro', status: 'online', avatar: '⚔️', berries: 3200 },
    { id: '3', username: 'Nami', status: 'online', avatar: '🧡', berries: 4100 },
    { id: '4', username: 'Sanji', status: 'away', avatar: '🚬', berries: 2800 },
    { id: '5', username: 'Chopper', status: 'offline', avatar: '🦌', berries: 1500 },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        username: 'You',
        avatar: '👤',
        message: newMessage,
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex">
      {/* MSN-style Window */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-400 to-blue-300 m-4 rounded-lg shadow-2xl overflow-hidden border-2 border-blue-600">
        
        {/* Title Bar - MSN Style */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 flex justify-between items-center text-white font-bold text-sm">
          <div className="flex items-center gap-2">
            <span>🍺</span>
            <span>La Taberna - TIDE OS Chat</span>
          </div>
          <div className="flex gap-2">
            <button className="hover:bg-blue-700 px-2 py-1 rounded">_</button>
            <button className="hover:bg-blue-700 px-2 py-1 rounded">□</button>
            <button className="hover:bg-red-500 px-2 py-1 rounded">✕</button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Contacts Panel - MSN Style */}
          <div className="w-64 bg-gradient-to-b from-blue-200 to-blue-100 border-r-2 border-blue-400 flex flex-col">
            {/* Contacts Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-3 font-bold text-sm border-b-2 border-blue-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>Nakamas Online</span>
                </div>
                <Settings size={16} className="cursor-pointer hover:bg-blue-600 rounded" />
              </div>
            </div>

            {/* Contacts List */}
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id
                        ? 'bg-blue-400 border-2 border-blue-600'
                        : 'hover:bg-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <span className="text-2xl">{contact.avatar}</span>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getStatusColor(contact.status)} border border-white`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-800 truncate">{contact.username}</p>
                        <p className="text-xs text-gray-600">{contact.berries} $Berries</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Status Selector */}
            <div className="border-t-2 border-blue-400 p-2 bg-blue-100">
              <select className="w-full p-1 text-xs bg-white border border-blue-400 rounded">
                <option>🟢 Online</option>
                <option>🟡 Away</option>
                <option>⚫ Offline</option>
              </select>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            {selectedContact && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-3 font-bold text-sm border-b-2 border-blue-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedContact.avatar}</span>
                  <div>
                    <p>{selectedContact.username}</p>
                    <p className="text-xs font-normal">
                      {selectedContact.status === 'online' ? '🟢 Online' : selectedContact.status === 'away' ? '🟡 Away' : '⚫ Offline'}
                    </p>
                  </div>
                </div>
                <button className="hover:bg-blue-600 px-2 py-1 rounded">✕</button>
              </div>
            )}

            {/* Messages */}
            <ScrollArea ref={scrollRef} className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-xs ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                      <div className="text-2xl flex-shrink-0">{msg.avatar}</div>
                      <div className={msg.isOwn ? 'text-right' : ''}>
                        <p className="text-xs font-bold text-gray-700">{msg.username}</p>
                        <div
                          className={`p-2 rounded-lg text-sm ${
                            msg.isOwn
                              ? 'bg-blue-400 text-white rounded-br-none'
                              : 'bg-gray-200 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          {msg.message}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t-2 border-blue-400 p-3 bg-blue-50">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 border-2 border-blue-400 rounded-none focus:outline-none focus:border-blue-600"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-none font-bold"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* MSN Messenger Aesthetic */
        @import url('https://fonts.googleapis.com/css2?family=MS+Trebuchet:wght@400;700&display=swap');
        
        * {
          font-family: 'Trebuchet MS', 'MS Trebuchet', sans-serif;
        }
      `}</style>
    </div>
  );
}
