import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  return <p>{session?.user.name}</p>;
};

export default Page;
