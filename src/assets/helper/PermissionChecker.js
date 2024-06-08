import { jwtDecode } from "jwt-decode";
import { getAuth } from "../../modules/auth/authHelper";

export const getPermission = () => {
    const token = getAuth();
    if (!token) return [];
    const decoded = jwtDecode(token);
    return decoded?.scope?.split(" ")
}


export const isAllowed = (permission) => {
    return getPermission()?.includes(permission) || permission === "all"
}

const PermissionChecker = ({ children, permission }) => {
    return isAllowed(permission) ? children : null
}

export default PermissionChecker