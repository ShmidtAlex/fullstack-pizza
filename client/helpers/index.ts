export const convertResponseToImageDataUrl = (response) => {
  const contentType = response.headers['content-type'];
  const data = response.data;
  
  // Convert the Uint8Array to a regular array
  const dataArray = Array.from(new Uint8Array(data));
  
  // Create a Blob from the array
  const blob = new Blob([new Uint8Array(dataArray)], { type: contentType });
  
  // Create a URL for the Blob and return it
  return URL.createObjectURL(blob);
}