// frontend/src/components/Message.tsx
import React from 'react';

interface MessageProps {
  sender: 'user' | 'ai';
  content: string;
}

const Message: React.FC<MessageProps> = ({ sender, content }) => (
  <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`px-4 py-2 rounded-lg max-w-xs ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
      {content}
    </div>
  </div>
);

export default Message;