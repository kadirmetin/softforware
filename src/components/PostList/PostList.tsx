import { Box } from "@mui/material";

import { api } from "~/utils/api";
import CardItem from "./Components/CardItem";

const PostList = () => {
  const { data } = api.posts.getAll.useQuery();

  return (
    <Box
      sx={{
        flex: 2,
      }}
    >
      {data?.map((post) => (
        <CardItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          createdAt={post.createdAt}
          Category={post.Category || null}
          author={{
            name: post.author?.name || null,
          }}
        />
      ))}
    </Box>
  );
};

export default PostList;
