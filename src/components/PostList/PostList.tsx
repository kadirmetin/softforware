import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import CardItem from "./components/CardItem";
import PaginationControls from "./components/PaginationControls";
import SkeletonCardItem from "./components/SkeletonCardItem";

const PostList = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = api.posts.getAll.useQuery();
  const count = data?.length ?? 3;

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = data?.slice(start, end);

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
      {entries?.map((post) => (
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

      <PaginationControls
        totalEntries={data?.length}
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
      />
    </Box>
  );
};

export default PostList;
