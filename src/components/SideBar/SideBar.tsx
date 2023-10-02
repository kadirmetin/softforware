import { Box, useMediaQuery, useTheme } from "@mui/material";
import Categories from "../Categories/Categories";

const SideBar = () => {
  const theme = useTheme();
  const screen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 4,
        mt: 2,
        mb: 2,
        ml: screen ? 0 : 2,
      }}
    >
      <Box>
        <Categories />
      </Box>
    </Box>
  );
};

export default SideBar;
