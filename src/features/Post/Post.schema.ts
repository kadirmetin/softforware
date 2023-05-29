import * as zod from "zod";

export const postSchema = zod.z.object({
  title: zod.z.string().nonempty("Title is required"),
  link: zod.z.string().nonempty("Link is required"),
  description: zod.z.string().nonempty("Description is required"),
  timeReading: zod.number({
    required_error: "Age is required",
  }),
  technos: zod.string().array().max(3).nullable(),
  image: zod.custom<File>().nullable(),
});

export type PostSchemaValues = zod.infer<typeof postSchema>;
