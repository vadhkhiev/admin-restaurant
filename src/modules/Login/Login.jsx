import React from 'react'
import logo from '../../assets/img/kiloit-logo.svg'
import { useState } from 'react'
import useLogin from './core/action'

const Login = () => {
  const { userLogin} = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();
      if (!username || !password) {
        setError('Please enter a username and password');
        return;
      }
      userLogin(username , password , setError);
    };
    


  return (
    <>
    <main style={{background:'#09090b'}} className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <img width={100} height={100} src={logo} alt="" />
                <h1 className="h2 text-white">Welcome back!</h1>
              </div>

              <div style={{background:'#09090b'}} className="card custom-border">
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
                      </div>
                      <div className="d-grid gap-2 mt-4">
                        <span onClick={handleLogin}
                        tabIndex="0"
                        role='button'
                        onKeyDown={event => {
                          if (event.key === 'Enter') {
                            handleLogin();
                          }
                         }}                   
                        className="btn btn-lg custom-btn text-white custom-border">
                          Log in
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
    </>
  )
}

export default Login