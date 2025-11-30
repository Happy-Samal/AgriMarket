import React, { useState, useEffect } from 'react'
import getProducts from '../helpers/getProducts'
import { useNavigate } from 'react-router-dom'

function CategoryProducts({ category }) {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    const getItems = async () => {
        setLoading(true)
        const products = await getProducts({ value: category })
        let arr = []
        products.forEach(item => {
            if (!arr.some(pair => pair.name === item.name && pair.category === item.category)) {
                arr.push({ img: item.img, name: item.name, category: item.category });
            }
        });
        setProducts(arr)
        setLoading(false)
    }
    useEffect(() => {
        getItems()
    }, [])

    return (
        <>
            <div className='flex flex-col gap-2 md:gap-4 bg-white relative text-black px-2 md:px-4 py-2 min-h-32'>
                <h1 className='font-bold text-[14px] md:text-[18px] lg:text-[22px]'>{category} products</h1>
                {loading && ( 
                    <div className="flex justify-center items-center absolute inset-0"> 
                        <img loading="lazy"  src="/loading.gif" alt="loading" className='w-8 md:w-12' />
                    </div>
                )}
                <div className='flex md:gap-3 gap-2 overflow-x-auto scrollbar-hide'>
                    {products?.map((item, index) => {
                        return <div key={index} onClick={() => { navigate(`/search?query=${item.name}`) }} className="bg-gray-200 flex flex-col gap-1 md:gap-2 p-2 cursor-pointer " >
                            <img loading="lazy"  src={item?.img} alt="product" className='w-[140px] h-[120px] flex self-center duration-300 ease-in-out hover:scale-105' />
                            <span className='w-[130px] whitespace-nowrap text-ellipsis overflow-hidden'>{item?.name}</span>
                            <span className='font-semibold text-[18px]'>Explore Now</span>
                        </div>
                    })}

                </div>
            </div>
        </>
    )
}

export default CategoryProducts
