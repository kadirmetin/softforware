import { useRouter } from "next/router";
import { api } from "~/utils/api";
import React, { memo } from "react";
import { Box, Container } from "@mui/material";
import SideBar from "~/components/SideBar/SideBar";
import CardItem from "~/components/PostList/components/CardItem";

const CategoryPosts = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  if (typeof categoryId !== "string") {
    return <p>Loading or invalid category id...</p>;
  }

  const {
    data: posts,
    isLoading,
    error,
  } = api.posts.getByCategory.useQuery({
    categoryId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

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
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default memo(CategoryPosts);
