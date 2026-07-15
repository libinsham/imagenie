/**
 * Cloudinary scaffold for image/video uploads (blog covers, portfolio
 * media, etc). Not wired up yet — install the `cloudinary` package and
 * fill in the config once you have credentials.
 */

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export async function uploadFile(/* fileBuffer, options */) {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env"
    );
  }
  // TODO: `npm install cloudinary` and implement the actual upload call.
  throw new Error("Not implemented: lib/cloudinary.js#uploadFile");
}
