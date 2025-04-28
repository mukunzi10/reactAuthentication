import {React, useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Register = () => {
    const [inputData, setData]=useState({
        username:'',
        email:'',
        password:''
    })
    const submitHandle=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',inputData)
        .then(res=>{
            console.log(res)

        })
        .catch(err=>console.log(err))
    }

  return (
    <div>

        <div className=' flex-row flex-grow bg-white w-[400px]  border-gray-700  rounded-md shadow-lg' >
            <div className=' text-lg  text-nowrap capitalize py-4 items-center text-white text-center
             '>user registration</div>
            <div className='flex-col space-4 items-center w-[300px] px-5'>
                <form action='' method='post' onSubmit={submitHandle}>
                    <div className='w-[300px] p-2'>
                    <label>UmserName</label>
                    <input type='text' name='username' 
                    onChange={e=>setData({...inputData,username:e.target.value})}
                    className=' border-sm border-gray-700 border-2 ml-2 rounded-md hover:border-green-200 focus:border-red-600 
                    '/>
                    </div>
                    <div className='w-[300px] p-2'>
                    <label>Email </label>
                    <input type='email' name='email'
                    onChange={e=>setData({...inputData,email: e.target.value})}
                     className=' border-sm border-gray-700 border-2 ml-2 rounded-md hover:border-green-200 focus:border-red-600 '/>
                    </div>
                    <div className='w-[300px] p-2'>
                    <label>Password</label>
                    <input type='password' name='password' onChange={e=>setData({...inputData,password: e.target.value})}
                     className=' border-sm border-gray-700 border-2 ml-2 rounded-md hover:border-green-200 focus:border-red-600 '/>
                    </div>
                    <div className='w-[300px] p-2'>
                    
                    <input type='submit' name='save' value='Register' className='bg-green-500 px-2 py-2 rounded-sm shadow-md text-white'/>
                    </div>
                    
                </form>

            </div>
            <div className='text-center text-sm text-gray-500'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></div>
        </div>
    </div>
  )
}

export default Register