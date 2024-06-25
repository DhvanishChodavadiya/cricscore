import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const deleteOnCloudinary = async(imageName) => {
    try {
        await cloudinary.uploader.destroy(imageName,(error,success) => {
            console.log(error,success);
        })
        console.log("File deleted on cloudinary successfully.");
    } catch (error) {
        console.log("Error while deleting on cloudinary",error);
    }
}

export { deleteOnCloudinary };