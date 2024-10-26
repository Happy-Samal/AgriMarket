
const getProducts = async(data)=>{
    try {
        const response = await fetch(`/api/search`, {
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