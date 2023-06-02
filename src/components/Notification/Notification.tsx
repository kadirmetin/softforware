/* eslint-disable */
import { Avatar, Flex, Indicator, Menu, Text } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useNotificationStyles } from "./Notification.styles";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Post } from "@prisma/client";

export const Notification = () => {
  const router = useRouter();
  const { classes } = useNotificationStyles();

  const notifications = api.notification.getAllNotifications.useQuery().data;

  const { mutateAsync } = api.notification.seeNotification.useMutation();

  const onNotificationClick = async (id: string) => {
    await mutateAsync(id);
    await router.push(`/post/${id}`).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <Indicator size={10} disabled={!notifications?.length} processing>
          <Avatar radius="xl" color="indigo" className={classes.avatar}>
            <IconBell />
          </Avatar>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        {notifications && notifications.length ? (
          notifications.map((notification, i) => {
            const data = JSON.parse(notification.message) as Post;

            return (
              <Menu.Item
                key={i}
                onClick={() => void onNotificationClick(notification.id)}
              >
                <Flex gap={20} align="center">
                  <Avatar radius="xl" color="indigo" src={data.image} />
                  <Flex direction="column">
                    <Text size="md" weight="bold">
                      New article is out!
                    </Text>
                    <Text size="xs">{data.title}</Text>
                  </Flex>
                </Flex>
              </Menu.Item>
            );
          })
        ) : (
          <Menu.Label>No notification</Menu.Label>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
