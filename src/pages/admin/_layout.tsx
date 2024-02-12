import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "~/components/AdminHeader/AdminHeader";
import Sidebar from "~/components/AdminSidebar/AdminSidebar";

import Footer from "~/components/Footer/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="block items-center justify-center text-center">
          <Typography variant="h6">Bu sayfaya erişim izniniz yok.</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Head>
        <title>Dashboard | Softforware Blog</title>
        <meta name="description" content="Blog for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
}
