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

import React, { useState } from "react";
import { api } from "~/utils/api";

interface PostInfoProps {
  onTitleChange: (title: string) => void;
  onImageChange: (image: string) => void;
  onCategoryChange: (categoryId: string) => void;
}

const PostInfo: React.FC<PostInfoProps> = ({
  onTitleChange,
  onImageChange,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data, isLoading } = api.categories.getAll.useQuery();

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
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
            label="Title"
            variant="outlined"
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </Box>
        <Box flex="3">
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedCategory}
              label="Category"
              disabled={isLoading}
              onChange={handleCategoryChange}
            >
              {isLoading ? (
                <MenuItem value="">
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                data?.map((category) => (
                  <MenuItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TextField
        fullWidth
        margin="normal"
        label="Image URL"
        variant="outlined"
        onChange={(e) => onImageChange(e.target.value)}
      />
    </>
  );
};

export default PostInfo;
