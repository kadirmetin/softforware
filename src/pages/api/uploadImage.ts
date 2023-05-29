export const uploadImage = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "ttihj9a5");
  data.append(
    "cloud_name",
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
  );

  const fetching = fetch(
    `https://api.cloudinary.com/v1_1/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    }/image/upload`,
    {
      method: "post",
      body: data,
    }
  )
    .then((resp) => resp.json())
    .then((data: { url: string }) => data.url)
    .catch((err) => console.log(err));

  const result = await fetching;

  return result;
};
