import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import { useSelector } from 'react-redux';
import useRoles from '../core/action';
import loadingscreen from '../../../assets/img/loading.gif';

const Access = () => {
  const id = useSelector((state) => state.id.id);
  const role = useSelector((state) => state.roles.roles)?.find((role)=>role.id == id);
  const {updateRolePermissions} = useRoles();
  const [rolePermissions, setPermissions] = useState([]);
  const [defaultValue, setDefault] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getRolebyId } = useRoles();

  useEffect(() => {
    getRolebyId(id)
      .then((res) => {
        const { permissions } = res.data;
        setPermissions(permissions);
        setDefault(permissions);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReset = () => {
    setPermissions(defaultValue);
  };


  const handleSubmit = async () => {
    const data = {
      role_id: id,
      permissions: rolePermissions.map((perm) => ({
        permission_id: perm.id,
        status : perm.status === 1 ? true : false
      })), 
    };
    updateRolePermissions(data);
  };

  return (
    <div className='m-3'>
      {loading ? (
       <div className='d-flex justify-content-center'>
          <img width={25} height={25} src={loadingscreen} alt="loading" />
        </div>
      ) : (
        <div className=' py-3 rounded-3 custom-border'  >
          <div className='p-2 px-3 d-flex justify-content-between '>
            <div>
              <span className='p-2 custom-border rounded-3'>
                <a style={{ textDecoration: 'none' }} className={`p-2 text-white borderbottom`}>Access <GrUserAdmin className='pb-1' /></a>
              </span>
            </div>
            <div>
              <button onClick={handleBack} className='btn custom-border custom-btn text-white rounded'>{`< Back`}</button>
            </div>
          </div>
          <h4 className='text-white d-flex align-items-center ms-3 mb-3'>Permission of <span className='text-primary ms-2'>{role.name}</span></h4>
          <main className='rounded-3 custom-border mx-3'>
          <table className='table table-borderless'>
  <thead>
    <tr className='py-3'>
      <th className='border-bottom border-dark text-white-50'># Permission</th>
      <th className='border-bottom border-dark text-white-50 d-flex justify-content-end'>Check</th>
    </tr>
  </thead>
  <tbody>
    {rolePermissions?.map((permission, index) => (
      <tr key={index} className="hover-effect"> 
        <td className='border-bottom border-dark custom-text text-white-50 fs-5'>{index + 1}{'. '}{permission.name}</td>
        <td className='border-bottom border-dark custom-text d-flex justify-content-end'>
          <input 
            type="checkbox" 
            className='form-check-input cursor-pointer' 
            style={{ width: '1.15rem', height: '1.15rem' }} 
            checked={permission.status === 1} 
            onChange={(e) => {
              const newValue = permission.status === 1 ? 0 : 1;
              const newPermission = { ...permission, status: newValue };
              const newValueState = rolePermissions.map((p) => (
                p.id === permission.id ? newPermission : p
              ));
              setPermissions(newValueState);
            }}
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>


          </main>
          <div className='d-flex justify-content-end me-3 mt-3'>
              <button onClick={handleReset} className='btn btn-danger me-3'>Reset</button>
              <button onClick={handleSubmit} className='btn custom-border text-white custom-btn'>Save</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Access;
