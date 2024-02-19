import { Box, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Table from "~/components/Table/Table";
import { api } from "~/utils/api";

const ListPosts: React.FC = ({}) => {
  const { data: session } = useSession();

  const {
    data: postsData,
    isLoading,
    error,
  } = api.posts.getUserPosts.useQuery({
    authorId: session?.user.id ?? "",
  });

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        className="pt-5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" textAlign={"center"}>
          Yükleniyor...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="pt-5">
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="h6" textAlign={"center"}>
            Bir hata oluştu: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Gönderileri Listele | Softforware Blog</title>
      </Head>
      <Container maxWidth="lg" className="pt-5">
        <Typography variant="h4" className="mb-5">
          Gönderileri Listele
        </Typography>
        <Table
          rows={postsData.map((post) => {
            return {
              title: post.title,
              category: post.Category?.name,
              createdAt: new Date(post.createdAt).toLocaleDateString("tr-TR"),
              author: post.author.name,
              postId: post.id,
            };
          })}
        />
      </Container>
    </>
  );
};

export default ListPosts;
