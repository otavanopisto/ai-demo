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
import { Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import SearchLoader from "@onzag/itemize/client/components/search/SearchLoader";
import Route from "@onzag/itemize/client/components/navigation/Route";
import RequestNewOrEdit from "./request";

export function RequestList() {
  return (
    <ModuleProvider module="permissioncard">
      <ItemProvider
        itemDefinition="request"
        properties={[
          "title",
          "description",
          "status",
          "created_by",
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
                  "title",
                  "description",
                  "status",
                  "created_by",
                ]}
                automaticSearch={{
                    limit: 100,
                    offset: 0,
                    requestedProperties: ["message"],
                    searchByProperties: [],
                    createdBy: isAdminOrTeacher ? undefined : userData.id,
                    traditional: true,
                }}
                automaticSearchIsOnlyInitial={true}
                searchCounterpart={true}
              >
                <I18nRead i18nId="requests" capitalize={true}>
                  {(i18nRequests: string) => (
                    <TitleSetter>
                      {i18nRequests}
                    </TitleSetter>
                  )}
                </I18nRead>

                <Paper style={{ padding: "2rem", margin: "2rem auto", maxWidth: "800px" }}>
                  <I18nRead i18nId="requests" capitalize={true}>
                    {(i18nRequests: string) => (
                      <Typography variant="h4" gutterBottom>
                        {i18nRequests}
                      </Typography>
                    )}
                  </I18nRead>

                  <SearchLoader currentPage={0} pageSize={100}>
                    {(arg) => {
                      if (arg.searching) {
                        return (
                          <Typography>
                            <I18nRead i18nId="loading" />
                          </Typography>
                        );
                      }

                      const records = arg.searchRecords

                      if (records.length === 0) {
                        return (
                          <Typography>
                            <I18nRead i18nId="no_requests_found" />
                          </Typography>
                        );
                      }

                      return (
                        <List>
                          {records.map((record, index) => (
                            <ItemProvider {...record.providerArgs}>
                              {index > 0 && <Divider />}
                              <ListItem alignItems="flex-start">
                                <ListItemText
                                  primary={
                                    <ItemProvider
                                        itemDefinition="user"
                                        forId={record.getAppliedValue().flattenedValue.created_by as string}
                                        properties={["username"]}
                                    >
                                      <Reader id="username">
                                        {(username: string) => (
                                          <Typography variant="h6">{username}</Typography>
                                        )}
                                      </Reader>
                                    </ItemProvider>
                                  }
                                  secondary={
                                    <View id="message" />
                                  }
                                />
                              </ListItem>
                            </ItemProvider>
                          ))}
                        </List>
                      );
                    }}
                  </SearchLoader>
                </Paper>
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