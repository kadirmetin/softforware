import { Box } from "@mui/material";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import TableCellActions from "./components/TableCellActions";

interface TableRow {
  title: string;
  category: string | undefined;
  createdAt: string;
  author: string | null;
  postId: string;
}

interface TableProps {
  rows: TableRow[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "postId", headerName: "Post ID", width: 100 },
  { field: "title", headerName: "Başlık", width: 300 },
  { field: "createdAt", headerName: "Tarih", width: 150 },
  { field: "category", headerName: "Kategori", width: 150 },
  { field: "author", headerName: "Yazar", width: 100 },
  {
    field: "actions",
    headerName: "Eylemler",
    headerAlign: "center",
    hideSortIcons: true,
    hideable: false,
    width: 200,
    renderCell: (params: GridCellParams) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const postId = params.row?.postId as string | undefined;

      return <TableCellActions postId={postId} />;
    },
  },
];

const Table = ({ rows }: TableProps) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows.map((row: TableRow, index: number) => ({
          ...row,
          id: index + 1,
        }))}
        columns={columns}
        getRowId={(row: { id: number }) => row.id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        columnVisibilityModel={{
          postId: false,
        }}
      />
    </Box>
  );
};

export default Table;
