import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { api } from "~/utils/api";

export default function Categories() {
  const { data } = api.categories.getAll.useQuery();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Kategoriler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((categories) => (
            <TableRow
              key={categories.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {categories.name} {categories.postCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
