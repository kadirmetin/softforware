/* eslint-disable */
import type { FC } from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";

export const ThemIcon: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";

  const handleClick = () => {
    toggleColorScheme();
  };

  return (
    <ActionIcon
      size="lg"
      color={dark ? "yellow" : "dark.9"}
      onClick={handleClick}
      title="toggle color scheme"
    >
      {dark ? <IconSunHigh /> : <IconMoonStars />}
    </ActionIcon>
  );
};
