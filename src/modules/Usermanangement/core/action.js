
import { useDispatch , useSelector } from "react-redux";



const useUsers = () => {
    const dispatch = useDispatch(); 
    const { initparams } = useSelector((state) => state.users);
    
    console.log(initparams)

    return { };
};

export default useUsers;
