import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getProducts from '../helpers/getProducts';


function ShowProducts() {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('query');
    const [expand, setExpand] = useState(false)
    const [loading, setLoading] = useState(false)

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        priceRange: [0, 10000],
        discount: [0, 100],
        category: ''
    });

    // Fetch products based on search query and filters
    const fetchProducts = async () => {
        setLoading(true)
        const ans = await getProducts(
            {
                value: filters.category || query,
                minPrice: filters.priceRange[0],  // Minimum price
                maxPrice: filters.priceRange[1],  // Maximum price
                minDiscount: filters.discount[0],  // Minimum discount
                maxDiscount: filters.discount[1],  // Maximum discount
            }
        );
        setFilteredProducts(ans);
        setLoading(false)
    };

    useEffect(() => {
        if (query == null) {
            navigate('/NotFound')
        }
        setFilters(prevFilters => ({ ...prevFilters, category: '' }));
        fetchProducts()
    }, [query]);

    useEffect(() => {
        fetchProducts()
    }, [filters])


    // Handle filter change (price, discount, etc.)
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // Price range slider change handler
    const handlePriceRangeChange = (e) => {
        const value = Number(e.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: [0, value] // Update price range based on slider
        }));
    };

    // Discount range slider change handler
    const handleDiscountRangeChange = (e) => {
        const value = Number(e.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            discount: [0, value] // Update discount range based on slider
        }));
    };


    return (
        <div className="flex w-full p-4">
            {/* Left side: Filters */}
            <div className={`absolute bg-white p-4 lg:p-8 md:relative md:left-0 z-20 md:z-0 flex flex-col h-[60%]  md:w-[70%] lg:w-[30%] gap-3 transition-all duration-700 ${expand ? '  w-full left-0  ' : ' -left-80  '} `} >

                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <img loading="lazy"  src="cross.gif" alt="cross" onClick={() => { setExpand(false) }} className='h-8 cursor-pointer md:hidden flex' />
                </div>

                {/* Category Filter */}
                <div className="flex flex-col gap-1">
                    <label className="block  font-medium">Category</label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value={query}>All Categories</option>
                        <option value="fruit">Fruits</option>
                        <option value="grain">Grains</option>
                        <option value="vegetable">Vegetables</option>
                        <option value="dairy">Dairy</option>
                        <option value="meat">Meat</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Price Filter */}
                <div className="=">
                    <label className="block mb-2 font-medium">Price Range</label>
                    <input
                        type="range"
                        name="priceRange"
                        min="0"
                        max="10000"
                        step="50"
                        value={filters.priceRange[1]}
                        onChange={handlePriceRangeChange}
                        className="w-full cursor-pointer "

                    />
                    <div className="flex justify-between text-sm">
                        <span>₹0</span>
                        <span>₹{filters.priceRange[1]}</span>
                    </div>
                </div>

                {/* Discount Filter */}
                <div className="">
                    <label className="block mb-2 font-medium">Discount Range</label>
                    <input
                        type="range"
                        name="discount"
                        min="0"
                        max="100"
                        step="5"
                        value={filters.discount[1]}
                        onChange={handleDiscountRangeChange}
                        className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-sm">
                        <span>0%</span>
                        <span>{filters.discount[1]}%</span>
                    </div>
                </div>

                <h2 className='flex items-center gap-2 mt-8'>
                    <span className='text-[18px] font-bold'>{filteredProducts.length}</span>
                    <span className='font-semibold'>products found</span>
                </h2>


            </div>

            {/* Right side: Products */}
            <div className="w-full flex relative flex-col gap-6 px-4 pb-10 transition-all duration-700 min-h-[100vh]">
                <div className='flex gap-4 items-center '>
                    <img loading="lazy"  src="/filter.png" alt="expand" onClick={() => { setExpand(true) }} className='w-6 invert md:hidden flex' />
                    <h2 className="text-xl text-white font-semibold">Results for "{filters.category || query}"</h2>
                </div>

                {loading ? ( 
                    <div className="flex justify-center items-center absolute inset-0"> 
                        <img loading="lazy"  src="/loader.gif" alt="loading" className='w-16 md:w-20 ' />
                    </div>):
                    filteredProducts.length == 0 ? <h2 className="text-xl text-white font-semibold">No Items found</h2>
                    :
                    <div className="flex gap-2 flex-wrap justify-center  transition-all duration-700">
                    {filteredProducts.map((item) => (
                        <div key={item?._id} onClick={() => { navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`) }} className="bg-white p-4 shadow rounded-md cursor-pointer">
                            <img loading="lazy"  src={item?.img} alt={item?.name} className="w-[200px] h-[150px] object-cover mb-4 duration-300 ease-in-out hover:scale-105" />
                            <h3 className="font-medium text-lg mb-2">{item?.name}</h3>
                            <h1 className='text-gray-400'>price</h1>
                            <span className='flex gap-2 items-center'>
                                <h1 className='lg:text-[20px] text-[14px] font-semibold'>₹{(item?.price) - ((item?.discount) / 100 * (item?.price))}</h1>
                                <h2 className='line-through text-gray-500 lg:text-[16px] text-[12px]'>₹{item?.price}</h2>
                                <h3 className='text-green-600 font-semibold lg:text-[16px] text-[12px]'>{item?.discount}% off</h3>
                            </span>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
    );
}

export default ShowProducts;
