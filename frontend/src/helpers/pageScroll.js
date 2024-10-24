import { useState, useEffect } from "react"

const pageScrollY = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }
        window.addEventListener("scroll", handleScroll)

        // clean up event listener
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return scrollPosition
}
const pageScrollX = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollX)
        }
        window.addEventListener("scroll", handleScroll)

        // clean up event listener
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return scrollPosition
}

export { pageScrollY , pageScrollX}
