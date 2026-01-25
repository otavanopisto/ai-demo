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
import { useModAiIdefAgentSearchItemProvider } from "src/schema";
import { Card } from "@mui/material";
import { ItemProvider } from "@onzag/itemize/client/providers/item";
import View from "@onzag/itemize/client/components/property/View";
import I18nReadError from "@onzag/itemize/client/components/localization/I18nReadError";
import Link from "@onzag/itemize/client/components/navigation/Link";
import { ModuleProvider } from "@onzag/itemize/client/providers/module";

const cardStyle = {
  padding: "16px",
  marginBottom: "16px",

  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}

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
    <>
      {userData.role === "TEACHER" || userData.role === "ADMIN" ? <div>
        <Link to="/ai/agent/create" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            <I18nRead i18nId="add_bot" context="ai/agent" />
          </Button>
        </Link>
      </div> : null}
      {searchLoaded.error ? (
        <Typography color="error">
          <I18nReadError error={searchLoaded.error} />
        </Typography>
      ) : null}
      {searchLoaded.searchRecords.map((bot) => (
        <Link to={`/ai/agent/run/${bot.id}`} style={{ textDecoration: 'none' }} key={bot.id}>
          <Card sx={cardStyle}>
            <ModuleProvider module="ai">
              <ItemProvider {...bot.providerArgs}>
                <Box>
                  <View id="name" />
                </Box>
                <Box>
                  <View id="description" />
                </Box>
              </ItemProvider>
            </ModuleProvider>
          </Card>
        </Link>
      ))}
      {searchLoaded.isLoadingSearchResults || searchLoaded.searching ? (
        <Typography>
          <I18nRead i18nId="loading_bots" context="ai/agent" />
        </Typography>
      ) : (searchLoaded.searchRecords.length === 0 ? (
        <Typography>
          <I18nRead i18nId="no_bots" context="ai/agent" />
        </Typography>
      ) : null)}
    </>
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
