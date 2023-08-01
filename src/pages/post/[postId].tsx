import { useEffect } from "react";
import { useRouter } from "next/router";
import { PostView } from "~/components/PostView/PostView";

const Post: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    if (postId !== undefined && typeof postId !== "string") {
      router.replace("/404");
    }
  }, [postId, router]);

  if (postId === undefined) {
    return null;
  }

  return <PostView id={postId as string} />;
};

export default Post;
