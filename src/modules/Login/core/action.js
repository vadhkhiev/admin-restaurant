
import { setAuth } from '../../auth/authHelper';
import useAuth from '../../auth/core/action';
import { reqLogin } from './request'

const useLogin = () => {
    const {getUser} = useAuth();

     const userLogin = async (username , password , setError) => {
        await reqLogin(username , password).then((res)=>{
            setAuth(res.data.token)
            getUser();
        }).catch((err)=>setError(err?.response?.data?.message))
     }

  return {userLogin}
}

export default useLogin