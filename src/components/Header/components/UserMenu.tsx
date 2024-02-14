import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
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
  useMediaQuery,
} from "@mui/material";
import type { Session } from "next-auth/core/types";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import SettingsModal from "~/components/SettingsModal/SettingsModal";

interface UserMenuProps {
  session: Session | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ session }) => {
  const [state, setState] = React.useState({
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);

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
      state.right = false;
      setAnchorEl(null);
      await router.push("/admin");
    } catch (error) {
      console.error("Error navigating to dashboard:", error);
    }
  };

  const goProfile = async () => {
    try {
      state.right = false;
      setAnchorEl(null);
      await router.push(`/profile/${session?.user.id}`);
    } catch (error) {
      console.error("Error navigating to profile:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setAnchorEl(null);
    state.right = false;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
                {session?.user.role === "ADMIN" && [
                  <MenuItem key="admin-dashboard" onClick={goDashboard}>
                    Admin Paneli
                  </MenuItem>,
                  <MenuItem key="admin-profile" onClick={goProfile}>
                    Profil
                  </MenuItem>,
                ]}
                <MenuItem onClick={() => handleOpenModal()}>Ayarlar</MenuItem>
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
                  <ListItemText sx={{ textAlign: "center", padding: 1 }}>
                    MENU
                  </ListItemText>
                  <Divider />
                  {session?.user.role === "ADMIN" && (
                    <MenuItem key="admin-panel-mobile" onClick={goDashboard}>
                      <ListItemIcon>
                        <AdminPanelSettingsIcon fontSize="medium" />
                      </ListItemIcon>
                      Admin Paneli
                    </MenuItem>
                  )}
                  {session?.user.role === "ADMIN" && (
                    <MenuItem key="admin-profile-mobile" onClick={goProfile}>
                      <ListItemIcon>
                        <Avatar alt="profile pic" src={session.user.image!} />
                      </ListItemIcon>
                      Profil
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleOpenModal}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="medium" />
                    </ListItemIcon>
                    Ayarlar
                  </MenuItem>
                  <MenuItem
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="medium" />
                    </ListItemIcon>
                    Çıkış Yap
                  </MenuItem>
                </MenuList>
              </SwipeableDrawer>
            </>
          )}
          <SettingsModal
            key={openModal ? "open" : "closed"}
            open={openModal}
            handleClose={handleCloseModal}
            userId={session.user.id}
          />
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
