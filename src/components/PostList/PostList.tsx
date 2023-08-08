import React from "react";
import { Box } from "@mui/material";

import { api } from "~/utils/api";

import SkeletonCardItem from "./components/SkeletonCardItem";
import CardItem from "./components/CardItem";

const PostList = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const count = data?.length ?? 3;

  return (
    <Box sx={{ flex: 2 }}>
      {isLoading ? (
        <SkeletonCardItem count={count} />
      ) : (
        data?.map((post) => (
          <CardItem
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
            createdAt={post.createdAt}
            Category={post.Category ?? null}
            author={{
              name: post.author?.name ?? null,
            }}
          />
        ))
      )}
    </Box>
  );
};

export default PostList;
