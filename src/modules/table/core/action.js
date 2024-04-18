import { reqGetTable } from "./request"

const useTable = () => {
    const getTableList = async () => {
      await reqGetTable().then((res) => {
        console.log(res)
      }).catch((err) => console.log(err))
    }
  return {
    getTableList
  }
}

export default useTable
