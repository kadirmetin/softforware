import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { memo } from "react";
import CardItem from "~/components/PostList/components/CardItem";
import SideBar from "~/components/SideBar/SideBar";
import { api } from "~/utils/api";

const CategoryPosts = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const {
    data: posts,
    isLoading,
    error,
  } = api.posts.getByCategory.useQuery({
    categoryId: categoryId?.toString() ?? "",
  });

  if (isLoading) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        Yükleniyor...
      </Typography>
    );
  }

  if (error)
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyin.
      </Typography>
    );

  return (
    <div>
      {posts && posts.length > 0 ? (
        <Container
          maxWidth={"xl"}
          sx={{
            display: { xs: "block", md: "flex" },
            backgroundColor: "secondary",
          }}
        >
          <Box
            sx={{
              flex: 2,
            }}
          >
            {posts.map((post) => (
              <CardItem
                key={post.id}
                Category={post.Category}
                author={post.author}
                createdAt={post.createdAt}
                id={post.id}
                image={post.image}
                title={post.title}
              />
            ))}
          </Box>
          <SideBar />
        </Container>
      ) : (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "87vh",
          }}
        >
          Kategoriye ait herhangi bir yazı yok.
        </Typography>
      )}
    </div>
  );
};

export default memo(CategoryPosts);
