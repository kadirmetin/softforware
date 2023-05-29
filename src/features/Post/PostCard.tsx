import { Avatar, Card, Flex, Image, Kbd, Text } from "@mantine/core";
import type { FC } from "react";
import { getTimeLabel } from "~/core/date";
import { api } from "~/utils/api";
import { usePostStyles } from "./Post.styles";
import { PostOptions } from "./PostOptions";

interface PostCardProps {
  id: string;
  title: string;
  link: string;
  description: string;
  timeReading: number;
  image: string | null;
  technos: string | null;
  createdAt: Date;
  authorId: string;
}

export const PostCard: FC<PostCardProps> = ({
  id,
  timeReading,
  title,
  technos,
  image,
  authorId,
  link,
  description,
  createdAt,
}) => {
  const { classes } = usePostStyles();

  const user = api.user.getUser.useQuery(authorId);

  const userName = user.data?.name;

  return (
    <a href={link} target="_blank" style={{ textDecoration: "none" }}>
      <Card
        shadow="lg"
        radius="md"
        padding="lg"
        withBorder
        className={classes.card}
      >
        <PostOptions id={id} />
        <Flex align="center" justify="space-between">
          <Flex direction="column" gap={30}>
            <Flex align="center" gap={20}>
              <Avatar color="green" radius="xl" size="md">
                {userName?.charAt(0).toUpperCase()}
              </Avatar>
              <Text weight="bold" size="lg">
                {userName}
              </Text>
              <Text className={classes.date}>
                {createdAt.toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                })}
              </Text>
            </Flex>
            <Flex direction="column" gap={15}>
              <Text weight="bold" size={20}>
                {title}
              </Text>
              <Text size={16} className={classes.description}>
                {description}
              </Text>
            </Flex>
            <Flex align="center" gap={15}>
              <Kbd size="md">{technos}</Kbd>
              <Text size={16} className={classes.description}>
                {`${getTimeLabel(timeReading)} read`}
              </Text>
            </Flex>
          </Flex>
          <Image maw={150} radius="md" src={image} alt="Post image" />
        </Flex>
      </Card>
    </a>
  );
};
