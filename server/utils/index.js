import DatauriParser from 'datauri/parser';
const parser = new DatauriParser();

import path from 'path';
import { cloudinary } from '../../config/cloudinary';

export const uploadToCloudinary = async (file) => {
  try {
    const extName = path.extname(file.originalname).toString();
    const file64 = parser.format(extName, file.buffer);

    const uploadedResponse = await cloudinary.uploader.upload(file64.content, {
      upload_preset: 'medium',
    });
    return uploadedResponse.url;
  } catch (err) {
    console.log(err);
  }
};
