import { Box, Typography } from "@mui/material";

const AdminPage: React.FC = () => {
  return (
    <Box className="flex flex-col p-5">
      <Typography>Admin panele hoşgeldin, v.1.1 yayınlandı :)</Typography>
      <Typography>- Editor düzenlendi.</Typography>
      <Typography>- Editörün birkaç ufak hatası giderildi.</Typography>
    </Box>
  );
};

export default AdminPage;
