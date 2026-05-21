"use client"
import React from 'react';
import { Button, DateField, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ModalForm = ({ doctorName }) => {
     const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
          defaultValues: {
               doctor: doctorName || "Selected Doctor"
          }
     });
     
     const handleTableData = async (data) => {
          const formatedDate = data.date ? data.date.toString() : "";

          const bookingData = {
               doctor: data.doctor,
               name: data.name,
               email: data.email,
               phone: data.phone,
               date: formatedDate,
               reason: data.reason
          };

          console.log("Submitting Booking Data:", bookingData);

          try {
               const res = await fetch('http://localhost:5000/bookings', {
                    method: "POST",
                    headers: {
                         "content-type": "application/json"
                    },
                    body: JSON.stringify(bookingData)
               });

               const responseData = await res.json();

               if (responseData.insertedId) {
                    toast.success(`Booked successfully for ${doctorName}`);
                    reset();
               } else {
                    toast.error("Something went wrong. Please try again.");
               }
          } catch (error) {
               console.error("Fetch error:", error);
               toast.error("Failed to connect to server!");
          }
     };
     return (
          <div>
               <Modal>
                    <Button
                         className="w-full bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white font-bold rounded-md py-3"
                    >
                         Book Appointment Now
                    </Button>
                    <Modal.Backdrop>
                         <Modal.Container placement="auto">
                              <Modal.Dialog className="max-w-lg">
                                   <Modal.CloseTrigger />
                                   <Modal.Header>

                                        <Modal.Heading className='text-[#54bbb8] text-xl font-semibold'>Confirm Your Booking</Modal.Heading>
                                        <p className="text-sm leading-5 text-muted">
                                             Fill out the form below and confirm your booking. We will contact you soon. For more information, you can contact us by our email.
                                        </p>
                                   </Modal.Header>
                                   <Modal.Body className="py-3">
                                        <Surface variant="default">
                                             <form onSubmit={handleSubmit(handleTableData)} className="flex flex-col gap-4">
                                                  <TextField className="w-full" name="doctor" variant="secondary">
                                                       <Label>Doctor name</Label>
                                                       <Input value={doctorName} className='bg-gray-50' />
                                                  </TextField>
                                                  <TextField className="w-full" name="name" type="text" variant="secondary">
                                                       <Label>Patient name</Label>
                                                       <Input placeholder="Enter your name" className='bg-gray-50' {...register("name", { required: true })} />
                                                       {errors.name && <p className='text-red-500 text-sm'>This field is required</p>}
                                                  </TextField>
                                                  <TextField className="w-full" name="email" type="email" variant="secondary">
                                                       <Label>Email</Label>
                                                       <Input placeholder="Enter your email" className='bg-gray-50'{...register("email", { required: true })} />
                                                       {errors.email && <p className='text-red-500 text-sm'>This field is required</p>}
                                                  </TextField>
                                                  <TextField className="w-full" name="phone" type="tel" variant="secondary">
                                                       <Label>Phone</Label>
                                                       <Input placeholder="Enter your phone number" className='bg-gray-50' {...register("phone", { required: true })} />
                                                       {errors.phone && <p className='text-red-500 text-sm'>This field is required</p>}
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
                                                                 <Label>Booking date</Label>
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
                                                  <TextField className="w-full" name="reason">
                                                       <Label>Reason</Label>
                                                       <Input placeholder="Enter your reason for book doctor" className='bg-gray-50' {...register("reason", { required: true })} />
                                                       {errors.reason && <p className='text-red-500 text-sm'>This field is required</p>}
                                                  </TextField>
                                                  <Modal.Footer>

                                                       <Button className='rounded-md bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white font-bold' type='submit'>Confirm Booking</Button>
                                                  </Modal.Footer>
                                             </form>
                                        </Surface>
                                   </Modal.Body>

                              </Modal.Dialog>
                         </Modal.Container>
                    </Modal.Backdrop>
               </Modal>
          </div>
     );
};

export default ModalForm;