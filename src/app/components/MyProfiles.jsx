"use client"
import { useSession } from '@/lib/auth-client';
import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const MyProfiles = () => {
     const { data: session, isPending } = useSession();
     const user = session?.user;

     const { register, handleSubmit, formState: { errors } } = useForm({
          values: {
               name: user?.name || "",
               phone: user?.phone || ""
          }
     });

     const handleUpdate = async (data) => {
          console.log("Updated Data:", data);
          try {
               toast.success("Profile updated successfully!");
          } catch (error) {
               console.error(error);
               toast.error("Something went wrong!");
          }
     };

     if (isPending) {
          return (
               <div className="flex h-64 items-center justify-center">
                    <p className='animate-pulse text-[#54bbb8] font-semibold tracking-wide'>
                         Loading Profile...
                    </p>
               </div>
          );
     }

     return (
          <div className="max-w-md mx-auto my-12">
               <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 p-8 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-[#01cfbe]/10 to-transparent -z-10" />

                    <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-md mb-6 ring-4 ring-[#54bbb8]/20 group transition-transform duration-300 hover:scale-105">
                         <Image 
                              src={user?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} 
                              alt='Profile' 
                              fill 
                              className='rounded-full object-cover' 
                         />
                    </div>

                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">{user?.name || "Anonymous User"}</h1>
                    <p className="text-sm font-medium text-gray-400 mt-1 mb-6">{user?.email}</p>

                    <Modal>
                         <Button
                              className="w-full bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white font-bold rounded-md shadow-lg shadow-[#54bbb8]/20 hover:opacity-90 transition-opacity"
                         >
                              Update Information
                         </Button>

                         <Modal.Backdrop>
                              <Modal.Container>
                                   <Modal.Dialog className="max-w-2xl rounded-xl p-10">
                                        <Modal.CloseTrigger />
                                        
                                        <Modal.Header className="pb-2">
                                             <Modal.Heading className='text-[#54bbb8] text-xl font-bold tracking-tight'>
                                                  Edit Profile
                                             </Modal.Heading>
                                             <p className="text-xs text-gray-400 mt-1">
                                                  Update your personal details below.
                                             </p>
                                        </Modal.Header>

                                        <Modal.Body className="py-4">
                                             <Surface variant="default">
                                                  <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-5">
                                                       
                                                       <TextField className="w-full" variant="secondary">
                                                            <Label className="text-xs font-bold text-gray-500  mb-1">Full Name</Label>
                                                            <Input 
                                                                 placeholder="Enter your name" 
                                                                 className='bg-gray-50 border-0 focus:ring-2 focus:ring-[#54bbb8]/20 rounded-xl'
                                                                 {...register("name", { required: true })} 
                                                            />
                                                            {errors.name && <p className='text-red-500 text-xs mt-1'>Name is required</p>}
                                                       </TextField>

                                                       <TextField className="w-full" variant="secondary">
                                                            <Label className="text-xs font-bold text-gray-500 mb-1">Photo URL</Label>
                                                            <Input 
                                                                 placeholder="Enter your phone number" 
                                                                 className='bg-gray-50 border-0 focus:ring-2 focus:ring-[#54bbb8]/20 rounded-xl'
                                                                 {...register("phone")} 
                                                            />
                                                       </TextField>

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
               </div>
          </div>
     );
};

export default MyProfiles;