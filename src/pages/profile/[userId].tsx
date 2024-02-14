import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ProfileView from "~/components/ProfileView/ProfileView";
import { api } from "~/utils/api";

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, isLoading, error } = api.user.getUser.useQuery({
    userId: userId?.toString() ?? "",
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  } else if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        <Typography>Bir şeyler yanlış gitti.</Typography>
        <Typography>{error.message}</Typography>
      </Box>
    );
  } else if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        <Typography>Kullanıcı bulunamadı.</Typography>
      </Box>
    );
  }

  return <ProfileView user={data} />;
};

export default Profile;
