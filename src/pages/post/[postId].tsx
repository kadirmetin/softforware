import { useRouter } from "next/router";
import { PostView } from "~/components/PostView/PostView";

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;

  return postId === undefined ? null : <PostView postId={postId as string} />;
};

export default Post;
