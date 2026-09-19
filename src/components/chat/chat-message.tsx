import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import logo from "@/assets/student-support-logo.png";
import type { UIMessage } from "ai";
import { User } from "lucide-react";

export type ChatMessageMeta = { createdAt: number };

type ChatMessageProps = {
  message: UIMessage<ChatMessageMeta>;
  isStreaming?: boolean;
};

const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const text = message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
  const isUser = message.role === "user";
  const createdAt = message.metadata?.createdAt;

  return (
    <Message from={message.role} className="animate-fade-up">
      <div className={isUser ? "flex items-end justify-end gap-2" : "flex items-start gap-2.5"}>
        {!isUser && (
          <img
            src={logo}
            alt=""
            width={32}
            height={32}
            className="mt-0.5 size-8 shrink-0 rounded-full bg-secondary p-1"
          />
        )}
        <MessageContent className="group-[.is-user]:bg-chat-user group-[.is-user]:text-chat-user-foreground group-[.is-user]:rounded-2xl group-[.is-user]:rounded-br-sm">
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
          ) : (
            <MessageResponse isAnimating={Boolean(isStreaming)}>{text}</MessageResponse>
          )}
        </MessageContent>
        {isUser && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <User className="size-4" aria-hidden />
          </span>
        )}
      </div>
      {createdAt && (
        <time
          dateTime={new Date(createdAt).toISOString()}
          className={`text-[11px] text-muted-foreground ${isUser ? "mr-10 text-right" : "ml-10"}`}
        >
          {timeFormatter.format(createdAt)}
        </time>
      )}
    </Message>
  );
}
