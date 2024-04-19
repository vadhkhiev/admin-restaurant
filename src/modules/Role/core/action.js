import { storeCreateToggle, storeParams, storeRolePermissions, storeRoles, storeUpdateToggle } from "./reducer"
import { reqCreateRole, reqDeleteRole, reqRolebyId, reqRoles, reqUpdatePermission, reqUpdateRole } from "./request"
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

    const createRole = async (payload) => {
        try {
            await reqCreateRole(payload);
            alertSuccess("Role created successfully");
            dispatch(storeCreateToggle(false));
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

    const updateRole = async (payload, id) => {
        try {
            if (id === 1) {
                alertError("You can not edit this role");
                return;
            }
            await reqUpdateRole(payload, id);
            alertSuccess("Role updated successfully");
            dispatch(storeUpdateToggle(false));
            getRoles();
        } catch (err) {
            const errorMessage = err.response?.data?.message ?? err.message;
            alertError(errorMessage);
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

    const handleFilter = (name, value) => {
        dispatch(storeParams({ [name]: value }));
    };

  return {getRoles , deleteRole ,createRole ,updateRole ,getRolebyId ,updateRolePermissions ,handleFilter }
}

export default useRoles