import React, { useState } from 'react'
import { FaEyeSlash,FaEye  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/auth/Oauth';
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from '../URL/baseUrl.js';

const userSchema = yup.object({
  email: yup.string().required('Please enter your email').email('Please enter a valid email')
  .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Email must be in lowercase letters only')
  .test('is-lowercase', 'Email must be in lowercase', (value) => value === value?.toLowerCase()),
  password: yup.string().required('Please enter your password')
});

function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(userSchema),
});

const onSubmit = async (data) => {
  try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/api/user/login`, data, { withCredentials: true, },);
      toast.success(res.data.message);
      navigate("/userHome");
      setLoading(false);
  } catch (error) {
      toast.error('Invalid Credentials');
      console.log(error);
      setLoading(false);
  }
};




  return (
    <section className='lg:h-screen'>
    <h1 className='text-3xl text-center mt-6 font-bold uppercase'>Login</h1>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
    <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
      <img src="https://plus.unsplash.com/premium_photo-1709842822358-006f08261139?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="key" className='w-full rounded-2xl' />
    </div>
    <div className='w-full md:w-67% lg:w-[40%] lg:ml-20'>
      <form onSubmit={handleSubmit(onSubmit)} >
        <input  
        type="email" 
        placeholder='Email'
        {...register("email")} 
        className='mb-2 w-full px-4 py-2 text-xl text-gray-300  bg-slate-900 input input-bordered input-primary w-100  rounded ' 
        />
        {errors.email && (
          <span className="text-error block text-sm  mb-4 ml-2">
             {errors.email.message}
               </span>
         )}
        <div className='relative'>
         <input  
        type={showPassword ? "text" : "password"} 
        placeholder='Password'
        {...register("password")} 
        className='mb-2 w-full px-4 py-2 text-xl  text-gray-300   bg-slate-900 input input-bordered input-primary w-100 rounded ' 
        />
         {showPassword ? (
          <FaEyeSlash className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>

        ):(<FaEye className='absolute right-3 top-3 text-xl cursor-pointer' 
        onClick={()=>setShowPassword
        ((prevState)=>!prevState)}/>)}
        </div>
        {errors.password && (
          <span className="text-error block text-sm mb-4 ml-2">
             {errors.password.message}
                </span>
          )}
        
        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
          <p className='mb-6'>Don't have a account?
          <Link className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'  to='/sign-up'>
              Register
              </Link>
          </p>
          <p>
            <Link className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out' to={'/forgot-password'}>Forgot password?</Link>
          </p>
        </div>
        <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' 
      type='submit' disabled={loading}>{loading ? <span className='loading loading-spinner bg-primary '></span> : "Login"}</button>
       <div className='flex items-center my-4 before:border-t before:flex-1  before:border-gray-300  after:border-t after:flex-1  after:border-gray-300'>
        <p className='text-center font-semibold mx-4'>OR</p>
      </div>
      <Oauth/>
      </form>
      </div>
    </div>
  </section>
  )
}

export default Signin