"use client"
import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { GrTextAlignRight } from 'react-icons/gr';
import { MdHealthAndSafety } from 'react-icons/md';
import { RxCrossCircled } from 'react-icons/rx';

const Navbar = () => {
     const [open, setOpen] = useState(false)
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
          <div className='px-5 sticky z-50 top-0 lg:px-16 py-5 flex justify-between items-center bg-white/80 backdrop-blur-md w-full max-w-full overflow-x-clip'>

               <div className='flex items-center gap-2'>
                    <div className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] p-1 text-white rounded-md'>
                         <MdHealthAndSafety className='w-6 h-6' />
                    </div>
                    <h1 className='font-semibold'>Doc Appoint</h1>
               </div>

               <ul className='hidden lg:flex items-center gap-4 text-gray-500'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/all-appoinment'}>All Appointment</Link>
                    <Link href={'/dashboard'}>Dashboard</Link>
               </ul>
               <div className='lg:hidden cursor-pointer z-50' onClick={() => setOpen(!open)}>
                    {
                         open === false ? <GrTextAlignRight className='h-5 w-5 text-[#54bbb8]' /> : <RxCrossCircled className='h-5 w-5 text-[#54bbb8]' />
                    }
               </div>
               <div className={`flex flex-col absolute lg:hidden gap-4 bg-white py-5 px-10 shadow-xl transition-all duration-300 rounded-md text-gray-500 z-40 ${open ? 'top-20 right-5' : 'top-20 -right-full'}`}>
                    {
                         isPending ? <p>User is loading...</p> : user ? 
                              <Image src={user?.photo || "/placeholder.jpg"} alt='' height={30} width={30} className='rounded-full' />
                               : ''
                    }
                    <Link href={'/'} onClick={() => setOpen(false)}>Home</Link>
                    <Link href={'/all-appoinment'} onClick={() => setOpen(false)}>All Appointment</Link>
                    <Link href={'/dashboard'} onClick={() => setOpen(false)}>Dashboard</Link>
                    {
                         user ? <Button onClick={() => { handleLogout(); setOpen(false); }} className='bg-transparent text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold w-full' >Logout</Button>
                              : <div className='flex flex-col gap-2 mt-2'>
                                   <Link href={'/login'} onClick={() => setOpen(false)}><Button className='bg-transparent text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold w-full' >Login</Button></Link>
                                   <Link href={'/register'} onClick={() => setOpen(false)}><Button className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white rounded-md font-semibold w-full'>Register</Button></Link>
                              </div>
                    }
               </div>

               <div className='hidden lg:flex items-center gap-3'>
                    {
                         isPending ? <p>User is loading...</p> : user ? <div className='flex items-center gap-3'>
                                   <Image src={user?.image || "/placeholder.jpg"} alt='' height={30} width={30} className='rounded-full' />
                                   
                              <Button onClick={handleLogout} className='bg-white text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold' >Logout</Button>
                         </div> : <div className='flex gap-3'>
                              <Link href={'/login'}><Button className='bg-white text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold' >Login</Button></Link>
                              <Link href={'/register'}><Button className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white rounded-md font-semibold'>Register</Button></Link>
                         </div>
                    }
               </div>

          </div>
     );
};

export default Navbar;