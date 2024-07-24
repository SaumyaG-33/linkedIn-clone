import React from 'react';
import myImage from './linkdin.png';
import { currentUser } from '@clerk/nextjs/server';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const MyComponent: React.FC = async () => {
  const user = await currentUser();
  const firstName = user?.firstName;
  return (
    <div className='bg-white p-4 rounded ml-6 h-[790px] max-h-[400px]'>
      <p className='text-xl mb-2 text-center'>
        Sign up for LinkedIn Premium
      </p>
      <hr className='border-t-2 border-gray-300 mb-4' />
      {/* Additional content can go here */}

      <p className='text-sm py-2 text-center text-gray-500'>
        <SignedIn>
        {firstName}, make connections that matter most in your job search
        </SignedIn>
        <SignedOut>
        Make connections that matter most in your job search
        </SignedOut>
          
</p>
{/* Additional content can go here
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6cZygL_XjpSMJp4UO_mEYnDXTGw4drx-nhA&s"
        height={100} width={100}
        alt='LinkedIn Premium' 
        className='mx-auto' 
      /> 
       */}
      <p className='text-sm pt-4 text-center text-gray-500'>
        See who's viewed your profile in the last 90 days
</p>

<div className='flex justify-center mt-4'>
        <a 
          href="https://www.linkedin.com/premium" 
          className='text-center text-blue-500 bg-white border border-blue-500 rounded py-2 px-4'
        >
          try now for $0
        </a>
      </div>
    </div>
  );
};

export default MyComponent;