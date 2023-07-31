import React from "react";
import MUICarousel from "react-material-ui-carousel";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Link from "next/link";

import { api } from "~/utils/api";
import getFormattedTimeElapsed from "~/utils/time";

export default function Carousel() {
  const { data } = api.posts.take10Post.useQuery();

  return (
    <Container maxWidth={"xl"}>
      <MUICarousel animation="slide" indicators={false}>
        {data?.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            style={{ textDecoration: "none" }}
          >
            <Paper
              sx={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                mb: 4,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${post.image})`,
                cursor: "pointer", // Optional: Show a pointer cursor on hover
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,.3)",
                }}
              />
              <Grid container>
                <Grid item md={6}>
                  <Box
                    sx={{
                      position: "relative",
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                      sx={{ height: "350px" }}
                    >
                      {post.title}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                      <AccessTimeFilledIcon sx={{ mr: 0.5 }} />
                      <Typography>
                        {getFormattedTimeElapsed(post.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Link>
        ))}
      </MUICarousel>
    </Container>
  );
}
