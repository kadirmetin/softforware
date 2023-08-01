import type { FC } from "react";
import { Container, Typography } from "@mui/material";
import Image from "next/image";

import { api } from "~/utils/api";

interface PostViewProps {
  id: string;
}

export const PostView: FC<PostViewProps> = ({ id }) => {
  const { data } = api.posts.getPost.useQuery({ postId: id });

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 5 }}>
      <Typography variant="subtitle2">{data?.Category?.name}</Typography>
      <br />
      <Typography variant="h4">{data?.title}</Typography>
      <br />
      <Image
        src={data?.image!}
        alt="photo"
        width={150}
        height={0}
        style={{ width: "100%", height: "auto" }}
      />
      <br />
      <Typography variant="inherit">{data?.content}</Typography>
    </Container>
  );
};
