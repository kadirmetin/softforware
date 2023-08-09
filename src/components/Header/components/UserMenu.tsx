import React from "react";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth/core/types";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";

interface UserMenuProps {
  session: Session | null;
  settings: string[];
}

const UserMenu: React.FC<UserMenuProps> = ({ session, settings }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    if (window.innerWidth <= 899) {
      toggleDrawer();
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {session ? (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="profile pic" src={session.user.image!} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: 6,
              display: { xs: "none", md: "flex" },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
          </Menu>
          <SwipeableDrawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            PaperProps={{
              sx: {
                width: "25%",
                overflow: "visible",
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
            <MenuList>
              <MenuItem onClick={toggleDrawer}>
                <ListItemIcon>
                  <Avatar alt="profile pic" src={session.user.image!} />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <SettingsIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </MenuList>
          </SwipeableDrawer>
        </>
      ) : (
        <Tooltip title="Sign In">
          <IconButton onClick={() => signIn()} sx={{ p: 0 }}>
            <Avatar />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default UserMenu;
