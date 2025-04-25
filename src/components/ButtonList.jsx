import React, { useState, useRef } from 'react';
import Button from './Button';

const ButtonList = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollRef = useRef(null);

  const filters = [
    'All', 'Music', 'Gaming', 'News', 'Sport', 'Live', 'Entertainment',
    'Education', 'Science & Technology', 'How To & Style', 'Travel & Events',
    'Autos & Vehicles', 'Pets & Animals', 'Comedy', 'Film & Animation',
    'People & Blogs', 'Nonprofits & Activism', 'Shorts', 'Fashion & Beauty',
    'Health & Fitness', 'Food', 'Kids', 'Family', 'Documentary', 'History',
    'Arts & Crafts', 'DIY', 'Home & Garden', 'Business', 'Finance',
    'Real Estate', 'Careers', 'Marketing', 'Entrepreneurship', 'Personal Finance',
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'right' ? 200 : -200;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-[100%] fixed z-10 mt-14 bg-white mx-20">
      <div className="flex items-center mr-10">
        {/* Scrollable Filters */}
        <div 
          ref={scrollRef} 
          className="overflow-x-auto w-full py-2 px-2 md:px-12"
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For IE
            '&::-webkit-scrollbar': { // For Chrome, Safari
              display: 'none',
            },
          }}
        >
          <div className="flex space-x-3 w-max">
            {filters.map((filter, index) => (
              <Button
                key={index}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>
        </div>

        {/* Right scroll button (hidden on mobile) */}
        <button 
          onClick={() => scroll('right')} 
          className="hidden md:block absolute right-20 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 4l8.33 6.04c2.226 1.615 2.226 2.306 0 3.92L7 20" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ButtonList;