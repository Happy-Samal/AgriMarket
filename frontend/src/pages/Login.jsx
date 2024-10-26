import React, { useState, useEffect , useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserProvider';

function Login() {
  const LoginUser = useContext(UserContext)
  const navigate = useNavigate()
  const [formInfo, setFormInfo] = useState({})
  const [passwordWrong, setPasswordWrong] = useState(false)
  const [passwordInput, setPasswordInput] = useState(false)
  const [cnfpasswordInput, setCnfpasswordInput] = useState(false)
  const [loading , setLoading] = useState(false)


  if(LoginUser.success){
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
    try {
      setLoading(true)
      const response = await fetch(`/api/auth/login`,
        {
          method: 'POST',
          headers: {
            "Content-type": 'application/json'
          },
          body: JSON.stringify(formInfo),
          credentials: 'include'
        }
      )
      const result = await response.json()
      if (result.success) {
        navigate(result.redirectUrl)
        window.location.reload();
      }else{
        toast.error(result.message);
      }
    setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error("Internal Server Error!");
    }
  }


  return (
    <>
      <Helmet>
        <title>Login to your account</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>
      
      <div className=" flex text-white lg:flex-row flex-col-reverse">
        <div className='lg:min-h-[100vh] min-h-[65vh] lg:w-2/4 w-full bg-[#16520f] lg:pt-8 pt-0 relative overflow-hidden'>
          <div className='overflow-hidden  shadow-[0_0_40px_#000000] absolute right-0 lg:h-[80vh] h-[65vh] w-full lg:w-[70%]  flex items-center justify-center bg-[#16520f] bg-opacity-60 lg:rounded-l-2xl'>

            <img src="/fruits1.jpg" alt="" className='h-full w-full object-cover opacity-30' />

            {/* text over video */}
            <div className='text-white absolute'>
              <div className='flex flex-col items-center'>
                <h1 className='lg:text-[40px] text-[32px] font-bold'>Welcome back to</h1>
                <h1 className='lg:text-[40px] text-[32px] font-bold'>AgriMarket</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:min-h-[100vh] min-h-[70vh] w-full bg-white pt-8'>
             {/* login */}
          <div className='overflow-hidden  shadow-[0_0_40px_#000000] absolute lg:w-[48%] w-full  lg:h-[80vh] h-[70vh]  bg-white px-6 lg:px-16 py-10 text-black lg:rounded-r-2xl'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-10 lg:gap-16'>
              <img src="/cross.gif" alt="cross" onClick={() => navigate('/')} className='absolute top-2 right-2 w-8 lg:w-10 cursor-pointer' />
              <h3 className='font-semibold text-[24px] lg:text-[34px] text-green-500 text-center'>Login</h3>

              <div className='flex flex-col gap-5'>
                <div className='relative w-full flex flex-col'>
                  <label htmlFor="email" className='text-left px-4 font-semibold w-full'>Email:</label>
                  <input type="email" name="email" id="email" value={formInfo.email || ""} onChange={inputHandle} required placeholder='Enter your email' className=' px-3 py-1 border border-black  rounded-full outline-none' />
                </div>

                <div className='relative flex flex-col w-full'>
                  <label htmlFor="password" className='text-left px-4 font-semibold w-full'>Password:</label>
                  <input type={`${passwordInput ? 'text' : 'password'}`} name="password" id="password" value={formInfo.password || ""} minLength={6} onChange={inputHandle} required placeholder='Enter your password' className={`px-3 py-1  rounded-full outline-none ${passwordWrong ? 'border-2 border-red-600' : ' border-black border'}`} />
                  <span className='absolute right-3 top-8'><img id='eye' src="/eyeclose.png" alt="show" className='w-5  cursor-pointer' onClick={(e) => { eyeClick(e) }} /></span>
                  <Link to={'/user/login/otp'} className='text-blue-500 hover:underline absolute -bottom-7 right-3'>Forget Password?</Link>
                </div>
              </div>

              <div className='flex flex-col gap-5'>
              
                <button disabled={loading} type='submit' className='px-2 py-1.5  bg-green-600 rounded-full text-white flex items-center justify-center'>
                {loading ?
                    <img src="/loader.gif" alt="loading" className='w-5 md:w-6 ' />
                    :
                    <span>Login</span>
                  }
                  </button>
                <h6 className='text-center'>Don't have an account ? <Link to={'/user/signup'} className='text-blue-600 underline'>singup</Link></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
