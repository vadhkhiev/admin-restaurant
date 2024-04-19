
import { setAuth } from '../../auth/authHelper';
import useAuth from '../../auth/core/action';

import { reqLogin } from './request'
import {useDispatch } from "react-redux"

const useLogin = () => {
    const dispatch = useDispatch();
    const {getUser} = useAuth();

     const userLogin = async (username , password) => {
        await reqLogin(username , password).then((res)=>{
            setAuth(res.data.token)
            getUser();
            
        })
        .catch((err)=> {console.log(err)})
     }

  return {userLogin}
}

export default useLogin