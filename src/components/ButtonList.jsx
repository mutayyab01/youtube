import React, { useState } from 'react';
import Button from './Button';

const ButtonList = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All', 'Music', 'Gaming', 'News', 'Sport', 'Live', 'Shorts'
  ];

  return (
    <div className="w-full relative">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-3 px-4 py-2 w-max">
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
    </div>
  );
};

export default ButtonList;