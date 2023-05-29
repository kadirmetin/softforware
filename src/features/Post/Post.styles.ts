import { createStyles } from "@mantine/core";

export const usePostStyles = createStyles({
  container: {
    marginTop: "8rem",
  },
  card: {
    marginTop: "3rem",
    position: "relative",
  },
  date: {
    marginTop: ".2rem",
    opacity: 0.5,
  },
  description: {
    opacity: 0.7,
  },
  dots: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  padding: { padding: "1.5rem" },
  badge: {
    fontWeight: 400,
    width: "100%",
    height: "4rem",
    justifyContent: "flex-start",
    margin: "1rem 0 2rem",
  },
  lowercase: {
    textTransform: "lowercase",
  },
  icon: {
    marginRight: ".5rem",
    marginTop: ".3rem",
  },
});
