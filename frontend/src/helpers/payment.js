import { toast } from 'react-toastify';

const createRzyOrder = async (value)=>{
   try{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/createRzyOrder`,{
        method:'POST',
        headers:{ "Content-type":'application/json'},
        body:JSON.stringify(value),
        credentials:'include'
    })
    const data = await response.json()
    return data
   }catch(err){
    return toast.error("Internal Server Error!") 
   }
}

export {createRzyOrder}