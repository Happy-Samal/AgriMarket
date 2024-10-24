import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import { HomeRecommended } from '../components/Recommended'
import CategoryProducts from '../components/CategoryProducts'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  const LoginUser = useContext(UserContext)
  const navigate = useNavigate()
  const category = ['grain', 'fruit', 'vegetable', 'dairy', 'meat', 'other']
  const banners = [
    { category: 'grain', img: '/grain-banner.jpg', title: 'Grains' },
    { category: 'fruit', img: '/fruit-banner.jpg', title: 'Fresh Fruits' },
    { category: 'vegetable', img: '/vegetable-banner.jpg', title: 'Vegetables' },
    { category: 'dairy', img: '/dairy-banner.jpg', title: 'Dairy Products' },
    { category: 'meat', img: '/meat-banner.jpg', title: 'Meat and Poultry' },
  ];

  return (
    <>
      <Helmet>
        <title>AgriMarket : Connecting Farmers to Your Home</title>
        <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
      </Helmet>


      <div className='flex flex-col gap-4 text-white  '>

        <div className='flex flex-col gap-2 lg:px-10 md:px-6 px-2'>
          {/* home nav bar */}
          <div className='h-24 mt-2 bg-white flex md:gap-20 px-10 gap-5 lg:justify-center items-center overflow-x-auto scrollbar-hide text-gray-700 font-semibold py-2'>
            {category.map((item, index) => {
              return <div key={index} onClick={() => { navigate(`/search?query=${item}`) }} className='flex flex-col cursor-pointer items-center'>
                <img src={`/${item}.png`} alt={item} className='w-[60px]' />
                <h1 className='md:text-lg text-sm'>{item}</h1>
              </div>
            })}
          </div>


        </div>


        {/* banner section */}
        <div className='flex flex-col gap-4 text-white lg:px-10 md:px-6 px-2'>
          <div className="w-full relative">


          <Carousel
              showArrows={true}
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={3000}
            >
              {banners.map((item, index) => (
                <div key={index} onClick={() => navigate(`/search?query=${item.category}`)}>
                  <img src={item.img} alt={item.title} className="object-cover inset-0 w-full h-[350px]" />
                  <p className="legend bg-gray-800 bg-opacity-50 text-white text-xl font-bold cursor-pointer">
                    {item.title}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* product section */}
        <div className='flex flex-col gap-6 lg:px-10 md:px-6 px-2'>

          {/* recommended section */}
          {LoginUser.success && <HomeRecommended />}

          {/* category based products */}
          {category.map((item, index) => {
            return <React.Fragment key={index}>
              <CategoryProducts category={item} />
            </React.Fragment>
          })}
        </div>

        <div className='flex flex-col mt-10'>
          {/* FAQ */}
          <div className='bg-white min-h-[60vh]  w-screen flex flex-col py-10 md:py-20 items-center text-black gap-10'>
            <h5 className='md:text-[34px] text-[22px] font-[700] text-green-500'>AgriMarket FAQ</h5>
            <div className='flex flex-col gap-10 justify-center items-center relative w-full'>
              {/* q1 */}
              <div className='flex flex-col h-[40px]  gap-5 cursor-pointer md:w-[70%] w-[80%] overflow-hidden hover:h-[140px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]'>
                <div className='flex justify-between items-center'>
                  <span className='md:text-[24px] text-[12px] font-[500]'>What are the benefits of using AgriMarket?</span>
                  <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 md:h-6 md:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>AgriMarket allows you to connect directly with local farmers, ensuring you get the freshest produce available. By buying directly from farmers, you support sustainable agriculture and can often find better prices than in traditional grocery stores.</span>
              </div>
              {/* q2 */}
              <div className='flex flex-col h-[40px]  gap-5 cursor-pointer md:w-[70%] w-[80%] overflow-hidden hover:h-[140px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]'>
                <div className='flex justify-between items-center'>
                  <span className='md:text-[24px] text-[12px] font-[500]'>How do I contact farmers directly?</span>
                  <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 md:h-6 md:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>With AgriMarket, you can chat directly with farmers through our live chat feature. This allows you to ask questions about products, get recommendations, and receive personalized service tailored to your needs.</span>
              </div>
              {/* q3 */}
              <div className='flex flex-col h-[40px]  gap-5 cursor-pointer md:w-[70%] w-[80%] overflow-hidden hover:h-[140px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]'>
                <div className='flex justify-between items-center'>
                  <span className='md:text-[24px] text-[12px] font-[500]'>What types of products can I find on AgriMarket?</span>
                  <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 md:h-6 md:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>AgriMarket offers a wide variety of products, including grains, fruits, vegetables, dairy, meat, and more, all sourced directly from local farmers. You can find everything you need for your household while supporting your community.</span>
              </div>
              {/* q4 */}
              <div className='flex flex-col h-[40px]  gap-5 cursor-pointer md:w-[70%] w-[80%] overflow-hidden hover:h-[140px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]'>
                <div className='flex justify-between items-center'>
                  <span className='md:text-[24px] text-[12px] font-[500]'>How does AgriMarket ensure product quality?</span>
                  <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 md:h-6 md:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>We take product quality seriously at AgriMarket. All farmers are vetted to ensure they meet our quality standards, and we encourage customer feedback to maintain high standards. You can trust that you’re getting the best produce available.</span>
              </div>
              {/* q5 */}
              <div className='flex flex-col h-[40px]  gap-5 cursor-pointer md:w-[70%] w-[80%] overflow-hidden hover:h-[140px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]'>
                <div className='flex justify-between items-center'>
                  <span className='md:text-[24px] text-[12px] font-[500]'>How can farmers sell their products on AgriMarket?</span>
                  <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 md:h-6 md:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>Farmers can create an account on AgriMarket to list and sell their products directly. Our platform is designed to help them reach customers effectively while providing them with the tools they need to manage their sales.</span>
              </div>
            </div>
          </div>

          {/* Get Started Section */}
          <div className='bg-black w-screen sm:h-[50vh] h-[30vh] text-white flex flex-col justify-center items-center gap-6'>
            <h1 className='text-[14px] md:text-[28px] lg:text-[35px] font-[500] w-[300px] sm:w-[700px] text-center'>Show the world the best of local farming. Create your AgriMarket account today.</h1>
            {!LoginUser.success && (
              <button className={`sm:px-9 sm:py-2.5 px-2 py-1 sm:text-base text-[10px] border rounded-[50px] grid place-content-center w-[90px] sm:w-[200px] hover:bg-black hover:text-white transition-colors duration-700 ease-in-out bg-white text-black`} onClick={() => { navigate('/user/login') }}>Get Started</button>
            )}

          </div>

          {/* AgriMarket Description */}
          <div className='px-4 md:px-10 lg:px-16 py-10 bg-gray-200 text-black'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4 text-green-500'>About AgriMarket</h2>
            <p className='text-base md:text-lg'>
              At AgriMarket, we are dedicated to revolutionizing the way you access fresh, quality produce. Our platform connects local farmers directly to consumers, ensuring that you receive the freshest ingredients while supporting sustainable agricultural practices.
            </p>
            <p className='text-base md:text-lg mt-4'>
              Our mission is simple: to provide a reliable, user-friendly marketplace where you can find a diverse range of products—from grains and fruits to dairy and meat—sourced directly from trusted farmers in your area. With AgriMarket, you can enjoy the peace of mind that comes with knowing exactly where your food comes from.
            </p>
            <p className='text-base md:text-lg mt-4'>
              We believe that everyone should have access to nutritious food, and that starts with supporting our local farming communities. By choosing AgriMarket, you're not just shopping for groceries; you're making a conscious choice to invest in your health and the environment.
            </p>
            <p className='text-base md:text-lg mt-4'>
              **Features of AgriMarket:**
            </p>
            <ul className='list-disc list-inside text-base md:text-lg mt-2'>
              <li>Direct communication: Engage in live chat with farmers to ask questions and get more information about the products.</li>
              <li>Freshness guarantee: Enjoy farm-fresh produce delivered directly to your home.</li>
              <li>Secure transactions: Shop confidently with reliable payment options and secure checkout.</li>
              <li>User-friendly interface: Navigate our platform effortlessly to find exactly what you need.</li>
              <li>Farmer empowerment: Farmers can create accounts to list and sell their products, ensuring they receive fair prices.</li>
              <li>Community focused: Join a community that values sustainability and quality.</li>
            </ul>
            <p className='text-base md:text-lg mt-4'>
              Join us today and experience the difference of farm-fresh products delivered straight to your door. Together, let's build a healthier, more sustainable future.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home
