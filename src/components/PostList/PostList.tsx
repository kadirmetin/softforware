import { Box, Typography } from "@mui/material";
import { api } from "~/utils/api";
import CardItem from "./components/CardItem";
import SkeletonCardItem from "./components/SkeletonCardItem";

const PostList = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const count = data?.length ?? 3;

  if (isLoading) {
    return (
      <Box flex={2}>
        <SkeletonCardItem count={count} />
      </Box>
    );
  } else if (!data) {
    return (
      <Box flex={2} justifyContent={"center"} alignItems={"center"}>
        <Typography variant={"h6"} textAlign={"center"}>
          Henüz hiç gönderi yok.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 2 }}>
      {data.map((post) => (
        <CardItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          createdAt={post.createdAt}
          Category={post.Category ?? null}
          author={post.author}
        />
      ))}
    </Box>
  );
};

export default PostList;
