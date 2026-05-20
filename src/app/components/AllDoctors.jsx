"use client"
import React, { useState } from 'react';
import { SearchField } from '@heroui/react';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import Link from 'next/link';

const AllDoctors = ({doctors}) => {
     const [search, setSearch] = useState('')
     const displayedDoctors = (doctors.filter(doctor => (
          doctor.name.toLowerCase().includes(search.toLowerCase())
     )))

     return (
          <div>
               <SearchField name="search" className='my-5 border border-gray-200 rounded-xl'>
                    <SearchField.Group>
                         <SearchField.SearchIcon />
                         <SearchField.Input onChange={(e)=>setSearch(e.target.value)} className="w-full" placeholder="Search..." />
                         <SearchField.ClearButton />
                    </SearchField.Group>
               </SearchField>
               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                         displayedDoctors.length === 0 ? <div className='flex justify-center items-center rounded-md border border-[#54bbb788] col-span-3 h-50 bg-[#c5f6f439]'>
                              <h1 className='text-center text-[#54bbb8] text-xl font-semibold'>Sorry ! We have not any doctor that you are looking for</h1>
                         </div>:displayedDoctors.map(doctor => (
                              <div key={doctor.id} className='rounded-xl border flex gap-5 p-5'>
                                   <Image src={doctor.image} alt="Doctor Image" height={200} className='h-full rounded-md object-cover w-45' width={200} unoptimized></Image>
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
                                        <p className='font-semibold flex items-center'><TbCurrencyTaka className='w-4 h-4' />{doctor.fee}</p>
                                        <p className='text-gray-400 pb-3 text-sm'>Consultation Fee</p>
                                        <Link href={`/all-appoinment/${doctor.id}`}><Button className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold w-full'>View Details</Button></Link>
                                   </div>
                              </div>
                         ))
                    }
               </div>
          </div>
     );
};

export default AllDoctors;