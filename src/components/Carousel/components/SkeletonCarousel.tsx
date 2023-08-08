import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonCarousel = () => {
  return (
    <Skeleton
      variant="rectangular"
      height={480}
      width={"100%"}
      className="rounded-lg"
    />
  );
};

export default SkeletonCarousel;
