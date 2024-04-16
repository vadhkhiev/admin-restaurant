import React from 'react'
import { reqCreateTable, reqDeleteTable, reqTables, reqUpdateTable } from './request'
import { useDispatch, useSelector } from 'react-redux'
import { storeCreateToggle, storeParams, storeTableList, storeUpdateToggle } from './reducer';
import { alertConfirm, alertError, alertSuccess } from '../../utils/alert';

const useTable = () => {
    const dispatch = useDispatch();
    const { params} = useSelector((state)=>state.tableList)

    const getTableList = async () => {
        await reqTables(params).then((res)=> dispatch(storeTableList(res.data)) ).catch((err)=>console.log(err))
    }

    const createTable = async (payload) => {
        await reqCreateTable(payload).then((res)=> {
          getTableList()
          dispatch(storeCreateToggle(false))
          alertSuccess(res.data.message)
        } ).catch((err)=>
        alertError(err.response.data.message)
      )
    }

    const updateTable = async (payload , id) => {
        await reqUpdateTable(payload , id).then((res)=> {
          alertSuccess(res.data.message)
          dispatch(storeUpdateToggle(false))
          getTableList()
        } ).catch((err)=>
        alertError(err.response.data.message)
      )
    }

    const deleteTable = async (id) => {
      try {
          await alertConfirm(`Do you want to delete this table Id : ${id} ?`).then((result) => {
            if (result.isConfirmed) {
                reqDeleteTable(id).then((res) => {
                    alertSuccess("Table deleted successfully");
                    getTableList();
                   
                })
            } 
        });
      } catch (err) {
          await alertError(err.response.data.message);
      }
  };

  
    const handleFilter = (name, value) => {
        dispatch(storeParams({ [name]: value }));
    };

  return {
    getTableList,
    handleFilter,
    deleteTable,
    createTable,
    updateTable
  }
}

export default useTable