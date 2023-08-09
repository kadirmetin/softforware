import React from "react";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItemText,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

interface NavMenuProps {
  pages: string[];
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
          },
        }}
      >
        <List>
          {pages.map((page) => (
            <ListItemButton key={page} onClick={toggleDrawer}>
              <ListItemText primary={page} />
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
          <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default NavMenu;
