import React from 'react';

import getAvatar from '../../../configs/getAvatar';

const Panel = () => {
  const doLogout = () => {};

  return (
    <div className='h-20 bg-white flex justify-between '>
      <div className='flex h-full items-center'>
        <img
          src={getAvatar(localStorage.username)}
          className='w-20 h-20 rounded-full p-4 '
        />
        <h1 className='hidden md:flex font-semibold text-2xl'>Chat</h1>
      </div>

      <div className='hidden md:flex h-full items-center'>
        <button className='bg-gray-200 rounded-full p-2 mr-2 focus:outline-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            className=''
          >
            <path d='M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z' />
          </svg>
        </button>

        <button
          className='bg-gray-200 rounded-full p-2 mr-2 focus:outline-none'
          onClick={doLogout}
        >
          <svg height='24' width='24' viewBox='0 0 36 36'>
            <g
              id='compose'
              fill='none'
              fillRule='evenodd'
              stroke='none'
              strokeWidth='1'
            >
              <polygon id='Fill-1' points='0 36 36 36 36 0 0 0'></polygon>
              <path
                id='Fill-2'
                d='M15.047,20.26245 L15.9815,17.45445 C16.091,17.12495 16.276,16.82495 16.5215,16.57945 L27.486,5.60195 C28.29,4.79695 29.595,4.79695 30.399,5.60195 C31.2025,6.40645 31.202,7.70895 30.399,8.51345 L19.432,19.49345 C19.186,19.73945 18.886,19.92495 18.556,20.03495 L15.7555,20.96995 C15.318,21.11645 14.901,20.69995 15.047,20.26245 Z M24.005,28.00095 L12.001,28.00095 C9.791,28.00095 8,26.20945 8,23.99995 L8,11.99895 C8,9.78945 9.791,7.99845 12.001,7.99845 L19.0035,7.99745 C19.5555,7.99745 20.0035,8.44545 20.0035,8.99745 C20.0035,9.54995 19.5555,9.99795 19.0035,9.99795 L12.001,9.99845 C10.8965,9.99845 10.0005,10.89395 10.0005,11.99895 L10.0005,23.99995 C10.0005,25.10445 10.8965,26.00045 12.001,26.00045 L24.005,26.00045 C25.1095,26.00045 26.005,25.10445 26.005,23.99995 C26.005,23.99995 26.0045,17.55145 26.0045,16.99895 C26.0045,16.44645 26.4525,15.99845 27.005,15.99845 C27.557,15.99845 28.005,16.44645 28.005,16.99895 C28.005,17.55145 28.0055,23.99995 28.0055,23.99995 C28.0055,26.20945 26.2145,28.00095 24.005,28.00095 Z'
                fill='#000000'
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Panel;
