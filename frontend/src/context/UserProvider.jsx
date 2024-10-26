import React ,{ createContext , useState,useEffect } from 'react'

const UserContext = createContext(null)

function UserProvider ({children}) {
    const [user, setUser] = useState({})
    
    const fetchData = async()=>{
        try{
            const response = await fetch(`/api/auth/isLogin`,{
                method:'GET',
                credentials:'include'
            })
            const data = await response.json()
            setUser(data)
        }catch(err){
            console.error("error in UserProvider " ,err)
        }
    }
    useEffect(() => {
      fetchData()
    },[])
    
  return (
    <UserContext.Provider value={user}>
       {children}
    </UserContext.Provider>
  )
}

export {UserProvider,UserContext}