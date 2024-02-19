import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Link,
} from "@mui/material";
import type { DialogProps } from "@mui/material/Dialog";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "mui-modal-provider";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface TableCellActionsProps {
  postId: string | undefined;
}

interface SimpleDialogProps extends DialogProps {
  title: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const TableCellActions: React.FC<TableCellActionsProps> = ({ postId }) => {
  const router = useRouter();
  const mutation = api.posts.deletePost.useMutation();
  const { showModal } = useModal();

  const handleEdit = async (postId: string | undefined) => {
    if (postId) {
      await router.push(`/admin/editPost/${postId}`);
    } else {
      console.error("postId is undefined");
    }
  };

  const handleDelete = async (postId: string | undefined) => {
    if (postId) {
      await mutation.mutateAsync({ postId });

      router.reload();
    } else {
      console.error("postId is undefined");
    }
  };

  const SimpleDialog: React.FC<SimpleDialogProps> = ({
    title,
    content,
    onCancel,
    onConfirm,
    ...props
  }) => (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          İptal
        </Button>
        <Button onClick={onConfirm} autoFocus color="error">
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );

  const handleClick = () => {
    const modal = showModal(SimpleDialog, {
      title: "Gönderiyi Sil",
      content: "Silmek istediğinize emin misiniz?",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: async () => {
        await handleDelete(postId);
        modal.hide();
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link href={`/post/${postId}`} rel="noopener noreferrer" target="_blank">
        <Button color="inherit">
          <LaunchIcon />
        </Button>
      </Link>
      <Button color="inherit" onClick={() => handleEdit(postId)}>
        <EditIcon />
      </Button>
      <Button
        color="error"
        onClick={() => {
          handleClick();
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
};

export default TableCellActions;
