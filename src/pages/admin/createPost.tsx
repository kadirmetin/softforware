import { Button, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";

import { api } from "~/utils/api";
import Editor from "./components/Editor";
import PostInfo from "./components/PostInfo";
import AlertMessage from "./components/AlertMessage";

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
      }, 5000);
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
        <PostInfo
          onTitleChange={setTitle}
          onImageChange={setImage}
          onCategoryChange={setCategoryId}
        />
        <Editor onContentChange={setContent} />
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
