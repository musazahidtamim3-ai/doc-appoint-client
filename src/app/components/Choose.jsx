import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { MdDateRange, MdLockOutline, MdOutlineVerified } from 'react-icons/md';

const Choose = () => {
     return (
          <div>
               <div className='bg-white'>
                    <div className='max-w-7xl mx-auto pb-20'>
                         <div className='text-center'>
                              <h1 className='text-4xl font-semibold pb-2'>Why Choose <span className='text-[#54bbb8]'>Doc Appoint ?</span></h1>
                              <p>We provide the best healthcare experience for you and your family</p>
                         </div>
                         <div className='mt-8 grid grid-cols-4 gap-5'>
                              <div className='bg-white p-5 flex items-center gap-5 border border-[#54bbb8]/30 rounded-md hover:scale-105 shadow-md shadow-[#54bbb8]/30'>
                                   <div className='bg-[#54bbb734] p-3 rounded-full'>
                                        <MdDateRange className='w-6 h-6 text-[#03928d]' />

                                   </div>
                                   <div>
                                        <h1 className='text-[#03928d] font-semibold'>Easy Appoinment</h1>
                                        <p className='text-gray-400'>Book appoinments in just a few clicks</p>
                                   </div>
                              </div>
                              <div className='bg-white p-5 flex items-center gap-5 border border-[#54bbb8]/30 rounded-md hover:scale-105 shadow-md shadow-[#54bbb8]/30'>
                                   <div className='bg-[#54bbb734] p-3 rounded-full'>
                                        <MdOutlineVerified
 className='w-6 h-6 text-[#03928d]' />

                                   </div>
                                   <div>
                                        <h1 className='text-[#03928d] font-semibold'>Verified Doctors</h1>
                                        <p className='text-gray-400'>All doctors are verified and experienced</p>
                                   </div>
                              </div>
                              <div className='bg-white p-5 flex items-center gap-5 border border-[#54bbb8]/30 rounded-md hover:scale-105 shadow-md shadow-[#54bbb8]/30'>
                                   <div className='bg-[#54bbb734] p-3 rounded-full'>
                                        <BiSupport className='w-6 h-6 text-[#03928d]' />

                                   </div>
                                   <div>
                                        <h1 className='text-[#03928d] font-semibold'>24/7 Support</h1>
                                        <p className='text-gray-400'>We're here to help you anytime, anywhere.</p>
                                   </div>
                              </div>
                              <div className='bg-white p-5 flex items-center gap-5 border border-[#54bbb8]/30 rounded-md hover:scale-105 shadow-md shadow-[#54bbb8]/30'>
                                   <div className='bg-[#54bbb734] p-3 rounded-full'>
                                        <MdLockOutline

 className='w-6 h-6 text-[#03928d]' />

                                   </div>
                                   <div>
                                        <h1 className='text-[#03928d] font-semibold'>Secure & Safe</h1>
                                        <p className='text-gray-400'>Your data is protected with top security</p>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default Choose;