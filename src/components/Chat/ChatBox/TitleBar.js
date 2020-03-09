import React from 'react';

import Avatar from '../../../assets/images/avatar.jpg';

const TitleBar = () => {
  return (
    <div className='h-20 bg-white flex justify-between border-b-2 border-gray-200'>
      <div className='flex h-full items-center'>
        <img src={Avatar} className='w-20 h-20 rounded-full p-4 ' />
        <h1 className='font-semibold text-base'>Shiro</h1>
      </div>
    </div>
  );
};

export default TitleBar;
