import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { AlertCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "@/assets/student-support-logo.png";
import { ChatHeader } from "./chat-header";
import { ChatMessage, type ChatMessageMeta } from "./chat-message";
import { QuickQuestionBar } from "./quick-question-bar";

const transport = new DefaultChatTransport<UIMessage<ChatMessageMeta>>({ api: "/api/chat" });

const WELCOME: UIMessage<ChatMessageMeta> = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi! I'm **Student Support AI**. Ask me anything about college life — timings, library, exams, attendance, courses or placements. Pick a quick question below or type your own.",
    },
  ],
};

export function ChatWindow() {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, setMessages, stop } = useChat<UIMessage<ChatMessageMeta>>({
    transport,
    messages: [WELCOME],
    onError: (error) => setErrorText(toFriendlyMessage(error)),
  });

  const isBusy = status === "submitted" || status === "streaming";
  const canClear = messages.length > 1 || (messages.length === 1 && messages[0]?.id !== "welcome");

  const focusInput = useCallback(() => textareaRef.current?.focus(), []);

  useEffect(() => {
    focusInput();
    // Stamp the welcome message on the client so server and browser HTML match.
    setMessages((current) =>
      current.map((m) => (m.id === "welcome" && !m.metadata ? { ...m, metadata: { createdAt: Date.now() } } : m)),
    );
  }, [focusInput, setMessages]);

  useEffect(() => {
    if (status === "ready" || status === "error") focusInput();
  }, [status, focusInput]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isBusy) return;
      setErrorText(null);
      setInput("");
      await sendMessage({ text: trimmed, metadata: { createdAt: Date.now() } });
    },
    [isBusy, sendMessage],
  );

  const handleSubmit = (message: PromptInputMessage) => {
    void send(message.text ?? "");
  };

  const handleClear = () => {
    stop();
    setErrorText(null);
    setMessages([{ ...WELCOME, metadata: { createdAt: Date.now() } }]);
    focusInput();
  };

  const lastMessage = messages[messages.length - 1];
  const showThinking =
    status === "submitted" ||
    (status === "streaming" &&
      lastMessage?.role === "assistant" &&
      !lastMessage.parts.some((p) => p.type === "text" && p.text.length > 0));

  return (
    <section
      aria-label="Student Support AI chat"
      className="chat-panel flex h-dvh w-full flex-col overflow-hidden sm:h-[min(92dvh,1000px)] sm:rounded-3xl sm:border"
    >
      <ChatHeader onClear={handleClear} canClear={canClear} />

      <Conversation className="relative flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-5 px-4 py-6 sm:px-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isStreaming={status === "streaming" && index === messages.length - 1}
            />
          ))}

          {showThinking && (
            <div className="flex items-center gap-2.5 animate-fade-up" role="status" aria-live="polite">
              <img src={logo} alt="" width={32} height={32} className="size-8 rounded-full bg-secondary p-1" />
              <Shimmer className="text-sm">Thinking...</Shimmer>
            </div>
          )}

          {errorText && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{errorText}</span>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t bg-background/60 px-4 pb-4 pt-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          <QuickQuestionBar disabled={isBusy} onSelect={(prompt) => void send(prompt)} />
          <PromptInput onSubmit={handleSubmit} className="rounded-2xl bg-surface shadow-sm">
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.currentTarget.value)}
              placeholder="Ask a question about your college..."
              aria-label="Message"
              maxLength={2000}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                status={status}
                onStop={stop}
                disabled={!isBusy && input.trim().length === 0}
                aria-label={isBusy ? "Stop generating" : "Send message"}
              />
            </PromptInputFooter>
          </PromptInput>
          <p className="text-center text-[11px] text-muted-foreground">
            AI answers are general guidance — confirm official details with your college.
          </p>
        </div>
      </div>
    </section>
  );
}

function toFriendlyMessage(error: Error): string {
  const raw = error.message?.trim();
  if (!raw) return "Sorry, something went wrong. Please try again.";
  try {
    const parsed = JSON.parse(raw) as { error?: string };
    if (parsed.error) return parsed.error;
  } catch {
    /* not JSON */
  }
  if (/fetch|network/i.test(raw)) return "Unable to reach the assistant. Check your connection and try again.";
  if (raw.length < 200 && !/key|token|bearer/i.test(raw)) return raw;
  return "Sorry, something went wrong while generating a response. Please try again.";
}
