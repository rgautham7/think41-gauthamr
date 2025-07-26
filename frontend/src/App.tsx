import React from 'react';
import { ChatInterface } from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;