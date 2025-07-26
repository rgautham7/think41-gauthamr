import React from 'react';
import Message from './Message';
import { useChat } from './ChatContext';

const MessageList: React.FC = () => {
  const { conversations, currentConversationId } = useChat();
  const current = conversations.find(c => c.id === currentConversationId);

  return (
    <div className="p-4 space-y-2">
      {current?.messages.map(msg => (
        <Message key={msg.id} sender={msg.sender} content={msg.content} />
      ))}
    </div>
  );
};

export default MessageList;