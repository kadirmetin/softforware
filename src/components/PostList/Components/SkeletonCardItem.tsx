import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

interface SkeletonCardItemProps {
  count?: number;
}

const SkeletonCardItem: React.FC<SkeletonCardItemProps> = ({
  count = 1,
}: SkeletonCardItemProps) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Grid item key={index}>
      <Card sx={{ display: "flex", height: 200, mt: 2, mb: 2 }}>
        <Skeleton variant="rectangular" width="25%" height={200} />
        <CardContent
          sx={{
            flex: 1,
            display: "grid",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography component="h2" variant="h5">
              <Skeleton variant="text" />
            </Typography>
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
              width={24}
              height={24}
              sx={{ mr: 0.5 }}
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              <Skeleton variant="text" />
            </Typography>
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              sx={{ mr: 0.5 }}
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              <Skeleton variant="text" />
            </Typography>
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              sx={{ mr: 0.5 }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              <Skeleton variant="text" />
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ));

  return <>{skeletons}</>;
};

export default SkeletonCardItem;
