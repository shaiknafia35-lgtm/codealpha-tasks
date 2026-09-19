import { ChatWindow } from "@/components/chat/chat-window";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Support AI Chatbot" },
      {
        name: "description",
        content:
          "Chat with Student Support AI for instant, friendly answers to college questions about timings, library, exams, attendance, courses and placements.",
      },
      { property: "og:title", content: "Student Support AI Chatbot" },
      {
        property: "og:description",
        content: "Instant AI answers for college students — timings, library, exams, attendance, courses and placements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-4xl items-center justify-center sm:px-4 sm:py-6">
      <ChatWindow />
    </main>
  );
}
