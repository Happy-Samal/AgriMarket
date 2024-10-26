import { toast } from "react-toastify"

const sendMessage = async(value)=>{
    try{
        const response = await fetch(`/api/chat/sendMessage`,{
            method:'POST',
            headers:{ "Content-type":'application/json'},
            body:JSON.stringify(value),
            credentials:'include'
        })
        const data = await response.json()
        if(!data.success){
            toast.error(data.message)
        }
        return data
       }catch(err){
        return toast.error("Internal Server Error!") 
       }
}
const getChat = async(receiver)=>{
    try{
        const response = await fetch(`/api/chat/getChat?receiver=${receiver}`,{
            method:'GET',
            credentials:'include'
        })
        const data = await response.json()
        return data
       }catch(err){
        return console.error("Internal Server Error!") 
       }
}
const getHistory = async()=>{
    try{
        const response = await fetch(`/api/chat/getHistory`,{
            method:'GET',
            credentials:'include'
        })
        const data = await response.json()
        return data
       }catch(err){
        return console.error("Internal Server Error!") 
       }
}
const updateChat = async(receiver)=>{
    try{
        const response = await fetch(`/api/chat/updateChat`,{
            method:'PUT',
            headers:{ "Content-type":'application/json'},
            body:JSON.stringify({receiver:receiver}),
            credentials:'include'
        })
        const data = await response.json()
        if(!data.success){
            toast.error(data.message)
        }
        return data
       }catch(err){
        return toast.error("Internal Server Error!") 
       }
}

export {sendMessage , getChat , getHistory , updateChat}