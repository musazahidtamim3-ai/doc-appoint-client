import React from 'react';
import { Icon } from "@iconify/react";
import { Form, TextField, Label, Input, FieldError, Button } from '@heroui/react';
import { MdHealthAndSafety } from 'react-icons/md';
import Link from 'next/link';

const LoginPage = () => {
     return (
          <div className='min-h-screen '>
                         <Form className="max-w-2xl mx-auto my-20 space-y-4 rounded-lg border border-border bg-surface p-10">
                              <div className='flex justify-center items-center gap-2'>
                                                  <div className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8] p-1 text-white rounded-md'>
                                                       <MdHealthAndSafety className='w-6 h-6' /> 
                                                  </div>
                                                  <h1 className='font-semibold'>Doc Appoint</h1>
                              </div>
                              <div className='text-center'>
                                   <p className='text-gray-400 max-w-80 mx-auto'>Please login your account if you have already an account</p>
                              </div>
                              <TextField>
                                   <Label className="text-sm font-medium">Email</Label>
                                   <Input className="rounded-md border-border/60" placeholder="Enter your email" />
                                   <FieldError className="text-xs" />
                              </TextField>
                              <TextField>
                                   <Label className="text-sm font-medium">Password</Label>
                                   <Input className="rounded-md border-border/60" placeholder="Give a password for security" />
                                   <FieldError className="text-xs" />
                              </TextField>
                              <Button type="submit" className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold w-full'>
                                   Login
                              </Button>
                              <div class="relative flex py-1 items-center">
                                   <div class="grow border-t border-gray-300"></div>
                                   <span class="shrink mx-4 text-gray-400">OR</span>
                                   <div class="grow border-t border-gray-300"></div>
                              </div>
                              <Button className="w-full rounded-md bg-white hover:bg-gray-100 border text-black" >
                                   <Icon icon="devicon:google" />
                                   Sign in with Google
                    </Button>
                    <div className='flex justify-center text-sm items-center gap-3'>
                         <p className='text-gray-400'>Don't have any account?</p>
                         <Link href={'/auth/register'}><p className='text-red-500'>Register</p></Link>
                    </div>
                         </Form>
                    </div>
     );
};

export default LoginPage;