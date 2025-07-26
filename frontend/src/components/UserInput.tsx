// frontend/src/components/UserInput.tsx
import React, { useState } from 'react';
import { useChat } from './ChatContext';

const UserInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, loading } = useChat();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage({ sender: 'user', content: input });
      setInput('');
      // Here you would also trigger the AI response and set loading
    }
  };

  return (
    <form onSubmit={handleSend} className="flex p-4 border-t">
      <input
        className="flex-1 p-2 rounded-l-lg border focus:outline-none"
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded-r-lg"
        disabled={loading}
      >
        {loading ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default UserInput;