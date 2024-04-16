import axios from "axios";

const reqTables = async (params) => {
    return await axios.get('/api/tables', { params });
}

const reqCreateTable = async (payload) => {
    return await axios.post('/api/tables', payload)
}

const reqUpdateTable = async (payload , id) => {
    return await axios.put(`/api/tables/${id}`, payload)
}
const reqDeleteTable = async (id) => {
    return await axios.delete(`/api/tables/${id}`)
}

export { reqTables ,reqDeleteTable ,reqCreateTable ,reqUpdateTable }