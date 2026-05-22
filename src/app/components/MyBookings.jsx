import { AlertDialog, Button } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
export const metadata = {
  title: "Doc Appoint | my bookings",
  description: "A platform to book doctor appointment",
}

const MyBookings = () => {
     const [bookings, setBookings] = useState([]);
     const [loading, setLoading] = useState(true);
     const [editBooking, setEditBooking] = useState(null); 

     const { register, handleSubmit, reset } = useForm();

     useEffect(() => {
          fetch('http://localhost:5000/bookings')
               .then(res => res.json())
               .then(data => {
                    setBookings(data);
                    setLoading(false);
               })
               .catch(err => {
                    console.log(err);
                    setLoading(false);
               });
     }, []);

     if (loading) {
          <div className="flex justify-center items-center min-h-screen">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#54bbb8]"></div>
          </div>
     }

     const handleDelete = async (id) => {
          const res = await fetch(`http://localhost:5000/bookings/${id}`, {
               method: "DELETE"
          });
          const data = await res.json();

          if (data.deletedCount > 0) {
               setBookings(bookings.filter(b => b._id !== id));
               toast.success("Appointment deleted successfully!");
          }
     };

     const handleUpdate = async (data) => {
          const updatedInfo = {
               phone: data.phone,
               userEmail: data.userEmail,
               appointmentDate: data.appointmentDate,
               appointmentTime: data.appointmentTime
          };

          const res = await fetch(`http://localhost:5000/bookings/${editBooking._id}`, {
               method: "PATCH",
               headers: { "content-type": "application/json" },
               body: JSON.stringify(updatedInfo)
          });

          const resData = await res.json();

          if (resData.modifiedCount > 0) {
               setBookings(bookings.map(b => b._id === editBooking._id ? { ...b, ...updatedInfo } : b));
               toast.success("Appointment updated successfully!");
               setEditBooking(null); 
          }
     };

     const openEdit = (booking) => {
          setEditBooking(booking);
          reset({
               phone: booking.phone,
               userEmail: booking.userEmail,
               appointmentDate: booking.appointmentDate,
               appointmentTime: typeof booking.appointmentTime === 'object' ? '' : booking.appointmentTime
          });
     };

     return (
          <div className="my-10 ">
               <h2 className="text-xl font-bold mb-6">My Bookings ({bookings.length})</h2>

               <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {bookings.map(booking => (
                         <div key={booking._id} className="bg-white rounded-xl border p-6 shadow-sm">
                              <h3 className="text-lg font-bold text-gray-800">{booking.doctorName}</h3>
                              <p className="text-xs text-teal-600 font-medium mb-3">Confirmed</p>

                              <div className="text-sm space-y-1 text-gray-600 border-t pt-3">
                                   <p><strong>Patient:</strong> {booking.patientName}</p>
                                   <p><strong>Email:</strong> {booking.userEmail}</p>
                                   <p><strong>Phone:</strong> {booking.phone}</p>
                                   <p><strong>Date:</strong> {booking.appointmentDate}</p>
                                   <p><strong>Time:</strong> {typeof booking.appointmentTime === 'object' ? `${booking.appointmentTime.hour}:${booking.appointmentTime.minute}` : booking.appointmentTime}</p>
                              </div>

                              <div className="flex justify-end gap-2 mt-4">
                                   <button onClick={() => openEdit(booking)} className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-1 cursor-pointer">
                                        <FiEdit3 /> Update
                                   </button>
                                   <AlertDialog>
                                        <AlertDialog.Trigger>
                                             <button className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 rounded flex items-center gap-1 cursor-pointer">
                                                  <RiDeleteBin6Line /> Delete
                                             </button>
                                        </AlertDialog.Trigger>

                                        <AlertDialog.Backdrop>
                                             <AlertDialog.Container>
                                                  <AlertDialog.Dialog className="max-w-xl">

                                                       <AlertDialog.CloseTrigger />

                                                       <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger" />
                                                            <AlertDialog.Heading>
                                                                 Delete appointment permanently?
                                                            </AlertDialog.Heading>
                                                       </AlertDialog.Header>

                                                       <AlertDialog.Body>
                                                            <p>
                                                                 This will permanently delete appointment for
                                                                 <strong> {booking.doctorName}</strong>.
                                                            </p>
                                                       </AlertDialog.Body>

                                                       <AlertDialog.Footer>
                                                            <button
                                                                 onClick={() => handleDelete(booking._id)}
                                                                 className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 rounded flex items-center gap-1 cursor-pointer"
                                                            >
                                                                 <RiDeleteBin6Line /> Delete
                                                            </button>
                                                       </AlertDialog.Footer>

                                                  </AlertDialog.Dialog>
                                             </AlertDialog.Container>
                                        </AlertDialog.Backdrop>
                                   </AlertDialog>
                              </div>
                         </div>
                    ))}
               </div>

               {editBooking && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                         <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-lg">
                              <h3 className="text-lg font-bold mb-4 text-teal-600">Edit Appointment</h3>

                              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                                   <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1">Phone</label>
                                        <input {...register("phone", { required: true })} className="w-full border p-2 rounded-lg text-sm bg-gray-50" />
                                   </div>

                                   <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1">Email</label>
                                        <input {...register("userEmail", { required: true })} className="w-full border p-2 rounded-lg text-sm bg-gray-50" />
                                   </div>

                                   <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1">Date</label>
                                        <input type="date" {...register("appointmentDate", { required: true })} className="w-full border p-2 rounded-lg text-sm bg-gray-50" />
                                   </div>

                                   <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1">Time</label>
                                        <input type="time" {...register("appointmentTime", { required: true })} className="w-full border p-2 rounded-lg text-sm bg-gray-50" />
                                   </div>

                                   <div className="flex justify-end gap-2 pt-2">
                                        <button type="button" onClick={() => setEditBooking(null)} className="px-4 py-2 text-xs font-semibold bg-gray-100 rounded-lg">
                                             Cancel
                                        </button>
                                        <button type="submit" className="px-4 py-2 text-xs font-semibold bg-teal-600 text-white rounded-lg">
                                             Save Changes
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default MyBookings;