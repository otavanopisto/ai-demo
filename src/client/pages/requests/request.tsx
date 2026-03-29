import React from "react";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import Entry from "@onzag/itemize/client/components/property/Entry";
import View from "@onzag/itemize/client/components/property/View";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import UserDataRetriever, { useUserDataRetriever } from "@onzag/itemize/client/components/user/UserDataRetriever";
import Route from "@onzag/itemize/client/components/navigation/Route"
import { SubmitButton } from "@onzag/itemize/client/fast-prototyping/components/buttons";
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box, Avatar, Stack, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import SubmitActioner from "@onzag/itemize/client/components/item/SubmitActioner";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Snackbar from "@onzag/itemize/client/fast-prototyping/components/snackbar";
import Reader from "@onzag/itemize/client/components/property/Reader";
import Link from "@onzag/itemize/client/components/navigation/Link";

function EditOrNewRequest() {
  const params = useParams<{ id?: string }>();
  const isEdit = !!params.id;
  const userData = useUserDataRetriever();
  const isAdmin = userData.role === "ADMIN";

  return (
    <ModuleProvider module="permissioncard">
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
              forId={isEdit ? params.id : null}
              loadUnversionedFallback={true}
            >
              <I18nRead i18nId={isEdit ? "edit_request" : "new_request"} capitalize={true}>
                {(i18nTitle: string) => (
                  <>
                    <TitleSetter>
                      {i18nTitle}
                    </TitleSetter>
                    <Box sx={{ maxWidth: 640, mx: "auto", py: 4, px: 2 }}>
                      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
                        {/* Header */}
                        <Box
                          sx={{
                            px: 4,
                            py: 3,
                            background: isEdit
                              ? "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
                              : "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: isEdit ? "primary.main" : "success.main",
                                width: 48,
                                height: 48,
                              }}
                            >
                              {isEdit ? <EditNoteIcon /> : <AssignmentIcon />}
                            </Avatar>
                            <Typography variant="h5" fontWeight={700}>
                              {i18nTitle}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />

                        {/* Form Body */}
                        <Box sx={{ px: 4, py: 3 }}>
                          <Stack spacing={3}>
                            <Entry id="message" />

                            {isAdminOrTeacher ? (
                              <Entry id="approved" />
                            ) : (
                              isEdit ? (
                                <Box
                                  sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: "grey.50",
                                    border: "1px solid",
                                    borderColor: "divider",
                                  }}
                                >
                                  <Reader id="approved">
                                    {(approved: boolean) => (
                                      <Typography>
                                        <strong>
                                          <I18nRead i18nId="approved_status" />:
                                        </strong>{" "}
                                        {approved ? (
                                          <I18nRead i18nId="approved" />
                                        ) : (
                                          <I18nRead i18nId="pending" />
                                        )}
                                      </Typography>
                                    )}
                                  </Reader>
                                </Box>
                              ) : null
                            )}
                            {isEdit && isAdmin && (
                              <Reader id="created_by">
                                {(createdBy: string) => (
                                  <Link to={`/profile/${createdBy}`} style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                                    <I18nRead i18nId="check_role" >
                                      {(i18nCheckRole: string) => (
                                        <Chip
                                          size="small"
                                          icon={<ManageAccountsIcon />}
                                          label={i18nCheckRole}
                                          color="info"
                                          variant="outlined"
                                          clickable
                                          sx={{ fontWeight: 500 }}
                                        />
                                      )}
                                    </I18nRead>
                                  </Link>
                                )}
                              </Reader>
                            )}
                          </Stack>
                        </Box>

                        <Divider />

                        {/* Footer / Submit */}
                        <Box sx={{ px: 4, py: 2.5, display: "flex", justifyContent: "flex-end", bgcolor: "grey.50" }}>
                          <SubmitActioner>
                            {(actioner) => (
                              <>
                                <SubmitButton
                                  i18nId={isEdit ? "edit" : "submit"}
                                  buttonVariant="contained"
                                  buttonColor="primary"
                                  buttonSx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1,
                                  }}
                                  redirectOnSuccess={isEdit ? null : (status) => `/request/edit/${status.id}`}
                                  redirectGoBack={isEdit}
                                  options={{
                                    properties: [
                                      "message",
                                      ...(isAdminOrTeacher ? ["approved"] : []),
                                    ],
                                    action: isEdit ? "edit" : "add",
                                  }}
                                />
                                <Snackbar
                                  i18nDisplay={actioner.submitError}
                                  severity="error"
                                  id="submit-error"
                                  open={!!actioner.submitError}
                                  onClose={actioner.dismissError}
                                />
                              </>
                            )}
                          </SubmitActioner>
                        </Box>
                      </Paper>
                    </Box>
                  </>
                )}
              </I18nRead>
            </ItemProvider>
          );
        }}
      </UserDataRetriever>
    </ModuleProvider>
  );
}

export default function RequestNewOrEdit() {
  return (
    <>
      <Route path="/request/new" component={EditOrNewRequest} exact={true} />
      <Route path="/request/edit/:id" component={EditOrNewRequest} exact={true} />
    </>
  );
}