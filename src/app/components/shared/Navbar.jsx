import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { MdHealthAndSafety } from 'react-icons/md';

const Navbar = () => {
     return (
          <div className='px-16 py-5 flex justify-between items-center'>
               <div className='flex items-center gap-2'>
                    <div className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] p-1 text-white rounded-md'>
                         <MdHealthAndSafety className='w-6 h-6' /> 
                    </div>
                    <h1 className='font-semibold'>Doc Appoint</h1>
               </div>
                    
                    <ul className='flex items-center gap-4 text-gray-500'>
                         <Link href={'/'}>Home</Link>
                         <Link href={'/All-Appoinment'}>All Appoinment</Link>
                         <Link href={'/dashboard'}>Dashboard</Link>
                    </ul>
                    <div className='flex gap-3'>
                    <Button className='bg-white text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold' >Login</Button>
                    <Link href={'/auth/register'}><Button className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold'>Register</Button></Link>
                    </div>
               
               
          </div>
     );
};

export default Navbar;