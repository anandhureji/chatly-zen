import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-slide-up",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl px-4 py-3 text-sm shadow-sm",
          message.isUser
            ? "bg-chat-user text-chat-user-foreground rounded-br-sm"
            : "bg-chat-ai text-chat-ai-foreground rounded-bl-sm"
        )}
      >
        <p className="whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </p>
        <div
          className={cn(
            "mt-1 text-xs opacity-60",
            message.isUser ? "text-right" : "text-left"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;