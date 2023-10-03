import React from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
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
  useMediaQuery,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

interface UserMenuProps {
  session: Session | null;
  settings: string[];
}

const UserMenu: React.FC<UserMenuProps> = ({ session, settings }) => {
  const [state, setState] = React.useState({
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLargeScreen = useMediaQuery("(min-width: 900px)");

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const goDashboard = async () => {
    try {
      await router.push("/admin");
    } catch (error) {
      console.error("Error navigating to dashboard:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {session ? (
        <>
          {isLargeScreen ? (
            <>
              <Tooltip title="Seçenekler">
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                  <Avatar alt="profile pic" src={session.user.image!} />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  mt: 1,
                }}
              >
                {session?.user.role === "ADMIN" && (
                  <MenuItem onClick={goDashboard}>
                    <Typography textAlign="center">Admin Paneli</Typography>
                  </MenuItem>
                )}
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleClose}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => signOut()}>Çıkış Yap</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Tooltip title="Seçenekler">
                <IconButton onClick={toggleDrawer("right", true)} sx={{ p: 0 }}>
                  <Avatar alt="profile pic" src={session.user.image!} />
                </IconButton>
              </Tooltip>

              <SwipeableDrawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
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
                <MenuList>
                  <MenuItem onClick={toggleDrawer("right", false)}>
                    <ListItemIcon>
                      <Avatar alt="profile pic" src={session.user.image!} />
                    </ListItemIcon>
                    <ListItemText>Profil</ListItemText>
                  </MenuItem>
                  <Divider />
                  {session?.user.role === "ADMIN" && (
                    <MenuItem onClick={goDashboard}>
                      <ListItemIcon>
                        <AdminPanelSettingsIcon fontSize="medium" />
                      </ListItemIcon>
                      <ListItemText>Admin Paneli</ListItemText>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <ListItemIcon>
                      <SettingsIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Ayarlar</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Çıkış Yap</ListItemText>
                  </MenuItem>
                </MenuList>
              </SwipeableDrawer>
            </>
          )}
        </>
      ) : (
        <Tooltip title="Giriş Yap">
          <IconButton onClick={() => signIn()} sx={{ p: 0 }}>
            <Avatar />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default UserMenu;
