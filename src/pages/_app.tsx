import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ModalsProvider } from "@mantine/modals";
import type { ColorScheme } from "@mantine/core";
import {
  ColorSchemeProvider,
  DEFAULT_THEME,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/components/Layout";

type CustomColor = typeof DEFAULT_THEME.colors & {
  primary?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === "dark" ? "light" : "dark");

  const theme = {
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      primary: [
        "#7950f2",
        "#7950f2",
        "#7950f2",
        "#7950f2",
        "#7950f2",
        "#7950f2",
        "#7950f2",
        "#7950f2",
        "#7950f2",
        "#7950f2",
      ],
    } as CustomColor,
    colorScheme,
    primaryColor: "primary",
    white: "#efe7db",
    black: "#202023",
    fontFamily: "",
  };

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <ModalsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
