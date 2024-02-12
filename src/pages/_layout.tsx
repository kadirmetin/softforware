import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Script from "next/script";
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <Header />
      {children}
      <Analytics />
      <Footer />
    </>
  );
}
