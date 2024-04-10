import { useEffect, useState } from "react";
import useAuth from "./core/action";
import {useSelector} from "react-redux"
import useRoles from "../role/core/action";

const AuthInit = ({children}) => {
    const {getUser} = useAuth();
    const {getRoles} = useRoles();
    const {isAuth} = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData =  () => {
         getRoles(); 
            getUser();
        };
        
        fetchData();
    }, [isAuth]);
    return children;

}

export {AuthInit}