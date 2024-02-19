import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import ImageUploader from "../ImageUploader/ImageUploader";

interface PostInfoProps {
  onTitleChange: (title: string) => void;
  onImageChange: (image: string) => void;
  onCategoryChange: (categoryId: string) => void;
  initialTitle?: string;
  initialImage?: string;
  initialCategoryId?: string;
  loading?: boolean;
}

const PostInfo: React.FC<PostInfoProps> = ({
  onTitleChange,
  onImageChange,
  onCategoryChange,
  initialTitle = "",
  initialImage = "",
  initialCategoryId = "",
  loading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategoryId || ""
  );
  const [text, setText] = useState<string>(initialTitle || "");

  const { data, isLoading } = api.categories.getAll.useQuery();

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  useEffect(() => {
    // props'tan gelen değerler değiştiğinde state'i güncelle
    setSelectedCategory(initialCategoryId || "");
    setText(initialTitle || "");
  }, [initialCategoryId, initialTitle]);

  const handleTitleChange = (text: string) => {
    setText(text);
    onTitleChange(text);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        className="items-center justify-center"
      >
        <Box flex="7" marginRight={1}>
          <TextField
            fullWidth
            margin="normal"
            label="Başlık"
            variant="outlined"
            onChange={(e) => handleTitleChange(e.target.value)}
            value={text}
            disabled={loading}
          />
        </Box>
        <Box flex="3">
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Kategori</InputLabel>
            <Select
              labelId="category-label"
              id="demo-simple-select-helper"
              value={selectedCategory}
              label="Category"
              disabled={isLoading || loading}
              onChange={handleCategoryChange}
            >
              {isLoading ? (
                <MenuItem value="">
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                data?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <ImageUploader
        onUploadComplete={onImageChange}
        initialImageUrl={initialImage}
      />
    </>
  );
};

export default PostInfo;
