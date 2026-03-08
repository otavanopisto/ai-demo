import React from "react";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import { Articles } from "./articles";
import { Hero } from "./hero";
import { Social } from "./social";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useUserDataRetriever } from "@onzag/itemize/client/components/user/UserDataRetriever";
import { useItemProvider } from "@onzag/itemize/client/providers/item/hook";
import { useModAiIdefAgentSearchItemProvider } from "../../../schema";
import { Card, CircularProgress, Divider, Avatar, Stack } from "@mui/material";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import View from "@onzag/itemize/client/components/property/View";
import I18nReadError from "@onzag/itemize/client/components/localization/I18nReadError";
import Link from "@onzag/itemize/client/components/navigation/Link";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AddIcon from "@mui/icons-material/Add";

const cardStyle = {
  p: 0,
  borderRadius: 3,
  overflow: "hidden",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-2px)",
  },
};

function LoggedInView() {
  const userData = useUserDataRetriever();
  const allBots = useModAiIdefAgentSearchItemProvider({
    automaticSearch: {
      limit: 100,
      offset: 0,
      requestedProperties: ["name", "description"],
      searchByProperties: [],
      traditional: true,
    },
    automaticSearchForce: true,
  });
  const searchLoaded = allBots.useSearchLoader({
    currentPage: 0,
    pageSize: 100,
    startInSearchingState: true,
  });
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: 4, px: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
            <SmartToyIcon />
          </Avatar>
          <Typography variant="h5" fontWeight={700}>
            <I18nRead i18nId="available_agents" context="ai/agent" />
          </Typography>
        </Box>
        {userData.role === "TEACHER" || userData.role === "ADMIN" ? (
          <Link to="/ai/agent/create" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, px: 3 }}
            >
              <I18nRead i18nId="add_bot" context="ai/agent" />
            </Button>
          </Link>
        ) : null}
      </Box>

      {searchLoaded.error ? (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: "error.light", mb: 2 }}>
          <Typography color="error.dark" variant="body2">
            <I18nReadError error={searchLoaded.error} />
          </Typography>
        </Paper>
      ) : null}

      {/* Agent Cards */}
      <Stack spacing={2}>
        {searchLoaded.searchRecords.map((bot) => (
          <Link to={`/ai/agent/run/${bot.id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={bot.id}>
            <Card sx={cardStyle} variant="outlined">
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, p: 3 }}>
                <Avatar sx={{ bgcolor: "primary.light", color: "primary.dark", width: 44, height: 44 }}>
                  <SmartToyIcon />
                </Avatar>
                <ModuleProvider module="ai">
                  <ItemProvider {...bot.providerArgs}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        <View id="name" />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <View id="description" />
                      </Typography>
                    </Box>
                  </ItemProvider>
                </ModuleProvider>
              </Box>
            </Card>
          </Link>
        ))}
      </Stack>

      {searchLoaded.isLoadingSearchResults || searchLoaded.searching ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, py: 6 }}>
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary">
            <I18nRead i18nId="loading_bots" context="ai/agent" />
          </Typography>
        </Box>
      ) : (searchLoaded.searchRecords.length === 0 ? (
        <Paper elevation={0} sx={{ py: 8, textAlign: "center", bgcolor: "grey.50", borderRadius: 3, mt: 2 }}>
          <SmartToyIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1.5 }} />
          <Typography variant="body1" color="text.secondary">
            <I18nRead i18nId="no_bots" context="ai/agent" />
          </Typography>
        </Paper>
      ) : null)}
    </Box>
  )
}


/**
 * Provides the frontpage
 */
export function Frontpage() {
  const userData = useUserDataRetriever();
  return (
    <>
      <I18nRead i18nId="app_name" capitalize={true}>
        {(i18nAppName: string) => {
          return (
            <TitleSetter>
              {i18nAppName}
            </TitleSetter>
          );
        }}
      </I18nRead>
      {!userData.id ? (
        <>
          <Hero />
          <Articles />
          <Social />
        </>
      ) : <LoggedInView />}
    </>
  );
}
