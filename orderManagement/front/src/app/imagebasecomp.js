import { useEffect, useState } from 'react';

const Base64ToImage = ({ base64String }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (base64String) {
      const binaryString = atob(base64String);
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [base64String]);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return <img src={imageUrl} alt="Base64 Image" />;
};

export default Base64ToImage;
