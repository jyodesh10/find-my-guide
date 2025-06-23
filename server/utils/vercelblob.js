import { put } from "@vercel/blob";
import sharp from "sharp";
const vercelBlobUpload = async (res, buffer, name) => {
    if (buffer.length > 1000000)
        return res.status(500).json({ message: "File size should be under 1 mb" });
    const compressImg = await sharp(buffer).webp({ quality: 25 }).toBuffer();
    const { url } = await put(name + ".webp", compressImg, { access: 'public' });
    return url;
};
export { vercelBlobUpload };
export default {
    vercelBlobUpload
};
