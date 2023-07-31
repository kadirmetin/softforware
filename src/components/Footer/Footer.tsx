import { Box, Container, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#272727",
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            Softforware
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}
