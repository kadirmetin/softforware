import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import { useCallback } from "react";

function ScrollToTop() {
  const trigger = useScrollTrigger({
    threshold: 100,
  });
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Fade in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1,
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="default"
          size="small"
          aria-label="Scroll back to top"
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ backgroundColor: "white", borderRadius: "50%", p: 1 }}
          >
            <KeyboardArrowUp fontSize="medium" />
          </Box>
        </Fab>
      </Box>
    </Fade>
  );
}
export default ScrollToTop;
