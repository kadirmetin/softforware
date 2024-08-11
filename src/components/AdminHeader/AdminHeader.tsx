import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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

  const goHome = async () => {
    try {
      await router.push("/");
    } catch (error) {
      console.error("Error going home: ", error);
    }
  };

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
              Admin Panel - v1.2
            </Typography>
          </Box>
          <Box className="flex items-center justify-center">
            <Button onClick={goHome} aria-label="Sign Out">
              <HomeIcon fontSize="small" className="mr-1 text-white" />
              <Typography variant="subtitle2" className="text-white">
                Anasayfa
              </Typography>
            </Button>
            <Button onClick={handleSignOut} aria-label="Sign Out">
              <LogoutIcon fontSize="small" className="mr-1 text-white" />
              <Typography variant="subtitle2" className="text-white">
                Çıkış Yap
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
