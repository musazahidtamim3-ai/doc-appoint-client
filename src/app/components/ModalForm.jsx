"use client"
import React from 'react';
import { Button, DateField, Input, Label, ListBox, Modal, Surface, TextField, Select, TimeField } from "@heroui/react";
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const ModalForm = ({ doctorName }) => {
     const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
          defaultValues: {
               doctor: doctorName || "Selected Doctor"
          }
     });

     const handleTableData = async (data) => {
          const { data: tokenData } = await authClient.token();

          if (!tokenData?.token) {
               toast.error("Please login first to book an appointment!");
               return;
          }

          const formatedDate = data.date ? data.date.toString() : "";
          const formatedTime = data.time ? data.time.toString() : "";

          const bookingData = {
               userEmail: data.email,
               doctorName: data.doctor,
               patientName: data.name,
               gender: data.gender,
               phone: data.phone,
               appointmentDate: formatedDate,
               appointmentTime: formatedTime
          };

          try {
               const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
                    method: "POST",
                    headers: {
                         "content-type": "application/json",
                         'Authorization': `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify(bookingData)
               });

               if (res.status === 401 || res.status === 403) {
                    toast.error("Session expired or unauthorized! Please login again.");
                    return;
               }
               if (!res.ok) {
                    toast.error("Server rejected the request! Check console.");
                    return;
               }

               const responseData = await res.json();

               if (res.ok) {
                    toast.success("Appointment booked successfully!");
                    reset();
               } else {
                    toast.error(responseData.message || "Something went wrong. Please try again.");
               }
          } catch (error) {
               console.error("Fetch error:", error);
               toast.error("Failed to connect to server!");
          }
     };

     return (
          <div className="w-full">
               <Modal>
                    <Button
                         className="w-full bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white font-bold rounded-md py-3"
                    >
                         Book Appointment Now
                    </Button>
                    <Modal.Backdrop>
                         <Modal.Container placement="auto" className="flex items-center justify-center p-4">
                              <Modal.Dialog className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl my-auto">
                                   <Modal.CloseTrigger />

                                   <Modal.Header className="p-4 sm:p-6 pb-2">
                                        <Modal.Heading className='text-[#54bbb8] text-xl font-semibold'>Confirm Your Booking</Modal.Heading>
                                        <p className="text-sm leading-relaxed text-muted mt-2">
                                             Fill out the form below and confirm your booking. We will contact you soon.
                                        </p>
                                   </Modal.Header>
                                   <Modal.Body className="p-4 sm:p-6 pt-0 max-h-[70vh] overflow-y-auto overflow-x-hidden">
                                        <Surface variant="default" className="border-0 p-0 bg-transparent">
                                             <form onSubmit={handleSubmit(handleTableData)} className="flex flex-col gap-4">

                                                  <TextField className="w-full" name="email" type="email" variant="secondary">
                                                       <Label>User E-mail</Label>
                                                       <Input placeholder="Enter your email" className='bg-gray-50' {...register("email", { required: true })} />
                                                       {errors.email && <p className='text-red-500 text-sm mt-1'>This field is required</p>}
                                                  </TextField>

                                                  <TextField className="w-full" name="doctor" variant="secondary">
                                                       <Label>Doctor name</Label>
                                                       <Input value={doctorName} className='bg-gray-50' readOnly {...register("doctor")} />
                                                  </TextField>

                                                  <TextField className="w-full" name="name" type="text" variant="secondary">
                                                       <Label>Patient name</Label>
                                                       <Input placeholder="Enter your name" className='bg-gray-50' {...register("name", { required: true })} />
                                                       {errors.name && <p className='text-red-500 text-sm mt-1'>This field is required</p>}
                                                  </TextField>

                                                  <Controller
                                                       name="gender"
                                                       control={control}
                                                       rules={{ required: true }}
                                                       render={({ field: { onChange, value } }) => (
                                                            <Select selectedKey={value} onSelectionChange={onChange} className="w-full" placeholder="Select one">
                                                                 <Label>Gender</Label>
                                                                 <Select.Trigger>
                                                                      <Select.Value />
                                                                      <Select.Indicator />
                                                                 </Select.Trigger>
                                                                 <Select.Popover className="max-w-lg">
                                                                      <ListBox>
                                                                           <ListBox.Item id="male" textValue="Male">Male <ListBox.ItemIndicator /></ListBox.Item>
                                                                           <ListBox.Item id="female" textValue="Female">Female <ListBox.ItemIndicator /></ListBox.Item>
                                                                           <ListBox.Item id="custom" textValue="Custom">Custom <ListBox.ItemIndicator /></ListBox.Item>
                                                                      </ListBox>
                                                                 </Select.Popover>
                                                                 {errors.gender && <p className='text-red-500 text-sm mt-1'>Gender is required</p>}
                                                            </Select>
                                                       )}
                                                  />

                                                  <TextField className="w-full" name="phone" type="tel" variant="secondary">
                                                       <Label>Phone</Label>
                                                       <Input placeholder="Enter your phone number" className='bg-gray-50' {...register("phone", { required: true })} />
                                                       {errors.phone && <p className='text-red-500 text-sm mt-1'>This field is required</p>}
                                                  </TextField>
                                                  <Controller
                                                       name="date"
                                                       control={control}
                                                       rules={{ required: true }}
                                                       render={({ field: { onChange, value } }) => (
                                                            <DateField className="w-full" value={value} onChange={onChange}>
                                                                 <Label>Appointment date</Label>
                                                                 <DateField.Group className="w-full flex">
                                                                      <DateField.Input className="bg-gray-50 w-full flex">
                                                                           {(segment) => <DateField.Segment segment={segment} />}
                                                                      </DateField.Input>
                                                                 </DateField.Group>
                                                                 {errors.date && <p className='text-red-500 text-sm mt-1'>This field is required</p>}
                                                            </DateField>
                                                       )}
                                                  />

                                                  <Controller
                                                       name="time"
                                                       control={control}
                                                       rules={{ required: true }}
                                                       render={({ field: { onChange, value } }) => (
                                                            <TimeField className="w-full" name="time" value={value} onChange={onChange}>
                                                                 <Label>Appointment time</Label>
                                                                 <TimeField.Group className="w-full flex">
                                                                      <TimeField.Input className='bg-gray-50 w-full flex'>
                                                                           {(segment) => <TimeField.Segment segment={segment} />}
                                                                      </TimeField.Input>
                                                                 </TimeField.Group>
                                                                 {errors.time && <p className='text-red-500 text-sm mt-1'>This field is required</p>}
                                                            </TimeField>
                                                       )}
                                                  />

                                                  <Modal.Footer className="px-0 pt-2 w-full">
                                                       <Button className='w-full rounded-md bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white font-bold py-3' type='submit'>
                                                            Confirm Booking
                                                       </Button>
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