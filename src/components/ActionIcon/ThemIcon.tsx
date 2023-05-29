import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";
import { type FC } from "react";

export const ThemIcon: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      size="lg"
      color={dark ? "yellow" : "dark.9"}
      onClick={() => toggleColorScheme()}
      title="toggle color scheme"
    >
      {dark ? <IconSunHigh /> : <IconMoonStars />}
    </ActionIcon>
  );
};
