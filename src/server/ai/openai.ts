import { IAppDataType } from "@onzag/itemize/server";
import OpenAI from "openai";

export default async function processThreadWithOpenAI(
    thread: ModThreadIdefThreadSQLType,
    threadMessage: ModThreadIdefMessageSQLType,
    agent: ModAiIdefAgentSQLType,
    threadMessages: ModThreadIdefMessageSQLType[],
    appData: IAppDataType,
    client: OpenAI,
    model: string,
) {
    if (threadMessages.length === 2) {
        // figure out a name for the thread based on the first user message
        const firstUserMessage = threadMessages.find((m) => m.role === "user");
        if (firstUserMessage) {
            const newSystemPrompt = `You are an assistant that helps determine the name of a conversation thread based on the first user message. The assistant is described as "${agent.name}: ${agent.description}". The message is at follows:\n\n"${firstUserMessage?.content}".\n\nBased on this message, provide a concise and descriptive name for the thread in 10 words or less. The name should capture the essence of the user's message and the agent's expertise.`;
            const nameResponse = await client.responses.create({
                model: "gpt-3.5-turbo",
                input: [
                    {
                        // @ts-ignore typescript is wrong
                        role: "user",
                        content: newSystemPrompt,
                    },
                ],
            });
            await appData.cache.requestUpdate<ModThreadIdefThreadSQLType>("thread/thread", thread.id, thread.version, {
                title: {
                    value: nameResponse.output_text,
                    language: thread.title_LANGUAGE || "en",
                }
            }, {
                dictionary: "english",
                language: "en",
                currentSQLValue: thread,
            });
        }
    }

    const response = await client.responses.create({
        input: threadMessages.map((m) => ({
            role: m.role as any,
            content: m.content,
        })),
        model,
        stream: true,
    });

    let isFirstChunk = true;
    let inputTokens = 0;
    let outputTokens = 0;
    for await (const event of response) {
        if (event.type === "response.output_text.delta") {
            const text = event.delta;
            threadMessage = await appData.cache.requestUpdate<ModThreadIdefMessageSQLType>("thread/message", threadMessage.id, threadMessage.version, {
                content: {
                    value: isFirstChunk ? text : (threadMessage.content || "") + text,
                    language: threadMessage.content_LANGUAGE || "en",
                }
            }, {
                dictionary: "english",
                language: "en",
                currentSQLValue: threadMessage,
            });
            isFirstChunk = false;
        } else if (event.type === "response.completed") {
            inputTokens = event.response.usage.input_tokens;
            outputTokens = event.response.usage.output_tokens;
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
    }
}