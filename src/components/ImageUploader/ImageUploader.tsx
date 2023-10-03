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
        className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 w-full rounded-lg border-2 border-dashed border-white bg-[#121212]"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (!res?.[0]?.url) {
            console.error(
              "Yükleme başarılı fakat URL alınırken bir hata oluştu!"
            );
            return;
          }

          const url = res[0].url;
          onUploadComplete(url);

          alert("Yükleme başarılı!");
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </main>
  );
}
