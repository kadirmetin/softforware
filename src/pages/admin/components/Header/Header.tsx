import React from "react";
import Image from "next/image";
import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Oturum kapatılırken hata oluştu:", error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center justify-center">
            <Image
              src={"/logo.png"}
              width={84}
              height={84}
              alt="logo"
              priority
            />
            <Typography
              align="center"
              variant="subtitle2"
              className="rounded-lg bg-slate-700 p-1 text-xs"
            >
              Admin Panel
            </Typography>
          </Box>
          <Box className="flex items-center justify-center">
            <Button onClick={handleSignOut}>
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
