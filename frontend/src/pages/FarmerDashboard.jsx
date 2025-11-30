import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../context/UserProvider';
import { toast } from 'react-toastify';
import YourProduct from '../components/YourProduct';
import Analysis from '../components/Analysis';
import FarmerOrder from '../components/FarmerOrder';

function FarmerProfile() {
  const loginUser = useContext(UserContext)
  const navigate = useNavigate()

    if (!loginUser.success) {
      navigate('/user/login')
    }
    if(loginUser.user?.role != 'farmer'){
      navigate('/notFound')
    }
  

  const [activeColor, setActiveColor] = useState('yourProduct')
  const [page, setPage] = useState('yourProduct')
  const [expand, setExpand] = useState(false)

  const btnClick = (e) => {
    setActiveColor(e.currentTarget.name)
    setPage(e.currentTarget.name)
    setExpand(false)
  }
  const btnColor = (value) => {
    return activeColor == value ? 'text-green-600' : 'text-black';
  }


  return (
    <>
      <Helmet>
        <title>My Dashboard</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>


      <div className='flex-row flex lg:gap-10 gap-4 lg:p-8 p-4 text-white relative transition-all duration-500'  >

        {/* side bar */}
        <div className={`absolute md:relative md:left-0 z-20 md:z-0 flex flex-col md:w-[30%] gap-3 transition-all duration-700 ${expand ? ' top-4 left-4 w-[70vw]  md:top-0  ' : ' -left-80  '} `} onClick={() => { setExpand(false) }}>
          <div className='flex  gap-4 border shadow-[0_0_40px_#000000] bg-white h-[10vh] lg:p-8 p-4 items-center text-green-600'>
            <div className='border rounded-full overflow-hidden h-[24px] lg:h-[42px] md:h-[30px] items-center justify-center flex bg-black' >
              <img loading="lazy"  src="/avatar2.gif" alt="avatar" className='h-[24px] lg:h-[42px] md:h-[30px]' />
            </div>
            <div className='flex flex-col '>
              <p className='lg:text-[14px] text-[10px]'>Hello farmer,</p>
              <h3 className='font-semibold lg:text-[18px] w-[140px] md:w-[100px] lg:w-full text-[12px] overflow-hidden text-ellipsis whitespace-nowrap'>{loginUser?.user?.username}</h3>
            </div>
          </div>
          <div className='border lg:p-8 p-4 pb-2 shadow-[0_0_40px_#000000] bg-white h-[70vh] flex flex-col justify-between lg:text-[18px] text-[14px] font-semibold'>
            <div className='flex flex-col gap-5 '>
              <button onClick={(e) => { btnClick(e) }} name='yourProduct' className={`${btnColor('yourProduct')} cursor-pointer  flex gap-2 items-center text-start`}>
                <img loading="lazy"  src="/store.gif" alt="store" className='w-6 ' />
                <p>Your Products</p>
              </button>
              <button onClick={(e) => { btnClick(e) }} name='orderProduct' className={`${btnColor('orderProduct')} cursor-pointer  flex gap-2 items-center`}>
                <img loading="lazy"  src="/farmerOrder.gif" alt="orderProduct" className='w-6 ' />
                <p>Ordered Product</p>
              </button>
              <button onClick={(e) => { btnClick(e) }} name='analysis' className={`${btnColor('analysis')} cursor-pointer  flex gap-2 items-center`}>
                <img loading="lazy"  src="/analysis.gif" alt="analysis" className='w-6 ' />
                <p>Analysis</p>
              </button>
            </div>
            
          </div>
        </div>


        {/* dynamic side pages */}

        <div className='flex flex-col  gap-10 border shadow-[0_0_40px_#000000] bg-[#16520f] min-h-[100vh]  w-full md:w-3/4 md:p-8 p-2 items-center  md:items-baseline overflow-x-hidden scrollbar-rounded relative transition-all duration-500 text-white ' >

          <img loading="lazy"  src="/expandbar.svg" alt="expand" onClick={() => { setExpand(true) }} className='w-7 invert absolute top-2.5 left-2 md:hidden flex' />

          {page == 'yourProduct' &&
            <>
              <YourProduct />
            </>
          }
          {page == 'orderProduct' &&
            <>
              <FarmerOrder />
            </>
          }
          {page == 'analysis' &&
            <>
              <h2 className='text-[20px] md:text-[24px] font-semibold  '>Product Analysis</h2>
              <Analysis />
            </>
          }
        </div>
      </div>
    </>
  )
}

export default FarmerProfile
