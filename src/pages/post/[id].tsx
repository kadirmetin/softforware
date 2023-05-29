import { useRouter } from "next/router";
import { Loader } from "~/components/Loader";
import { PostEdit } from "~/features/Post";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return id === undefined ? <Loader /> : <PostEdit id={id as string} />;
};

export default Post;
