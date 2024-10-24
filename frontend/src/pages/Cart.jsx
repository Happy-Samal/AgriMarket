import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, updateCart } from '../helpers/cart';
import { toast } from 'react-toastify';

function Cart() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const [cartInfo, setCartInfo] = useState([]);
  const [priceDetails, setPriceDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    if (id == null) {
      navigate('/NotFound');
    }
  }, []);

  const removeBtnClick = async (id) => {
    const data = await removeFromCart(id)
    if (data.success) {
      toast.success(data.message)
      getCartInfo();
    } else {
      toast.error(data.message)
    }
  }

  const getCartInfo = async () => {
    setLoading(true)
    const data = await getCart();
    setCartInfo(data);
    let price = 0;
    let discount = 0;
    data.forEach((item) => {
      if (item.product == null) {
        removeBtnClick(item._id)
      }
      price += (item.product?.price) * item.itemQuantity
      discount += (item.product?.discount) / 100 * (item.product?.price * item.itemQuantity)
    })
    let delivery = price >= 500 ? 0 : 49
    let total = price - discount + delivery;
    setPriceDetails({ price, discount, total, delivery })
    setLoading(false)
  };

  useEffect(() => {
    getCartInfo();
  }, []);



  const itemQuantityChange = async ({ id, itemQuantity }) => {
    if (itemQuantity > 0) {
      const data = await updateCart({ id: id, itemQuantity: itemQuantity })
      if (data.success) {
        toast.success(data.message)
        setCartInfo(data?.carts?.products || [])
        getCartInfo();
      } else {
        toast.error(data.message)
      }
    }
  }
  const itemClick = (item) => {
    navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`)
  }
  const placeOrderClick = () => {
    setLoader(true)
    const cartItems = cartInfo.map((item) => {
      return { product: item.product?._id, quantity: item.itemQuantity, price: (item.product?.price - item.product?.discount / 100 * item.product?.price) * item.itemQuantity }
    })
    setLoader(false)
    navigate('/checkout', {
      state: { cartItems: cartItems }
    })
  }
  return (
    <>
      <Helmet>
        <title>My Cart</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6 bg-gray-200 px-6 py-8 md:px-10 md:py-10 min-h-[100vh]">
        {/* Left Section: Cart Items */}
        <div className="min-h-[50vh] w-full md:w-[60%] bg-white rounded-md flex flex-col gap-4 p-4 md:p-6 relative">
          <h1 className="md:text-xl text-md font-semibold border-b-2 pb-4">My Cart ({cartInfo?.length})</h1>

          {cartInfo?.length == 0 && <span className='font-semibold'>No items to display</span>}
          {loading && (
            <div className="flex justify-center items-center absolute inset-0">
              <img src="/loading.gif" alt="loading" className='w-8 md:w-12' />
            </div>
          )}
          {/* Cart Item */}
          {cartInfo?.map((item) => {
            return <div key={item._id} className="border-b-2 pb-4 flex flex-col gap-2   ">
              <div className="flex gap-4">
                <img src={item.product?.img} alt="product" onClick={() => { itemClick(item.product) }} className="h-24 w-24 rounded-md object-cover cursor-pointer duration-300 ease-in-out hover:scale-105" />
                <div className="flex flex-col gap-2">
                  <h2 onClick={() => { itemClick(item.product) }} className=" lg:text-lg text-sm font-semibold  text-wrap h-[60px] overflow-hidden cursor-pointer hover:text-green-500">{item.product?.name}, {item.product?.description}</h2>
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
              <div className='flex gap-4 items-center'>

                {/* Quantity Selector */}
                <div className="flex items-center border rounded-md w-fit lg:text-[16px] text-[14px] font-bold">
                  <button onClick={() => { itemQuantityChange({ id: item._id, itemQuantity: item.itemQuantity - 1 }) }} className="px-2 py-1  text-green-600 hover:bg-gray-300">-</button>
                  <span className="px-4 ">{item.itemQuantity}</span>
                  <button onClick={() => { itemQuantityChange({ id: item._id, itemQuantity: item.itemQuantity + 1 }) }} className="px-2 py-1  text-green-600 hover:bg-gray-300">+</button>
                </div>
                <button onClick={() => { removeBtnClick(item._id) }} className='hover:text-green-500 font-bold  lg:text-[14px] text-[12px]'>
                  REMOVE
                </button>
              </div>
            </div>
          })}
        </div>

        {/* Right Section: Price Details */}
        <div className="flex flex-col gap-6 p-4 md:p-6 bg-white w-full md:w-[35%] h-fit rounded-md shadow-md sticky top-20">
          <h1 className="md:text-xl text-md font-semibold text-black">Price Details</h1>
          {cartInfo?.length == 0 ? <span>No items yet</span> : <>
            <div className="flex justify-between">
              <span>Price ({cartInfo?.length} item)</span>
              <span>₹{priceDetails?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-₹{priceDetails?.discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">{priceDetails?.delivery == 0 ? 'FREE' : priceDetails?.delivery}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-black">
              <span>Total Amount</span>
              <span>₹{priceDetails?.total}</span>
            </div>
            <button disabled={loader} onClick={() => { placeOrderClick() }} className="bg-green-500 text-white font-semibold py-2 rounded-md w-full flex justify-center items-center">
            {loader ? 
                    <img src="/loader.gif" alt="loading" className='w-5 md:w-6 ' /> :
                    <span>Place Order</span>
                    }
            </button>
          </>}
        </div>
      </div>
    </>
  );
}

export default Cart;
