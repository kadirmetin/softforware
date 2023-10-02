import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

import SkeletonCategories from "./components/SkeletonCategories";
import { api } from "~/utils/api";

export default function Categories() {
  const { data, isLoading } = api.categories.getAll.useQuery();
  const count = data?.length ?? 7;

  return (
    <>
      {isLoading ? (
        <SkeletonCategories count={count} />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>Kategoriler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      href={`/categories/${category.id}`}
                      passHref
                      className="hover:underline"
                    >
                      {category.name}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
