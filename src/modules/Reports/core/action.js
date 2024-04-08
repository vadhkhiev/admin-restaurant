import { reqFoodReports } from "./request"
import { useSelector , useDispatch } from 'react-redux'
import { storeParams, storefoodReports ,storePaging } from "./reducer"
import { useEffect } from "react";


const useReports = () => {
    const { params } = useSelector(state => state.foodReports); 
    const dispatch = useDispatch();
    console.log(params);

    const addParams = (key, value) => {
        dispatch(storeParams({
            ...params,  // Merge the new parameter with existing parameters
            [key]: value
        }));
    };

    const fetchFoodReports = async () => {
        try {
            const response = await reqFoodReports(params);
            dispatch(storefoodReports(response.data.data));
            dispatch(storePaging(response.data.paging));
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchFoodReports();
    }, [params]);

    return { fetchFoodReports, addParams };
};

export default useReports;
