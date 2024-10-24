import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { updateProduct } from '../helpers/product'

function UpdateProduct({item , onClose , getProducts}) {
    const category = ['grain', 'fruit', 'vegetable', 'dairy', 'meat', 'other']
    const [formData, setFormData] = useState(item)
    const [msg , setMsg] = useState("")
    const [sendData , setSendData] = useState(false)
  
    const handleForm = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
   
    const imgHandle = (e)=>{
      const file = e.target.files[0];
      
      if(file.size > 1048576){
        setMsg("File exceed 1mb");
        return
      }
  
      const reader = new FileReader()
      reader.onloadend  = ()=>{
        const base64 = reader.result;
        setFormData({...formData , [e.target.name]:base64})
      }
      // convert to base64 format
      reader.readAsDataURL(file)
    }
  
    const formSubmit = async(e)=>{
      e.preventDefault()
      formData.id = item._id
      setSendData(true)
      const data = await updateProduct(formData)
      if(data.success){
        toast.success(data.message)
        getProducts()
        onClose()
      }else{
        toast.error(data.message)
      }
      setSendData(false)
    }
    return (
      <>
        <div className='absolute bg-white w-full h-full top-0  left-0 z-20 flex justify-center p-2 pt-12 md:p-16 overflow-y-auto scrollbar-rounded '>
        { sendData && <div className='h-full w-full absolute top-0 z-20 md:pt-64 pt-44 font-bold text-[24px] flex items-center text-white bg-black bg-opacity-80 flex-col '>
          <img src="/upload.gif" alt="sending" className='w-[100px] invert' />
          <h3>sending...</h3>
          </div>}
          <img src="/cross.gif" alt="cross" onClick={() => onClose()} className='absolute top-2 right-2 w-8 md:w-10 cursor-pointer ' />
  
          <form onSubmit={formSubmit} className=' md:w-[70%] w-full flex flex-col gap-8 relative  text-black '>
           
            <h1 className='md:text-[25px] text-[18px] font-bold text-green-500 text-center'>Update your Product</h1>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="category" className='text-left font-medium ml-3 md:text-base text-[13px]'>Select a category :  </label>
                <select required name="category" id="category" value={formData.category} onChange={handleForm} className='px-4 py-1 md:py-2 text-black border-2 border-black outline-none  cursor-pointer rounded-full'>
                  {category.map((item, i) => {
                    return <option value={item} key={i} className='bg-gray-600 text-white hover:cursor-pointer cursor-pointer'>{item}</option>
                  })}
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="name" className='text-left ml-3 font-medium md:text-base text-[13px]'>Enter your product name :  </label>
               <input required type="text" name='name' id='name' value={formData.name || ""} onChange={handleForm} placeholder='ex: rice , wheat , apple , potato , mutton' className='border-2 border-black  px-3 py-1 md:py-2 rounded-full outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="price" className='text-left ml-3 font-medium md:text-base text-[13px]'>Enter your product price :  </label>
               <input required type="text" name='price' id='price' value={formData.price || ""} onChange={handleForm} placeholder='ex: 599 , 350 , 1020, 2000' className=' border-2 border-black  px-3 py-1 md:py-2 rounded-full outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="quantity" className='text-left ml-3 font-medium md:text-base text-[13px]'>Enter your product quantity :  </label>
               <input required type="text" name='quantity' id='quantity' value={formData.quantity || ""} onChange={handleForm}  placeholder='ex: 1kg , 5kg , 10kg ,130kg ' className=' border-2 border-black  px-3 py-1 md:py-2 rounded-full outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="discount" className='text-left ml-3 font-medium md:text-base text-[13px]'>Enter your product discount :  </label>
               <input required type="text" name='discount' id='discount' value={formData.discount || ""} onChange={handleForm} placeholder='ex: 10% , 30% , 45% , 70%' className=' border-2 border-black  px-3 py-1 md:py-2 rounded-full outline-none' />
              </div>
              <div className={`min-h-[150px] md:min-h-[200px] w-full border-2 bg-gray-100 border-dashed rounded-md flex flex-col justify-center items-center cursor-pointer relative ${msg ? 'border-red-500' : 'border-black'} `} >
                <img src="/uploadImg.png" alt="upload" className='w-12'  />
                <h3 className={`${msg ? 'text-red-500': 'text-gray-500'} text-[14px] md:text-[18px] font-semibold`}>{msg ? msg : 'upload your product image'}</h3>
               <input  type="file" accept="image/*" name='img' id='img' className='outline-none absolute inset-0 opacity-0 cursor-pointer' onChange={imgHandle}/>
               {formData.img ? <img src={formData.img ? formData.img : ''} alt="img" className='w-[100px] h-[100px]'/> : ''}
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="description" className='text-left ml-3 font-medium md:text-base text-[13px]'>Enter your product description :  </label>
                <textarea required name='description' id='description' value={formData.description || ""} onChange={handleForm}  rows={5}   placeholder='ex: rice , wheat , apple , potato , mutton' className='border-2 border-black rounded-md px-3 py-1 outline-none'></textarea>
              </div>
            </div>
              <button type='submit' className='px-2 py-1.5  bg-green-600 rounded-full text-white'>Submit</button>
          </form>
  
        </div>
      </>
    )
  }
  

export default UpdateProduct
