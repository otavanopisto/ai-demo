import React from "react";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import Entry from "@onzag/itemize/client/components/property/Entry";
import View from "@onzag/itemize/client/components/property/View";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import Reader from "@onzag/itemize/client/components/property/Reader";
import UserDataRetriever from "@onzag/itemize/client/components/user/UserDataRetriever";
import { IActionResponseWithValue } from "@onzag/itemize/client/providers/item";
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box, Avatar, CircularProgress, Stack, ListItemAvatar, Chip } from "@mui/material";
import SearchLoader from "@onzag/itemize/client/components/search/SearchLoader";
import Route from "@onzag/itemize/client/components/navigation/Route";
import RequestNewOrEdit from "./request";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import InboxIcon from "@mui/icons-material/Inbox";
import Link from "@onzag/itemize/client/components/navigation/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export function RequestList() {
  return (
    <ModuleProvider module="permissioncard">
      <ItemProvider
        itemDefinition="request"
        properties={[
          "message",
          "approved",
        ]}
        searchCounterpart={true}
      >
        <UserDataRetriever>
          {(userData) => {
            const isAdminOrTeacher = userData.role === "ADMIN" || userData.role === "TEACHER";

            return (
              <ItemProvider
                itemDefinition="request"
                properties={[
                  "message",
                  "approved",
                ]}
                automaticSearch={{
                  limit: 50,
                  offset: 0,
                  requestedProperties: ["message", "approved"],
                  searchByProperties: [],
                  createdBy: isAdminOrTeacher ? undefined : userData.id,
                  traditional: true,
                }}
                automaticSearchIsOnlyInitial={true}
                automaticSearchForce={true}
                searchCounterpart={true}
              >
                <I18nRead i18nId="requests" capitalize={true}>
                  {(i18nRequests: string) => (
                    <TitleSetter>
                      {i18nRequests}
                    </TitleSetter>
                  )}
                </I18nRead>

                <Box sx={{ maxWidth: 800, mx: "auto", py: 4, px: 2 }}>
                  {/* Header */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                      <AdminPanelSettingsIcon />
                    </Avatar>
                    <I18nRead i18nId="requests" capitalize={true}>
                      {(i18nRequests: string) => (
                        <Typography variant="h5" fontWeight={700}>
                          {i18nRequests}
                        </Typography>
                      )}
                    </I18nRead>
                  </Box>

                  <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
                    <SearchLoader currentPage={0} pageSize={100}>
                      {(arg) => {
                        if (arg.searching) {
                          return (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, py: 6 }}>
                              <CircularProgress size={24} />
                              <Typography variant="body2" color="text.secondary">
                                <I18nRead i18nId="loading" />
                              </Typography>
                            </Box>
                          );
                        }

                        const records = arg.searchRecords

                        if (records.length === 0) {
                          return (
                            <Box sx={{ py: 8, textAlign: "center" }}>
                              <InboxIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1.5 }} />
                              <Typography variant="body1" color="text.secondary">
                                <I18nRead i18nId="no_requests_found" />
                              </Typography>
                            </Box>
                          );
                        }

                        return (
                          <List disablePadding>
                            {records.map((record, index) => (
                              <ItemProvider key={record.id} {...record.providerArgs}>
                                {index > 0 && <Divider component="li" />}
                                <Link to={`/request/edit/${record.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                  <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                      px: 3,
                                      py: 2,
                                      transition: "background-color 0.15s",
                                      "&:hover": { bgcolor: "action.hover" },
                                      cursor: "pointer",
                                    }}
                                  >
                                    <ListItemAvatar>
                                      <Avatar sx={{ bgcolor: "primary.light", color: "primary.dark" }}>
                                        <PersonIcon />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                          <Reader id="created_by">
                                            {(createdBy: string) => (
                                              <ModuleProvider module="users">
                                                <ItemProvider
                                                  itemDefinition="user"
                                                  forId={createdBy}
                                                  properties={["username"]}
                                                >
                                                  <Reader id="username">
                                                    {(username: string) => (
                                                      <Typography variant="subtitle1" fontWeight={600}>{username || createdBy}</Typography>
                                                    )}
                                                  </Reader>
                                                </ItemProvider>
                                              </ModuleProvider>
                                            )}
                                          </Reader>
                                          <Reader id="approved">
                                            {(approved: boolean) => (
                                              <Chip
                                                size="small"
                                                icon={approved ? <CheckCircleIcon /> : <HourglassEmptyIcon />}
                                                label={<I18nRead i18nId={approved ? "approved" : "pending"} />}
                                                color={approved ? "success" : "warning"}
                                                variant="outlined"
                                                sx={{ fontWeight: 500 }}
                                              />
                                            )}
                                          </Reader>
                                        </Box>
                                      }
                                      secondary={
                                        <Typography variant="body2" color="text.secondary" component="span">
                                          <View id="message" />
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                </Link>
                              </ItemProvider>
                            ))}
                          </List>
                        );
                      }}
                    </SearchLoader>
                  </Paper>
                </Box>
              </ItemProvider>
            );
          }}
        </UserDataRetriever>
      </ItemProvider>
    </ModuleProvider>
  );
}

export default function Requests() {
  return (
    <>
      <Route path="/request" component={RequestNewOrEdit} />
      <Route path="/requests" component={RequestList} />
    </>
  );
}