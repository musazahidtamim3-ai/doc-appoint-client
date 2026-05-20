"use client"
import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdHealthAndSafety } from 'react-icons/md';

const Navbar = () => {
     const { data: session, isPending } = useSession()
     const user = session?.user;
     const handleLogout = async () => {
          await authClient.signOut({
               fetchOptions: {
                    onSuccess: () => {
                         window.location.reload();
                    },
               },
          })

     };
     return (
          <div className='px-5 lg:px-16 py-5 flex justify-between items-center'>
               <div className='flex items-center gap-2'>
                    <div className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] p-1 text-white rounded-md'>
                         <MdHealthAndSafety className='w-6 h-6' /> 
                    </div>
                    <h1 className='font-semibold'>Doc Appoint</h1>
               </div>
                    
                    <ul className='hidden lg:flex items-center gap-4 text-gray-500'>
                         <Link href={'/'}>Home</Link>
                         <Link href={'/all-appoinment'}>All Appoinment</Link>
                         <Link href={'/dashboard'}>Dashboard</Link>
                    </ul>
               {
                    isPending ? <p>User is loading...</p> : user ? <div className='flex items-center gap-3'>
                         <div className='flex items-center gap-3'>
                              <Image src={user?.photo} alt='' height={30} width={30} className='rounded-full' />
                              <h1>{user?.name}</h1>
                         </div>
                         <Button onClick={handleLogout} className='bg-white text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold' >Logout</Button>
                    </div> : <div className='flex gap-3'>
                         <Link href={'/login'}><Button className='bg-white text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold' >Login</Button></Link>
                         <Link href={'/register'}><Button className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold'>Register</Button></Link>
                    </div>
                    }
               
               
          </div>
     );
};

export default Navbar;