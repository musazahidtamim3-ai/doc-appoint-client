import Link from 'next/link';
import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FiFacebook, FiGithub, FiLinkedin, FiTwitter, FiX, FiYoutube } from 'react-icons/fi';
import { MdHealthAndSafety } from 'react-icons/md';

const Footer = () => {
     return (
          <div className='bg-[#c5f6f439] py-10 backdrop-blur-3xl'>
               <div className='max-w-7xl mx-auto px-5 lg:px-0'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20'>
                         <div>
                              <div className='flex items-center gap-2'>
                                   <div className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] p-1 text-white rounded-md'>
                                        <MdHealthAndSafety className='w-6 h-6' />
                                   </div>
                                   <h1 className='font-semibold'>Doc Appoint</h1>
                              </div>
                              <p className='pt-3 text-gray-400'>A Doctor Appointment Booking System where users can browse available doctors from the home page, view details, and book appointments.</p>
                         </div>
                         <div>
                              <h1 className='font-semibold'>Quick Links</h1>
                              <ul className='flex flex-col gap-2 mt-3 text-gray-500'>
                                   <Link href={'/'}>Home</Link>
                                   <Link href={'/All-Appoinment'}>All Appoinment</Link>
                                   <Link href={'/dashboard'}>Dashboard</Link>
                              </ul>
                         </div>
                         <div>
                              <h1 className='font-semibold'>Follow Us</h1>
                              <div className='flex items-center gap-3 mt-3'>
                                   <div className='bg-white/50 p-2 rounded-md'>
                                        <FiFacebook className='text-gray-400'/>
                                   </div>
                                   <div className='bg-white/50 p-2 rounded-md'>
                                        <FiYoutube className='text-gray-400' />
                                   </div>
                                   <div className='bg-white/50 p-2 rounded-md'>
                                        <FiLinkedin className='text-gray-400' />
                                   </div>
                                   <div className='bg-white/50 p-2 rounded-md'>
                                        <FaXTwitter className='text-gray-400'/>
                                   </div>
                                   <div className='bg-white/50 p-2 rounded-md'>
                                        <FiGithub className='text-gray-400' />
                                   </div>
                              </div>
                         </div>
                         
                    </div>
                    <hr className='mt-3'/>
                    <p className='text-gray-400 text-center pt-3'>&copy; 2026 All Rights Reserved.</p>
               </div>
          </div>
     );
};

export default Footer;