import Link from 'next/link';
import React from 'react';
import { FiFacebook, FiGithub, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';
import { MdHealthAndSafety } from 'react-icons/md';

const Footer = () => {
     return (
          <div className='bg-[#c5f6f439] py-10 backdrop-blur-3xl'>
               <div className='max-w-7xl mx-auto '>
                    <div className='grid grid-cols-3 gap-20'>
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
                                   <div className='bg-white p-2 rounded-md'>
                                        <FiFacebook className='text-gray-400'/>
                                   </div>
                                   <div className='bg-white p-2 rounded-md'>
                                        <FiYoutube className='text-gray-400' />
                                   </div>
                                   <div className='bg-white p-2 rounded-md'>
                                        <FiLinkedin className='text-gray-400' />
                                   </div>
                                   <div className='bg-white p-2 rounded-md'>
                                        <FiTwitter className='text-gray-400'/>
                                   </div>
                                   <div className='bg-white p-2 rounded-md'>
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