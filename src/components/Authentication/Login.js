import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../assets/main.css';
import BackgroundImage from '../../assets/images/bg.jpg';

const Login = props => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const login = async event => {
    event.preventDefault();
    const info = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };
  };

  return (
    <div className='h-screen overflow-hidden flex items-center justify-center bg-gray-200'>
      <div className='container mx-auto'>
        <div className='flex justify-center px-6 my-12'>
          <div className='w-full xl:w-3/4 lg:w-11/12 flex border-2 overflow-hidden'>
            <div
              className='w-full h-auto hidden lg:block lg:w-1/2 bg-cover bg-center rounded-l-lg'
              style={{
                backgroundImage: `url(${BackgroundImage})`
              }}
            ></div>

            <div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
              <h3 className='pt-4 text-2xl text-center'>Chat App!</h3>
              <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded'>
                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    for='username'
                  >
                    Username
                  </label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='username'
                    type='text'
                    placeholder='Username'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    for='password'
                  >
                    Password
                  </label>
                  <input
                    className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='password'
                    type='password'
                    placeholder='Password'
                  />
                </div>
                <div className='mb-4'>
                  <input
                    className='mr-2 leading-tight'
                    type='checkbox'
                    id='checkbox_id'
                  />
                  <label className='text-sm' for='checkbox_id'>
                    Remember Me
                  </label>
                </div>
                <div className='mb-6 text-center'>
                  <button
                    className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Sign In
                  </button>
                </div>
                <hr className='mb-6 border-t' />
                <div className='text-center'>
                  <a
                    className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
                    href='./register'
                  >
                    Create an Account!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
