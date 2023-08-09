import React from "react";
import { Box, Skeleton } from "@mui/material";

export const SkeletonPostView = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            height={24}
            width={24}
            sx={{ mr: 0.5 }}
          />
          <Skeleton variant="text" width={50} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            height={24}
            width={24}
            sx={{ mr: 0.5 }}
          />
          <Skeleton variant="text" width={50} />
        </Box>
      </Box>
      <Skeleton variant="text" width={300} height={75} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton variant="rectangular" width={"100%"} height={630} />
      </Box>
      <Skeleton variant="text" width="100%" height={50} />
    </>
  );
};
