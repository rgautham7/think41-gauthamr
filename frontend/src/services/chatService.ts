import { ProductInfo, OrderInfo } from '../types/chat';

interface ChatResponse {
  content: string;
  type?: 'text' | 'product' | 'order' | 'error';
}

class ChatService {
  private apiUrl = '/api/chat'; // This will be configured to point to your backend

  async sendMessage(message: string): Promise<ChatResponse> {
    // Simulate API delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Mock responses based on message content for development
    return this.getMockResponse(message);
  }

  private getMockResponse(message: string): ChatResponse {
    const lowerMessage = message.toLowerCase();

    // Product-related queries
    if (lowerMessage.includes('top') && (lowerMessage.includes('product') || lowerMessage.includes('sold'))) {
      return {
        content: `Here are our top 5 best-selling products this month:

1. **Classic Cotton T-Shirt** - $24.99
   Sales: 1,247 units | Stock: 156 available

2. **Denim Jacket** - $79.99
   Sales: 892 units | Stock: 43 available

3. **Sneakers Collection** - $89.99
   Sales: 734 units | Stock: 89 available

4. **Summer Dress** - $49.99
   Sales: 678 units | Stock: 102 available

5. **Casual Shorts** - $34.99
   Sales: 567 units | Stock: 78 available

Would you like more details about any of these products?`,
        type: 'product'
      };
    }

    // Order status queries
    if (lowerMessage.includes('order') && (lowerMessage.includes('status') || lowerMessage.includes('12345'))) {
      return {
        content: `Order #12345 Status Update:

📦 **Status**: Out for Delivery
🚚 **Tracking**: Expected delivery today by 6 PM
📍 **Location**: Last scanned at local distribution center

**Order Details**:
• Classic Cotton T-Shirt (Size M) - $24.99
• Denim Jacket (Size L) - $79.99
• **Total**: $104.98

**Delivery Address**: 
123 Main Street, Your City

You'll receive a notification when your package is delivered. Is there anything else you'd like to know about your order?`,
        type: 'order'
      };
    }

    // Stock queries
    if (lowerMessage.includes('stock') || lowerMessage.includes('classic t-shirt')) {
      return {
        content: `**Classic T-Shirt Stock Information**:

📊 **Current Stock Levels**:
• Size XS: 23 units available
• Size S: 34 units available  
• Size M: 45 units available
• Size L: 32 units available
• Size XL: 22 units available

**Colors Available**:
• White: 67 units
• Black: 52 units
• Navy: 37 units

**Price**: $24.99 each
**Restock Date**: Next shipment expected in 3-5 business days

Would you like me to notify you when we restock a specific size or color?`,
        type: 'product'
      };
    }

    // Return/exchange queries
    if (lowerMessage.includes('return') || lowerMessage.includes('exchange')) {
      return {
        content: `**Return & Exchange Policy**:

✅ **Easy Returns**: 30-day return window
✅ **Free Returns**: No shipping costs for returns
✅ **Quick Exchanges**: Same-day processing

**How to Return**:
1. Go to your account > Order History
2. Select the item you want to return
3. Print the prepaid return label
4. Drop off at any post office

**Refund Timeline**: 3-5 business days after we receive your item

**Exchange Process**: We'll send your new size/color as soon as we receive your return.

Need help with a specific return? I can look up your order details!`,
        type: 'text'
      };
    }

    // Size guide queries
    if (lowerMessage.includes('size') && lowerMessage.includes('guide')) {
      return {
        content: `**Size Guide**:

**T-Shirts & Tops**:
• XS: Chest 32-34", Length 26"
• S: Chest 35-37", Length 27"
• M: Chest 38-40", Length 28"
• L: Chest 41-43", Length 29"
• XL: Chest 44-46", Length 30"

**Dresses**:
• XS: Bust 32", Waist 25", Hips 35"
• S: Bust 34", Waist 27", Hips 37"
• M: Bust 36", Waist 29", Hips 39"

**Pro Tip**: When in doubt, size up! Our clothes tend to run slightly small.

Need help finding your perfect size for a specific item?`,
        type: 'text'
      };
    }

    // Default helpful response
    return {
      content: `I'd be happy to help you with that! I can assist you with:

🛍️ **Product Information**
• Product details and specifications
• Size guides and fit information
• Stock availability and pricing

📦 **Order Management**  
• Order status and tracking
• Shipping and delivery updates
• Return and exchange processes

🎯 **Personalized Help**
• Product recommendations
• Style advice and trends
• Special offers and promotions

Could you please provide more specific details about what you're looking for? For example:
• "What's the status of order #12345?"
• "Do you have Classic T-Shirts in size M?"
• "Show me your best-selling dresses"`,
      type: 'text'
    };
  }

  // Method to be implemented for real backend integration
  async getProductInfo(productId: string): Promise<ProductInfo | null> {
    try {
      const response = await fetch(`${this.apiUrl}/products/${productId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching product info:', error);
      return null;
    }
  }

  // Method to be implemented for real backend integration
  async getOrderInfo(orderId: string): Promise<OrderInfo | null> {
    try {
      const response = await fetch(`${this.apiUrl}/orders/${orderId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching order info:', error);
      return null;
    }
  }
}

export const chatService = new ChatService();