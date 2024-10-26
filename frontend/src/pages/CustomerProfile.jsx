import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../context/UserProvider';
import { toast } from 'react-toastify';
import { deleteAccount } from '../helpers/account';
import { logout } from '../helpers/account';
import AccountInformation from '../common/AccountInformation';
import YourOrder from '../components/YourOrder';
import Wishlist from '../components/Wishlist';

function CustomerProfile() {
  const loginUser = useContext(UserContext)
  const navigate = useNavigate()

  if (!loginUser.success) {
    navigate('/user/login')
  }



  const [activeColor, setActiveColor] = useState('account')
  const [page, setPage] = useState('account')
  const [expand, setExpand] = useState(false)

  const btnClick = (e) => {
    setActiveColor(e.currentTarget.name)
    setPage(e.currentTarget.name)
    setExpand(false)
  }
  const btnColor = (value) => {
    return activeColor == value ? 'text-gray-900' : 'text-gray-200';
  }

  const logoutClick = async () => {
    const result = await logout()
    console.log(result)
    if (result.success) {
      navigate(result.redirectUrl)
      window.location.reload();
    }
  }
  const deleteClick = async () => {
    const result = await deleteAccount()
    if (result.success) {
      navigate(result.redirectUrl)
      window.location.reload();
    }
  }

  return (
    <>
      <Helmet>
        <title>My Profile</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>


      <div className='flex-row flex lg:gap-10 gap-4 lg:p-8 p-4 text-white relative transition-all duration-500'  >

        {/* side bar */}
        <div className={`absolute md:relative md:left-0 z-20 md:z-0 flex flex-col md:w-[30%] gap-3 transition-all duration-700 ${expand ? ' top-4 left-4 w-[70vw]  md:top-0  ' : ' -left-80  '} `} onClick={() => { setExpand(false) }}>
          <div className='flex  gap-4 border shadow-[0_0_40px_#000000] bg-[#16520f] h-[10vh] lg:p-8 p-4 items-center'>
            <div className='border rounded-full overflow-hidden h-[24px] lg:h-[42px] md:h-[30px] items-center justify-center flex border-[#0a7127] bg-gray-900' >
              <img src="/avatar2.gif" alt="avatar" className='h-[24px] lg:h-[42px] md:h-[30px]' />
            </div>
            <div className='flex flex-col '>
              <p className='lg:text-[14px] text-[10px]'>Hello,</p>
              <h3 className='font-semibold lg:text-[18px] w-[140px] md:w-[100px] lg:w-full text-[12px] overflow-hidden text-ellipsis whitespace-nowrap'>{loginUser?.user?.username}</h3>
            </div>
          </div>
          <div className='border lg:p-8 p-4 pb-2 shadow-[0_0_40px_#000000] bg-[#16520f] h-[70vh] flex flex-col justify-between lg:text-[18px] text-[14px] font-semibold'>
            <div className='flex flex-col gap-5 '>
              <button onClick={(e) => { btnClick(e) }} name='account' className={`${btnColor('account')} cursor-pointer  flex gap-2 items-center text-start`}>
                <img src="/user.gif" alt="user" className='w-6  invert' />
                <p>Account Information</p>
              </button>
              <button onClick={(e) => { btnClick(e) }} name='yourOrder' className={`${btnColor('yourOrder')} cursor-pointer  flex gap-2 items-center text-start`}>
                <img src="/buy.gif" alt="store" className='w-6 invert' />
                <p>Your Orders</p>
              </button>
              <button onClick={(e) => { btnClick(e) }} name='wishlist' className={`${btnColor('wishlist')} cursor-pointer  flex gap-2 items-center`}>
                <img src="/wishlist.gif" alt="analysis" className='w-6 invert' />
                <p>Wishlist</p>
              </button>
            </div>
            <div className='flex flex-col gap-5'>
              <button onClick={() => { logoutClick() }} className='cursor-pointer text-blue-500 flex gap-2 items-center'>
                <img src="/logout.gif" alt="logout" className='w-6 invert' />
                <p>Logout</p>
              </button>
              <button onClick={() => { deleteClick() }} className='cursor-pointer text-red-500 flex gap-2 items-center text-start'>
                <img src="/delete.gif" alt="delete" className='w-6 invert' />
                <p>Delete your Account</p>
              </button>
            </div>
          </div>
        </div>


        {/* dynamic side pages */}

        <div className='flex flex-col  gap-10 border shadow-[0_0_40px_#000000] bg-white min-h-[110vh]  w-full md:w-3/4 md:p-8 p-2 items-center  md:items-baseline overflow-x-hidden scrollbar-rounded relative transition-all duration-500 text-green-500 ' >

          <img src="/expandbar.svg" alt="expand" onClick={() => { setExpand(true) }} className='w-7  absolute top-2.5 left-2 md:hidden flex' />

          {page == 'account' &&
            <>
              <h2 className='text-[20px] md:text-[24px] font-semibold   '>Account Information</h2>
              <AccountInformation />
            </>
          }
          {page == 'yourOrder' &&
            <>
              <YourOrder />
            </>
          }
          {page == 'wishlist' &&
            <>
              <Wishlist />
            </>
          }
        </div>
      </div>
    </>
  )
}

export default CustomerProfile
