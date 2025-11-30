import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import Search from './Search'
import { getHistory, updateChat } from '../helpers/chat'
import { getCart } from '../helpers/cart'

function Navbar() {
  const LoginUser = useContext(UserContext)
  const [notification, setNotification] = useState(null)
  const [cartInfo , setCartInfo ] = useState([])

  const chatNotification = async () => {
    const data = await getHistory()
    let count = 0;
    data.chats.map((item) => {
      item.messages?.forEach((message) => {
        if (!message.isSeen && message.sender != LoginUser.user?._id) {
          count++;
        }
      });
    })
    setNotification(count)
  }
   const getCartInfo = async()=>{
    const data = await getCart()
    setCartInfo(data)
   }

  useEffect(() => {
    chatNotification()
    getCartInfo()
  }, [])

  return (
    <>
      <div className='w-screen top-0 fixed z-40 bg-[#16520f] gap-4'>
        <div className={`md:h-24 h-16  flex   justify-between  px-4 lg:px-10 items-center  transition-colors duration-700 text-white bg-[#16520f] overflow-x-hidden `}>
          {/* logo */}
          <div>
            <Link to={'/'} className='cursor-pointer'>
              <img loading="lazy"  src="/agrimarket.png" alt="logo" className='h-12 md:h-16' />
            </Link>
          </div>

          {/* search */}
          <div className='md:w-[40vw] w-full  md:flex hidden'>
            <Search />
          </div>

          <div className='flex lg:gap-10 gap-4 items-center justify-center'>

            {/* farmer dashboard */}
            {(LoginUser?.success && LoginUser?.user?.role == 'farmer') &&
              <Link to={`farmer/dashboard?id=${LoginUser?.user?._id}`}>
                <button className='flex items-center gap-1'>
                  <img loading="lazy"  src="/store.gif" alt="avatar" className='h-[14px] md:h-[22px] invert' />
                  <p className='text-[9px] md:text-[16px] '>Dashboard</p>
                </button>
              </Link>
            }


            {/* login */}
            <Link to={LoginUser?.success ? `customer/profile?id=${LoginUser?.user?._id}` : '/user/login'}>
              <button className='flex items-center gap-1'>
                <div className='border rounded-full overflow-hidden h-[14px] md:h-[22px]  items-center justify-center flex border-[#0a7127] bg-white' >
                  <img loading="lazy"  src="/avatar1.gif" alt="avatar" className='h-[14px] md:h-[22px]' />
                </div>
                <p className='text-start w-[40px] md:w-[60px] text-[9px] md:text-[16px] overflow-hidden whitespace-nowrap text-ellipsis '>{LoginUser?.success ? `${LoginUser?.user?.username?.split(' ')[0]}` : "Login"}</p>
              </button>
            </Link>

            {/* Cart */}
            <Link to={LoginUser?.success ? `/user/cart?id=${LoginUser?.user?._id}` : '/user/login'}><button className='relative '>
              <img loading="lazy"  src="/cart.gif" alt="cart" className='h-[26px] md:h-[42px]  invert' />
              <span className='w-2 h-2 md:h-3 md:w-3 md:text-[8px] text-[6px] absolute rounded-full bg-red-500 text-white top-1 right-1'>{cartInfo?.length}</span>
            </button>
            </Link>

            {/* chat */}
            <Link to={LoginUser?.success ? `/chat?sender=${LoginUser?.user?._id}` : '/user/login'}><button className='relative flex items-center '>
              <img loading="lazy"  src="/chat.gif" alt="chat" className='h-[18px] md:h-[28px] invert ' />
              {notification > 0 ? <span className='w-2 h-2 md:h-3 md:w-3 md:text-[8px] text-[6px] absolute rounded-full bg-red-500 text-white md:-top-1.5 -top-0.5 right-0'>{notification}</span> : ''}
            </button>
            </Link>

          </div>
        </div>

        {/* search */}
        <div className='md:w-[40vw] w-full  md:hidden flex mt-2 mb-1'>
          <Search />
        </div>
        <div className="bg-[#47f202] h-[1.5px] w-full shadow-[0_0_5px_#47f202] md:flex hidden"></div>
      </div>
    </>
  )
}

export default Navbar
