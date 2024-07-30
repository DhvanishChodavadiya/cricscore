import axios from "axios";
import { useState } from "react";

const ProfilePhoto = () => {

    const [image,setImage] = useState("");

    const onUpload = async(e) => {
        e.preventDefault;
        console.log(image);
        try {
            const res = await axios.post("/api/v1/user/profilePhoto",image)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <input type="file" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}/>
        {/* <input type="file" onChange={(e) => {const file = e.target.files[0];setImage(file ? URL.createObjectURL(file) : undefined
        )}}/> */}
        {/* <input type="file" onChange={(e) => setImage(e.target.files)}/> */}
        <button type="submit" onClick={onUpload}>Upload</button>
        <img src={image} alt="" />
    </div>
  )
}

export default ProfilePhoto