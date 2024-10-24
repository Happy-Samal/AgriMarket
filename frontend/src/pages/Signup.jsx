import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserProvider';

function Signup() {
    const LoginUser = useContext(UserContext)
    const navigate = useNavigate()
    const [formInfo, setFormInfo] = useState({})
    const [passwordWrong, setPasswordWrong] = useState(false)
    const [passwordInput, setPasswordInput] = useState(false)
    const [cnfpasswordInput, setCnfpasswordInput] = useState(false)
    const [loading , setLoading] = useState(false)

    if (LoginUser.success) {
        navigate('/NotFound')
    }

    const eyeClick = (e) => {
        if (e.target.id == 'eye') {
            setPasswordInput(!(passwordInput))
        } else {
            setCnfpasswordInput(!(cnfpasswordInput))
        }
        if (e.target.src.includes('/eyeclose.png')) {
            e.target.src = '/eyeopen.png'
        } else {
            e.target.src = '/eyeclose.png'
        }
    }

    const inputHandle = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formInfo.password !== formInfo.cnfpassword) {
            setPasswordWrong(true)
            setCnfpasswordInput(!(cnfpasswordInput))
            setPasswordInput(!(passwordInput))
        } else {
            setLoading(true)
            setPasswordWrong(false)
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
                    {
                        method: 'POST',
                        headers: {
                            "Content-type": 'application/json'
                        },
                        body: JSON.stringify(formInfo)
                    }
                )
                const result = await response.json()
                if (result.success) {
                    navigate(result.redirectUrl)
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
                setLoading(false)
            } catch (err) {
                navigate('/error')
            }
        }

    }
    return (
        <>
            <Helmet>
                <title>Create your account</title>
                <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
            </Helmet>

            <div className=" flex text-white lg:flex-row flex-col-reverse">
                <div className='lg:min-h-[100vh] min-h-[65vh] lg:w-2/4 w-full bg-[#16520f] lg:pt-8 pt-0 relative overflow-hidden'>
                    <div className='overflow-hidden  shadow-[0_0_40px_#000000] absolute right-0 lg:h-[80vh] h-[65vh] w-full lg:w-[70%]  flex items-center justify-center bg-[#16520f] bg-opacity-60 lg:rounded-l-2xl'>

                        <img src="/farmer.webp" alt="" className='h-full w-full object-cover opacity-30' />

                        {/* text over video */}
                        <div className='text-white absolute'>
                            <div className='flex flex-col items-center'>
                                <h1 className='lg:text-[40px] text-[32px] font-bold'>Welcome to</h1>
                                <h1 className='lg:text-[40px] text-[32px] font-bold'>AgriMarket</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:min-h-[100vh] min-h-[90vh] w-full bg-white pt-8'>
                    {/* login */}
                    <div className='overflow-hidden  shadow-[0_0_40px_#000000] absolute lg:w-[48%] w-full  lg:h-[80vh] h-[90vh]  bg-white px-6 lg:px-16 py-10 text-black lg:rounded-r-2xl'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                            <h3 className='font-semibold text-[24px] lg:text-[34px] text-green-500 text-center'>Sign Up</h3>
                            <img src="/cross.gif" alt="cross" onClick={() => navigate('/')} className='absolute top-2 right-2 w-8 lg:w-10 cursor-pointer' />
                            <div className='flex flex-col gap-3'>
                                <div className='relative w-full flex flex-col'>
                                    <label htmlFor="role" className='text-left px-4 font-semibold w-full'>
                                        What is your role:
                                    </label>
                                    <div className='flex gap-2 items-center justify-center'>
                                        <label htmlFor="Farmer">
                                            <input type="radio" name="role" id="Farmer" required value={'farmer'} onChange={inputHandle} /> Farmer
                                        </label>
                                        <label htmlFor="Customer">
                                            <input type="radio" name="role" id="Customer" value={'customer'} onChange={inputHandle} required /> Customer
                                        </label>
                                    </div>

                                </div>
                                <div className='relative w-full flex flex-col'>
                                    <label htmlFor="email" className='text-left px-4 font-semibold w-full'>Email:</label>
                                    <input type="email" name="email" id="email" value={formInfo.email || ""} onChange={inputHandle} required placeholder='Enter your email' className=' px-3 py-1 border border-black  rounded-full outline-none' />
                                </div>

                                <div className='relative w-full flex flex-col'>
                                    <label htmlFor="phone" className='text-left px-4 font-semibold w-full'>Name:</label>
                                    <input type="text" name="username" id="username" value={formInfo.username || ""} onChange={inputHandle} required placeholder='Enter your name' className=' px-3 py-1 border border-black  rounded-full outline-none' />
                                </div>
                                <div className='relative flex flex-col w-full'>
                                    <label htmlFor="password" className='text-left px-4 font-semibold w-full'>Password:</label>
                                    <input type={`${passwordInput ? 'text' : 'password'}`} name="password" id="password" value={formInfo.password || ""} minLength={6} onChange={inputHandle} required placeholder='Enter your password' className={`px-3 py-1  rounded-full outline-none ${passwordWrong ? 'border-2 border-red-600' : ' border-black border'}`} />
                                    <span className='absolute right-3 top-8'><img id='eye' src="/eyeclose.png" alt="show" className='w-5  cursor-pointer' onClick={(e) => { eyeClick(e) }} /></span>
                                </div>
                                <div className='relative flex flex-col w-full'>
                                    <label htmlFor="cnfpassword" className='text-left px-4 font-semibold w-full'>Confirm Password:</label>
                                    <input type={`${cnfpasswordInput ? 'text' : 'password'}`} name="cnfpassword" id="cnfpassword" value={formInfo.cnfpassword || ""} minLength={6} onChange={inputHandle} required placeholder='confirm your password' className={`px-3 py-1  rounded-full outline-none ${passwordWrong ? 'border-2 border-red-600' : ' border-black border'}`} />
                                    <span className='absolute right-3 top-8'><img id='cnfeye' src="/eyeclose.png" alt="show" className='w-5  cursor-pointer' onClick={(e) => { eyeClick(e) }} /></span>
                                </div>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <button disabled={loading} type='submit' className='px-2 py-1.5  bg-green-600 rounded-full text-white'>
                                    {loading ?
                                        <img src="/loader.gif" alt="loading" className='w-5 md:w-6 ' />
                                        :
                                        <span>SignUp</span>
                                    }
                                </button>
                                <h6 className='text-center'>Have already an account ? <Link to={'/user/login'} className='text-blue-600 underline'>login here</Link></h6>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup
