import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import { getUser } from '../helpers/account';
import otpSend from '../helpers/otpSend';


function Otp() {
  const navigate = useNavigate()
  const [formInfo, setFormInfo] = useState({})
  const [sending, setSending] = useState(false)

  const inputHandle = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await getUser({email:formInfo.email})
    if (!data.success) {
      return toast.error(data.message)
    }
    else {
      setSending(true)
      let otpSent = await otpSend({ email: data?.user?.email, username: data?.user?.username })
      setSending(false)
      if (!otpSent.success && otpSent.sent) {
        navigate(`/user/login/otp/verification?id=${data?.user?._id}&email=${encodeURIComponent(data?.user?.email)}`);
        toast.info(otpSent.message)
      } else if (otpSent.success && otpSent.sent) {
        navigate(`/user/login/otp/verification?id=${data?.user?._id}&email=${encodeURIComponent(data?.user?.email)}`);
        toast.success(otpSent.message)
      } else {
        toast.error(otpSent.message)
      }
    }

  }
  return (
    <>
      <Helmet>
        <title>Generate an OTP</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>
  
      <div className=" flex text-white lg:flex-row flex-col-reverse">
        <div className='lg:min-h-[100vh] min-h-[65vh] lg:w-2/4 w-full bg-[#16520f] lg:pt-8 pt-0 relative overflow-hidden'>
          <div className='overflow-hidden  shadow-[0_0_40px_#000000] absolute right-0 lg:h-[80vh] h-[65vh] w-full lg:w-[70%]  flex items-center justify-center bg-[#16520f] bg-opacity-60 lg:rounded-l-2xl'>

            <img loading="lazy"  src="/fruits2.jpg" alt="" className='h-full w-full object-cover opacity-30' />

            {/* text over video */}
            <div className='text-white absolute'>
              <div className='flex flex-col items-center'>
                <h1 className='md:text-[40px] text-[32px] font-bold'>Welcome back to</h1>
                <h1 className='md:text-[40px] text-[32px] font-bold'>AgriMarket</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:min-h-[100vh] min-h-[70vh] w-full bg-white pt-8'>
          {/* login */}
          <div className='overflow-hidden  shadow-[0_0_40px_#000000] absolute lg:w-[48%] w-full  lg:h-[80vh] h-[70vh]  bg-white px-6 lg:px-16 py-10 text-black lg:rounded-r-2xl'>
            {sending && <div className='absolute bg-black bg-opacity-35 h-full w-full left-0 top-0 flex justify-center items-center'> <img loading="lazy"  src="/emailSend.gif" alt="sending..." className='w-[120px] h-[120px] ' /></div>}

            <form onSubmit={handleSubmit} className='flex flex-col gap-10 md:gap-16'>
              <img loading="lazy"  src="/cross.gif" alt="cross" onClick={() => navigate('/')} className='absolute top-2 right-2 w-8 md:w-10 cursor-pointer' />
              <div className='text-center'>
                <h3 className='font-semibold text-[24px] md:text-[34px] text-green-500 '>Verification</h3>
                <h5>We will send you OTP on your email</h5>
              </div>

              <div className=' w-full flex flex-col '>
                <label htmlFor="email" className='text-left px-4 font-semibold w-full'>Email:</label>
                <input type="email" name="email" id="email" value={formInfo.email || ""} onChange={inputHandle} required placeholder='Enter your email' className=' px-3 py-1 border border-black  rounded-full outline-none' />
              </div>
              <button type='submit' className='px-2 py-1.5  bg-green-600 rounded-full text-white'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Otp
