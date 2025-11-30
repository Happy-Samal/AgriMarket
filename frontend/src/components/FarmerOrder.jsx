import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getFarmerOrderProduct, updateOrder } from '../helpers/order.js'
import { convertToDate } from '../helpers/convertToDate.js'

function FarmerOrder() {
    const navigate = useNavigate()
    const [orderInfo, setOrderInfo] = useState([])
    const [edit, setEdit] = useState(false)
    const orderStatus = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    const [formInfo, setFormInfo] = useState({})
    const [loading, setLoading] = useState(false)


    const getOrderInfo = async () => {
        setLoading(true)
        const data = await getFarmerOrderProduct();
        data.orderProducts.reverse()
        setOrderInfo(data.orderProducts || [])
        setLoading(false)
    };

    useEffect(() => {
        getOrderInfo();
    }, [])

    const itemClick = (item) => {
        navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`)
    }
    const editClick = (item) => {
        setEdit(true)
        setFormInfo(item)
    }
    const inputChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await updateOrder(formInfo)
        if (data.success) {
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
        await getOrderInfo()
        setEdit(false)
    }

    return (
        <>
            <Helmet>
                <title>My Ordered Products</title>
                <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
            </Helmet>

            {loading && <div className='h-full w-full absolute left-0 top-0 z-20 md:pt-64 pt-44  font-bold text-[24px] flex items-center text-white bg-black bg-opacity-80 flex-col '>
                <img loading="lazy"  src="/loading.gif" alt="sending" className='w-[70px]' />
            </div>}

            <div className='flex flex-col gap-4 items-center md:items-baseline h-[150vh] relative' >
                <h1 className="md:text-xl text-md font-semibold  border-b-2 pb-4">Ordered Product ({orderInfo?.length})</h1>

                {orderInfo?.length == 0 && <span className='font-semibold md:text-[18px]'>No items to display</span>}
                {/* Order Item */}
                <div className='overflow-y-auto scrollbar-rounded2 flex flex-col gap-3 px-2'>
                    {orderInfo?.map((item) => {
                        return <div key={item._id} className='bg-gray-200 flex flex-col gap-8 p-2 rounded-md'>
                            <div className='flex justify-between items-center md:px-3 gap-8 text-black font-bold lg:text-lg text-[12px]'>
                                <h1 className='text-black font-bold '>order ID : {item.orderId}</h1>
                                {(item?.orderStatus == 'Cancelled' || item?.orderStatus == 'Delivered') ? '' :
                                    <img loading="lazy"  src="/edit.gif" alt="edit" onClick={() => { editClick(item) }} className='h-5 cursor-pointer' />}
                            </div>
                            <div className="border-b-2 pb-2 lg:pb-4 flex flex-col gap-1 pr-2 lg:pr-8 text-black ">
                                <div className="flex gap-4">
                                    <img loading="lazy"  src={item.product?.img} alt="product" onClick={() => { itemClick(item.product) }} className="h-16 w-16 lg:h-24 lg:w-24 rounded-md object-cover cursor-pointer duration-300 ease-in-out hover:scale-105" />
                                    <div className="flex flex-col gap-2">
                                        <h2 onClick={() => { itemClick(item.product) }} className=" lg:text-lg text-sm font-semibold  text-wrap lg:h-[50px] h-[40px] overflow-hidden cursor-pointer hover:text-green-500">{item.product?.name}, {item.product?.description}</h2>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-gray-800 lg:text-[14px] text-[12px]">quantity : {item.quantity}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center md:px-2 gap-2 text-black font-bold lg:text-lg text-[10px]'>
                                    <h2>Total Amount : {item?.price}</h2>
                                    <h2>Payment Method : {item?.paymentMethod}</h2>
                                    <h2>Order date : {convertToDate(item?.orderDate)}</h2>
                                </div>

                            </div>
                            <div className='flex justify-between items-center md:px-3 gap-8 text-blue-600 font-bold lg:text-lg text-[12px]'>
                                {(item?.orderStatus == 'Cancelled' || item?.orderStatus == 'Delivered') ? <div></div> :
                                    <h2>Delivery Date : {item?.deliveryDate}</h2>}
                                <h2 className={`${item?.orderStatus == 'Cancelled' ? 'text-red-600' : ''} ${item?.orderStatus == 'Delivered' ? 'text-green-600' : ''}`}>Order Status  : {item?.orderStatus}</h2>
                            </div>
                        </div>
                    })}

                </div>
            </div>

            {edit &&
                <div className=' bg-white w-full h-full inset-0 absolute px-5 py-20 md:px-20 justify-center flex'>
                    <img loading="lazy"  src="/cross.gif" alt="cross" onClick={() => { setEdit(false) }} className='w-7 cursor-pointer absolute right-2 top-2' />
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-black relative md:w-3/4 '>
                        <h1 className='text-black font-bold lg:text-lg text-sm'>order ID : {formInfo?.orderId}</h1>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="deliveryDate">Delivery Date :</label>
                            <input type="text" name='deliveryDate' id='deliveryDate' value={formInfo?.deliveryDate || ''} onChange={inputChange} placeholder='eg - 22 Oct 2024' className='px-4 py-1 md:py-2 rounded-md border-2  border-black relative w-full' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="orderStatus" className='text-left font-medium ml-3 md:text-base text-[13px]'>Order Status:</label>
                            <select required name="orderStatus" id="orderStatus" value={formInfo?.orderStatus} onChange={inputChange} className='px-4 py-1 md:py-2 text-black border-2 border-black outline-none  cursor-pointer rounded-md relative w-full'>
                                {orderStatus.map((item, i) => {
                                    return <option value={item} key={i} className='bg-gray-600 text-white hover:cursor-pointer cursor-pointer'>{item}</option>
                                })}
                            </select>
                        </div>
                        <button type='submit' className='px-2 py-1.5  bg-green-600 rounded-md text-white relative w-full'>update status</button>
                    </form>
                </div>
            }
        </>
    )
}

export default FarmerOrder

