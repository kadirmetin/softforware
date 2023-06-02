import { ActionIcon, Badge, Menu } from "@mantine/core";
import type { FC, MouseEvent } from "react";
import { usePostStyles } from "./Post.styles";
import {
  IconAlertTriangleFilled,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { api } from "~/utils/api";

interface PostOptionsProps {
  id: string;
}

export const PostOptions: FC<PostOptionsProps> = ({ id }) => {
  const router = useRouter();
  const utils = api.useContext();
  const { classes } = usePostStyles();

  const { mutateAsync: deletePostMutation } = api.post.deletePost.useMutation({
    onSuccess: async () => {
      await utils.post.getAllPosts.invalidate();
      await utils.notification.getAllNotifications.invalidate();

      notifications.show({
        color: "green",
        title: "Success!",
        message: "Your post has been deleted",
      });
    },
  });

  const openDeleteModal = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event?.preventDefault();

    modals.openConfirmModal({
      title: "Delete your post",
      centered: true,
      size: "lg",
      children: (
        <Badge
          color="red"
          radius="md"
          size="lg"
          leftSection={
            <IconAlertTriangleFilled color="red" className={classes.icon} />
          }
          className={classes.badge}
        >
          Are you sure you want to delete this post?
        </Badge>
      ),
      labels: { confirm: "Delete post", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => void deletePostMutation(id),
    });
  };

  const onEdit = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event?.preventDefault();
    // TODO: create id page of post
    void router.push(`/post/${id}`);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          onClick={(event) => event.preventDefault()}
          size="md"
          className={classes.dots}
        >
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconPencil size={14} />} onClick={onEdit}>
          Edit
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={openDeleteModal}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
