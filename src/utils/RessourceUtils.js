import {sampleImages} from './image-imports';


export const getRandomImage = () => {
	const index = Math.floor(Math.random() * sampleImages.length);
	return sampleImages[index];
};