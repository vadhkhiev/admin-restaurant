import { useEffect} from "react";
import useAuth from "./core/action";
import {useSelector} from "react-redux"
import useRoles from "../Role/core/action";

const AuthInit = ({children}) => {
    const {getUser} = useAuth();
    const {getRoles} = useRoles();
    const {isAuth} = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData =  () => {
            if(localStorage.getItem("token")){
                getRoles(); 
                getUser();
            }
        };
        fetchData();
    }, [isAuth]);
    return children;

}

export {AuthInit}