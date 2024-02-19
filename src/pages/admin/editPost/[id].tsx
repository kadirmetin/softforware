import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import AlertMessage from "~/components/AlertMessage/AlertMessage";
import { Editor } from "~/components/Editor/Editor";
import PostInfo from "~/components/PostInfo/PostInfo";
import { api } from "~/utils/api";

const EditPost: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success" as "success" | "error",
    message: "",
  });

  const mutation = api.posts.updatePost.useMutation();
  const router = useRouter();
  const { id } = router.query;

  const {
    data: post,
    isLoading,
    error,
  } = api.posts.getPost.useQuery({
    postId: id as string,
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg" className="pt-5">
        <Typography variant="h6" textAlign="center">
          Yükleniyor...
        </Typography>
      </Container>
    );
  } else if (error) {
    return (
      <Container maxWidth="lg" className="pt-5">
        <Box display="flex" alignItems="center">
          <Typography variant="h6" textAlign="center">
            Bir hata oluştu: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  const handleEditPost = async () => {
    setLoading(true);

    try {
      await mutation.mutateAsync({
        postId: id as string,
        title,
        image,
        content,
        categoryId,
      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "Gönderi başarıyla düzenlendi!",
      });

      setTimeout(() => {
        router.push("/admin/listPosts").catch((err) => console.error(err));
      }, 1000);
    } catch (error) {
      console.error("Gönderi oluşturulurken bir hata oluştu:", error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Gönderi düzenlenirken bir hata oluştu.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Gönderi Düzenle | Softforware Blog</title>
      </Head>
      <Container maxWidth="lg" className="pt-5">
        <Typography variant="h4" className="mb-5">
          Gönderi Düzenle
        </Typography>
        <PostInfo
          onTitleChange={setTitle}
          onImageChange={setImage}
          onCategoryChange={setCategoryId}
          initialTitle={post?.title ?? ""}
          initialImage={post?.image ?? ""}
          initialCategoryId={post?.categoryId ?? ""}
        />
        <Editor
          onContentChange={(content) => setContent(content)}
          initialContent={post?.content ?? ""}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleEditPost}
          className="mb-5"
          disabled={loading}
        >
          Düzenle
        </Button>
      </Container>
      <AlertMessage
        open={snackbar.open}
        onClose={() =>
          setSnackbar({ open: false, severity: "success", message: "" })
        }
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </>
  );
};

export default EditPost;
