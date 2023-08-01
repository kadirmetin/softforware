import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import NavMenu from "./components/NavMenu";
import Search from "./components/Search";
import UserMenu from "./components/UserMenu";

const settings = ["Profile", "Account", "Dashboard"];
const pages = ["Products", "Pricing", "Blog"];

function ResponsiveAppBar() {
  const { data: session } = useSession();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* WEBLOGO - START */}
          <Link href={"/"}>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Image src="/logo.png" alt="logo" width={84} height={150}/>
            </Box>
          </Link>
          {/* WEBLOGO - END */}

          {/* NAVMENU - START */}
          <NavMenu pages={pages} />
          {/* NAVMENU - END */}

          {/* SEARCH - START */}
          <Search />
          {/* SEARCH - END */}

          {/* USERMENU - START */}
          <UserMenu session={session} settings={settings} />
          {/* USERMENU - END */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
