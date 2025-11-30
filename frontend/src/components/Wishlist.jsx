import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getWishlist, removeFromWishlist } from '../helpers/wishlist'

function Wishlist() {
  const navigate = useNavigate()
  const [wishlistInfo, setWishlistInfo] = useState([])
  const [loading, setLoading] = useState(false)

  const removeBtnClick = async (id) => {
    const data = await removeFromWishlist(id)
    if (data.success) {
      toast.success(data.message)
      getWishlistInfo();
    } else {
      toast.error(data.message)
    }
  }

  const getWishlistInfo = async () => {
    setLoading(true)
    const data = await getWishlist();
    data.forEach((item) => {
      if (item.product == null) {
        removeBtnClick(item._id)
      }
    })
    setWishlistInfo(data)
    setLoading(false)
  };

  useEffect(() => {
    getWishlistInfo();
  }, [])

  const itemClick = (item) => {
    navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`)
  }

  return (
    <>
      <Helmet>
        <title>My Wishlist</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>

      {loading && <div className='h-full w-full absolute left-0 top-0 z-20 md:pt-64 pt-44  font-bold text-[24px] flex items-center text-white bg-black bg-opacity-80 flex-col '>
                <img loading="lazy"  src="/loading.gif" alt="sending" className='w-[70px]' />
            </div>}

      <div className="h-[150vh] w-full  bg-white rounded-md flex flex-col gap-4 py-8 md:py-6 relative">
        <h1 className="md:text-xl text-md font-semibold border-b-2 pb-4">My Wishlist ({wishlistInfo?.length})</h1>

        {wishlistInfo?.length == 0 && <span className='font-semibold md:text-[18px]'>No items to display</span>}

        {/* wishlist Item */}
        <div className='flex flex-col overflow-y-auto scrollbar-rounded px-2 gap-3'>
          {wishlistInfo?.map((item) => {
            return <div key={item._id} className="border-b-2 pb-2 lg:pb-4 flex justify-between pr-2 lg:pr-8 text-black ">
              <div className="flex gap-4">
                <img loading="lazy"  src={item.product?.img} alt="product" onClick={() => { itemClick(item.product) }} className="h-16 w-16 lg:h-24 lg:w-24 rounded-md object-cover cursor-pointer duration-300 ease-in-out hover:scale-105" />

                <div className="flex flex-col gap-2">
                  <h2 onClick={() => { itemClick(item.product) }} className=" lg:text-lg text-sm font-semibold  text-wrap lg:h-[50px] h-[40px] overflow-hidden cursor-pointer hover:text-green-500">{item.product?.name}, {item.product?.description}</h2>
                  <span className="text-gray-500 lg:text-[14px] text-[12px]">
                    Quantity: <span className="text-black ">{item.product?.quantity}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <h1 className="lg:text-lg text-sm font-semibold text-black">₹{(item.product?.price) - ((item.product?.discount) / 100 * (item.product?.price))}</h1>
                    <h2 className="line-through text-gray-400 lg:text-[14px] text-[12px]">₹{item.product?.price}</h2>
                    <h3 className="text-green-600 font-semibold lg:text-[14px] text-[12px]">{item.product?.discount}% off</h3>
                  </div>
                </div>
              </div>
              <button onClick={() => { removeBtnClick(item._id) }} className='hover:text-green-500 font-bold  lg:text-[14px] text-[12px]'>
                REMOVE
              </button>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default Wishlist
