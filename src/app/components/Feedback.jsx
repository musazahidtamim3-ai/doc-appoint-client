import React from 'react';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
     const feedbacks = [
          {
               "id": "f1",
               "patientName": "Anika Tahsin",
               "location": "Mirpur, Dhaka",
               "rating": 5,
               "feedback": "Doc Appoint saved my family's time. I can book an appointment in less than a minute and visit the doctor exactly on schedule. No more waiting in long clinic lines!"
          },
          {
               "id": "f2",
               "patientName": "Rahat Chowdhury",
               "location": "Gulshan, Dhaka",
               "rating": 5,
               "feedback": "The user interface is incredibly clean and intuitive. Being able to see verified degrees and real patient reviews made it so easy to choose the right cardiologist."
          },
          {
               "id": "f3",
               "patientName": "Sultana Razia",
               "location": "Uttara, Dhaka",
               "rating": 4.8,
               "feedback": "Huge thanks to the 24/7 support team for helping me with an urgent booking. Knowing that every doctor on this platform is fully verified gives me immense peace of mind."
          },
          {
               "id": "f4",
               "patientName": "Tanvir Hasan",
               "location": "Dhanmondi, Dhaka",
               "rating": 5,
               "feedback": "The automated appointment reminders are my favorite feature. The app notifications ensure I never miss a check-up, and the digital prescription history is very useful."
          },
          {
               "id": "f5",
               "patientName": "Nusrat Jahan",
               "location": "Chittagong",
               "rating": 4.5,
               "feedback": "An excellent platform for healthcare! Even from outside Dhaka, I can check specialist availability and secure a slot safely. The online payment system is fast and secure."
          }
     ]
     return (
          <div className='bg-white'>
               <div className='max-w-7xl mx-auto pb-20 px-5 lg:px-0'>
                    <div className='text-center'>
                         <h1 className='text-4xl font-semibold pb-2'>What Our <span className='text-[#54bbb8]'>Patients Say ?</span></h1>
                         <p>Listen about our services and healthcare directly from Our patients.</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
                         {
                              feedbacks.map((feed, index) => (
                                   <div key={index} className='bg-white p-5 border border-[#54bbb8]/30 rounded-md hover:scale-105 shadow-md shadow-[#54bbb8]/30'>
                                        <p className='text-gray-400'>{feed.feedback}</p>
                                        <div className='flex items-center gap-3 mt-2 mb-1'>
                                             <div className='flex gap-1 text-yellow-500'>
                                                  <FaStar />
                                                  <FaStar />
                                                  <FaStar />
                                                  <FaStar />
                                             </div>
                                             <p>{feed.rating} <span className='text-gray-400'>( out of 5 )</span></p>
                                        </div>
                                        <h1 className='font-semibold text-[#54bbb8]'>{feed.patientName}</h1>
                                        <p className='text-gray-400'>Patient</p>
                                   </div>
                    ))
                         }
               </div>
          </div>
               
               
          </div >
     );
};

export default Feedback;