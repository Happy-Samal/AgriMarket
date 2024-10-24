import React, { useEffect } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'

function OrderConfirmImg() {
    const navigate = useNavigate()
    const location = useLocation();

    const {confirm}  = location.state || false

    useEffect(() => {
        if(!confirm){
            navigate('/NotFound')
        }
    }, [])
    
    return (
        <>
            <div className="bg-white min-h-[100vh]">
                <div className="bg-url2"></div>
                <span className=" flex gap-2 text-center text-green-500 -mt-20 items-center justify-center">
                    <img src="confirmTick.jpg" alt="tick" className='md:w-9 w-6' />
                    <h3 className="md:text-[35px] text-[21px]"> Order Successfully Placed.</h3>
                </span>
                <div className='w-full h-[3px] mt-5 bg-gray-300'></div>
                <div className='flex flex-col gap-5 mt-4 justify-center items-center'>
                <h3 className="md:text-[24px] text-[14px] text-gray-600"> Go to your Profile and track your order.</h3>
                <button onClick={()=>{navigate('/')}} className="bg-green-500 text-white  font-semibold sm:px-6 sm:py-2 px-4 py-1.5 rounded-md sm:text-lg text-[12px] ">
                  Home
                </button>
                </div>  
            </div>
        </>
    )
}

export default OrderConfirmImg
