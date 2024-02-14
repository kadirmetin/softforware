import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import getFormattedTimeElapsed from "~/utils/time";

interface CardItemProps {
  id: string;
  image: string;
  title: string;
  createdAt: Date;
  Category: {
    name: string;
  } | null;
  author: {
    name: string | null;
  } | null;
  isProfile?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  image,
  title,
  createdAt,
  Category,
  author,
  isProfile = false,
}) => {
  return (
    <Grid item key={id}>
      <CardActionArea component="a" href={`/post/${id}`}>
        <Card sx={{ display: "flex", height: 200, mt: 2, mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: "25%", display: { xs: "none", sm: "block" } }}
            image={image}
          />
          <CardContent
            sx={{
              flex: 1,
              display: "grid",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography component="h2" variant="h5">
                {title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <AccessTimeOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mr: 2 }}
              >
                {getFormattedTimeElapsed(createdAt)}
              </Typography>
              <CategoryOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mr: 2 }}
              >
                {Category?.name}
              </Typography>
              {isProfile ? null : (
                <>
                  <PermIdentityOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
                  <Typography variant="subtitle1" color="text.secondary">
                    {author?.name}
                  </Typography>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default CardItem;
