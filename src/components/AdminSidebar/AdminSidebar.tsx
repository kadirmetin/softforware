import {
  Add as AddIcon,
  ChevronLeft,
  ChevronRight,
  Dashboard,
} from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const router = useRouter();

  const handleListItemClick = async (path: string) => {
    try {
      await router.push(path);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Collapse in={checked} orientation="horizontal" collapsedSize={70}>
      <Box
        className={
          "h-full max-h-full min-h-screen w-60 items-center bg-[#272727]"
        }
      >
        <List>
          <ListItem
            disablePadding
            onClick={() => handleListItemClick("/admin")}
          >
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary={"Anasayfa"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleListItemClick("/admin/createPost")}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={"Gönderi Oluştur"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleListItemClick("/admin/listPosts")}
          >
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={"Gönderileri Listele"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleChange}>
              <ListItemIcon>
                {checked ? <ChevronLeft /> : <ChevronRight />}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Collapse>
  );
};

export default Sidebar;
