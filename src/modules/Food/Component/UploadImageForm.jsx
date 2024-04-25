import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaRegTimesCircle} from "react-icons/fa"; // Correct import path
import {storeToggleUploadImage} from "../Core/slice";
import {useFoods} from "../Core/action";

export const UploadImageForm = () => {
    const [imageForUpload, setImageForUpload] = useState(null);
    const dispatch = useDispatch();
    const {selectedID} = useSelector((state) => state.foodList);
    const {uploadImage} = useFoods();

    const handleImage = () => {
        const imageData = new FormData();
        imageData.append("foodId", selectedID);
        imageData.append("files", imageForUpload);
        return imageData;
    }

    return (
        <div className="form-group position-absolute w-50 custom-border text-white rounded-3 top-0 p-2"
             style={{
                 marginLeft: "15%", marginTop: "10%",
                 backdropFilter: "blur(5px)", // Correct backdropFilter value
                 background: "rgba(10,10,10, 0.35)"
             }}>
            <label htmlFor="image">
                <h3 className="fw-bold text-white">Upload Your Image Below</h3>
            </label>
            <input
                type="file"
                className="form-control"
                placeholder="image"
                onChange={(event) => {
                    setImageForUpload(event.target.files[0])
                    handleImage()
                }}
            />
            <button className="btn custom-btn text-white position-absolute top-0 end-0"
                    onClick={() => {
                        dispatch(storeToggleUploadImage(false));
                    }}>
                <FaRegTimesCircle/> {/* Correct icon component */}
            </button>
            <div className="d-flex justify-content-center pt-3 overflow-hidden" style={{height: "200px"}}>
                {imageForUpload && <img className="img-fluid" src={URL.createObjectURL(imageForUpload)} alt="UploadedImage"/>}
            </div>
            <button
                className="custom-btn btn custom-border"
                onClick={() => {
                    dispatch(storeToggleUploadImage(false));
                    uploadImage(handleImage()); // Ensure you are correctly handling image upload
                }}>
                Submit Changes
            </button>
        </div>
    );
};
