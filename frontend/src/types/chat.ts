export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'product' | 'order' | 'error';
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isConnected: boolean;
}

export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface OrderInfo {
  id: string;
  status: string;
  items: ProductInfo[];
  total: number;
  date: string;
}