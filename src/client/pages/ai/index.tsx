
import React, { useCallback } from "react";
import Route from "@onzag/itemize/client/components/navigation/Route";
import { useModAiIdefAgentItemProvider, useModThreadIdefMessageItemProvider, useModThreadIdefMessageSearchItemProvider, useModThreadIdefThreadItemProvider, useModThreadIdefThreadSearchItemProvider } from "src/schema";
import { Box, Button } from "@mui/material";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import I18nReadError from "@onzag/itemize/client/components/localization/I18nReadError";
import { goBack, localizedRedirectTo } from "@onzag/itemize/client/components/navigation/index";
import { useUserDataRetriever } from "@onzag/itemize/client/components/user/UserDataRetriever";
import Link from "@onzag/itemize/client/components/navigation/Link";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import View from "@onzag/itemize/client/components/property/View";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";

function AIAgentCreatePage() {
    const itemProvider = useModAiIdefAgentItemProvider({
        properties: ["name", "description", "provider", "system_prompt", "behaviour", "expertise"],
    });

    const saveAgent = useCallback(async () => {
        const rs = await itemProvider.context.submit({
            properties: ["name", "description", "provider", "system_prompt", "behaviour", "expertise"],
            action: "add",
            cleanStateOnSuccess: true,
        });
        if (!rs.error) {
            goBack();
        }
    }, [itemProvider]);

    return (
        <>
            <Box>
                {itemProvider.getEntryForProperty("name")}
                {itemProvider.getEntryForProperty("provider")}
                {itemProvider.getEntryForProperty("description")}
                {itemProvider.getEntryForProperty("system_prompt")}
                {itemProvider.getEntryForProperty("behaviour")}
                {itemProvider.getEntryForProperty("expertise")}
            </Box>
            <Button variant="contained" color="primary" onClick={saveAgent}>
                <I18nRead i18nId="save_agent" context="ai/agent" />
            </Button>
            {itemProvider.context.submitError ? (
                <Box color="error.main">
                    <I18nReadError error={itemProvider.context.submitError} />
                </Box>
            ) : null}
        </>
    );
}

interface IAIAgentEditPageProps {
    match: {
        params: {
            id: string;
        };
    };
}

interface IAIAgentRunPageProps {
    match: {
        params: {
            id: string;
            tid: string;
        };
    };
}

function AIAgentEditPage(props: IAIAgentEditPageProps) {
    const itemProvider = useModAiIdefAgentItemProvider({
        forId: props.match.params.id,
        properties: ["name", "description", "provider", "system_prompt", "behaviour", "expertise"],
    });

    const saveAgent = useCallback(async () => {
        const rs = await itemProvider.context.submit({
            properties: ["name", "description", "provider", "system_prompt", "behaviour", "expertise"],
            action: "edit",
            cleanStateOnSuccess: true,
        });
        if (!rs.error) {
            goBack();
        }
    }, [itemProvider]);

    return (
        <>
            <Box>
                {itemProvider.getEntryForProperty("name")}
                {itemProvider.getEntryForProperty("provider")}
                {itemProvider.getEntryForProperty("description")}
                {itemProvider.getEntryForProperty("system_prompt")}
                {itemProvider.getEntryForProperty("behaviour")}
                {itemProvider.getEntryForProperty("expertise")}
            </Box>
            <Button variant="contained" color="primary" onClick={saveAgent}>
                <I18nRead i18nId="edit_agent" context="ai/agent" />
            </Button>
            {itemProvider.context.submitError ? (
                <Box color="error.main">
                    <I18nReadError error={itemProvider.context.submitError} />
                </Box>
            ) : null}
        </>
    );
}

