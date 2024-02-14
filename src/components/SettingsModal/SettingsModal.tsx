import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "material-ui-snackbar-provider";
import Image from "next/image";
import React, { useEffect } from "react";
import { api } from "~/utils/api";

interface SettingsModalProps {
  open: boolean;
  handleClose: () => void;
  userId: string;
}

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#272727",
  maxHeight: "90%",
  borderRadius: 3,
  boxShadow: "inherit",
  padding: 3,
  flex: 1,
  overflowY: "auto",
  scrollbarWidth: "none",
};

const mobileStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%",
  backgroundColor: "#272727",
  boxShadow: "inherit",
  padding: 4,
  flex: 1,
  overflow: "auto",
  scrollbarWidth: "none",
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  handleClose,
  userId,
}) => {
  const { data, error } = api.user.getUser.useQuery({
    userId: userId ?? "",
  });
  const [name, setName] = React.useState<string | null>("");
  const [bio, setBio] = React.useState<string | null>("");
  const [website, setWebsite] = React.useState<string | null>("");
  const [linkedin, setLinkedin] = React.useState<string | null>("");
  const [twitter, setTwitter] = React.useState<string | null>("");
  const [github, setGithub] = React.useState<string | null>("");
  const [kaggle, setKaggle] = React.useState<string | null>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const mutation = api.user.updateUser.useMutation();
  const snackbar = useSnackbar();

  const isLargeScreen = useMediaQuery("(min-width: 900px)");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setBio(data.Profile?.bio ?? "");
      setWebsite(data.Profile?.website ?? "");
      setLinkedin(data.Profile?.linkedin ?? "");
      setTwitter(data.Profile?.twitter ?? "");
      setGithub(data.Profile?.github ?? "");
      setKaggle(data.Profile?.kaggle ?? "");
    }
  }, [data]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await mutation.mutateAsync({
        userId: userId,
        data: {
          name,
          bio,
          website,
          linkedin,
          twitter,
          github,
          kaggle,
        },
      });

      if (result) {
        snackbar.showMessage("Kullanıcı bilgileri başarıyla güncellendi.");
      } else {
        snackbar.showMessage(
          "Kullanıcı bilgileri güncellenirken bir hata oluştu."
        );
      }

      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.error(
        "Kullanıcı bilgileri güncellenirken bir hata oluştu:",
        error
      );

      snackbar.showMessage(
        "Kullanıcı bilgileri güncellenirken bir hata oluştu."
      );

      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={isLargeScreen ? style : mobileStyle}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Ayarlar</Typography>
          <Button
            onClick={handleClose}
            color="inherit"
            sx={{ borderRadius: 5, padding: 1, minWidth: 0 }}
          >
            <ClearIcon />
          </Button>
        </Box>
        {error ?? !data ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            paddingY={5}
          >
            <Typography textAlign={"center"}>
              Bir şeyler yanlış gitti.
            </Typography>
            <Typography textAlign={"center"}>
              Lütfen daha sonra tekrar deneyin.
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <Image
                src={`${data.image}`}
                height={150}
                width={150}
                style={{ borderRadius: "50%" }}
                alt="user image"
                priority
              />
            </Box>

            <Box justifyContent="center" alignItems="center" mt={3}>
              <TextField
                label="Ad ve Soyad"
                variant="outlined"
                fullWidth
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </Box>

            <Box justifyContent="center" alignItems="center" mt={2}>
              <TextField
                label="Biyografi"
                multiline
                rows={2}
                fullWidth
                value={bio}
                autoComplete="off"
                onChange={(e) => setBio(e.target.value)}
                disabled={isLoading}
              />
            </Box>

            {data.role === "ADMIN" && (
              <>
                <Box justifyContent={"center"} alignItems={"center"} mt={2}>
                  <TextField
                    label="Website"
                    variant="outlined"
                    fullWidth
                    value={website}
                    autoComplete="off"
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={isLoading}
                  />
                </Box>

                <Box justifyContent={"center"} alignItems={"center"} mt={2}>
                  <TextField
                    label="Github"
                    variant="outlined"
                    fullWidth
                    value={github}
                    autoComplete="off"
                    onChange={(e) => setGithub(e.target.value)}
                    disabled={isLoading}
                  />
                </Box>

                <Box justifyContent={"center"} alignItems={"center"} mt={2}>
                  <TextField
                    label="Linkedin"
                    variant="outlined"
                    fullWidth
                    value={linkedin}
                    autoComplete="off"
                    onChange={(e) => setLinkedin(e.target.value)}
                    disabled={isLoading}
                  />
                </Box>

                <Box justifyContent={"center"} alignItems={"center"} mt={2}>
                  <TextField
                    label="X"
                    variant="outlined"
                    fullWidth
                    value={twitter}
                    autoComplete="off"
                    onChange={(e) => setTwitter(e.target.value)}
                    disabled={isLoading}
                  />
                </Box>

                <Box justifyContent={"center"} alignItems={"center"} mt={2}>
                  <TextField
                    label="Kaggle"
                    variant="outlined"
                    fullWidth
                    value={kaggle}
                    autoComplete="off"
                    onChange={(e) => setKaggle(e.target.value)}
                    disabled={isLoading}
                  />
                </Box>
              </>
            )}

            <Box>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ borderRadius: 2, padding: 1, marginTop: 2 }}
                onClick={handleSave}
                disabled={isLoading}
              >
                Kaydet
              </Button>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                variant="caption"
                color="#e57373"
                mt={2}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Hesabı Sil
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SettingsModal;
