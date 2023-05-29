import type { ReactNode } from "react";
import type { FC } from "react";
import { Header } from "./Header";
import { useLayoutStyles } from "./Layout.styles";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { classes } = useLayoutStyles();
  return (
    <>
      <Header />
      <main>
        <div className={classes.container}>{children}</div>
      </main>
    </>
  );
};
