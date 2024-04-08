
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "./currentuserSlice";

const useCurrentUser = () => {
    const dispatch = useDispatch(); 
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('/api/user/profile');

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

        

    return { fetchCurrentUser};
};

export default useCurrentUser;
