import { toast } from 'react-toastify';

// get user 
const getUser = async ({email,id})=>{
    try{
     const response = await fetch(`/api/account/getUser`,{
         method:'POST',
         headers:{ "Content-type":'application/json'},
         body:JSON.stringify({email:email , id:id}),
     })
     const data = await response.json()
     return data
    }catch(err){
     return toast.error("Internal Server Error!") 
    }
 }

//  delete user
const deleteAccount = async() => {
    const cnf = confirm("Are you sure to delete your Account ?")
    if (cnf) {
        const res = await fetch(`/api/auth/deleteAccount`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await res.json()
        return data
    }
}

// logout user 
const logout = async()=>{
    const res = await fetch(`/api/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await res.json()
    return data
}

export {getUser , logout , deleteAccount }
