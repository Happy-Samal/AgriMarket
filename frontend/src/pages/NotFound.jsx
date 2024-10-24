
function NotFound() {
    return (
        <>
            <div className="bg-white min-h-[100vh] sm:py-28 py-14">
                <div className="bg-url1   text-[#6c757d] text-center">
                    <h2 className="text-[50px] sm:text-[78px] font-semibold ">404</h2>
                </div>
                <span className=" flex flex-col gap-2 text-center text-[#575d62] -mt-14 ">
                    <h3 className="sm:text-[34px] text-[20px]">Look like you're lost</h3>
                    <p className="text-[14px] sm:text-base">the page you are looking for not avaible!</p>
                </span>
            </div>
        </>
    )
}
export default NotFound