
import { useDispatch , useSelector } from "react-redux";
import { setCreateToggle, setLoading, storePaging, storeParams, storeUsers } from "./reducer";
import { alertConfirm , alertError , alertSuccess } from "../../utils/alert";
import { reqUsers , reqUpdateUser, reqCreateUser, reqUploadImage, reqDeleteUser, reqUserbyId, reqChangePassword } from "./request";


const useUsers = () => {
    const dispatch = useDispatch(); 
    const { params } = useSelector((state) => state.users);

    const handleFilter = (name , value) => {
        dispatch(storeParams({ [name]: value }));
    }

    const getUsers = async () => {
       await reqUsers(params).then((response) => {
            dispatch(storeUsers(response.data.data));
            dispatch(storePaging(response.data.paging));
            dispatch(setLoading(false));
        })
    }
    const getUserbyId = async (id) => {
        await reqUserbyId(id).then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const createUser = async (payload ) => {
        const payloadKeys = Object.keys(payload);
        const payloadValues = Object.values(payload);
        const isAllFilled = payloadKeys.length === 10 && payloadValues.every(value => value !== "");
        const isEmailValid = payload.email && emailRegex.test(payload.email);

        if (isAllFilled && isEmailValid) {
            try {
               await reqCreateUser(payload);
                alertSuccess("User Created");
                getUsers();
                dispatch(setCreateToggle(false))
            } catch (error) {
                alertError(error.response.data.message);
            } 
        } else {
            if (!isAllFilled) {
                alertError("Please fill in all fields");
            } else if (!isEmailValid) {
                alertError("Please provide a valid email address");
            }
        }
    };


    const updateUser = async (payload , id ,img ,handleEdit ) => {
        let newPayload = {...payload}
        if(img){
           await  reqUploadImage(img , id).then((response) => {
                newPayload.avatar = response.data.data;
            }).catch((error) => {
                alertError(error.response.data.message);
            })
        }
        await reqUpdateUser(newPayload , id ).then((response) => {
            getUsers()
            alertSuccess(response.data.message);
            handleEdit()
        }).catch((error) => {
            alertError(error.response.data.message);
        })
    }

    const deleteUser = async (user, id) => {
        if (id === 1) {
            alertError("You cannot delete the admin user");
            return;
        }
        const confirmed = await alertConfirm(`Are you sure you want to delete ${user}?`);
        if (confirmed.isConfirmed) {
            try {
                await reqDeleteUser(id);
                alertSuccess("User Deleted");
                getUsers();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const changePassword = async (payload , id) => {
        await reqChangePassword(payload , id).then((response) => {
            alertSuccess(response.data.message);
        }).catch((error) => {
            alertError(error.response.data.message);
        })
    }


    return {getUsers ,handleFilter , createUser , updateUser , deleteUser , getUserbyId ,changePassword} ;
};

export default useUsers;

