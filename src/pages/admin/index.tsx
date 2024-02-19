import { Box, Typography } from "@mui/material";

const AdminPage: React.FC = () => {
  return (
    <Box className="flex flex-col p-5">
      <Typography>Admin panele hoşgeldin, v.1.2 yayınlandı</Typography>
      <Typography>- Post listelemesi eklendi</Typography>
      <Typography>- Post düzenleme ve silme eklendi.</Typography>
    </Box>
  );
};

export default AdminPage;
