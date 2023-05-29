import { Button, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { usePostStyles } from "./Post.styles";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/utils/api";
import { IconPlus } from "@tabler/icons-react";
import { PostCard } from "./PostCard";
import { PostModal } from "./PostModal";

export const PostList: FC = () => {
  const { classes } = usePostStyles();

  const [opened, { open, close }] = useDisclosure(false);

  const allPosts = api.post.getAllPosts.useQuery();

  const posts = allPosts.data;

  return (
    <>
      <Flex justify="space-between" className={classes.container}>
        <Text weight="bold" size={20}>
          Kafka Post
        </Text>
        <Button onClick={open} leftIcon={<IconPlus />}>
          Create Post
        </Button>
      </Flex>
      {posts &&
        posts.map((post, i) => (
          <Flex key={i} direction="column">
            <PostCard {...post} />
          </Flex>
        ))}
      <PostModal opened={opened} close={close} />
    </>
  );
};
