import { IPropertyDefinitionSupportedTextType } from "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { app, IAppDataType } from "@onzag/itemize/server";
import { IOTriggerActions, ITriggerRegistry } from "@onzag/itemize/server/resolvers/triggers";
import { ServiceProvider, ServiceProviderType } from "@onzag/itemize/server/services";
import processThreadWithOpenAI from "./openai";
import OpenAI from "openai";
import { GoogleGenAI } from '@google/genai';
import processThreadWithGemini from "./gemini";
import ItemDefinition from "@onzag/itemize/base/Root/Module/ItemDefinition";

const currentlyProcessingCompletitions = new Set<string>();

function completitionIsBusy(threadId: string) {
    return currentlyProcessingCompletitions.has(threadId);
}

function buildSystemPrompt(agent: ModAiIdefAgentSQLType) {
    let prompt = `You are ${agent.name}\n${agent.system_prompt}.`;

    if (agent.description) {
        prompt += `\n\n## Description\n${agent.description}`;
    }

    if (agent.behaviour) {
        prompt += `\n\n## Agent behaviour\n${agent.behaviour}`;
    }

    if (agent.expertise) {
        prompt += `\n\n## Agent expertise\n${agent.expertise}`;
    }

    return prompt += `\n\n## Instructions\nKeep the answers short and concise, answer in the language used by the user, and try to keep the answer between 2 and 3 paragraphs at most. If you don't know the answer, say you don't know. If the question is not clear, ask for clarification.`;
}

async function queueAICompletitionOnThread(threadId: string, appData: IAppDataType, service: AIService) {
    currentlyProcessingCompletitions.add(threadId);

    let emptyNewThreadMessage: ModThreadIdefMessageSQLType | null = null;
    let threadValue: ModThreadIdefThreadSQLType | null = null;
    let agent: ModAiIdefAgentSQLType | null = null;

    try {
        threadValue = await appData.cache.requestValue<ModThreadIdefThreadSQLType>("thread/thread", threadId, null);
        if (!threadValue) {
            currentlyProcessingCompletitions.delete(threadId);
            return;
        }

        agent = await appData.cache.requestValue<ModAiIdefAgentSQLType>("ai/agent", threadValue.parent_id, null);
        if (!agent) {
            currentlyProcessingCompletitions.delete(threadId);
            return;
        }

        const threadMessages = await appData.rawDB.performRawDBSelect<ModThreadIdefMessageSQLType>("thread/message", (b) => {
            b.select("role", "content");
            b.orderByBuilder.orderBy("created_at", "ASC", "LAST");
            b.whereBuilder.andWhereColumn("parent_id", threadId);
        });

        const sysPrompt = buildSystemPrompt(agent);
        threadMessages.unshift({
            role: "system",
            content: sysPrompt,
        } as any as ModThreadIdefMessageSQLType);

        console.log(threadMessages);
        console.log(agent.name_LANGUAGE);
        console.log(agent.provider);

        const newEmptyMessageExpectedSQL: ModThreadIdefMessageSQLType = {
            id: "expected-new-message-id",
            version: null,
            parent_id: threadId,
            role: "assistant",
            // TODO by locale
            content: "**generating answer...**",
            created_at: "",
            created_by: threadValue.created_by,
            MODULE_ID: "expected-new-message-id",
            MODULE_VERSION: null,
            type: "MOD_thread__IDEF_message",
            parent_type: "MOD_thread__IDEF_thread",
            parent_version: null,
            content_LANGUAGE: agent.name_LANGUAGE,
            content_DICTIONARY: agent.name_DICTIONARY,
        };

        emptyNewThreadMessage = await appData.cache.requestCreation<ModThreadIdefMessageSQLType>(appData.root.registry["thread/message"] as ItemDefinition, newEmptyMessageExpectedSQL, {
            dictionary: agent.name_DICTIONARY,
            language: agent.name_LANGUAGE,
            createdBy: threadValue.created_by,
            parent: {
                id: threadId,
                type: "MOD_thread__IDEF_thread",
                version: null,
            },
        });

        if (agent.provider.startsWith("chatgpt")) {
            const model = agent.provider.replace("chatgpt_", "");
            await processThreadWithOpenAI(threadValue, emptyNewThreadMessage, agent, threadMessages, appData, service.openAIClient, model);
        } else if (agent.provider.startsWith("gemini")) {
            const model = agent.provider.replace("gemini_", "");
            await processThreadWithGemini(threadValue, emptyNewThreadMessage, agent, threadMessages, appData, service.geminiClient, model);
        }
    } catch (error) {
        console.error("Error processing AI completition:", error);

        try {
            if (emptyNewThreadMessage) {
                // TODO by locale
                await appData.cache.requestUpdate<ModThreadIdefMessageSQLType>("thread/message", emptyNewThreadMessage.id, emptyNewThreadMessage.version, {
                    content: {
                        value: "**Error generating answer. Please try again later.**",
                        language: "en",
                    },
                }, {
                    dictionary: "english",
                    language: "en",
                    currentSQLValue: emptyNewThreadMessage,
                });
            } else if (threadValue) {
                const newEmptyMessageExpectedSQL: ModThreadIdefMessageSQLType = {
                    id: "expected-new-message-id",
                    version: null,
                    parent_id: threadId,
                    role: "assistant",
                    // TODO by locale
                    content: "**Error generating answer. Please try again later.**",
                    created_at: "",
                    created_by: threadValue.created_by,
                    MODULE_ID: "expected-new-message-id",
                    MODULE_VERSION: null,
                    type: "MOD_thread__IDEF_message",
                    parent_type: "MOD_thread__IDEF_thread",
                    parent_version: null,
                    content_LANGUAGE: agent.name_LANGUAGE,
                    content_DICTIONARY: agent.name_DICTIONARY,
                };

                emptyNewThreadMessage = await appData.cache.requestCreation<ModThreadIdefMessageSQLType>(appData.root.registry["thread/message"] as ItemDefinition, newEmptyMessageExpectedSQL, {
                    dictionary: agent.name_DICTIONARY,
                    language: agent.name_LANGUAGE,
                    createdBy: threadValue.created_by,
                    parent: {
                        id: threadId,
                        type: "MOD_thread__IDEF_thread",
                        version: null,
                    },
                });
            }
        } catch (updateError) {
            console.error("Error updating thread message with error message:", updateError);
        }
    }

    currentlyProcessingCompletitions.delete(threadId);

}

