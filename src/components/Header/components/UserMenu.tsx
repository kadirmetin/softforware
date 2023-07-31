import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth/core/types";

interface UserMenuProps {
  session: Session | null;
  settings: string[];
}

const UserMenu: React.FC<UserMenuProps> = ({ session, settings }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            sx={{ mt: "45px" }}
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
