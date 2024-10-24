import React, { useContext, useState ,useEffect} from 'react'
import { UserContext } from '../context/UserProvider'
import { toast } from 'react-toastify';
function AccountInformation() {
  const loginUser = useContext(UserContext);
  const [formInfo, setFormInfo] = useState({})
  useEffect(() => {
    if(loginUser){
      setFormInfo(loginUser.user)
    }
  }, [loginUser])
  
  const [passwordWrong, setPasswordWrong] = useState(false)
  const [passwordInput, setPasswordInput] = useState(false)
  const [cnfpasswordInput, setCnfpasswordInput] = useState(false)

  const [editOn , setEditOn] = useState(false)

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
    if (formInfo?.password !== formInfo?.cnfpassword) {
      setPasswordWrong(true)
      setCnfpasswordInput(!(cnfpasswordInput))
      setPasswordInput(!(passwordInput))
    } else {
      setPasswordWrong(false)
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/updateUser`,
          {
            method: 'PUT',
            headers: {
              "Content-type": 'application/json'
            },
            body: JSON.stringify(formInfo),
            credentials:'include'
          }
        )
        const result = await response.json()
        if (result.success) {
          toast.success(result.message);
          setFormInfo(result.user)
          setEditOn(false)
        } else {
          toast.error(result.message);
        }

      } catch (err) {
        toast.error("Internal Server Error")
      }
    }
  }

  return (
    <>

     {!editOn ?  <button onClick={()=>{setEditOn(true)}} className='px-2 py-1 border-2  bg-green-500  text-white flex items-center gap-2 rounded-md'>
        <span>Edit</span>
        <img src="/edit.gif" alt="edit" className='w-4 invert' />
      </button> : <button onClick={()=>{setEditOn(false)}} className='px-2 py-1 border-2  bg-red-500 text-white flex items-center gap-2 rounded-md'>
        <span>Cancel</span>
        <img src="/cross.gif" alt="edit" className='w-5 invert' />
      </button>}


      <form onSubmit={handleSubmit} className='flex flex-col gap-8 px-4 md:px-0  '>
        <div className='flex flex-wrap gap-3 '>
          <div className='relative lg:w-[30vw] w-full flex flex-col gap-2'>
            <label htmlFor="email" className='text-left font-semibold w-full'>Your Email  Address:</label>
            <input type="email" name="email" id="email" value={formInfo?.email || ""} onChange={inputHandle}  placeholder='Enter your email' disabled={!editOn} className=' px-3 py-1  border-b-2 border-black shadow-sm  outline-none text-black bg-white' />
          </div>
          <div className='relative lg:w-[30vw] w-full flex flex-col gap-2'>
            <label htmlFor="phone" className='text-left  font-semibold w-full'>Your Name:</label>
            <input type="text" name="username" id="username" value={formInfo?.username || ""} onChange={inputHandle}  placeholder='Enter your username' disabled={!editOn} className='px-3 py-1  border-b-2 border-black shadow-sm  outline-none text-black bg-white' />
          </div>
          <div className='relative lg:w-[30vw] w-full flex flex-col gap-2'>
            <label htmlFor="phone" className='text-left  font-semibold w-full'>Your phone number:</label>
            <input type="tel" name="phone" id="phone" value={formInfo?.phone || ""} onChange={inputHandle}  placeholder='Enter your phone number' disabled={!editOn} className='px-3 py-1  border-b-2 border-black shadow-sm  outline-none text-black bg-white' />
          </div>
          <div className='relative lg:w-[30vw] w-full flex flex-col gap-2'>
            <label htmlFor="address" className='text-left  font-semibold w-full'>Your Address:</label>
            <input type="text" name="address" id="address" value={formInfo?.address || ""} onChange={inputHandle}  placeholder='Enter your address' disabled={!editOn} className='px-3 py-1  border-b-2 border-black shadow-sm  outline-none text-black bg-white' />
          </div>
          <div className='relative flex flex-col lg:w-[30vw] w-full gap-2'>
            <label htmlFor="password" className='text-left  font-semibold w-full'>Set your password:</label>
            <input type={`${passwordInput ? 'text' : 'password'}`} name="password" id="password" value={formInfo?.password || ""} minLength={6} onChange={inputHandle}  placeholder='Enter password' disabled={!editOn} className={`px-3 py-1  outline-none ${passwordWrong ? 'border-b-2 border-red-600 text-red-500' : ' border-black border-b-2 outline-none text-black bg-white'} `} />
            <span className='absolute right-3 top-10'><img id='eye' src="/eyeclose.png" alt="show" className='w-5  cursor-pointer' onClick={(e) => { eyeClick(e) }} /></span>
          </div>
          <div className='relative flex flex-col lg:w-[30vw] w-full gap-2'>
            <label htmlFor="cnfpassword" className='text-left  font-semibold w-full'>Confirm Password:</label>
            <input type={`${cnfpasswordInput ? 'text' : 'password'}`} name="cnfpassword" id="cnfpassword" value={formInfo?.cnfpassword || ""} minLength={6} onChange={inputHandle}  placeholder='confirm password' disabled={!editOn} className={`px-3 py-1  outline-none ${passwordWrong ? 'text-red-500 border-b-2 border-red-600' : 'text-black border-black border-b-2'}`} />
            <span className='absolute right-3 top-10'><img id='cnfeye' src="/eyeclose.png" alt="show" className='w-5  cursor-pointer' onClick={(e) => { eyeClick(e) }} /></span>
          </div>
        </div>
          <button type='submit' disabled={!editOn} className={`px-2 py-1.5   rounded-full  ${editOn ? 'bg-green-500 text-white': 'bg-[#c0c0c0] text-black'} `}>update</button>
      </form> 
    </>
  )
}

export default AccountInformation
