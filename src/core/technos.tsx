import { Image } from "@mantine/core";
import { type ReactNode } from "react";

export const possibleTechnos: {
  label: string;
  value: string;
  icon: ReactNode;
}[] = [
  {
    label: "React",
    value: "react",
    icon: (
      <Image src="/brand/react.svg" alt="React icon" width={15} height={15} />
    ),
  },
  {
    label: "Next.js",
    value: "nextjs",
    icon: (
      <Image
        src="/brand/nextjs.svg"
        alt="Next.js icon"
        width={15}
        height={15}
      />
    ),
  },
  {
    label: "Node.js",
    value: "nodejs",
    icon: (
      <Image
        src="/brand/node-js.svg"
        alt="Node.js icon"
        width={15}
        height={15}
      />
    ),
  },
  {
    label: "Kafka",
    value: "kafka",
    icon: (
      <Image src="/brand/kafka.svg" alt="Kafka icon" width={15} height={15} />
    ),
  },
  {
    label: "Mantine",
    value: "mantine",
    icon: (
      <Image
        src="/brand/mantine.svg"
        alt="Mantine icon"
        width={15}
        height={15}
      />
    ),
  },
  {
    label: "tRPC",
    value: "trpc",
    icon: (
      <Image src="/brand/trpc.svg" alt="tRPC icon" width={15} height={15} />
    ),
  },
  {
    label: "Rust",
    value: "rust",
    icon: (
      <Image src="/brand/rust.svg" alt="Rust icon" width={15} height={15} />
    ),
  },
];
