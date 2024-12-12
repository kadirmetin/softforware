import { useSession } from "next-auth/react";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => {
      const user = useSession();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.data?.user.id };
    })
    .onUploadComplete(({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
