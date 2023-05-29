import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import type { FC } from "react";
import { PostList } from "~/features/Post";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Anasayfa | Softforware</title>
        <meta name="description" content="Blog for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DefaultAuth />
      </main>
    </>
  );
};

export default Home;

const DefaultAuth: FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <PostList />
      ) : (
        <span style={{ textAlign: "center" }}>Not logged in</span>
      )}
    </>
  );
};
