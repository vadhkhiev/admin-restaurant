import React, { useEffect } from 'react'
import logo from '../../assets/img/kiloit-logo.svg'
import loadingImg from '../../assets/img/loading.gif'
import { useState } from 'react'
import getAuth from '../auth/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from '../auth/authSlice'
import checkAuth from './core/getUser'



const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [check , setCheck] = useState(true)
    const dispatch = useDispatch()
    const [error, setError] = useState(null);
    const [loading ,setLoading ] = useState(true)
    

    const handleCheckboxChange = () => {
      setCheck(!check);
    };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter a username and password');
      return;
    }
    try {
      const result = await getAuth(username, password);
      if(check){
        localStorage.setItem('token', result.data.token);
      }
      dispatch(login(result));
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  //checkAuth
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      checkAuth(token)
      .then(data => {
        dispatch(login(data));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error during auth verification:', error);
        dispatch(logout())
        setLoading(false);
        localStorage.removeItem('token');
      });
    }else{
      setLoading(false)
    }
  }, []);

  return (
    <>
    {
      loading ? (<div className='loading d-flex flex-row justify-content-center align-items-center'>
        <h4 className='text-white'>Loading...</h4>
        <img width={20} src={loadingImg} alt="" />
      </div>
        
      ):( <>
        <main style={{background:'#222E3C'}} className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <img width={100} height={100} src={logo} alt="" />
                <h1 className="h2 text-white">Welcome back!</h1>
              </div>

              <div style={{background:'#233245'}} className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form>
                      <p className='text-danger text-center'>{error}</p>
                      <div className="mb-3">
                        <label className="form-label text-white-50">Username <span className='text-danger'>*</span></label>
                        <input
                        onChange={(e) => setUsername(e.target.value)}
                          className="form-control form-control-lg"
                          type="username"
                          name="username"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white-50">Password <span className='text-danger'>*</span></label>
                        <input
                        onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-lg"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <div>
                        <div className="form-check align-items-center">
                          <input
                            id="customControlInline"
                            type="checkbox"
                            className="form-check-input"
                            onChange={handleCheckboxChange}
                            defaultChecked
                            name="remember-me"
                          />
                          <label className="form-check-label text-small text-white-50" >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <span onClick={handleLogin}  className="btn btn-lg btn-primary">
                          Sign in
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>)
    }
    </>
  )
}

export default Login