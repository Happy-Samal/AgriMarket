import React, { useState, useEffect } from 'react'
import { getCart } from '../helpers/cart'
import { getWishlist } from '../helpers/wishlist'
import getProducts from '../helpers/getProducts'
import { useNavigate } from 'react-router-dom'


function HomeRecommended() {
    const navigate = useNavigate()
    const [recommendedInfo, setRecommendedInfo] = useState([])
    const [category, setCategory] = useState([])

    const getCategoryList = async () => {
        const d1 = await getCart()
        const d2 = await getWishlist()

        let arr = d1.map((item) => item.product?.category)
        d2.forEach(item => {
            arr.push(item.product?.category)
        });
        arr = [...new Set(arr)];
        setCategory(arr)
    }

    const getItems = async () => {
        let arr = []
        for (const item of category) {
            const data = await getProducts({value:item})
            arr = [...arr, ...data]
        }
        setRecommendedInfo(arr)
    }

    useEffect(() => {
        const fetchRecommendedItems = async () => {
            await getCategoryList() // Fetch categories
        }
        fetchRecommendedItems()
    }, [])

    useEffect(() => {
        if (category.length > 0) {
            getItems()
        }
    }, [category])


    return (
        <>
            {recommendedInfo.length != 0 && 
            <div className='flex flex-col gap-2 md:gap-4 bg-white text-black px-2 md:px-4 py-2'>
            <h1 className='font-bold text-[14px] md:text-[18px] lg:text-[22px]'>Recommended products</h1>
            <div className='flex md:gap-3 gap-2 overflow-x-auto scrollbar-hide'>
                {recommendedInfo?.map((item) => {
                    return <div key={item._id} onClick={()=>{navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`)}} className="bg-gray-200 flex flex-col gap-1 md:gap-2 p-2 cursor-pointer " >
                        <img src={item?.img} alt="product" className='w-[140px] h-[120px] flex self-center duration-300 ease-in-out hover:scale-105 ' />
                        <span className='w-[130px] whitespace-nowrap text-ellipsis overflow-hidden'>{item?.name}</span>
                        <span className='flex gap-2 items-center'>
                            <h1 className='text-gray-400 md:text-[14px] text-[12px]'>price:</h1>
                            <h1 className='md:text-[14px] text-[12px] font-semibold'>₹{(item?.price) - ((item?.discount) / 100 * (item?.price))}</h1>
                            <h2 className='line-through text-gray-500 md:text-[13px] text-[10px]'>₹{item?.price}</h2>
                            <h3 className='text-green-600 font-semibold md:text-[13px] text-[9px]'>{item?.discount}% off</h3>
                        </span>
                    </div>
                })}

            </div>
        </div>
            }
        </>
    )
}

function ProductPageRecommended({category}) {
    const navigate = useNavigate()
    const [recommendedInfo, setRecommendedInfo] = useState([])

    const getItems = async()=>{
        const data = await getProducts({value:category})
        setRecommendedInfo(data)
    }
    useEffect(() => {
      getItems()
    }, [])
    
    return(
        <>
        <div className='flex flex-col gap-2 md:gap-4 bg-white text-black px-2 md:px-4 py-2'>
                <h1 className='font-bold text-[14px] md:text-[18px] lg:text-[22px]'>Recommended products</h1>
                <div className='flex md:gap-3 gap-2 overflow-x-auto scrollbar-hide'>
                    {recommendedInfo?.map((item) => {
                        return <div key={item._id} onClick={()=>{navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`)}} className="bg-gray-200 flex flex-col gap-1 md:gap-2 p-2 cursor-pointer " >
                            <img src={item?.img} alt="product" className='w-[140px] h-[120px] flex self-center duration-300 ease-in-out hover:scale-105' />
                            <span className='w-[130px] whitespace-nowrap text-ellipsis overflow-hidden'>{item?.name}</span>
                            <span className='flex gap-2 items-center'>
                                <h1 className='text-gray-400 md:text-[14px] text-[12px]'>price:</h1>
                                <h1 className='md:text-[14px] text-[12px] font-semibold'>₹{(item?.price) - ((item?.discount) / 100 * (item?.price))}</h1>
                                <h2 className='line-through text-gray-500 md:text-[13px] text-[10px]'>₹{item?.price}</h2>
                                <h3 className='text-green-600 font-semibold md:text-[13px] text-[9px]'>{item?.discount}% off</h3>
                            </span>
                        </div>
                    })}

                </div>
            </div>
        </>
    )

}

export  {HomeRecommended , ProductPageRecommended}
