const CLOUD_NAME = "dubcyjs1m";
const UPLOAD_PRESET = "wild-oasis";

export async function uploadToCoudinary(image) {
  if (!image) throw new Error("No image provided");

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Cloudinary upload error: ", error);
    throw new Error("Failed to upload image");
  }
}
