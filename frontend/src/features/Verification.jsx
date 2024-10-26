import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import otpSend from '../helpers/otpSend';
import { getUser } from '../helpers/account';

function Verification() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false)
  const [formInfo, setFormInfo] = useState({ otp: ['', '', '', ''] }); // Adjust based on OTP length
  const currentParams = new URLSearchParams(window.location.search);
  const id = currentParams.get('id');
  const email = currentParams.get('email');

 useEffect(() => {
  if(id == null || email == null){
    navigate('/NotFound')
  }
 }, [])
 


  const inputHandle = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) { // Allow only single digits
      const newOtp = [...formInfo.otp];
      newOtp[index] = value;
      setFormInfo({ otp: newOtp });

      // Move focus to the next input field if value is entered
      if (value && index < formInfo.otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      } else if (!value && index > 0) { // Move focus to the previous input field if value is deleted
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d{4}$/.test(pastedData)) { // Adjust based on OTP length
      const newOtp = pastedData.split('');
      setFormInfo({ otp: newOtp });

      // Set focus to the last input field
      document.getElementById(`otp-${newOtp.length - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = formInfo.otp.join(''); // Combine OTP digits
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/helper/otpVerification?otp=${otp}`, { method: "GET", credentials: 'include' });
    const data = await response.json();
    if (data.success) {
      navigate(`/user/login/otp/verification/setpassword?id=${id}&email=${encodeURIComponent(email)}`);
      toast.success(data.message)
    } else {
      toast.error(data.message);
    }
  };

  const resendOTP = async (e) => {
    const data = await getUser({email:email});
    if (!data.success) {
      return toast.error(data.message)
    }
    setSending(true)
    let otpSent = await otpSend({ email: data?.user?.email, username: data?.user?.username })
    setSending(false)
    if (!otpSent.success && otpSent.sent) {
      toast.info(otpSent.message)
    } else if (otpSent.success && otpSent.sent) {
      toast.success(otpSent.message)
    } else {
      return toast.error(otpSent.message)
    }
  };

  return (
    <>
      <Helmet>
        <title>OTP Verification</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>

      <div className=" flex text-white lg:flex-row flex-col-reverse">
        <div className='lg:min-h-[100vh] min-h-[65vh] lg:w-2/4 w-full bg-[#16520f] lg:pt-8 pt-0 relative overflow-hidden'>
          <div className='overflow-hidden  shadow-[0_0_40px_#000000] absolute right-0 lg:h-[80vh] h-[65vh] w-full lg:w-[70%]  flex items-center justify-center bg-[#16520f] bg-opacity-60 lg:rounded-l-2xl'>

          <img src="/farmer1.jpg" alt="" className='h-full w-full object-cover opacity-30' />
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
          {sending && <div className='absolute bg-black bg-opacity-35 h-full w-full left-0 top-0 flex justify-center items-center'> <img src="/emailSend.gif" alt="sending..." className='w-[120px] h-[120px] ' /></div>}
            <form onSubmit={handleSubmit} className='flex flex-col gap-10 md:gap-16'>
              <img src="/cross.gif" alt="cross" onClick={() => navigate('/')} className='absolute top-2 right-2 w-8 md:w-10 cursor-pointer' />
              <div className='text-center'>
                <h3 className='font-semibold text-[24px] md:text-[34px] text-green-500'>Verification</h3>
                <h5>You will get OTP via email</h5>
              </div>
              <div className='flex gap-2 justify-center'>
                {formInfo.otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type='text'
                    maxLength='1'
                    value={digit}
                    onChange={(e) => inputHandle(e, index)}
                    onPaste={handlePaste}
                    className='w-12 h-12 md:w-14 md:h-14 text-center border border-gray-500 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none'
                  />
                ))}
              </div>
              <div className='flex flex-col gap-3 '>
                <button type='submit' className='px-2 py-1.5 bg-green-600 rounded-full text-white'>Verify</button>
                <p className='text-center'>Didn't receive the verification OTP? <button type='button' onClick={resendOTP} className='underline text-blue-500'>Resend OTP</button></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verification;
