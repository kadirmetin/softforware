import React from "react";
import Image from "next/image";
import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  const handleSignOut = React.useCallback(async () => {
    try {
      await signOut({ redirect: false });
      void router.push("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  }, [router]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center justify-center">
            <Link href="/admin">
              <Image
                src={"/logo.png"}
                width={84}
                height={84}
                alt="logo"
                priority
              />
            </Link>
            <Typography
              align="center"
              variant="subtitle2"
              className="rounded-lg bg-slate-700 p-1 text-xs"
            >
              Admin Panel - BETA
            </Typography>
          </Box>
          <Box className="flex items-center justify-center">
            <Button onClick={handleSignOut} aria-label="Sign Out">
              <LogoutIcon fontSize="small" className="mr-1 text-white" />
              <Typography variant="subtitle2" className="text-white">
                Sign out
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
