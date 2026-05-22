"use client"
import { useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import React, { useState } from 'react';
import MyBookings from '../components/MyBookings';
import MyProfiles from '../components/MyProfiles';

const DashboardPage = () => {
     const { data: session, isPending } = useSession()
     const user = session?.user;
     
     const[active, setActive] = useState("my-bookings")
     return (
          <div className="max-w-7xl mx-auto">
               <div className='my-20 px-5 lg:px-0'>
                    <h1 className='text-2xl md:text-3xl font-semibold'>Welcome to dashboard, <span className='text-[#54bbb8]'>{user?.name}</span></h1>
                    <p className='text-gray-400'>Here, you can explore your bookins and your profile and edit them</p>
                    <div className='flex gap-4 mt-4'>
                         <Button onClick={() => setActive("my-bookings")} className={`${active === "my-bookings" ? "bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white" : "bg-white text-black border"} rounded-md`}>My Bookings</Button>
                         <Button onClick={() => setActive("my-profile")} className={`${active === "my-profile" ? "bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white" : "bg-white text-black border"} rounded-md`}>My Profile</Button>
                    </div>
                    <div>
                         {
                              isPending ? <div className="flex justify-center items-center min-h-screen">
                                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#54bbb8]"></div>
                              </div> : active === "my-bookings" ? <MyBookings /> : <MyProfiles />
                         }
                    </div>
               </div>
          </div>
     );
};
export default DashboardPage;