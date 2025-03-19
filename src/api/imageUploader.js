export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  try {
    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error(error.message);
  }
}
