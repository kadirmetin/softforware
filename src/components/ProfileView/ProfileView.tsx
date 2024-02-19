import {
  faGithub,
  faKaggle,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CardItem from "../PostList/components/CardItem";

interface ProfileViewProps {
  user: {
    id: string;
    name: string | null;
    role: string;
    image: string | null;
    Post: {
      author?: {
        name: string;
      };
      id: string;
      image: string;
      title: string;
      createdAt: Date;
      Category: {
        name: string;
      } | null;
    }[];
    Profile: {
      bio: string | null;
      github: string | null;
      kaggle: string | null;
      linkedin: string | null;
      twitter: string | null;
      website: string | null;
    } | null;
  };
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        display: { xs: "block", md: "flex" },
        backgroundColor: "secondary",
        gap: 2,
      }}
    >
      <Box flex={2} justifyContent={"center"} alignItems={"center"} mt={1}>
        <Typography variant={"h6"} textAlign={"center"}>
          {user?.name} adlı kullanıcıya ait gönderiler
        </Typography>
        {user?.Post.map((post) => (
          <CardItem
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
            createdAt={post.createdAt}
            Category={post.Category ?? null}
            author={post.author ?? null}
            isProfile
          />
        ))}
      </Box>
      <Box
        flex={1}
        sx={{
          backgroundColor: "#272727",
          padding: 3,
          marginBottom: 3,
          position: "sticky",
          overflow: "hidden",
          top: 0,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Box display={"flex"} flexDirection={"column"} pt={5}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image
              src={`${user?.image}`}
              height={200}
              width={200}
              style={{ borderRadius: "50%" }}
              alt="user image"
              priority
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant={"h4"} pt={3}>
              {user?.name
                ? user.name.length > 25
                  ? `${user.name.slice(0, 20)}...`
                  : user.name
                : "No Name"}
            </Typography>
            <Typography
              variant={"body1"}
              sx={{
                backgroundColor: "#334155",
                padding: 0.5,
                borderRadius: 2,
                marginLeft: 1,
              }}
            >
              {user?.role.charAt(0).toUpperCase() +
                user?.role.slice(1).toLowerCase()}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography variant={"body1"} textAlign={"center"}>
              {user?.Profile?.bio
                ? user.Profile.bio.length > 100
                  ? `${user.Profile.bio.slice(0, 100)}...`
                  : user.Profile.bio
                : "No Bio"}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography variant={"body1"} textAlign={"center"}>
              Gönderi Sayısı: {user?.Post.length}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            mt={2}
          >
            {user.Profile?.website && (
              <Box>
                <Link href={user.Profile.website} target="_blank">
                  <FontAwesomeIcon icon={faGlobe} size="2x" />
                </Link>
              </Box>
            )}

            {user.Profile?.github && (
              <Box>
                <Link href={user.Profile.github} target="_blank">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </Link>
              </Box>
            )}

            {user.Profile?.linkedin && (
              <Box>
                <Link href={user.Profile.linkedin} target="_blank">
                  <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                </Link>
              </Box>
            )}

            {user.Profile?.kaggle && (
              <Box>
                <Link href={user.Profile.kaggle} target="_blank">
                  <FontAwesomeIcon icon={faKaggle} size="2x" />
                </Link>
              </Box>
            )}

            {user.Profile?.twitter && (
              <Box>
                <Link href={user.Profile.twitter} target="_blank">
                  <FontAwesomeIcon icon={faXTwitter} size="2xl" />
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileView;
