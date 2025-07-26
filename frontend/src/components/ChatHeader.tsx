import React from 'react';
import { MessageCircle, Circle } from 'lucide-react';

interface ChatHeaderProps {
  isConnected: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isConnected }) => {
  return (
    <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-t-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-white/20">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">StyleBot Assistant</h1>
            <p className="text-sm text-blue-100">Your E-commerce Support Helper</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Circle 
            className={`h-3 w-3 ${isConnected ? 'text-green-400 fill-current' : 'text-red-400 fill-current'}`} 
          />
          <span className="text-sm">
            {isConnected ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};