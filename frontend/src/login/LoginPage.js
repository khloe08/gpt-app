import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { HiLockClosed } from 'react-icons/hi'
import { ErrorMessage } from '@hookform/error-message';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';


import { loginUser } from '../api/User';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';

import tw from 'twin.macro';

const Input = tw.input`
  appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
`;

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 // useForm 사용을 위한 선언
  const { register, setValue, formState: { errors }, handleSubmit } = useForm();

  const handleButtonClick = async (e) => {
    window.location.href = '/oauth2/authorization/naver';
  }

  // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const handleLogin  = async ({ username, password }) => {
      
      
      // 백으로부터 받은 응답
      const response = await loginUser({ username, password });

      if (response.status) {
          // 쿠키에 Refresh Token, store에 Access Token 저장
          setRefreshToken(response.json.refresh_token);
          dispatch(SET_TOKEN(response.json.access_token));

          return navigate("/main");
      } else {
          console.log(response.json);
      }
  };

    return (
      <div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    User ID
                                </label>
                                <Input
                                    {...register("username", {required: "Please Enter Your ID"})}
                                    type="text"
                                    placeholder="username"
                                />
                                <ErrorMessage
                                    name="username"
                                    errors={errors}
                                    render={( { message }) =>
                                        <p className="text-sm font-medium text-rose-500">
                                            { message }
                                        </p>
                                }
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Input
                                    {...register("password", {required: "Please Enter Your Password"})}
                                    type="text"
                                    placeholder="Password"
                                />
                                <ErrorMessage
                                    name="username"
                                    errors={errors}
                                    render={( { message }) =>
                                        <p className="text-sm font-medium text-rose-500">
                                            { message }
                                        </p>
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              <HiLockClosed className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                                Sign in
                            </button>
                        </div>
                    </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>간편 로그인</h2>
        <button onClick={handleButtonClick} style={{padding: '10px 15px', fontSize: '10px', borderRadius: '2px', cursor: 'pointer'}}>네이버</button>
       <Link to="/register"><button>회원가입</button></Link>
        </div>
        </div> 

    );
  }


export default LoginPage;