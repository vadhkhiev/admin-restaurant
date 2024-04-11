import { storeRolePermissions, storeRoles } from "./reducer"
import { reqCreateRole, reqDeleteRole, reqRolebyId, reqRoles, reqUpdatePermission, reqUpdateRole } from "./request"
import {useSelector , useDispatch} from "react-redux"
import { alertConfirm, alertError , alertSuccess } from '../../utils/alert'
import { useEffect } from "react"
const useRoles = () => {
    const {params } = useSelector((state) => state.roles);
    const dispatch = useDispatch ();
    

    const getRoles = async () =>{
        await reqRoles(params)
        .then((res)=> dispatch(storeRoles(res.data)))
        .catch((err)=>console.log(err)) 
    }

    const createRole = async (payload, setAdd) => {
        try {
            await reqCreateRole(payload);
            alertSuccess("Role created successfully");
            setAdd(false);
            getRoles();
        } catch (err) {
            alertError(err.response.data.message);
        }
    };

    
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

    const updateRole = async (payload, setUpdate , id) => {
        try {
            await reqUpdateRole(payload, id);
            alertSuccess("Role updated successfully");
            setUpdate(false);
            getRoles();
        } catch (err) {
            alertError(err.response.data.message);
        }
    };
    const getRolebyId = async (id) =>{
        try{
            const res = await reqRolebyId(id);
            return res.data;
        }catch(err){
            console.log(err);
            return null;
        }
    }

    const updateRolePermissions = async (payload) => {
        try {
            await reqUpdatePermission(payload);
            alertSuccess("Role updated successfully");
            getRoles();
        } catch (err) {
            alertError(err.response.data.message);

        }
    };




  return {getRoles , deleteRole ,createRole ,updateRole ,getRolebyId ,updateRolePermissions }
}

export default useRoles