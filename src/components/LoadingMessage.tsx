const LoadingMessage = () => {
  return (
    <div className="flex w-full justify-start animate-slide-up">
      <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl rounded-bl-sm bg-chat-ai text-chat-ai-foreground px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div
              className="h-2 w-2 rounded-full bg-primary animate-typing"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-primary animate-typing"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-primary animate-typing"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>
          <span className="text-sm text-muted-foreground">Thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;