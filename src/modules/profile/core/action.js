
import { useDispatch  } from "react-redux";
import { storeCurrentUser } from "./reducer";
import { editProfile, postImg, reqCurrentUser ,changePw } from "./request";
import { alertError, alertSuccess } from "../../utils/alert";



const useCurrentUser = () => {
    const dispatch = useDispatch(); 

        const getCurrentUser = async () => {
            reqCurrentUser().then((response) => {
                 dispatch(storeCurrentUser(response.data?.data));

            }).catch((error) => {
            })
        };

        const handleImg = (img) => {
            const formData = new FormData();
            formData.append('file', img);
            postImg(formData).then((response)  => {
                getCurrentUser();
                alertSuccess("Avatar Updated")
           
            }).catch((error) => {
                alertError("Can not Update Avatar")
            })
          }
          const handleChangePw = (payload ) => {
            if (payload.old_password && payload.password && payload.confirm_password) {
                changePw(payload)
                    .then((response) => {
                        alertSuccess('Password changed successfully');
                    })
                    .catch((error) => {
                        alertError(error?.response.data?.message);
                        console.log(error)
                    });
            } else {
                alertError('Please provide all required fields.');
            }
        };
        
        const handleEditProfile = (payload , img) => {
            if(img){
                delete payload.avatar;
                handleImg(img);
                console.log(payload)
            }
            editProfile(payload).then(() => {
                getCurrentUser();
            }).catch(() => {
                alertError("Can not Update Profile")
            })
        }

    return { getCurrentUser , handleImg , handleChangePw , handleEditProfile} ;
};

export default useCurrentUser;
