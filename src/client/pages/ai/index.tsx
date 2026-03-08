
import React, { useCallback } from "react";
import Route from "@onzag/itemize/client/components/navigation/Route";
import { useModAiIdefAgentItemProvider, useModThreadIdefMessageItemProvider, useModThreadIdefMessageSearchItemProvider, useModThreadIdefThreadItemProvider, useModThreadIdefThreadSearchItemProvider } from "../../../schema";
import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    Divider,
    CircularProgress,
    Stack,
    Avatar,
    Chip,
    IconButton,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddCommentIcon from "@mui/icons-material/AddComment";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonIcon from "@mui/icons-material/Person";
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
        <Box sx={{ maxWidth: 720, mx: "auto", py: 4, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 44, height: 44 }}>
                        <SmartToyIcon />
                    </Avatar>
                    <Typography variant="h5" fontWeight={600}>
                        <I18nRead i18nId="save_agent" context="ai/agent" />
                    </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2.5}>
                    {itemProvider.getEntryForProperty("name")}
                    {itemProvider.getEntryForProperty("provider")}
                    {itemProvider.getEntryForProperty("description")}
                    {itemProvider.getEntryForProperty("system_prompt")}
                    {itemProvider.getEntryForProperty("behaviour")}
                    {itemProvider.getEntryForProperty("expertise")}
                </Stack>
                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
                    {itemProvider.context.submitError ? (
                        <Typography color="error" variant="body2">
                            <I18nReadError error={itemProvider.context.submitError} />
                        </Typography>
                    ) : null}
                    <Button variant="contained" color="primary" size="large" onClick={saveAgent} sx={{ borderRadius: 2, px: 4, textTransform: "none", fontWeight: 600 }}>
                        <I18nRead i18nId="save_agent" context="ai/agent" />
                    </Button>
                </Box>
            </Paper>
        </Box>
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
        <Box sx={{ maxWidth: 720, mx: "auto", py: 4, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <Avatar sx={{ bgcolor: "secondary.main", width: 44, height: 44 }}>
                        <EditIcon />
                    </Avatar>
                    <Typography variant="h5" fontWeight={600}>
                        <I18nRead i18nId="edit_agent" context="ai/agent" />
                    </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2.5}>
                    {itemProvider.getEntryForProperty("name")}
                    {itemProvider.getEntryForProperty("provider")}
                    {itemProvider.getEntryForProperty("description")}
                    {itemProvider.getEntryForProperty("system_prompt")}
                    {itemProvider.getEntryForProperty("behaviour")}
                    {itemProvider.getEntryForProperty("expertise")}
                </Stack>
                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
                    {itemProvider.context.submitError ? (
                        <Typography color="error" variant="body2">
                            <I18nReadError error={itemProvider.context.submitError} />
                        </Typography>
                    ) : null}
                    <Button variant="contained" color="primary" size="large" onClick={saveAgent} sx={{ borderRadius: 2, px: 4, textTransform: "none", fontWeight: 600 }}>
                        <I18nRead i18nId="edit_agent" context="ai/agent" />
                    </Button>
                </Box>
            </Paper>
        </Box>
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
        <Box sx={{ maxWidth: 800, mx: "auto", py: 4, px: 2 }}>
            {/* Agent Info Header */}
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                            <SmartToyIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight={700}>
                                <I18nRead i18nId="talk_with_agent" context="ai/agent" args={[itemProvider.getViewForProperty("name")]} />
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {itemProvider.getViewForProperty("description")}
                            </Typography>
                        </Box>
                    </Box>
                    {userRole === "TEACHER" || userRole === "ADMIN" ? (
                        <Link to={`/ai/agent/edit/${itemProvider.context.forId}`} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" color="primary" startIcon={<EditIcon />} sx={{ borderRadius: 2, textTransform: "none" }}>
                                <I18nRead i18nId="edit_agent" context="ai/agent" />
                            </Button>
                        </Link>
                    ) : null}
                </Box>
            </Paper>

            {/* New Conversation Button */}
            <Box sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<AddCommentIcon />}
                    onClick={createNewThread}
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, px: 4, py: 1.2 }}
                >
                    <I18nRead i18nId="start_new_conversation" context="ai/agent" />
                </Button>
            </Box>

            {/* Threads Section */}
            <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Box sx={{ px: 3, py: 2, bgcolor: "grey.50", borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ChatBubbleOutlineIcon fontSize="small" />
                        <I18nRead i18nId="existing_threads" context="ai/agent" />
                    </Typography>
                </Box>
                {searchLoaded.error ? (
                    <Box sx={{ p: 2 }}>
                        <Typography color="error" variant="body2">
                            <I18nReadError error={searchLoaded.error} />
                        </Typography>
                    </Box>
                ) : null}
                <Stack divider={<Divider />}>
                    {searchLoaded.searchRecords.map((thread) => (
                        <Link key={thread.id} to={`/ai/agent/run/${props.match.params.id}/thread/${thread.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{
                                px: 3,
                                py: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                transition: "background-color 0.15s",
                                "&:hover": { bgcolor: "action.hover" },
                                cursor: "pointer",
                            }}>
                                <ChatBubbleOutlineIcon fontSize="small" color="action" />
                                <Typography variant="body1">
                                    <ModuleProvider module="thread">
                                        <ItemProvider {...thread.providerArgs}>
                                            <View id="title" rendererArgs={{ nullNode: <I18nRead i18nId="untitled_thread" capitalize={true} context="ai/agent" /> }} />
                                        </ItemProvider>
                                    </ModuleProvider>
                                </Typography>
                            </Box>
                        </Link>
                    ))}
                </Stack>
                {searchLoaded.isLoadingSearchResults || searchLoaded.searching ? (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, py: 4 }}>
                        <CircularProgress size={22} />
                        <Typography variant="body2" color="text.secondary">
                            <I18nRead i18nId="loading_threads" context="ai/agent" />
                        </Typography>
                    </Box>
                ) : (searchLoaded.searchRecords.length === 0 ? (
                    <Box sx={{ py: 5, textAlign: "center" }}>
                        <ChatBubbleOutlineIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            <I18nRead i18nId="no_threads" context="ai/agent" />
                        </Typography>
                    </Box>
                ) : null)}
            </Paper>
        </Box>
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
        <Box sx={{ maxWidth: 900, mx: "auto", py: 3, px: 2, display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
            {/* Agent & Thread Header */}
            <Paper elevation={2} sx={{ p: 2.5, borderRadius: 3, mb: 2, flexShrink: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                        <SmartToyIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                            <I18nRead i18nId="talking_with_agent" context="ai/agent" args={[itemProvider.getViewForProperty("name")]} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {itemProvider.getViewForProperty("description")}
                        </Typography>
                    </Box>
                    <Chip
                        size="small"
                        variant="outlined"
                        label={threadItemProvider.getViewForProperty({
                            id: "title",
                            rendererArgs: {
                                nullNode: <I18nRead i18nId="untitled_thread" capitalize={true} context="ai/agent" />,
                            }
                        })}
                    />
                </Box>
            </Paper>

            {/* Messages Area */}
            <Paper elevation={1} sx={{ flex: 1, borderRadius: 3, display: "flex", flexDirection: "column", overflow: "hidden", mb: 2 }}>
                <Box sx={{ px: 3, py: 1.5, bgcolor: "grey.50", borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                        <I18nRead i18nId="messages" context="thread/thread" />
                    </Typography>
                </Box>

                {messagesSearchLoaded.error ? (
                    <Box sx={{ p: 2 }}>
                        <Typography color="error" variant="body2">
                            <I18nReadError error={messagesSearchLoaded.error} />
                        </Typography>
                    </Box>
                ) : null}

                <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {messagesSearchLoaded.isLoadingSearchResults || messagesSearchLoaded.searching ? (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, py: 6 }}>
                            <CircularProgress size={22} />
                            <Typography variant="body2" color="text.secondary">
                                <I18nRead i18nId="loading_messages" context="thread/message" />
                            </Typography>
                        </Box>
                    ) : messagesSearchLoaded.searchRecords.length === 0 ? (
                        <Box sx={{ py: 6, textAlign: "center" }}>
                            <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                <I18nRead i18nId="no_messages" context="thread/message" />
                            </Typography>
                        </Box>
                    ) : (
                        [...messagesSearchLoaded.searchRecords].reverse().map((message) => {
                            const isUser = message.searchResult?.DATA?.role === "user";
                            return (
                                <Box
                                    key={message.id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: isUser ? "flex-end" : "flex-start",
                                        gap: 1.5,
                                    }}
                                >
                                    {!isUser && (
                                        <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32, mt: 0.5 }}>
                                            <SmartToyIcon sx={{ fontSize: 18 }} />
                                        </Avatar>
                                    )}
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            px: 2.5,
                                            py: 1.5,
                                            maxWidth: "75%",
                                            borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                                            bgcolor: isUser ? "primary.main" : "grey.100",
                                            color: isUser ? "primary.contrastText" : "text.primary",
                                        }}
                                    >
                                        <ModuleProvider module="thread">
                                            <ItemProvider {...message.providerArgs}>
                                                <View id="content" />
                                            </ItemProvider>
                                        </ModuleProvider>
                                    </Paper>
                                    {isUser && (
                                        <Avatar sx={{ bgcolor: "grey.400", width: 32, height: 32, mt: 0.5 }}>
                                            <PersonIcon sx={{ fontSize: 18 }} />
                                        </Avatar>
                                    )}
                                </Box>
                            );
                        })
                    )}
                </Box>
            </Paper>

            {/* Input Area */}
            <Paper elevation={2} sx={{ borderRadius: 3, p: 1.5, flexShrink: 0, display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submitNewMessage();
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            bgcolor: "grey.50",
                        },
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={submitNewMessage}
                    disabled={!inputValue.trim()}
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        width: 42,
                        height: 42,
                        "&:hover": { bgcolor: "primary.dark" },
                        "&.Mui-disabled": { bgcolor: "grey.300", color: "grey.500" },
                    }}
                >
                    <SendIcon fontSize="small" />
                </IconButton>
            </Paper>
        </Box>
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