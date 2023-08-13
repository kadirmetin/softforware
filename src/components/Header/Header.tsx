import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Box, Container, Toolbar } from "@mui/material";

import NavMenu from "./components/NavMenu";
import Search from "./components/Search";
import UserMenu from "./components/UserMenu";

const settings = ["Profile", "Account"];
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
              <Image
                src="/logo.png"
                alt="logo"
                width={84}
                height={84}
                priority
              />
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
