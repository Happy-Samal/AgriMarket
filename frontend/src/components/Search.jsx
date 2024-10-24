import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getProducts from '../helpers/getProducts'


function Search() {
    const [form, setForm] = useState({})
    const [search, setSearch] = useState(false)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading , setLoading ] = useState(false)

    const inputChange = async (e) => {
        const value = e.target.value.trim();
        setForm({ ...form, [e.target.name]: value })
        if (value.length > 0) {
            setLoading(true)
            const products = await getProducts({value:value})
            let arr = []
            products.forEach(item => {
                if (!arr.some(pair => pair.name === item.name && pair.category === item.category)) {
                    arr.push({img:item.img, name: item.name, category: item.category });
                }
            });
            setData(arr)
        } else {
            setData([])
        }
        setLoading(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(form.search?.trim().length >0){
            setSearch(false)
            navigate(`/search?query=${form.search}`);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='w-full relative flex items-center'>
                <label htmlFor="search"></label>
                <input type="text" name="search" value={form.search || ''} onFocus={() => setSearch(true)} onBlur={() => setTimeout(() => {
                    setSearch(false)
                    setData([])
                    setForm({})
                }, 300)} onChange={inputChange} placeholder='search for products and more' className={` w-full px-8 md:px-10 py-1 md:text-base text-[10px]  rounded-full  grid place-content-center  transition-colors duration-700 ease-in-out border-2 bg-transparent outline-none text-white border-white  placeholder:text-white`} />
                <button type='submit'></button>
                <img src="/search.gif" alt="search" className='md:h-5 h-4 absolute left-3 md:top-2 top-1' />
            </form>

            {search && <div className='rounded-3xl md:w-[40vw] w-full bg-white text-black absolute md:top-[67px] top-[100px] z-50 h-[50vh] flex flex-col  pt-3 overflow-hidden  '>

                

                {loading ? ( 
                    <div className="flex justify-center items-center absolute inset-0"> 
                        <img src="/loading.gif" alt="loading" className='w-8 md:w-12' />
                    </div>
                ):
                data.length == 0 ? <span className='ml-3 text-[18px] font-semibold text-gray-400'> No result found </span>
                :
                data?.slice(0, 5).map((item,index) => {
                    return (
                        <div key={index} onClick={() => {
                            setForm({})
                            navigate(`/search?query=${item.name}`)
                        }} className='flex gap-4 items-center hover:cursor-pointer hover:bg-gray-300 p-2'>
                            <img src={item.img || ""} alt="product" className='h-11 w-11' />
                            <div className='flex flex-col'>
                                <span className='font-bold '>{item.name}</span>
                                <span className='font-medium text-green-500'>in {item.category}s</span>
                            </div>
                        </div>
                    );
                })
                }
            </div>}
        </>
    )
}

export default Search
