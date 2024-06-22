import { v2 as cloudinary } from "cloudinary";

const deleteOnCloudinary = async(filePath) => {
    try {
        await cloudinary.uploader.destroy(filePath,{
            resource_type: "auto"
        })
        console.log("File deleted on cloudinary successfully.");
    } catch (error) {
        console.log("Error while deleting on cloudinary",error);
    }
}

export { deleteOnCloudinary };