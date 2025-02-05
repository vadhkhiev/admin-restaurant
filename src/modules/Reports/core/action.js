import { reqFoodReports } from "./request"
import { useSelector, useDispatch } from 'react-redux'
import { storeParams, storefoodReports, storePaging, setLoading } from "./reducer"



const useReports = () => {

  const { params } = useSelector((state) => state.foodReports);
  const dispatch = useDispatch();

  const handleFilter = (name, value) => {
    dispatch(storeParams({ [name]: value }));
  };

    const fetchFoodReports = async () => {
        try {
            const response = await reqFoodReports(params);
            dispatch(storefoodReports(response.data.data));
            dispatch(storePaging(response.data.paging));
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error);
        }
    };

    return { fetchFoodReports, handleFilter };

};

export default useReports;
