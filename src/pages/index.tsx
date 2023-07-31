import Head from "next/head";
import Header from "~/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Softforware</title>
        <meta name="description" content="Blog for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
