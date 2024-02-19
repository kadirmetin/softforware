import CssBaseline from "@mui/material/CssBaseline";
import type { Theme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "highlight.js/styles/tokyo-night-dark.css";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import ModalProvider from "mui-modal-provider";
import type { NextPage } from "next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import RootLayout from "./_layout";
import AdminLayout from "./admin/_layout";

const inter = Inter({
  subsets: ["latin"],
});

const theme: Theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const router = useRouter();
  const getLayout = router.pathname.startsWith("/admin")
    ? (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>
    : (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;

  return (
    // eslint-disable-next-line
    <SessionProvider session={session}>
      <main className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            SnackbarProps={{
              autoHideDuration: 4000,
              key: "bottom" + "right",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              sx: {
                "& .MuiSnackbarContent-root": {
                  backgroundColor: "#2b2b2b",
                  color: "#ffffff",
                },
              },
            }}
          >
            <ModalProvider>
              {getLayout(<Component {...pageProps} />)}
            </ModalProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
