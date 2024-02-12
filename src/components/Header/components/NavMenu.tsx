import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import Image from "next/image";
import React from "react";

interface Page {
  id: number;
  title: string;
  url: string;
}

interface NavMenuProps {
  pages: Page[];
}

const NavMenu: React.FC<NavMenuProps> = ({ pages }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="Open drawer"
          onClick={toggleDrawer}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        PaperProps={{
          sx: {
            width: "50%",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <List>
          {pages.map((page) => (
            <ListItemButton
              key={page.id}
              onClick={toggleDrawer}
              href={page.url}
            >
              <ListItemText primary={page.title} />
            </ListItemButton>
          ))}
        </List>
      </SwipeableDrawer>

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 2,
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Link href="/">
          <Image src="/logo.png" alt="logo" height={84} width={84} priority />
        </Link>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.id}
            sx={{ my: 2, color: "white", display: "block" }}
            href={page.url}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default NavMenu;
