
import { useDispatch , useSelector } from "react-redux";
import { reqUsers , createUser } from "./request";
import { storePaging, storeParams, storeUsers } from "./reducer";
import { useEffect } from "react";
import { alertConfirm , alertError , alertSuccess } from "../../utils/alert";


const useUsers = () => {
    const dispatch = useDispatch(); 
    const { params , paging } = useSelector((state) => state.users);
    const setParams = (param) => {
        dispatch(storeParams({
            ...params,
            ...param
        })) 
    }

    const getUsers = async () => {
        await reqUsers(params).then((response) => {
            dispatch(storeUsers(response.data.data));
            dispatch(storePaging(response.data.paging));
        })
    }



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleCreate = async (payload , setCreate) => {
        const payloadKeys = Object.keys(payload);
        const payloadValues = Object.values(payload);
        const isAllFilled = payloadKeys.length === 10 && payloadValues.every(value => value !== "");
        const isEmailValid = payload.email && emailRegex.test(payload.email);

        if (isAllFilled && isEmailValid) {
            try {
                await createUser(payload);
                alertSuccess("User Created");
                setCreate(false)
                getUsers();
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
    
    useEffect(() => {
        getUsers();
    }, [params]);


    //pagination
    const handlePagination = (para) => {
        window.scrollTo(0, 0);
        const newPage = para === "increase" && params.page < paging?.totalPage ? params.page + 1 : params.page - 1;
        if (newPage >= 1) setParams({ ...params, page: newPage });
    };

    return {getUsers ,setParams ,handlePagination , handleCreate};
};

export default useUsers;

