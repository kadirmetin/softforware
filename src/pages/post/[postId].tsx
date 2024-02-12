import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { PostView } from "~/components/PostView/PostView";
import { SkeletonPostView } from "~/components/PostView/components/SkeletonPostView";
import { api } from "~/utils/api";

const Post: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data, isLoading } = api.posts.getPost.useQuery({
    postId: postId?.toString() || "",
  });

  if (!isLoading) {
    if (!data) {
      router.push("/404");
    } else {
      return <PostView data={data} />;
    }
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 5 }}>
      <SkeletonPostView />
    </Container>
  );
};

export default Post;
