import { Button, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AlertMessage from "~/components/AlertMessage/AlertMessage";
import { Editor } from "~/components/Editor/Editor";
import PostInfo from "~/components/PostInfo/PostInfo";
import { api } from "~/utils/api";

const CreatePost: React.FC = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const mutation = api.posts.createPost.useMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync({
        title,
        image,
        content,
        authorId: session?.user?.id ?? "defaultAuthorId",
        categoryId,
      });

      setSnackbarMessage("Gönderi başarıyla oluşturuldu!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        router.push("/admin/listPosts").catch((err) => console.error(err));
      }, 1000);
    } catch (error) {
      console.error("Gönderi oluşturulurken bir hata oluştu:", error);

      setSnackbarMessage("Gönderi oluşturulurken bir hata oluştu!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Head>
        <title>Gönderi Oluştur | Softforware Blog</title>
      </Head>
      <Container maxWidth="lg" className="pt-5">
        <Typography variant="h4" className="mb-5">
          Gönderi Oluştur
        </Typography>
        <PostInfo
          onTitleChange={setTitle}
          onImageChange={setImage}
          onCategoryChange={setCategoryId}
        />
        <Editor onContentChange={(content) => setContent(content)} />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
          className="mb-5"
        >
          Gönder
        </Button>
      </Container>
      <AlertMessage
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};

export default CreatePost;
