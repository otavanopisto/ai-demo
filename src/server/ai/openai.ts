import { IAppDataType } from "@onzag/itemize/server";
import OpenAI from "openai";

export default async function processThreadWithOpenAI(
    thread: ModThreadIdefThreadSQLType,
    threadMessage: ModThreadIdefMessageSQLType,
    agent: ModAiIdefAgentSQLType,
    threadMessages: ModThreadIdefMessageSQLType[],
    appData: IAppDataType,
    client: OpenAI,
) {
    const response = await client.responses.create({
        input: threadMessages.map((m) => ({
            role: m.role as any,
            content: m.content,
        })),
        model: "gpt-3.5-turbo",
    });
    console.log(response);
}