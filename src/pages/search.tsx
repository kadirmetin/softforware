import React from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography } from "@mui/material";

import { api } from "~/utils/api";
import CardItem from "~/components/PostList/Components/CardItem";
import SideBar from "~/components/SideBar/SideBar";

export default function Search() {
  const router = useRouter();
  if (router.query.q == null) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        Query olmadan nasıl arama yapim knk :P
      </Typography>
    );
  }

  const q = router.query.q as string;

  const { data, isLoading, isError } = api.search.search.useQuery({ query: q });

  if (isLoading) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        Loading...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        Something went wrong.
      </Typography>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vh",
        }}
      >
        Üzgünüz, aradığınız içeriği bulamadık.
      </Typography>
    );
  }

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        display: { xs: "block", md: "flex" },
        backgroundColor: "secondary",
      }}
    >
      <Box
        sx={{
          flex: 2,
        }}
      >
        {data.map((item) => (
          <CardItem
            key={item.id}
            Category={item.Category}
            author={item.author}
            createdAt={item.createdAt}
            id={item.id}
            image={item.image}
            title={item.title}
          />
        ))}
      </Box>
      <SideBar />
    </Container>
  );
}
