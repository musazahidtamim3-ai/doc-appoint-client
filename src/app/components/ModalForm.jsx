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

          console.log("Submitting Booking Data:", bookingData);

          try {
               const res = await fetch('http://localhost:5000/bookings', {
                    method: "POST",
                    headers: {
                         "content-type": "application/json",
                         'Authorization': `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify(bookingData)
               });

               // ১. অথেন্টিকেশন এরর হ্যান্ডেল করা
               if (res.status === 401 || res.status === 403) {
                    toast.error("Session expired or unauthorized! Please login again.");
                    return;
               }

               // ২. সেফটি চেক: রেসপন্স যদি JSON না হয়ে অন্য কিছু (HTML/Text) হয়, যেন ক্র্যাশ না করে
               if (!res.ok) {
                    const errorText = await res.text();
                    console.error("Backend Error Response:", errorText);
                    toast.error("Server rejected the request! Check console.");
                    return;
               }

               // ৩. রেসপন্স OK আসলেই কেবল JSON পার্স হবে
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

                                                  <TextField className="w-full" name="email" type="email" variant="secondary">
                                                       <Label>User E-mail</Label>
                                                       <Input placeholder="Enter your email" className='bg-gray-50' {...register("email", { required: true })} />
                                                       {errors.email && <p className='text-red-500 text-sm'>This field is required</p>}
                                                  </TextField>

                                                  <TextField className="w-full" name="doctor" variant="secondary">
                                                       <Label>Doctor name</Label>
                                                       <Input value={doctorName} className='bg-gray-50' readOnly {...register("doctor")} />
                                                  </TextField>

                                                  <TextField className="w-full" name="name" type="text" variant="secondary">
                                                       <Label>Patient name</Label>
                                                       <Input placeholder="Enter your name" className='bg-gray-50' {...register("name", { required: true })} />
                                                       {errors.name && <p className='text-red-500 text-sm'>This field is required</p>}
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
                                                                 <Select.Popover>
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
                                                       {errors.phone && <p className='text-red-500 text-sm'>This field is required</p>}
                                                  </TextField>

                                                  <Controller
                                                       name="date"
                                                       control={control}
                                                       rules={{ required: true }}
                                                       render={({ field: { onChange, value } }) => (
                                                            <DateField className="w-full" value={value} onChange={onChange}>
                                                                 <Label>Appointment date</Label>
                                                                 <DateField.Group>
                                                                      <DateField.Input className="bg-gray-50">
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
                                                                 <TimeField.Group>
                                                                      <TimeField.Input className='bg-gray-50'>
                                                                           {(segment) => <TimeField.Segment segment={segment} />}
                                                                      </TimeField.Input>
                                                                 </TimeField.Group>
                                                                 {errors.time && <p className='text-red-500 text-sm mt-1'>This field is required</p>}
                                                            </TimeField>
                                                       )}
                                                  />

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