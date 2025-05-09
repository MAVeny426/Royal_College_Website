import React from 'react';
import FeatureSection from '../Components/FeatureSection';
import Navbar from '../Components/Navbar';
import dashboard from '../college_website/dashboard.jpg';

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="relative min-h-screen font-sans overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${dashboard})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Welcome Text */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold drop-shadow-lg mb-8">
            Welcome
          </p>

          {/* Feature Section */}
          <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <FeatureSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
