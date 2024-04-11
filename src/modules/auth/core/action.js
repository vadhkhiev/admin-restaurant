
import useUsers from "../../Usermanangement/core/action";
import { reqUserbyId } from "../../Usermanangement/core/request";
import {  getAuth, removeAuth} from "../authHelper";
import {  login, logout, rememberAuth, storePermission } from "./reducer";
import { reqGetUser,  reqRoles,  reqUserPermission } from "./request"
import { useDispatch , useSelector } from "react-redux"

const useAuth = () => {
    const dispatch = useDispatch();    


    const getUser = async () => {
        try {  
            const userResponse = await reqGetUser();
            const user = userResponse?.data;
            const token = getAuth();
            dispatch(rememberAuth({ user: user, token: token }));
            const roles = await reqRoles();
        
            const roleNameResponse = await reqUserbyId(user?.data?.id);
            const roleName = roleNameResponse.data?.data?.role?.name;
            const foundRole =  roles?.data?.data?.find(r => r.name === roleName);
             reqUserPermission(foundRole?.id).then((res)=>dispatch(storePermission(res.data?.data?.permissions))) 
            
        } catch (error) {
            dispatch(logout());
            removeAuth();
        }
    };
    


  return {getUser}
}

export default useAuth