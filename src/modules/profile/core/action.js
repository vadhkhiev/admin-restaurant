
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
                console.log(error)
            })
        };

        const handleImg = (img) => {
            const formData = new FormData();
            formData.append('file', img);
            postImg(formData).then((response)  => {
                getCurrentUser();
                alertSuccess("Avatar Updated")
           
            }).catch((error) => {
                console.log(error)
                alertError("Can not Update Avatar")
            })
          }
          const handleChangePw = (payload) => {
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
        
        const handleEditProfile = (payload) => {
            editProfile(payload).then((response) => {
                getCurrentUser();
                alertSuccess("Profile Updated")
            }).catch((error) => {
                alertError("Can not Update Profile")
                console.log(error)
            })
        }

    return { getCurrentUser , handleImg , handleChangePw , handleEditProfile} ;
};

export default useCurrentUser;
