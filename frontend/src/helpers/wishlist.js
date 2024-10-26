import { toast } from "react-toastify"

const getWishlist = async ()=>{

    try{
        const response = await fetch(`/api/account/getWishlist`, {
            method: 'GET',
            credentials: 'include'
          })
          const data = await response.json()
          return data?.wishlists?.products || []
    }catch(err){
        console.log(err)
    }
}
const addToWishlist = async (pId)=>{

    try{
        const response = await fetch(`/api/account/addToWishlist`, {
            method: 'POST',
            headers:{ "Content-type":'application/json'},
            body:JSON.stringify({pId:pId}),
            credentials: 'include'
          })
          const data = await response.json()
          return data
    }catch(err){
        toast.error("Internal Server Error!")
    }
}
const removeFromWishlist = async (id)=>{

    try{
        const response = await fetch(`/api/account/removeFromWishlist`, {
            method: 'DELETE',
            headers:{ "Content-type":'application/json'},
            body:JSON.stringify({id:id}),
            credentials: 'include'
          })
          const data = await response.json()
          return data
    }catch(err){
        toast.error("Internal Server Error!")
    }
}

export  {getWishlist ,  addToWishlist , removeFromWishlist }