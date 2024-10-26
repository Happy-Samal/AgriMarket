
const getProducts = async(data)=>{
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/search`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (result.success) {
            return result.products
        }else{
            return []
        }
    } catch (err) {
        return []
    }

}

export default getProducts