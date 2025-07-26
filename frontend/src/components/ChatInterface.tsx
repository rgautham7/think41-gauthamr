import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { Message, ChatState } from '../types/chat';
import { chatService } from '../services/chatService';

export const ChatInterface: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: uuidv4(),
        content: "Hello! I'm StyleBot, your personal shopping assistant. I can help you with:\n\n• Product information and recommendations\n• Order status and tracking\n• Stock availability\n• Return and exchange policies\n\nHow can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
    ],
    isTyping: false,
    isConnected: true
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }));

    try {
      const response = await chatService.sendMessage(content);
      
      const botMessage: Message = {
        id: uuidv4(),
        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type || 'text'
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'error'
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
        isConnected: false
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white shadow-2xl">
      <ChatHeader isConnected={chatState.isConnected} />
      
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="space-y-1">
          {chatState.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {chatState.isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={chatState.isTyping}
      />
    </div>
  );
};