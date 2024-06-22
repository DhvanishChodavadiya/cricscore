import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

const databaseConnect = async() => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log("Mongodb connected successfully!");
    } catch (error) {
        console.log(`Mongodb connection error : ${error}`);
        process.exit(1);
    }
}

export default databaseConnect;