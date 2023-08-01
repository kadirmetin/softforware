import { useRouter } from "next/router";
import { PostView } from "~/components/PostView/PostView";

const Post: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;

  return postId === undefined ? null : <PostView id={postId as string} />;
};

export default Post;
