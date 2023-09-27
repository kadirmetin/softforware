import { UploadDropzone } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

export default function ImageUploader({
  onUploadComplete,
}: ImageUploaderProps) {
  return (
    <main className="mb-5 flex flex-col items-center justify-between">
      <UploadDropzone
        className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 w-full bg-[#272727]"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (!res?.[0]?.url) {
            console.error("Upload completed, but no URL received.");
            return;
          }

          const url = res[0].url;
          onUploadComplete(url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          console.log("Error: ", error);
        }}
      />
    </main>
  );
}
