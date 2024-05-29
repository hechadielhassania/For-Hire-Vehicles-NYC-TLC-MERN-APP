import React from 'react';
import Drivers from './Drivers';
// import Navbar from './Navbar';

const Home = () => {
  
  return (
    <>
    {/* <Navbar /> */}

    <section class=" pt-8 mt-10 mb-3">
    <div class=" px-4 mx-auto max-w-screen-xl text-center lg:px-12">
        
        <h1 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white">Rate Your Ride, Help Improve NYC's Taxi Service!</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Share your experiences and reviews of NYC taxi drivers. Your feedback helps us recognize top performers and improve the service for everyone.</p>
       
    </div>
</section>

<Drivers />
    </>
  );
};

export default Home;
