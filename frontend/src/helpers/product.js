import { toast } from "react-toastify"


// get products 
const getProduct = async()=>{
    try {
        const res = await fetch(`/api/product/getProducts`, {
          method: 'GET',
          credentials: 'include'
        })
  
        const data = await res.json()
        return data
      } catch (error) {
        toast.error("Internal Server Error!")
      }
}

// add product 
const addProduct = async(formData)=>{
    try {
        const response = await fetch(`/api/product/addProduct`, {
            method: 'POST',
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        toast.error("Internal Server Error!")
    }
}

// delete product 
const deleteProduct = async({id})=>{
    try {
        const res = await fetch(`/api/product/deleteProduct`, {
          method: 'DELETE',
          headers: { "Content-type": 'application/json' },
          body: JSON.stringify({ id: id }),
          credentials: 'include',
        })
        const data = await res.json()
        return data
      } catch (error) {
        toast.error("Internal Server Error!")
      }
}


// update product 
const updateProduct = async (formData)=>{
    try{
        const response = await fetch(`/api/product/updateProduct`,{
          method:'PUT',
          headers:{ "Content-type":'application/json'},
          body:JSON.stringify(formData),
          credentials:'include'
      })
      const data = await response.json()
      return data

      }catch(err){
        toast.error("Internal Server he;ja!")
      }
}

export {addProduct , getProduct , deleteProduct , updateProduct}