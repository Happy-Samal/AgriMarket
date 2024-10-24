import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import { convertToDate } from '../helpers/convertToDate'
import {useNavigate} from 'react-router-dom'
import { getProduct ,deleteProduct } from '../helpers/product'

function YourProduct() {
  const navigate = useNavigate()
  const [addProduct, setAddProduct] = useState(false)
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(false)


  const getProducts = async () => {
    setLoading(true)
    const data = await getProduct()
    setProductData(data.products)
    setLoading(false)
  }
  useEffect(() => {
    getProducts()
  }, [])

  const addBtnClick = () => {
    setAddProduct(true)
  }

  const deleteItem = async (id) => {
    const cnf = confirm("Are you sure to delete your product?")
    if (cnf) {
      const data = await deleteProduct({ id: id })
      if (data.success) {
        toast.success(data.message)
        getProducts()
      }else{
        toast.error(data.message)
      }
    }
  }
  const [update, setUpdate] = useState(false)
  const [updateItem, setUpdateItem] = useState({})
  const editItem = (item) => {
    setUpdate(true)
    setUpdateItem(item)
  }
  return (
    <>
      {loading && <div className='h-full w-full absolute left-0 top-0 z-20 md:pt-64 pt-44  font-bold text-[24px] flex items-center text-white bg-black bg-opacity-80 flex-col '>
        <img src="/loading.gif" alt="sending" className='w-[100px]' />
      </div>}



      <div className='flex flex-col gap-4 items-center md:items-baseline h-[150vh]' >
        <h2 className='text-[20px] md:text-[24px] font-semibold  '>My Products ({productData.length})</h2>

        <button onClick={() => { addBtnClick() }} className='border rounded-md bg-white text-green-500 py-1 w-[220px] flex gap-2 items-center md:text-[18px] text-[16px] justify-center'>
          <span>add product</span>
          <img src="/add.gif" alt="add" className='w-3 md:w-4' />
        </button>


        <div className='flex flex-wrap lg:gap-3 gap-4  justify-center overflow-y-auto scrollbar-rounded2'>
          {productData.length == 0 && <h2 className='md:text-[20px] font-semibold '>No items to display</h2>}
          {productData.map((item) => {
            return <div key={item._id}  className='flex gap-2 lg:gap-3  flex-wrap justify-center '>
              <div className='h-[340px] w-[230px] relative bg-white text-black border rounded-md flex flex-col p-2 '>
                <img src="/delete.gif" alt="delete" onClick={() => { deleteItem(item._id) }} className='absolute top-28 right-2 w-6 md:w-8 z-10  cursor-pointer' />
                <img src="/edit.gif" alt="delete" onClick={() => { editItem(item) }} className='absolute bottom-2 right-2 w-6 md:w-6 z-10  cursor-pointer' />
                <img src={item?.img || ''} alt="product" onClick={()=>{navigate(`/product?pId=${item._id}&pCgy=${item.category}&pName=${item.name}`)}}  className='object-cover  w-full h-[50%] relative overflow-hidden cursor-pointer duration-300 ease-in-out hover:scale-105' />
                <span className='flex flex-col gap-1'>
                  <h1>product ID:</h1>
                  <p className='bg-black w-[88%] text-white text-[14px]'>{item?._id}</p>
                </span>
                <span className='flex gap-1'>
                  <h1>category:</h1>
                  <p>{item?.category || ''}</p>
                </span>
                <span className='flex gap-1'>
                  <h1>name:</h1>
                  <p>{item?.name || ''}</p>
                </span>
                <span className='flex gap-1'>
                  <h3>desc:</h3>
                  <p className=' w-[200px] overflow-hidden text-ellipsis whitespace-nowrap'>{item?.description || ''}</p>
                </span>
                <span className='flex gap-1'>
                  <h2>price:</h2>
                  <p>₹{item?.price || ''}</p>
                </span>
                <span className='flex gap-1'>
                  <h2>quantity:</h2>
                  <p>{item?.quantity || ''}</p>
                </span>
                <span className='flex gap-1'>
                  <h2>discount :</h2>
                  <p>{item.discount || '0'}%</p>
                </span>
                <span className='flex gap-1'>
                  <h2>date :</h2>
                  <p>{convertToDate(item?.createdAt) || ''}</p>
                </span>
              </div>

            </div>
          })}
        </div>
      </div>


      {addProduct && <AddProduct getProducts={getProducts} onClose={() => { setAddProduct(false) }} />}
      {update && <UpdateProduct getProducts={getProducts} item={updateItem} onClose={() => { setUpdate(false) }} />}
    </>
  )
}

export default YourProduct
