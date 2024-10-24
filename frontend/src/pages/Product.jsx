import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify'
import getProducts from '../helpers/getProducts'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { addToCart } from '../helpers/cart'
import { addToWishlist, removeFromWishlist, getWishlist } from '../helpers/wishlist'
import { ProductPageRecommended } from '../components/Recommended'

function Product() {
  const LoginUser = useContext(UserContext)
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(window.location.search);
  const pId = searchParams.get('pId');
  const category = searchParams.get('pCgy');
  const name = searchParams.get('pName');
  const [item, setItem] = useState({})
  const [wishlistInfo, setWishlistInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)

  const getItems = async () => {
    setLoading(true)
    const res = await getProducts({ id: pId });
    setItem(res[0] || {});
    setLoading(false)
  }

  const getWishlistInfo = async () => {
    const data = await getWishlist();
    const foundItem = data.find((item) => item.product?._id === pId);
    if (foundItem) {
      setWishlistInfo(foundItem);
    } else {
      setWishlistInfo({});
    }
  };

  useEffect(() => {
    if (pId == null) {
      navigate('/NotFound')
    }
    getItems()
    getWishlistInfo();
  }, [pId])



  const WishlistBtnClick = async (id) => {
    if (LoginUser.success) {
      setLoader2(true)
      if (wishlistInfo?.isWishlist) {
        const data = await removeFromWishlist(id)
        if (data.success) {
          toast.success(data.message)
          getWishlistInfo();
        } else {
          toast.error(data.message)
        }
      } else {
        const data = await addToWishlist(pId)
        if (data.success) {
          toast.success(data.message)
          getWishlistInfo();
        } else {
          toast.error(data.message)
        }
      }
      setLoader2(false)
    } else {
      navigate('/user/login')
    }
  }

  const cartBtnClick = async () => {
    if (LoginUser.success) {
      setLoader(true)
      const data = await addToCart(pId)
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
      setLoader(false)
    } else {
      navigate('/user/login')
    }
  }

  const contactFarmer = () => {
    if (LoginUser.success && LoginUser?.user._id !== item?.farmer?._id) {
      navigate(`/chat?sender=${LoginUser?.user?._id}&receiver=${item?.farmer?._id}`)
    } else if (LoginUser.success && LoginUser?.user._id === item?.farmer?._id) {
      navigate(`/chat?sender=${LoginUser?.user?._id}`)
    } else {
      navigate('/user/login')
    }
  }

  const buyBtnClick = () => {
    if (LoginUser.success) {
      navigate('/checkout', {
        state: { product: pId, quantity: 1, price: item?.price - (item?.discount / 100 * item?.price) }
      })
    } else {
      navigate('/user/login')
    }
  }

  return (
    <>
      <Helmet>
        <title>{`${item?.name}, ${item?.description}`}</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>


      {loading ? <div className='flex bg-white mt-8 p-10 md:p-20 items-center justify-center relative'>
        <div className="flex justify-center items-center absolute inset-0">
          <img src="/loading.gif" alt="loading" className='w-16 md:w-20' />
        </div>
      </div> :
        Object.keys(item).length === 0 ? <div className='flex bg-white mt-8 p-10 md:p-20 items-center justify-center font-bold md:text-lg text-[12px]'>You're looking for the product is not available 😑</div> :
          <div className='flex flex-col md:flex-row'>
            <div className='md:min-h-[60vh] lg:w-2/4 md:w-3/4 w-full bg-[#16520f] flex pt-8 relative justify-center'>
              <div className='flex flex-col gap-8 p-4  items-center lg:left-[7%] md:left-[8%] md:top-40 md:sticky md:rounded-l-2xl shadow-[0_0_40px_#000000] lg:h-[60%] h-[50%] w-[80%] bg-white text-white relative'>
                <img src={item?.img} alt="productImg" className='lg:w-[360px]  lg:h-[300px] w-[260px] h-[200px] overflow-hidden' />
                <button disabled={loader2} onClick={() => { WishlistBtnClick(wishlistInfo?._id) }} className='cursor-pointer absolute top-6 right-6 text-[20px] bg-white rounded-full h-8 w-8 justify-center items-center flex'>
                {loader2 ? 
                    <img src="/loader.gif" alt="loading" className='w-3 md:w-4 ' /> :
                    wishlistInfo?.isWishlist ? "❤️" : "🤍"
                    }
                </button>
                <div className='flex w-full justify-around'>
                  <button disabled={loader} onClick={() => { cartBtnClick() }} className='flex gap-2 items-center bg-green-500 text-[10px] lg:text-[14px]  lg:px-5 py-1 px-2 rounded-md cursor-pointer'>
                    {loader ? 
                    <img src="/loader.gif" alt="loading" className='w-5 md:w-6 ' /> :
                    <>
                    <img src="/addToCart.gif" alt="cart" className='lg:w-8 w-6 invert' />
                    <span>ADD TO CART</span>
                    </>
                    }
                  </button>
                  <button onClick={() => { buyBtnClick() }} className='flex gap-2 items-center bg-green-500 text-[10px] lg:text-[14px] lg:px-5 py-1 px-2 rounded-md cursor-pointer'>
                    <img src="/buy.gif" alt="buy" className='lg:w-6 w-4 invert' />
                    <span>BUY NOW</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='min-h-[100vh] w-full bg-white lg:p-14 p-8 pt-4 flex flex-col gap-2 overflow-y-auto scrollbar-rounded '>
              <div className='flex flex-col gap-1'>
                <h1 className='lg:text-[20px] text-[18px] font-bold'>{item?.name},</h1>
                <h2 className='lg:text-[20px] text-[18px] font-medium'> {item?.description}</h2>
              </div>
              <div className='flex flex-col gap-1'>
                <h2 className='text-gray-400'>quantity : <span className='text-green-600 font-semibold'>{item?.quantity}</span> </h2>
                <h1 className='text-gray-400'>price</h1>
                <span className='flex gap-2 items-center'>
                  <h1 className='lg:text-[28px] text-[18px] font-semibold'>₹{(item?.price) - ((item?.discount) / 100 * (item?.price))}</h1>
                  <h2 className='line-through text-gray-500 lg:text-[18px] text-[14px]'>₹{item?.price}</h2>
                  <h3 className='text-green-600 font-semibold lg:text-[18px] text-[14px]'>{item?.discount}% off</h3>
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-green-600 font-semibold lg:text-[18px] text-[14px]'>chat with farmer</span>
                <div className='flex gap-2  px-2 items-center lg:w-[200px] w-[150px] border-2 rounded-md cursor-pointer' onClick={() => { contactFarmer() }}>
                  <img src="/avatar2.gif" alt="profile" className='w-6 lg:w-8' />
                  <span className='lg:text-[14px] text-[12px]'>{item?.farmer?.username}</span>
                </div>
              </div>
            </div>
          </div>}

      {/* recommended product */}
      <div className='flex flex-col gap-6 lg:px-10 md:px-6 px-2  py-3'>
        <ProductPageRecommended category={category} />
      </div>
    </>
  )
}

export default Product



