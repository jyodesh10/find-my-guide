const { put } = require('@vercel/blob');
const sharp = require("sharp");


const vercelBlobUpload = async (res, buffer, name) => {
    if(buffer.length > 500000) return res.status(500).json({message: "File size should be under 500kb"})

    const compressImg = await sharp(buffer).webp({ quality: 80}).toBuffer();

    const { url } = await put(name+".webp", compressImg, { access: 'public' });
    return url;
}


module.exports = {vercelBlobUpload};