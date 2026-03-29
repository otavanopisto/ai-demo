import { app, IAppDataType } from "@onzag/itemize/server";
import { GoogleGenAI } from "@google/genai";

export default async function processThreadWithGemini(
    thread: ModThreadIdefThreadSQLType,
    threadMessage: ModThreadIdefMessageSQLType,
    agent: ModAiIdefAgentSQLType,
    threadMessages: ModThreadIdefMessageSQLType[],
    appData: IAppDataType,
    client: GoogleGenAI,
    model: string,
) {

    if (threadMessages.length === 2) {
        // figure out a name for the thread based on the first user message
        const firstUserMessage = threadMessages.find((m) => m.role === "user");
        if (firstUserMessage) {
            const newSystemPrompt = `You are an assistant that helps determine the name of a conversation thread based on the first user message. The assistant is described as "${agent.name}: ${agent.description}". The message is at follows:\n\n"${firstUserMessage?.content}".\n\nBased on this message, provide a concise and descriptive name for the thread in 10 words or less. The name should capture the essence of the user's message and the agent's expertise.`;
            const nameResponse = await client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [
                    {
                        // @ts-ignore typescript is wrong
                        role: "user",
                        text: newSystemPrompt,
                    },
                ],
            });
            await appData.cache.requestUpdate<ModThreadIdefThreadSQLType>("thread/thread", thread.id, thread.version, {
                title: {
                    value: nameResponse.text,
                    language: thread.title_LANGUAGE || "en",
                }
            }, {
                dictionary: "english",
                language: "en",
                currentSQLValue: thread,
            });
        }
    }

    const response = await client.models.generateContentStream({
        model,
        contents: threadMessages.map((m) => ({
            role: m.role === "system" ? "user" : (m.role === "user" ? "user" : "model"),
            text: m.content,
        })),
    });

    let isFirstChunk = true;
    let inputTokens = 0;
    let outputTokens = 0;
    for await (const chunk of response) {
        threadMessage = await appData.cache.requestUpdate<ModThreadIdefMessageSQLType>("thread/message", threadMessage.id, threadMessage.version, {
            content: {
                value: isFirstChunk ? chunk.text : (threadMessage.content || "") + chunk.text,
                language: threadMessage.content_LANGUAGE || "en",
            }
        }, {
            dictionary: "english",
            language: "en",
            currentSQLValue: threadMessage,
        });
        isFirstChunk = false;

        if (chunk.usageMetadata) {
            inputTokens = chunk.usageMetadata.promptTokenCount || 0;
            outputTokens = chunk.usageMetadata.candidatesTokenCount || 0;
        }
    }

    console.log("Input tokens:", inputTokens, "Output tokens:", outputTokens);
    threadMessage = await appData.cache.requestUpdate<ModThreadIdefMessageSQLType>("thread/message", threadMessage.id, threadMessage.version, {
        input_tokens_count: inputTokens,
        output_tokens_count: outputTokens,
    }, {
        dictionary: "english",
        language: "en",
        currentSQLValue: threadMessage,
    });
}