import React from 'react';
import ChatWindow from './components/ChatWindow';
import { ChatProvider } from './components/ChatContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ChatProvider>
        <ChatWindow />
      </ChatProvider>
    </div>
  );
}

export default App;