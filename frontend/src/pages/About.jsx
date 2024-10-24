import React from 'react';
import { Helmet } from 'react-helmet-async';

function About() {
    return (
        <>
            <Helmet>
                <title>AgriMarket - About Us</title>
                <meta name="description" content="AgriMarket - a platform connecting farmers directly with consumers for fresh produce." />
            </Helmet>
            <div className="text-white relative ">
                <div className="mx-[-10px] md:px-10 my-5">
                    <div className="flex pt-2 mb-10 justify-center text-4xl font-extrabold font-sans items-center">About Us</div>
                    <br />
                    <div className="text-center font-bold text-white">
                        &quot;Connecting Farmers with Consumers for Freshness and Quality&quot;
                    </div>
                    <p className="p-4 text-gray-200 text-md text-center font-sans">
                        At AgriMarket, we are dedicated to bridging the gap between farmers and consumers. Our platform offers an intuitive experience for farmers to showcase their fresh produce directly to customers. Whether you’re a grower of fruits, vegetables, or grains, AgriMarket provides the tools needed to highlight your products and connect with potential buyers. We believe that quality and freshness should be accessible to everyone, and we’re here to ensure that farmers can share their harvest with the world.
                    </p>
                    <p className="p-4 text-gray-200 text-md text-center font-sans">
                        Our mission at AgriMarket is to empower farmers by providing them with a direct channel to consumers, eliminating the middlemen and ensuring better prices for both parties. Whether you’re a small farmer or part of a larger agricultural operation, our platform is designed to support you in promoting your products effectively. We are committed to fostering a community where quality agriculture thrives and consumers enjoy the freshest produce available.
                    </p>
                    <p className="p-4 text-gray-200 text-md text-center font-sans">
                        At AgriMarket, we believe in the strength of community and the importance of supporting local agriculture. Our platform is more than just a marketplace; it’s a space where farmers and consumers can interact, share stories, and appreciate the journey of food from farm to table. By offering an accessible and user-friendly platform, we aim to create an environment that encourages sustainable practices, showcases the hard work of farmers, and connects them directly with the people who value their products.
                    </p>
                    <p className="p-4 text-gray-200 text-md text-center font-sans">
                        We take pride in helping farmers maximize their potential and ensuring consumers have access to high-quality, fresh produce. Join us on this journey to strengthen local economies and promote healthy living. Together, let’s celebrate the hard work of farmers and build a community that values fresh food and sustainability.
                    </p>
                </div>
                <div className="bg-white h-1 opacity-10 my-20"></div>
                <div className="relative mx-auto max-w-5xl text-center">
                    <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">Why Choose Us</span>
                    <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">Support Local Farmers and Enjoy Fresh Produce</h2>
                    <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
                        At AgriMarket, we empower farmers by providing an intuitive platform to showcase their fresh produce and connect with consumers. No technical skills required—our user-friendly tools make it easy to list and manage your products. Whether you’re looking to sell your latest harvest or attract new customers, AgriMarket helps bring your agricultural vision to life with ease.
                    </p>
                </div>
                <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                        <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border" style={{ backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)', borderColor: 'rgb(93, 79, 240)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-color-swatch" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                                <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                                <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                                <line x1="17" y1="17" x2="17" y2="17.01"></line>
                            </svg>
                        </div>
                        <h3 className="mt-6 text-gray-400">Easy Customization</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                            Customize your product listings, from descriptions to images, to reflect the quality and uniqueness of your fresh produce.
                        </p>
                    </div>
                    <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                        <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border" style={{ backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)', borderColor: 'rgb(93, 79, 240)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
                            </svg>
                        </div>
                        <h3 className="mt-6 text-gray-400">High Performance</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                            Our platform is optimized for fast performance, ensuring your product listings load quickly and are easily accessible to customers.
                        </p>
                    </div>
                    <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                        <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border" style={{ backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)', borderColor: 'rgb(93, 79, 240)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                                <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                                <polyline points="12 8 7 3 3 7 8 12"></polyline>
                            </svg>
                        </div>
                        <h3 className="mt-6 text-gray-400">Support for Farmers</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                            We offer dedicated support for farmers, ensuring you have the resources needed to maximize your success on our platform.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
