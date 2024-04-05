
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentUser } from "./currentuserSlice";

const useCurrentUser = () => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const dispatch = useDispatch(); 
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch current user');
                }

                const data = await response.json();
                dispatch(storeCurrentUser(data?.data));
                console.log(data.data, 'current user')
            } catch (error) {
               console.log(error)
            } 
        };


    return { fetchCurrentUser };
};

export default useCurrentUser;
