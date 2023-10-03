import { useRouter } from "next/router";
import { api } from "~/utils/api";
import React, { memo } from "react";
import { Box, Container, Typography } from "@mui/material";
import SideBar from "~/components/SideBar/SideBar";
import CardItem from "~/components/PostList/components/CardItem";

const CategoryPosts = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  if (typeof categoryId !== "string") {
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

  const {
    data: posts,
    isLoading,
    error,
  } = api.posts.getByCategory.useQuery({
    categoryId,
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
