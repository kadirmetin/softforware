import { Button, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
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

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync({
        title,
        image,
        content,
        authorId: session?.user?.id ?? "defaultAuthorId",
        categoryId,
      });

      setSnackbarMessage("Post successfully created!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setInterval(function () {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Post creation failed:", error);

      setSnackbarMessage("Error creating post!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Head>
        <title>Create Post | Softforware</title>
      </Head>
      <Container maxWidth="lg" className="pt-5">
        <Typography variant="h4" className="mb-5">
          Create Post
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
          Submit
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
