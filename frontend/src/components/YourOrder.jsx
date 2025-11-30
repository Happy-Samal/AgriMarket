import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOrder, updateOrder } from '../helpers/order.js'
import { convertToDate } from '../helpers/convertToDate.js'

function YourOrder() {
  const navigate = useNavigate()
  const [orderInfo, setOrderInfo] = useState([])
  const [loading , setLoading] = useState(false)


  const getOrderInfo = async () => {
    setLoading(true)
    const data = await getOrder();
    data.orderInfo.reverse()
    setOrderInfo(data.orderInfo || [])
    setLoading(false)
  };

  useEffect(() => {
    getOrderInfo();
  }, [])

  const itemClick = (item) => {
    navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`)
  }

  const cancelClick = async (value) => {
    const cnf = confirm("Are you sure you want to cancel?")
    if (cnf) {
      const data = await updateOrder(value)
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
      await getOrderInfo()
    }
  }

  return (
    <>
      <Helmet>
        <title>My Order</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>

      {loading && <div className='h-full w-full absolute left-0 top-0 z-20 md:pt-64 pt-44  font-bold text-[24px] flex items-center text-white bg-black bg-opacity-80 flex-col '>
                <img loading="lazy"  src="/loading.gif" alt="sending" className='w-[70px]' />
            </div>}
      <div className="h-[150vh] w-full  bg-white rounded-md flex flex-col gap-4 py-8 md:py-6 relative">
        <h1 className="md:text-xl text-md font-semibold border-b-2 pb-4">My Order ({orderInfo?.length})</h1>

        {orderInfo?.length == 0 && <span className='font-semibold md:text-[18px]'>No items to display</span>}
        
        {/* Order Item */}
        <div className='overflow-y-auto scrollbar-rounded flex flex-col px-2 gap-4'>
          {orderInfo?.map((item) => {
            return <div key={item._id} className='bg-gray-200 flex flex-col gap-8 p-2 '>
              <h1 className='text-black font-bold  lg:text-lg text-[12px]'>order ID : {item._id}</h1>
              {item?.products.map((prod) => {
                return prod.product == null ? <div className='border-b-2 pb-2 lg:pb-4  border-gray-600 text-red-500'>
                  <h1 className='font-bold md:text-lg text-[12px]'>product deleted by farmer</h1>
                </div> :
                  <div key={prod._id} className="border-b-2 pb-2 lg:pb-4 flex flex-col gap-2 pr-2 lg:pr-8 border-gray-600 text-black ">
                    <div className="flex gap-4">
                      <img loading="lazy"  src={prod.product?.img} alt="product" onClick={() => { itemClick(prod.product) }} className="h-16 w-16 lg:h-24 lg:w-24 rounded-md object-cover cursor-pointer duration-300 ease-in-out hover:scale-105" />

                      <div className="flex flex-col gap-2">
                        <h2 onClick={() => { itemClick(prod.product) }} className=" lg:text-lg text-sm font-semibold  text-wrap lg:h-[50px] h-[40px] overflow-hidden cursor-pointer hover:text-green-500">{prod.product?.name}, {prod.product?.description}</h2>
                        <div className="flex items-center gap-2">
                          <h1 className="lg:text-lg text-sm font-semibold text-black">₹{prod.price}</h1>
                          <h2 className="text-gray-500 lg:text-[14px] text-[12px]">quantity : {prod.quantity}</h2>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between items-center md:px-3 gap-8 text-blue-600 font-bold lg:text-lg text-[12px]'>
                      {(prod?.orderStatus == 'Cancelled' || prod?.orderStatus == 'Delivered') ? <div></div> :
                        <h2>Delivery Date : {prod?.deliveryDate}</h2>}
                      <h2 className={`${prod?.orderStatus == 'Cancelled' ? 'text-red-600' : ''} 
                  ${prod?.orderStatus == 'Delivered' ? 'text-green-600' : ''}`}>Order Status  : {prod?.orderStatus}</h2>
                      {(prod?.orderStatus == 'Cancelled' || prod?.orderStatus == 'Delivered') ? '' :
                        <button onClick={() => { cancelClick({ orderStatus: "Cancelled", orderId: item._id, product: prod.product }) }} className=' text-red-500'>Cancel</button>}
                    </div>
                  </div>
              })}

              <div className='flex justify-between items-center md:px-3 gap-4 text-black font-bold lg:text-lg text-[10px] '>
                <h2>Total Amount : {item?.totalAmount}</h2>
                <h2>Payment Method : {item?.paymentMethod}</h2>
                <h2>Order date : {convertToDate(item?.orderDate)}</h2>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default YourOrder

