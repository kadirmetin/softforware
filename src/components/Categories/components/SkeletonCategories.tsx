import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";

interface CategoriesSkeletonProps {
  count?: number;
}

const CategoriesSkeleton: React.FC<CategoriesSkeletonProps> = ({
  count = 1,
}: CategoriesSkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Skeleton variant="text" width={100} />
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Kategoriler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{skeletons}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesSkeleton;
