import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import Footer from "~/components/Footer/Footer";
import Header from "~/components/Header/Header";
import * as gtag from "~/lib/gtag";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Softforware Blog</title>
        <meta name="description" content="Blog for developers" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Header />
      {children}
      <Analytics />
      <Footer />
    </>
  );
}
