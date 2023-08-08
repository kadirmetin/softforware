import React from "react";
import { Box, Skeleton } from "@mui/material";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

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
      <br />
      <Skeleton variant="text" width={300} />
      <br />
      <Skeleton variant="rectangular" width={1200} height={600} />
      <br />
      <Skeleton variant="text" width="100%" height={200} />
    </>
  );
};