interface IAIServiceConfig {
    openai: {
        apiKey: string;
    },
    gemini: {
        apiKey: string;
    }
}

export default class AIService extends ServiceProvider<IAIServiceConfig> {
    public openAIClient: OpenAI;
    geminiClient: GoogleGenAI;
    constructor(config, registry, configs) {
        super(config, registry, configs);

        this.openAIClient = new OpenAI({
            apiKey: this.config.openai.apiKey,
        });

        this.geminiClient = new GoogleGenAI({
            apiKey: this.config.gemini.apiKey,
        });
    }
    static getType() {
        return ServiceProviderType.LOCAL;
    };

    getTriggerRegistry(): ITriggerRegistry | Promise<ITriggerRegistry> {
        return {
            item: {
                io: {
                    "thread/message": async (ctx) => {
                        if (ctx.action === IOTriggerActions.CREATE) {
                            const threadId = ctx.requestedUpdateParent.id;
                            if (completitionIsBusy(threadId)) {
                                ctx.forbid("Thread is already processing a completition");
                                return null;
                            }
                            return {
                                ...ctx.requestedUpdate,
                                role: "user",
                            }
                        }
                        if (ctx.action === IOTriggerActions.CREATED) {
                            const threadId = ctx.requestedUpdateParent.id;
                            const content = ctx.requestedUpdate.content as any as IPropertyDefinitionSupportedTextType;
                            await queueAICompletitionOnThread(
                                threadId,
                                this.localAppData,
                                this,
                            );
                        }

                        return null;
                    }
                }
            }
        }
    }
}