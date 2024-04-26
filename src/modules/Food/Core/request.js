import axios from "axios";

const reqGetFoods = async (params) => {
    return await axios.get(`/api/foods`, {params});
};


const reqCreateFood = async (payload) => {
    return await axios.post(`/api/foods`, payload);
};

const reqDeleteFood = async (id) => {
    return await axios.delete(`/api/foods/${id}`);
};

const reqUpdateFood = async (id, payload) => {
    return await axios.put(`/api/foods/${id}`, payload);
};

const reqGetFoodByCategory = async (payload) => {
    return await axios.get(
        `api/foods/list?nameType=${payload}&filters=categories`
    );
};

const reqGetPopularFoods = async () => {
    return await axios.get(
        `/api/foods/list?size=16&filters=popular`
    )
}

const reqUploadImage = async (payload) => {
    return await axios.post(`api/food/images`, payload);
};

export {
    reqGetFoods,
    reqCreateFood,
    reqDeleteFood,
    reqUpdateFood,
    reqGetFoodByCategory,
    reqUploadImage,
    reqGetPopularFoods
};
