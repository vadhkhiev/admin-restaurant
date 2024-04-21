import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../core/action';
import { alertError } from '../../utils/alert';
import { storeCreateToggle, storeUpdateToggle } from '../core/reducer';

const Createrole = ({  action }) => {
  const id = useSelector((state) => state.id.id);
  const role = useSelector((state) => state.roles.roles)?.find((role) => role.id === id);
  const dispatch = useDispatch();
  const { createRole, updateRole } = useRoles();
  const [roleinfo, setRoleinfo] = useState({
    name: '',
    code: ''
  });

  useEffect(() => {
    if (action === 'update' && role) {
      setRoleinfo({
        name: role.name,
        code: role.code
      });
    }
  }, [action, role]);

  const handleCreate = async () => {
    createRole(roleinfo);
  };

  const handleUpdate = async () => {
    if (id === 1) {
      alertError("Cannot update role with id 1");
      return;
    }
    updateRole(roleinfo, id);
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10,10,10, 0.5)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className='p-3 border rounded' style={{ width: "30%", backdropFilter: "blur(10px)" }}>
          <IoCloseCircleOutline style={{ cursor: 'pointer' }} onClick={() => dispatch(action === 'update' ? storeUpdateToggle(false) : storeCreateToggle(false))} className='fs-3 text-danger mb-3 me-2' />
          <span className='fs-4 text-white mb-3'>{action === 'update' ? 'Update role' : 'Create role'}</span>
          <input onChange={(e) => setRoleinfo({ ...roleinfo, name: e.target.value })} value={roleinfo.name} className='w-100 custom-border p-2 text-white rounded-3 my-3 bg-transparent' placeholder='Enter Role' type="text" />
          <input onChange={(e) => setRoleinfo({ ...roleinfo, code: e.target.value })} value={roleinfo.code} className='w-100 custom-border p-2 text-white rounded-3 bg-transparent' placeholder='Enter Code' type="text" />
          <div className='d-flex justify-content-center'>
          <button onClick={action === 'update' ? handleUpdate : handleCreate}  className='btn custom-btn  text-white custom-border w-25 mt-3'>{action === 'update' ? 'Update' : 'Submit'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createrole;
