import { Container } from "@mui/material";

import PostList from "~/components/PostList/PostList";
import Carousel from "~/components/Carousel/Carousel";
import SideBar from "~/components/SideBar/SideBar";

export default function Home() {
  return (
    <>
      <Carousel />

      <Container
        maxWidth={"xl"}
        sx={{
          display: { xs: "block", md: "flex" },
          backgroundColor: "secondary",
        }}
      >
        <PostList />
        <SideBar />
      </Container>
    </>
  );
}
