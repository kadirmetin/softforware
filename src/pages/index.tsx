import { Container } from "@mui/material";

import PostListItem from "~/components/PostListItem/PostListItem";
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
        <PostListItem />
        <SideBar />
      </Container>
    </>
  );
}
