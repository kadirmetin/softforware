import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UploadDropzone } from "~/utils/uploadthing";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  initialImageUrl?: string;
  loading?: boolean;
}

export default function ImageUploader({
  onUploadComplete,
  initialImageUrl,
  loading,
}: ImageUploaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialImageUrl) {
      setIsEditing(true);
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  return (
    <main className="mb-5 flex flex-col items-center justify-between">
      {isEditing ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"2px dashed white"}
          borderRadius={"10px"}
          width={"100%"}
          height={"100%"}
          position={"relative"}
        >
          <Image
            src={imageUrl ?? ""}
            alt="Uploaded Image"
            width={0}
            height={0}
            style={{
              borderRadius: "10px",
              objectFit: "cover",
              width: "50%",
              height: "100%",
              padding: 10,
            }}
            sizes="50% 50%"
          />
          <Box
            position="absolute"
            bottom="0"
            right="0"
            padding={0.5}
            margin={1}
            borderRadius={10}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ backgroundColor: "#fff", cursor: "pointer" }}
            onClick={() => {
              setIsEditing(false);
            }}
            display={loading ? "none" : "flex"}
          >
            <EditIcon sx={{ color: "#000" }} />
          </Box>
        </Box>
      ) : (
        <UploadDropzone
          className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 w-full cursor-pointer rounded-lg border-2 border-dashed border-white bg-[#121212]"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (!res?.[0]?.url) {
              console.error(
                "Yükleme başarılı fakat URL alınırken bir hata oluştu!"
              );
              alert("Yükleme başarılı fakat URL alınırken bir hata oluştu!");
              return;
            }

            const url = res[0].url;
            onUploadComplete(url);

            alert("Yükleme başarılı!");
            setIsEditing(true);
            setImageUrl(url);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      )}
    </main>
  );
}
