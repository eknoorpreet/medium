// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drkvr9wta',
  api_key: '795587131868458',
  api_secret: 'WbZNhSjKmTnP3kCTzek9EU-lYr4',
});

module.exports = { cloudinary };
