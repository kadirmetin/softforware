import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Box, Container, Typography, styled } from "@mui/material";
import DOMPurify from "dompurify";
import Image from "next/image";
import type { FC } from "react";
import { api } from "~/utils/api";
import { SkeletonPostView } from "./components/SkeletonPostView";
import Head from "next/head";

interface PostViewProps {
  id: string;
}

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface PostViewData {
  id: string;
  createdAt: Date;
  title: string;
  image: string;
  content: string;
  published: boolean;
  authorId: string;
  categoryId: string | null;
  Category: { id: string; name: string; postCount: number } | null;
  author: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string;
    role: Role;
  };
}

const StyledDiv = styled("div")({
  "& h1": {
    fontSize: "2em",
    fontWeight: "bold",
  },
  "& h2": {
    fontSize: "1.75em",
    fontWeight: "bold",
  },
  "& h3": {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  "& blockquote": {
    margin: "16px 0",
    padding: "0 15px",
    borderLeft: "4px solid #ccc",
    color: "#666",
    fontStyle: "italic",
  },
  "& ul, & ol": {
    paddingLeft: "20px",
  },
  "& ul": {
    listStyleType: "disc",
  },
  "& ol": {
    listStyleType: "decimal",
  },
  "& li": {
    marginBottom: "5px",
  },
  "& strong": {
    fontWeight: "bold",
  },
  "& em": {
    fontStyle: "italic",
  },
  "& u": {
    textDecoration: "underline",
  },
  "& s": {
    textDecoration: "line-through",
  },
  "& a": {
    textDecoration: "underline",
  },
  "& pre": {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "10px",
    overflowX: "auto",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
});

export const PostView: FC<PostViewProps> = ({ id }) => {
  const { data, isLoading } = api.posts.getPost.useQuery<PostViewData>({
    postId: id,
  });

  return (
    <>
      <Head>
        <title>{data?.title} | Softforware</title>
      </Head>
      <Container maxWidth="xl" sx={{ pt: 3, pb: 5 }}>
        {isLoading ? (
          <SkeletonPostView />
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CategoryOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
                <Typography variant="inherit">
                  {data?.Category?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <PermIdentityOutlinedIcon sx={{ mr: 0.5, fontSize: 24 }} />
                <Typography variant="inherit">{data?.author?.name}</Typography>
              </Box>
            </Box>
            <br />
            <Typography variant="h4" fontWeight={"bold"}>
              {data?.title}
            </Typography>
            <br />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={data?.image ?? ""}
                alt="photo"
                width={1200}
                height={0}
                priority
              />
            </Box>
            <br />
            <div className="ql-snow">
              <StyledDiv
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.content ?? "", {
                    ADD_TAGS: ["iframe"],
                    ADD_ATTR: ["target"],
                  }),
                }}
              />
            </div>
          </>
        )}
      </Container>
    </>
  );
};
