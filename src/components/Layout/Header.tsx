import { Box, Flex, rem, Text } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { useLayoutStyles } from "./Layout.styles";
import { Authentication } from "~/features/Authentication";
import { Notification } from "~/components/Notification";
import { ThemIcon } from "../ActionIcon";

export const Header: FC = () => {
  const router = useRouter();

  const { classes } = useLayoutStyles();

  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: theme.spacing.xs,
        height: rem(70),
        transform: `translate3d(0,${pinned ? 0 : rem(-110)} , 0`,
        transition: "transform 400ms ease",
      })}
    >
      <Flex align="center" justify="space-between" className={classes.flex}>
        <Flex align={"center"} gap={70}>
          <Flex
            align={"center"}
            gap={15}
            className={classes.pointer}
            onClick={() => router.push("/")}
          >
            <Image src="/logo.png" width={50} height={50} alt="logo" />
            <Text weight={"bold"} size={22}>
              Softforware
            </Text>
          </Flex>
        </Flex>
        <Flex align={"center"} gap={20}>
          <ThemIcon />
          <Notification />
          <Authentication />
        </Flex>
      </Flex>
    </Box>
  );
};
