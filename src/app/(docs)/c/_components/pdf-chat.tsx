"use client";

import { Message, useChat } from "ai/react";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface PDFChatProps {
  className?: string;
  chatId: string;
}

export function PDFChat({ className, chatId }: PDFChatProps) {
  const { data: session } = useSession();
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [botThinking, setBotThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const response = await fetch("/api/get-messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId }),
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar mensagens do chat.");
        }
        const data = await response.json();
        setInitialMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialMessages();
  }, [chatId]);

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: { chatId },
    initialMessages: initialMessages,
    onResponse: () => {
      setBotThinking(false);
    },
  });

  const allMessages = messages;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages, botThinking]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setBotThinking(true);
    handleSubmit();
  };

  return (
    <div
      className={cn(["bg-white h-full flex flex-col border-gray-200 border-r w-full", className])}
    >
      <ChatMessageList className="flex-1 h-full overflow-y-auto px-8 overflow-x-hidden md:px-16">
        {allMessages.map((message) => {
          const variant = message.role === "user" ? "sent" : "received";
          return (
            <ChatBubble key={message.id} variant={variant} layout={"ai"} className="items-start">
              <ChatBubbleAvatar
                fallback={variant === "sent" ? (session?.user?.name![0] as string) : "AI"}
                className={variant === "sent" ? "w-10 h-10 mt-2" : "w-10 h-10 mt-3"}
                src={variant === "sent" ? String(session?.user?.image) : "/icons/bot.png"}
              />
              <ChatBubbleMessage
                className={
                  variant === "sent"
                    ? "border-0 text-zinc-900 bg-gray-100 rounded-xl w-fit"
                    : "text-zinc-900 border-none p-2"
                }
                layout={"ai"}
              >
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => <p className="mb-0" {...props} />,
                    span: ({ node, ...props }) => <span className="mb-0" {...props} />,
                    h1: ({ node, ...props }) => <h1 className="text-lg font-semibold" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-lg font-semibold" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-semibold" {...props} />,
                    h4: ({ node, ...props }) => <h4 className="text-lg font-semibold" {...props} />,
                    h5: ({ node, ...props }) => <h5 className="text-lg font-semibold" {...props} />,
                    h6: ({ node, ...props }) => <h6 className="text-lg font-semibold" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc ml-4" {...props} />,
                    li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                    pre: ({ node, ...props }) => (
                      <pre
                        className="bg-zinc-900 p-4 text-white rounded-xl overflow-x-scroll mr-5"
                        {...props}
                      />
                    ),
                    b: ({ node, ...props }) => <b className="font-semibold" {...props} />,
                    strong: ({ node, ...props }) => <b className="font-semibold" {...props} />,
                    table: ({ node, ...props }) => (
                      <div className="rounded-xl overflow-hidden border border-gray-300">
                        <table className="table-auto border-collapse w-full" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
                    tr: ({ node, ...props }) => (
                      <tr className="border-b border-gray-300 last:border-b-0" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="p-2 border-r border-gray-300 font-semibold text-left last:border-r-0"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="p-2 border-r border-gray-300 last:border-r-0" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-primary underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                  }}
                >
                  {message.content}
                </Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
          );
        })}
        {botThinking && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage isLoading />
          </ChatBubble>
        )}
        <div ref={messagesEndRef} />
      </ChatMessageList>

      <div className="px-8 md:px-16 py-3 relative w-full">
        <div className="w-full relative">
          <ChatInput
            className="z-10 pr-20 rounded-xl py-4 min-h-20 disabled:opacity-50 disabled:cursor-not-allowed pt-7"
            placeholder="Faça uma pergunta sobre o documento..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={botThinking}
          />
          <Button
            className="absolute right-4 top-0 bottom-0 my-auto rounded-xl disabled:opacity-50 disabled:cursor-not-allowed p-5 px-7 [&_svg]:size-5"
            size={"icon"}
            onClick={handleSendMessage}
            disabled={botThinking}
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}
