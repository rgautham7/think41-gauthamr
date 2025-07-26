import React, { createContext, useContext, useState, ReactNode } from 'react';

type MessageType = {
  id: number;
  sender: 'user' | 'ai';
  content: string;
};

type ConversationType = {
  id: number;
  title: string;
  messages: MessageType[];
};

type ChatContextType = {
  conversations: ConversationType[];
  currentConversationId: number;
  setCurrentConversationId: (id: number) => void;
  addMessage: (msg: Omit<MessageType, 'id'>) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  startNewConversation: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<ConversationType[]>([
    { id: 1, title: 'Conversation 1', messages: [] }
  ]);
  const [currentConversationId, setCurrentConversationId] = useState(1);
  const [loading, setLoading] = useState(false);

  const addMessage = (msg: Omit<MessageType, 'id'>) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  ...msg,
                  id: conv.messages.length
                    ? conv.messages[conv.messages.length - 1].id + 1
                    : 1
                }
              ]
            }
          : conv
      )
    );
  };

  const startNewConversation = () => {
    const newId = conversations.length
      ? conversations[conversations.length - 1].id + 1
      : 1;
    setConversations([
      ...conversations,
      { id: newId, title: `Conversation ${newId}`, messages: [] }
    ]);
    setCurrentConversationId(newId);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversationId,
        setCurrentConversationId,
        addMessage,
        loading,
        setLoading,
        startNewConversation
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};