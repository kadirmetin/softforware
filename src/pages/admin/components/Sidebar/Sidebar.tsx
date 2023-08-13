import React from "react";
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
import { Dashboard, ChevronLeft, ChevronRight } from "@mui/icons-material";

//Tasarımda biraz daha uğraşılacak :')

const Sidebar = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Collapse in={checked} orientation="horizontal" collapsedSize={70}>
      <Box className={" h-screen w-60 items-center bg-[#2F2F2F]"}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
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
