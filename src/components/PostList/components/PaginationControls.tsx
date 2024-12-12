"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalEntries: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalEntries,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  return (
    <Box className="flex w-full items-center justify-center gap-4 py-4">
      <IconButton
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Typography variant="h6">
        {page} / {Math.ceil(totalEntries / Number(per_page))}
      </Typography>

      <IconButton
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default PaginationControls;
