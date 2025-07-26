import React from 'react';
import { useChat } from './ChatContext';

const ConversationHistoryPanel: React.FC = () => {
  const { conversations, currentConversationId, setCurrentConversationId, startNewConversation } = useChat();

  return (
    <div className="flex flex-col p-4 w-56 bg-gray-100 border-r">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Conversations</h2>
        <button
          className="px-2 py-1 text-white bg-blue-500 rounded"
          onClick={startNewConversation}
        >
          +
        </button>
      </div>
      <ul className="overflow-y-auto flex-1 space-y-2">
        {conversations.map(conv => (
          <li
            key={conv.id}
            className={`p-2 rounded cursor-pointer ${
              conv.id === currentConversationId ? 'bg-blue-200' : 'hover:bg-gray-200'
            }`}
            onClick={() => setCurrentConversationId(conv.id)}
          >
            {conv.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationHistoryPanel;