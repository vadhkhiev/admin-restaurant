import { storeRoles } from "./reducer"
import { reqDeleteRole, reqRoles } from "./request"
import {useSelector , useDispatch} from "react-redux"
import { alertConfirm, alertError , alertSuccess } from '../../utils/alert'
const useRoles = () => {
    const {params } = useSelector((state) => state.roles);
    const dispatch = useDispatch ();

    

    const getRoles = async () =>{
        await reqRoles(params)
        .then((res)=> dispatch(storeRoles(res.data)))
        .catch((err)=>console.log(err)) 
    }

    
    const deleteRole = async (role) => {
        try {
            if (role.id === 1) {
                alertError("You can not delete Super Admin role");
                return;
            }
            await alertConfirm(`Do you want to delete role : ${role.name} ?`).then((result) => {
                if (result.isConfirmed) {
                    reqDeleteRole(role.id).then((res) => {
                        alertSuccess("Role deleted successfully");
                        getRoles();
                    })
                    getRoles(); 
                } 
            });
        } catch (error) {
            console.error(error);
        }
    };





  return {getRoles , deleteRole }
}

export default useRoles