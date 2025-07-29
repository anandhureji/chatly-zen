import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage, { Message } from "./ChatMessage";
import LoadingMessage from "./LoadingMessage";
import ChatInput from "./ChatInput";
import { MessageCircle } from "lucide-react";

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer || "I'm sorry, I couldn't generate a response.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to reach the chat service. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] bg-chat-window rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow p-4 text-primary-foreground">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Assistant</h1>
            <p className="text-sm opacity-90">Ask me anything!</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(80vh-140px)] bg-gradient-to-b from-chat-background to-background">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Welcome to AI Chat</h3>
              <p className="text-muted-foreground">Start a conversation by typing a message below.</p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingMessage />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;