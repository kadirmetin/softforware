import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const AdminPage: React.FC = () => {
  const { data: session } = useSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="block items-center justify-center text-center">
          <Typography variant="h6">Bu sayfaya erişim izniniz yok.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6">
        Hoşgeldin, {session.user.name} - {session.user.role}
      </Typography>
      <Typography variant="h6">Admin panelindesin!</Typography>
    </Box>
  );
};

export default AdminPage;
