import React, { useEffect, useState } from 'react';

const MyBookings = () => {
     const [bookings, setBookings] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchBookings = async () => {
               try {
                    const res = await fetch('http://localhost:5000/bookings');
                    const data = await res.json();

                    setBookings(data);
               } catch (error) {
                    console.error("Error fetching bookings:", error);
               } finally {
                    setLoading(false);
               }
          };

          fetchBookings();
     }, []);
     if (loading) {
          return <div className="text-center py-10 font-medium">Loading your bookings...</div>;
     }

     return (
          <div className="space-y-4 my-10">
               <h2 className="text-xl font-bold">My Bookings ({bookings.length})</h2>

               <div className='grid grid-cols-3 gap-5'>
                    {bookings.length === 0 ? (
                         <p className="text-gray-500">No bookings found.</p>
                    ) : (
                              bookings.map(booking => {
                                   const timeObj = booking.appointmentTime;
                                   const formatedTime = timeObj && typeof timeObj === 'object'
                                        ? `${timeObj.hour}:${timeObj.minute.toString().padStart(2, '0')}`
                                        : booking.appointmentTime;
                                   return (
                                        <div key={booking._id} className=" bg-white rounded-2xl border border-gray-100 p-6 shadow-xs hover:shadow-md transition-shadow duration-300">
                                             <div className="mb-5">
                                                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">{booking.doctorName}</h3>
                                                  <p className="text-sm text-[#54bbb8] font-medium mt-0.5">Appointment Confirmed</p>
                                             </div>

                                             <div className="text-sm py-2 border-t border-b border-gray-50 my-4">
                                                  <div className='flex items-center gap-5'>
                                                       <span className="text-sm font-bold text-gray-400">Patient Name :</span>
                                                       <span className="font-medium text-gray-700 " title={booking.patientName}>{booking.patientName}</span>
                                                  </div>
                                                  <div className='flex items-center gap-5'>
                                                       <span className="text-sm font-bold text-gray-400 ">Email :</span>
                                                       <span className="text-gray-600 " title={booking.userEmail}>{booking.userEmail}</span>
                                                  </div>
                                                  <div className='flex items-center gap-5'>
                                                       <span className="text-sm font-bold text-gray-400 ">Gender : </span>
                                                       <span className=" text-gray-700">{booking.gender}</span>
                                                  </div>

                                                  <div className='flex items-center gap-5'>
                                                       <span className="text-sm font-bold text-gray-400 ">Phone</span>
                                                       <span className="text-gray-600">{booking.phone}</span>
                                                  </div>

                                                  <div className="flex gap-5 items-center">
                                                       <span className="text-sm font-bold text-gray-400">Appointment Date</span>
                                                       <span className="text-gray-600" title={booking.appointmentDate}>{booking.appointmentDate}</span>
                                                  </div>
                                                  <div className="flex gap-5 items-center">
                                                       <span className="text-sm font-bold text-gray-400">Appointment Time</span>
                                                       <span className="text-gray-600 " >{formatedTime}</span>
                                                  </div>
                                             </div>

                                             <div className="flex justify-end gap-3 mt-4">
                                                  <button className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                                                       ✏️ Edit
                                                  </button>
                                                  <button className="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100">
                                                       🗑️ Delete
                                                  </button>
                                             </div>
                                        </div>
                                   )
                              }
                         )
)}
               </div>
          </div>
     );
};

export default MyBookings;