export function AIAgentStartRunPage(props: IAIAgentEditPageProps) {
    const itemProvider = useModAiIdefAgentItemProvider({
        forId: props.match.params.id,
        properties: ["name", "description", "provider", "system_prompt", "behaviour", "expertise"],
    });

    const userData = useUserDataRetriever();
    const userRole = userData.role;

    const newThreadItemProvider = useModThreadIdefThreadItemProvider({
        properties: [],
    });

    const createNewThread = useCallback(async () => {
        const rs = await newThreadItemProvider.context.submit({
            properties: [],
            action: "add",
            parentedBy: {
                item: "ai/agent",
                id: props.match.params.id,
            },
            cleanStateOnSuccess: true,
        });
        if (!rs.error) {
            localizedRedirectTo(`/ai/agent/run/${props.match.params.id}/thread/${rs.id}`);
        }
    }, [newThreadItemProvider, props.match.params.id]);

    const allThreads = useModThreadIdefThreadSearchItemProvider({
        automaticSearch: {
            searchByProperties: [],
            limit: 100,
            offset: 0,
            requestedProperties: ["title"],
            traditional: true,
            parentedBy: {
                item: "ai/agent",
                id: props.match.params.id,
            },
            createdBy: userData.id,
        },
        automaticSearchForce: true,
    });

    const searchLoaded = allThreads.useSearchLoader({
        currentPage: 0,
        pageSize: 100,
        startInSearchingState: true,
        static: "NO_LISTENING",
    });

    return (
        <>
            {userRole === "TEACHER" || userRole === "ADMIN" ? <Box>
                <Link to={`/ai/agent/edit/${itemProvider.context.forId}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        <I18nRead i18nId="edit_agent" context="ai/agent" />
                    </Button>
                </Link>
            </Box> : null}
            <Box>
                <I18nRead i18nId="talk_with_agent" context="ai/agent" args={[itemProvider.getViewForProperty("name")]} />
                {itemProvider.getViewForProperty("description")}
            </Box>
            <Box>
                <Button variant="contained" color="primary" onClick={createNewThread}>
                    <I18nRead i18nId="start_new_conversation" context="ai/agent" />
                </Button>
            </Box>
            <Box>
                <I18nRead i18nId="existing_threads" context="ai/agent" />
                {searchLoaded.error ? (
                    <Box color="error.main">
                        <I18nReadError error={searchLoaded.error} />
                    </Box>
                ) : null}
                {searchLoaded.searchRecords.map((thread) => (
                    <Box key={thread.id}>
                        <Link to={`/ai/agent/run/${props.match.params.id}/thread/${thread.id}`} style={{ textDecoration: 'none' }}>
                            <ModuleProvider module="thread">
                                <ItemProvider {...thread.providerArgs}>
                                    <View id="title" rendererArgs={{ nullNode: <I18nRead i18nId="untitled_thread" capitalize={true} context="ai/agent" /> }} />
                                </ItemProvider>
                            </ModuleProvider>
                        </Link>
                    </Box>
                ))}
                {searchLoaded.isLoadingSearchResults || searchLoaded.searching ? (
                    <Box>
                        <I18nRead i18nId="loading_threads" context="ai/agent" />
                    </Box>
                ) : (searchLoaded.searchRecords.length === 0 ? (
                    <Box>
                        <I18nRead i18nId="no_threads" context="ai/agent" />
                    </Box>
                ) : null)}
            </Box>
        </>
    );
}

export function AIAgentRunThreadPage(props: IAIAgentRunPageProps) {
    const itemProvider = useModAiIdefAgentItemProvider({
        forId: props.match.params.id,
        properties: ["name", "description", "provider", "system_prompt", "behaviour", "expertise"],
    });

    const threadItemProvider = useModThreadIdefThreadItemProvider({
        forId: props.match.params.tid,
        properties: ["title"],
    });

    const userData = useUserDataRetriever();

    const [inputValue, setInputValue] = React.useState("");

    const messagesSearchProvider = useModThreadIdefMessageSearchItemProvider({
        setters: [
            {
                id: "role",
                searchVariant: "in",
                value: ["user", "assistant"],
            }
        ],
        automaticSearch: {
            searchByProperties: [
                {id: "role", searchVariant: "in"},
            ],
            limit: 20,
            offset: 0,
            requestedProperties: ["content", "role"],
            traditional: true,
            parentedBy: {
                item: "thread/thread",
                id: props.match.params.tid,
            },
            createdBy: userData.id,
            listenPolicy: "by-owner-and-parent",
        },
        automaticSearchForce: true,
    });

    const messagesSearchLoaded = messagesSearchProvider.useSearchLoader({
        currentPage: 0,
        pageSize: 20,
        startInSearchingState: true,
    });

    const newMessageItemProvider = useModThreadIdefMessageItemProvider({
        properties: ["content", "role"],
        setters: [
            {
                id: "role",
                value: "user",
            },
            {
                id: "content",
                value: {
                    language: null,
                    value: inputValue,
                },
            }
        ],
    });

    const submitNewMessage = useCallback(async () => {
        const rs = await newMessageItemProvider.context.submit({
            properties: ["content", "role"],
            action: "add",
            parentedBy: {
                item: "thread/thread",
                id: props.match.params.tid,
            },
            cleanStateOnSuccess: true
        });
        if (!rs.error) {
            setInputValue("");
        }
    }, [newMessageItemProvider, props.match.params.tid]);

    return (
        <>
            <Box>
                <I18nRead i18nId="talking_with_agent" context="ai/agent" args={[itemProvider.getViewForProperty("name")]} />
                {itemProvider.getViewForProperty("description")}
            </Box>
            <Box>
                <I18nRead i18nId="conversation_thread" context="ai/agent" />
                <br />
                {threadItemProvider.getViewForProperty({
                    id: "title",
                    rendererArgs: {
                        nullNode: <I18nRead i18nId="untitled_thread" capitalize={true} context="ai/agent" />,
                    }
                })}
            </Box>
            <Box>
                <I18nRead i18nId="messages" context="thread/thread" />
                {messagesSearchLoaded.error ? (
                    <Box color="error.main">
                        <I18nReadError error={messagesSearchLoaded.error} />
                    </Box>
                ) : null}
                {[...messagesSearchLoaded.searchRecords].reverse().map((message) => (
                    <Box key={message.id} sx={{ border: message.searchResult?.DATA?.role === "user" ? "1px solid gray" : "1px solid blue", margin: '5px', padding: '5px' }}>
                        <ModuleProvider module="thread">
                            <ItemProvider {...message.providerArgs}>
                                <View id="content" />
                            </ItemProvider>
                        </ModuleProvider>
                    </Box>
                ))}
                {messagesSearchLoaded.isLoadingSearchResults || messagesSearchLoaded.searching ? (
                    <Box>
                        <I18nRead i18nId="loading_messages" context="thread/message" />
                    </Box>
                ) : (messagesSearchLoaded.searchRecords.length === 0 ? (
                    <Box>
                        <I18nRead i18nId="no_messages" context="thread/message" />
                    </Box>
                ) : null)}
            </Box>
            <input type="text" placeholder="Type your message here..." style={{ width: '100%', padding: '10px', marginTop: '10px' }} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    submitNewMessage();
                }
            }} />
        </>
    );
}

export default function Ai() {
    return (
        <>
            <Route path="/ai/agent/create" component={AIAgentCreatePage} />
            <Route path="/ai/agent/edit/:id" component={AIAgentEditPage} />
            <Route path="/ai/agent/run/:id" component={AIAgentStartRunPage} exact={true} />
            <Route path="/ai/agent/run/:id/thread/:tid" component={AIAgentRunThreadPage} />
        </>
    );
}