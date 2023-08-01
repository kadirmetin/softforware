import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

import { api } from "~/utils/api";
import getFormattedTimeElapsed from "~/utils/time";

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

const PostView = () => {
  const { data } = api.posts.getAll.useQuery();

  // TODO: Graphic Design is my Passion

  return (
    <Box
      sx={{
        flex: 2,
      }}
    >
      {data?.map((post: Post, index: number) => (
        <Grid item key={index}>
          <CardActionArea component="a" href={`/post/${post.id}`}>
            <Card sx={{ display: "flex", height: 200, mt: 2, mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                image={post.image ?? ""}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: "grid",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography component="h2" variant="h5">
                    {post.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <AccessTimeOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mr: 2 }}
                  >
                    {getFormattedTimeElapsed(post.createdAt)}
                  </Typography>
                  <CategoryOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mr: 2 }}
                  >
                    {post.Category?.name ?? "No Category"}
                  </Typography>
                  <PermIdentityOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.author.name ?? "No Author"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Box>
  );
};

export default PostView;
