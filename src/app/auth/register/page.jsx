import React from 'react';
import { Form, TextField, Label, Input, FieldError, Button } from '@heroui/react';
import { MdHealthAndSafety } from 'react-icons/md';


const RegisterPage = () => {
     return (
          <div className='min-h-screen'>
               <Form className="max-w-2xl mx-auto my-20 space-y-4 rounded-lg border border-border bg-surface p-10">
                    <div className='flex justify-center items-center gap-2'>
                                        <div className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] p-1 text-white rounded-md'>
                                             <MdHealthAndSafety className='w-6 h-6' /> 
                                        </div>
                                        <h1 className='font-semibold'>Doc Appoint</h1>
                    </div>
                    <div className='text-center'>
                         <p className='text-gray-400 max-w-80 mx-auto'>Please register your account if you didn't create any account</p>
                    </div>
                    <TextField>
                         <Label className="text-sm font-medium">Name</Label>
                         <Input className="rounded-md border-border/60" placeholder="Enter your name" />
                         <FieldError className="text-xs" />
                    </TextField>
                    <TextField>
                         <Label className="text-sm font-medium">Email</Label>
                         <Input className="rounded-md border-border/60" placeholder="Enter your email" />
                         <FieldError className="text-xs" />
                    </TextField>
                    <TextField>
                         <Label className="text-sm font-medium">Photo Url</Label>
                         <Input className="rounded-md border-border/60" placeholder="Psste your photo url" />
                         <FieldError className="text-xs" />
                    </TextField>
                    <TextField>
                         <Label className="text-sm font-medium">Password</Label>
                         <Input className="rounded-md border-border/60" placeholder="Give a password for security" />
                         <FieldError className="text-xs" />
                    </TextField>
                    <Button type="submit" className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold w-full'>
                         Register
                    </Button>
               </Form>
          </div>
     );
};

export default RegisterPage;