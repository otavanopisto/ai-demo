import React from "react";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import Entry from "@onzag/itemize/client/components/property/Entry";
import View from "@onzag/itemize/client/components/property/View";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import UserDataRetriever from "@onzag/itemize/client/components/user/UserDataRetriever";
import Route from "@onzag/itemize/client/components/navigation/Route"
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import { Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import SubmitActioner from "@onzag/itemize/client/components/item/SubmitActioner";

function EditOrNewRequest() {
  const params = useParams<{ id?: string }>();
  const isEdit = !!params.id;

  return (
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
              "approved",
            ]}
            forId={isEdit ? params.id : null}
            loadUnversionedFallback={true}
          >
            <I18nRead i18nId={isEdit ? "edit_request" : "new_request"} capitalize={true}>
              {(i18nTitle: string) => (
                <>
                  <TitleSetter>
                    {i18nTitle}
                  </TitleSetter>
                  <Paper style={{ padding: "2rem", margin: "2rem auto", maxWidth: "800px" }}>
                    <Typography variant="h4" gutterBottom>
                      {i18nTitle}
                    </Typography>

                    <Entry id="title" />
                    <Entry id="description" />
                    <Entry id="status" />

                    {isAdminOrTeacher ? (
                      <Entry id="approved" />
                    ) : (
                      <View id="approved" />
                    )}

                    <SubmitActioner>
                      {(actioner) => (
                        <SubmitButton
                          i18nId={isEdit ? "edit" : "submit"}
                          buttonVariant="contained"
                          buttonColor="primary"
                          options={{
                            properties: [
                              "title",
                              "description",
                              "status",
                              ...(isAdminOrTeacher ? ["approved"] : []),
                            ],
                            action: isEdit ? "edit" : "add",
                          }}
                        />
                      )}
                    </SubmitActioner>
                  </Paper>
                </>
              )}
            </I18nRead>
          </ItemProvider>
        );
      }}
    </UserDataRetriever>
  );
}

export default function RequestNewOrEdit() {
  return (
    <>
        <Route path="/request/new" component={EditOrNewRequest} exact={true} />
        <Route path="/request/edit/:id" component={EditOrNewRequest } exact={true} />
    </>
  );
}