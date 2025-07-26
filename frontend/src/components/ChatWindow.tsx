import React from 'react';
import { ChatHeader } from './ChatHeader';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationHistoryPanel from './ConversationalHistoryPanel';

const ChatWindow: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-lg flex h-[80vh]">
      <ConversationHistoryPanel />
      <div className="flex flex-col flex-1">
        <ChatHeader isConnected={true} />
        <div className="overflow-y-auto flex-1">
          <MessageList />
        </div>
        <UserInput />
      </div>
    </div>
  );
};

export default ChatWindow;