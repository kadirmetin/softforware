/* eslint-disable */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { FC } from "react";
import { api } from "~/utils/api";
import { usePostStyles } from "./Post.styles";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "~/pages/api/uploadImage";
import { notifications } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";
import { type PostSchemaValues, postSchema } from "./Post.schema";
import {
  Button,
  FileInput,
  Group,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { Loader } from "~/components/Loader";
import { CustomMultiSelect } from "~/components/Select";
import { imageLinkToFile } from "./Post.utils";

interface PostEditProps {
  id: string;
}

export const PostEdit: FC<PostEditProps> = ({ id }) => {
  const router = useRouter();
  const utils = api.useContext();
  const { classes } = usePostStyles();

  const [loading, setLoading] = useState(false);

  const { data, isLoading } = api.post.getPost.useQuery(id);

  const { mutateAsync: uploadMutation } = useMutation(uploadImage);

  const { mutateAsync } = api.post.updatePost.useMutation({
    onSuccess: async () => {
      await utils.notification.getAllNotifications.invalidate();
      notifications.show({
        color: "green",
        title: "Sucess!",
        message: "Your post has been updated",
      });
      await router.push("/");
    },
  });

  const form = useForm({
    validate: zodResolver(postSchema),
    initialValues: {
      title: "",
      link: "",
      description: "",
      timeReading: 5,
      technos: [""],
      image: new File([], "image.png", { type: "image/png" }),
    },
  });

  const onSubmit = async (values: PostSchemaValues) => {
    const { image, technos, ...rest } = values;

    setLoading(true);

    const imageUrl = image && (await uploadMutation(image));

    console.log("imageUrl", imageUrl);

    try {
      await mutateAsync({
        id,
        data: {
          ...rest,
          technos: technos ? technos.join(", ") : "",
          image: imageUrl || "",
        },
      });

      setLoading(false);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateFormValues = async () => {
      try {
        if (data) {
          let image = null;
          if (data.image) {
            const file = await imageLinkToFile(data.image);
            image = new File([file], file.name, { type: file.type });
          }

          form.setValues({
            ...form.values,
            title: data.title,
            link: data.link,
            description: data.description,
            timeReading: data.timeReading,
            technos: data.technos?.split(",").map((techno) => techno.trim()),
            image: image ?? undefined,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateFormValues();
  }, [data, form]);

  return (
    <>
      <Text weight="bold" size={20} className={classes.container}>
        Edit Post
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        // TODO: Refacto to make a single component with PostModal form
        <form onSubmit={form.onSubmit(onSubmit)} style={{ marginTop: "3rem" }}>
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
              Edit
            </Button>
          </Group>
        </form>
      )}
    </>
  );
};
