import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import React from "react";
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
        <title>Softforware Blog</title>
        <meta name="description" content="Blog for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <GoogleTagManager gtmId={`${process.env.GOOGLE_TAG}`} />
      <GoogleAnalytics gaId={`${process.env.ANALYTICS_ID}`} />
      <Analytics />
      <Footer />
    </>
  );
}
