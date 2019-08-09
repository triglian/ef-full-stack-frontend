import React, { useEffect, useState } from 'react';
import { Gallery } from '../components/Gallery/Gallery';
import { imageService } from '../services';

const GalleryView: React.FC = () => {
  const [imageData, setImageData] = useState<IImageItem[]>([]);

  const fetchImages = async () => {
    const images = await imageService.list();
    if (images) {
      setImageData(images);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return <Gallery imageData={imageData} />;
};

export { GalleryView };
