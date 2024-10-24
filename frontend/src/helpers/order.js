import { toast } from "react-toastify"

const addOrder = async (value) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/addOrder`, {
            method: 'POST',
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(value),
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        toast.error("Internal Server Error!")
    }
}

const getOrder = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/getOrder`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

const getFarmerOrderProduct = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/getFarmerOrderProduct`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}
const updateOrder = async (value) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/updateOrder`, {
            method: 'PUT',
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(value),
            credentials: 'include'
        })
        const data = await response.json()
        return data
    } catch (err) {
        toast.error("Internal Server Error!")
    }
}

export { addOrder, getOrder, getFarmerOrderProduct , updateOrder}