import { FC, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

interface PostViewProps {
  id: string;
}

export const PostView: FC<PostViewProps> = ({ id }) => {
  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <Image src={"/logo.png"} alt="logo" width={180} height={180} />
        </Box>

        <Typography>{}</Typography>
        <Typography>{}</Typography>
      </Container>
    </>
  );
};
