import axios from "axios";

const reqGetFoods = async (id = "") => {
    return await axios.get(`/api/foods${id}`);
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

const reqGetFoodByName = async (name) => {
    return await axios.get(`api/foods?query=${name}`);
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
    reqGetFoodByName,
    reqCreateFood,
    reqDeleteFood,
    reqUpdateFood,
    reqGetFoodByCategory,
    reqUploadImage,
    reqGetPopularFoods
};
