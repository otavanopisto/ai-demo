import React from "react";

import Route from "@onzag/itemize/client/components/navigation/Route";

import { Navbar } from "@onzag/itemize/client/fast-prototyping/components/navbar";
import { IMenuEntry } from "@onzag/itemize/client/fast-prototyping/components/navbar/menu";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import { Frontpage } from "./pages/frontpage";
import { Contact } from "./pages/contact";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { TermsAndConditions } from "./pages/terms-and-conditions";
import { ResetPassword } from "./pages/reset-password";
import { Profile } from "./pages/profile";
import { Preferences } from "./pages/preferences";
import { MyProfile } from "./pages/my-profile";
import { ChangePassword } from "./pages/change-password";
import { News } from "./pages/news";
import { CMS } from "./pages/cms";

import { Avatar } from "./components/avatar";
import { Footer } from "./components/footer";
import { LoginDialog } from "./components/login-dialog";
import { SignupDialog } from "./components/signup-dialog";
import { RecoverDialog } from "./components/recover-dialog";

// this is for accessibility, use with the AltBadgeReactioner in order to supercharge
// accessibility
import { AltSectionScroller } from "@onzag/itemize/client/fast-prototyping/components/alt-section-scroller";

// analytics track for page and page_offline track
import PageTimetrack from "@onzag/itemize/client/components/analytics/PageTimetrack";

import Ai from "./pages/ai";

/**
 * The default admin entries
 */
export const MENU_ADMIN_ENTRIES: IMenuEntry[] = [
  {
    path: "/cms",
    icon: <ImportantDevicesIcon/>,
    module: "cms",
    role: "ADMIN",
    i18nProps: {
      i18nId: "name",
      capitalize: true,
    },
  },
];

/**
 * The default menu entries
 */
export const MENU_ENTRIES: IMenuEntry[] = [
  {
    path: "/",
    icon: <HomeIcon />,
    i18nProps: {
      i18nId: "home",
      capitalize: true,
    },
  },
  {
    path: "/news",
    icon: <LibraryBooksIcon />,
    module: "cms",
    idef: "article",
    i18nProps: {
      i18nId: "news",
      capitalize: true,
    },
  },
];

export default function App() {
  return (
    <>
      <Navbar
        LoginDialog={LoginDialog}
        SignupDialog={SignupDialog}
        RecoverDialog={RecoverDialog}
        menuEntries={MENU_ENTRIES}
        menuAdminEntries={MENU_ADMIN_ENTRIES}
        avatarContextProperties={
          [
            "username",
            "app_country",
            "phone",
            "p_validated",
            "email",
            "e_validated",
            "role",
            "address",
            "profile_picture",
          ]
        }
        AvatarComponent={Avatar}
        avatarProps={{
          cacheImage: true,
          profileURL: "/my-profile",
          showWarnings: true,
        }}
      />

      <Route path="/" exact={true} component={Frontpage}/>

      <Route path="/profile/:id" component={Profile}/>
      <Route path="/my-profile" component={MyProfile}/>
      <Route path="/preferences" component={Preferences}/>
      <Route path="/news" component={News}/>

      <Route path="/reset-password" component={ResetPassword}/>
      <Route path="/change-password" component={ChangePassword}/>

      <Route path="/cms" component={CMS}/>

      <Route path="/privacy-policy" component={PrivacyPolicy}/>
      <Route path="/terms-and-conditions" component={TermsAndConditions}/>
      <Route path="/contact" component={Contact}/>

      <Route path="/ai" component={Ai} />

      <Footer/>

      <AltSectionScroller parentSelector="html" positioning="fixed"/>

      <PageTimetrack trackId="page" enabled={true} trackOfflineAtTrack="page_offline"/>
    </>
  );
}
