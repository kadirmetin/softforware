/* eslint-disable */
import { useState } from "react";
import type { FC } from "react";
import { api } from "~/utils/api";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { type PostSchemaValues, postSchema } from "./Post.schema";
import { uploadImage } from "~/pages/api/uploadImage";
import {
  Button,
  FileInput,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { CustomMultiSelect } from "~/components/Select";

interface PostModalProps {
  opened: boolean;
  close: () => void;
}

export const PostModal: FC<PostModalProps> = ({ opened, close }) => {
  const utils = api.useContext();

  const { mutateAsync: uploadMutation } = useMutation(uploadImage);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    validate: zodResolver(postSchema),
    initialValues: {
      title: "",
      link: "",
      description: "",
      timeReading: 5,
      image: null,
      technos: null,
    },
  });

  const { mutateAsync } = api.post.addPost.useMutation({
    onSuccess: async () => {
      await utils.post.getAllPosts.invalidate();
      await utils.notification.getAllNotifications.invalidate();
    },
  });

  const onSubmit = async (values: PostSchemaValues) => {
    const { image, technos, ...rest } = values;

    setLoading(true);

    const imageUrl = image && (await uploadMutation(image));

    console.log("imageUrl", imageUrl);

    void mutateAsync({
      ...rest,
      technos: technos ? technos.join(", ") : "",
      image: imageUrl || "",
    });

    setLoading(false);

    form.reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Creat post" centered>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Kafka with tRPC"
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="Your description..."
          {...form.getInputProps("description")}
        />
        <TextInput
          withAsterisk
          label="Link"
          placeholder="Your link..."
          {...form.getInputProps("link")}
        />
        <NumberInput
          withAsterisk
          label="Time reading"
          placeholder="Your time..."
          mt="sm"
          {...form.getInputProps("timeReading")}
        />
        <CustomMultiSelect formElement={form.getInputProps("technos")} />
        <FileInput
          label="Image"
          placeholder="Image of the post"
          mt="sm"
          accept="image/*"
          {...form.getInputProps("image")}
        />
        <Group position="center" mt="xl">
          <Button type="submit" loading={loading}>
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
