import { AlertDialog, Button, DateField, Input, Label, Modal, Surface, TextField, TimeField } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

const MyBookings = () => {
     const [bookings, setBookings] = useState([]);
     const [loading, setLoading] = useState(true);
     const { register, handleSubmit, control, formState: { errors } } = useForm();
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
     const deleteData = async (id) => {
          const res = await fetch(`http://localhost:5000/bookings/${id}`, {
               method: "DELETE",
               headers: {
                    "content-type": "application/json"
               }
          });
          const data = await res.json();
          if (data.deletedCount > 0) {
               setBookings(bookings.filter(booking => booking._id !== id));
          }
          toast.success("Appointment deleted successfully!");
     }
     const handleEdit = async (id, updatedData) => {
               const res = await fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "PATCH", 
                    headers: {
                         "content-type": "application/json"
                    },
                    body: JSON.stringify(updatedData)
               });

               const data = await res.json();

               if (data.modifiedCount > 0) {
                    setBookings(bookings.map(booking =>
                              booking._id === id ? [ ...booking, ...updatedData ] : booking
                         )
                    );
                    toast.success("Appointment updated successfully!");
               }
     };
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
                                             <Modal>
                                                  <Modal.Trigger>
                                                       <button className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 flex items-center gap-2 cursor-pointer">
                                                            <FiEdit3 className='h-4 w-4' /> Edit
                                                       </button>
                                                  </Modal.Trigger>
                                                  <Modal.Backdrop>
                                                       <Modal.Container>
                                                            <Modal.Dialog className="max-w-2xl rounded-xl p-10">
                                                                 <Modal.CloseTrigger />

                                                                 <Modal.Header className="pb-2">
                                                                      <Modal.Heading className='text-[#54bbb8] text-xl font-bold tracking-tight'>
                                                                           Edit appoinment
                                                                      </Modal.Heading>
                                                                      <p className="text-xs text-gray-400 mt-1">
                                                                           Update your appoinment information below.
                                                                      </p>
                                                                 </Modal.Header>

                                                                 <Modal.Body className="py-4">
                                                                      <Surface variant="default">
                                                                           <form onSubmit={handleSubmit((data) => handleEdit(booking._id, data))} className="flex flex-col gap-5">

                                                                                <TextField className="w-full" variant="secondary">
                                                                                     <Label className="text-xs font-bold text-gray-500  mb-1">phone</Label>
                                                                                     <Input
                                                                                          placeholder="Enter your phone number"
                                                                                          className='bg-gray-50 border-0 focus:ring-2 focus:ring-[#54bbb8]/20 rounded-xl'
                                                                                          {...register("phone", { required: true })}
                                                                                     />
                                                                                     {errors.phone && <p className='text-red-500 text-xs mt-1'>Phone is required</p>}
                                                                                </TextField>

                                                                                <TextField className="w-full" variant="secondary">
                                                                                     <Label className="text-xs font-bold text-gray-500 mb-1">User E-mail</Label>
                                                                                     <Input
                                                                                          placeholder="Enter your email"
                                                                                          className='bg-gray-50 border-0 focus:ring-2 focus:ring-[#54bbb8]/20 rounded-xl'
                                                                                          {...register("email")}
                                                                                     />
                                                                                </TextField>
                                                                                <Controller
                                                                                     name="date"
                                                                                     control={control}
                                                                                     rules={{ required: true }}
                                                                                     render={({ field: { onChange, value } }) => (
                                                                                          <DateField
                                                                                               className="w-full"
                                                                                               value={value}
                                                                                               onChange={onChange}
                                                                                          >
                                                                                               <Label>Appointment date</Label>
                                                                                               <DateField.Group>
                                                                                                    <DateField.Input className="bg-gray-50">
                                                                                                         {(segment) => <DateField.Segment segment={segment} />}
                                                                                                    </DateField.Input>
                                                                                               </DateField.Group>
                                                                                               {errors.date && (
                                                                                                    <p className='text-red-500 text-sm mt-1'>This field is required</p>
                                                                                               )}
                                                                                          </DateField>
                                                                                     )}
                                                                                />
                                                                                <Controller
                                                                                     name="time"
                                                                                     control={control}
                                                                                     rules={{ required: true }}
                                                                                     render={({ field: { onChange, value } }) => (
                                                                                          <TimeField className="w-full" name="time" value={value}
                                                                                               onChange={onChange}>
                                                                                               <Label>Appointment time</Label>
                                                                                               <TimeField.Group>
                                                                                                    <TimeField.Input className='bg-gray-50'>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
                                                                                               </TimeField.Group>
                                                                                          </TimeField>
                                                                                     )}
                                                                                />

                                                                                <Modal.Footer className="p-0 mt-2">
                                                                                     <Button
                                                                                          className='w-full rounded-md bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white font-bold'
                                                                                          type='submit'
                                                                                     >
                                                                                          Save Changes
                                                                                     </Button>
                                                                                </Modal.Footer>
                                                                           </form>
                                                                      </Surface>
                                                                 </Modal.Body>
                                                            </Modal.Dialog>
                                                       </Modal.Container>
                                                  </Modal.Backdrop>
                                             </Modal>
                                                  
                                                  <AlertDialog>
                                                  <AlertDialog.Trigger>
                                                       <button className="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 flex items-center gap-2 cursor-pointer">
                                                            <RiDeleteBin6Line className='w-4 h-4' /> Delete Appointment
                                                       </button>
                                                  </AlertDialog.Trigger>
                                                  <AlertDialog.Backdrop>
                                                       <AlertDialog.Container>
                                                            <AlertDialog.Dialog className="max-w-lg">
                                                                 <AlertDialog.CloseTrigger />
                                                                 <AlertDialog.Header>
                                                                      <AlertDialog.Icon status="danger" />
                                                                      <AlertDialog.Heading>Delete appoinment permanently?</AlertDialog.Heading>
                                                                 </AlertDialog.Header>
                                                                 <AlertDialog.Body>
                                                                      <p>
                                                                           This will permanently delete appoinment for <strong>{booking.doctorName}</strong>. This action cannot be undone.
                                                                      </p>
                                                                 </AlertDialog.Body>
                                                                 <AlertDialog.Footer>
                                                                      <button onClick={() => deleteData(booking._id)} className="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 flex items-center gap-2 cursor-pointer">
                                                                           <RiDeleteBin6Line className='w-4 h-4' /> Delete
                                                                      </button>
                                                                 </AlertDialog.Footer>
                                                            </AlertDialog.Dialog>
                                                       </AlertDialog.Container>
                                                  </AlertDialog.Backdrop>
                                             </AlertDialog>

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