import { Avatar, Button, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import type { FC } from "react";
import { useAuthenticationStyles } from "./Authentication.styles";

export const Authentication: FC = () => {
  const { data: session } = useSession();

  const { classes } = useAuthenticationStyles();

  const handleSignOut: VoidFunction = async () => {
    await signOut().catch((error) => {
      console.log(error);
    });
  };

  return session ? (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Avatar color="cyan" radius="xl" className={classes.avatar}>
          {session.user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => void handleSignOut()}
          icon={<IconLogout size={14} />}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Button variant="outline" onClick={() => signIn()}>
      Sign in
    </Button>
  );
};
