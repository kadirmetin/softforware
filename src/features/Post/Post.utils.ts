export const imageLinkToFile = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
  const file = new File([blob], filename, { type: blob.type });

  return file;
};
