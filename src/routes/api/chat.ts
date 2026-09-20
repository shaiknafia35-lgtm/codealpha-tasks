import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";
import { createOpenAI } from "@ai-sdk/openai";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `You are "Student Support AI", a friendly and professional support assistant for college students.

You have a predefined college FAQ knowledge base below. Everything in it is SAMPLE information, provided for demonstration because the real college details were not supplied.

--- COLLEGE FAQ KNOWLEDGE BASE (SAMPLE DATA) ---
${COLLEGE_FAQ_TEXT}
--- END KNOWLEDGE BASE ---

How to answer:
1. If the question is covered by the knowledge base (college timings, library, exams, attendance, courses, placements), answer from it and clearly mark it as SAMPLE information, e.g. start with "Here's the SAMPLE information I have:" and add a short note that the student should confirm official details with the college.
2. If the question asks for college-specific official details that are NOT in the knowledge base (exact dates, fees, cut-offs, staff names, contacts, results, room numbers, event schedules), reply with exactly this sentence:
"${NO_INFO_FALLBACK}"
You may add one short, helpful follow-up line offering related general guidance.
3. For general student questions (study tips, time management, exam preparation, stress, career advice, learning resources), answer helpfully from general knowledge. Do not use the fallback sentence for these.
4. NEVER invent official college information. Never present sample data as official or verified.

Style:
- Concise, polite and student-friendly. Short paragraphs or brief bullet lists (aim for under 150 words).
- Simple language, light Markdown where it helps readability.`;

type ChatRequestBody = { messages?: unknown };

const MAX_MESSAGES = 30;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }
        const { messages } = body;
        if (!Array.isArray(messages) || messages.length === 0) {
          return Response.json({ error: "Messages are required." }, { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return Response.json(
            { error: "The assistant is not configured yet. Please try again later." },
            { status: 500 },
          );
        }

        const history = (messages as UIMessage[]).slice(-MAX_MESSAGES);
        const initialRunId = getLovableAiGatewayRunId(request);
        const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
        const lovable = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey: key,
          headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });

        try {
          const result = streamText({
            model: lovable.responses("openai/gpt-6-astra"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(history),
            abortSignal: request.signal,
            providerOptions: {
              openai: {
                forceReasoning: true,
                reasoningEffort: "low",
                reasoningSummary: "auto",
                store: false,
                include: ["reasoning.encrypted_content"],
              },
            },
          });

          return withLovableAiGatewayRunIdHeader(
            result.toUIMessageStreamResponse({
              originalMessages: history,
              sendReasoning: false,
              onError: (error) => friendlyError(error),
              headers: getLovableAiGatewayResponseHeaders(undefined, {
                ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
              }),
            }),
            runIdFetch,
          );
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return new Response(null, { status: 499 });
          }
          console.error("[api/chat]", error);
          return Response.json({ error: friendlyError(error) }, { status: 500 });
        }
      },
    },
  },
});

function friendlyError(error: unknown): string {
  const status = getStatus(error);
  if (status === 429) return "The assistant is receiving too many requests right now. Please wait a moment and try again.";
  if (status === 402) return "The assistant is temporarily unavailable because AI usage credits have run out.";
  if (status === 401 || status === 403) return "The assistant is currently unavailable. Please try again later.";
  return "Sorry, something went wrong while generating a response. Please try again.";
}

function getStatus(error: unknown): number | undefined {
  if (typeof error === "object" && error !== null) {
    const e = error as { statusCode?: unknown; status?: unknown };
    if (typeof e.statusCode === "number") return e.statusCode;
    if (typeof e.status === "number") return e.status;
  }
  return undefined;
}
