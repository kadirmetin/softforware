import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import React from "react";
import Footer from "~/components/Footer/Footer";
import Header from "~/components/Header/Header";
import { siteMetaData } from "~/lib/siteMetaData";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{siteMetaData.title}</title>
        <meta name="description" content="Blog for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GT_ID}`} />
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_ID}`} />
      <Analytics />
      <Footer />
    </>
  );
}
