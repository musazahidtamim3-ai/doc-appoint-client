import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';

const Featured = async() => {
     const res = await fetch('http://localhost:5000/doctors')
     const datas = await res.json()
     const doctors = [...datas].sort((a,b)=>(b.rating-a.rating)).slice(0, 3)
     return (
          <div className='bg-white'>
               <div className='max-w-7xl mx-auto py-20 px-5 lg:px-0'>
                    <div className='text-center'>
                         <h1 className='text-3xl md:text-4xl font-semibold pb-2'>Top Rated <span className='text-[#54bbb8]'>Doctors</span></h1>
                         <p>Highly qualified and experienced doctors ready to help you</p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                         {
                              doctors.map(doctor => (
                                   <div key={doctor.id} className='rounded-xl border flex gap-5 p-5'>
                                        <Image src={doctor.image} alt="Doctor Image" height={200} className='h-full rounded-md object-cover w-45' width={200}></Image>
                                        <div>
                                             <h1 className='font-semibold'>{doctor.name}</h1>
                                             <p className='text-[#54bbb8] pb-3 text-sm font-semibold'>{doctor.specialty}</p>
                                             <p className='text-gray-400 text-sm'>{doctor.education}</p>
                                             <p className='text-gray-400 text-sm'>{doctor.experience} Experience</p>
                                             <div className='flex items-center gap-3 py-3'>
                                                  <div className='flex gap-1 text-yellow-500'>
                                                       <FaStar />
                                                       <FaStar />
                                                       <FaStar />
                                                       <FaStar />
                                                  </div>
                                                  <p>{doctor.rating} <span className='text-gray-400'>({doctor.totalReviews})</span></p>
                                             </div>
                                             <p className='font-semibold flex items-center'><TbCurrencyTaka className='w-4 h-4'/>{doctor.fee}</p>
                                             <p className='text-gray-400 pb-3 text-sm'>Consultation Fee</p>
                                             <Link href={`/all-appoinment/${doctor.id}`}><Button className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold w-full'>View Details</Button></Link>
                                        </div>
                                   </div>
                              ))
                         }
                    </div>
               </div>
          </div>
     );
};

export default Featured;