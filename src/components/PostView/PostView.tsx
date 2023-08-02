import * as React from "react";
import type { FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

import { api } from "~/utils/api";

interface PostViewProps {
  id: string;
}

interface Post {
  id: string;
  createdAt: Date;
  title: string;
  image: string;
  content: string;
  published: boolean;
  authorId: string;
  categoryId: string | null;
  Category: { id: string; name: string; postCount: number } | null;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string;
  };
}

export const PostView: FC<PostViewProps> = ({ id }) => {
  const { data } = api.posts.getPost.useQuery<Post>({ postId: id });

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <CategoryOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
          <Typography variant="inherit">{data?.Category.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <PermIdentityOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
          <Typography variant="inherit">{data?.author.name}</Typography>
        </Box>
      </Box>
      <br />
      <Typography variant="h4">{data?.title}</Typography>
      <br />
      <Image
        src={data?.image ?? "/logo.png"}
        alt="photo"
        width={1200}
        height={0}
        style={{ width: "100%", height: "auto" }}
        priority
      />
      <br />
      <Typography variant="inherit">{data?.content}</Typography>
    </Container>
  );
};
