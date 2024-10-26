import { toast } from "react-toastify"

const getCart = async ()=>{

    try{
        const response = await fetch(`/api/account/getCart`, {
            method: 'GET',
            credentials: 'include'
          })
          const data = await response.json()
          return data?.carts?.products || []
    }catch(err){
        console.log(err)
    }

}
const addToCart = async (pId)=>{

    try{
        const response = await fetch(`/api/account/addToCart`, {
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
const removeFromCart = async (id)=>{

    try{
        const response = await fetch(`/api/account/removeFromCart`, {
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
const updateCart = async ({id, itemQuantity})=>{

    try{
        const response = await fetch(`/api/account/updateCart`, {
            method: 'PUT',
            headers:{ "Content-type":'application/json'},
            body:JSON.stringify({id:id , itemQuantity:itemQuantity}),
            credentials: 'include'
          })
          const data = await response.json()
          return data
    }catch(err){
        toast.error("Internal Server Error!")
    }

}

export  {getCart ,  addToCart , removeFromCart , updateCart}