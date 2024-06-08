import { useEffect } from "react";
import useAuth from "./core/action";
import { useSelector } from "react-redux"
import useRoles from "../Role/core/action";
import { getPermission } from "../../assets/helper/PermissionChecker";

const AuthInit = ({ children }) => {
    const { getUser } = useAuth();
    const { getRoles } = useRoles();
    const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        getRoles();
        getUser();
        getPermission();

    }, [isAuth]);
    return children;

}

export { AuthInit }