import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function Error() {
  const location = useLocation()
  const retryAction = location.state?.retryAction;
  return (
    <>
      <div className="py-32 ">
        <div className="sm:w-[65vw] w-[80vw] m-auto sm:py-16  flex items-center justify-center ">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg sm:px-16 sm:py-16 px-10 py-10 flex flex-col gap-6 items-center ">
            <h1 className="sm:text-5xl text-3xl font-bold text-green-400">ERROR</h1>
            <h1 className="sm:text-3xl text-lg font-medium  text-black">Something went wrong!</h1>
            <div className='flex sm:flex-row flex-col gap-4 items-center'>
              <Link to={'/'}>
                <button className="bg-gradient-to-r from-green-400 to-white-500 hover:from-red-500 text-black  font-semibold sm:px-6 sm:py-2 px-4 py-1.5 rounded-md sm:text-lg text-[12px] ">
                  Home
                </button>
              </Link>
              <button onClick={() => {
                if (typeof retryAction === 'function') {
                  retryAction();
                } else {
                  console.warn('No retry action available');
                }
              }}
                className="bg-gradient-to-l  from-green-400 to-white-500 hover:from-red-500 text-black font-semibold sm:px-6 sm:py-2 px-4 py-1.5 rounded-md sm:text-lg text-[12px]">
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error
