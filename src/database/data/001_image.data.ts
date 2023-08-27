import { Image } from '../models/image.entity';

const getImages = (): Image[] => {
  return Array(70)
    .fill(null)
    .map((value, index) => ({
      url: `https://picsum.photos/200/300?random=${index + 1}`,
    }));
};

export const ImageData: Image[] = getImages();
