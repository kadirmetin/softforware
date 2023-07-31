import Head from "next/head";

import Footer from "~/components/Footer/Footer";
import Header from "~/components/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Softforware</title>
        <meta name="description" content="Blog for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
