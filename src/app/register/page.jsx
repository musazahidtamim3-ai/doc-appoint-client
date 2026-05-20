"use client"
import React from 'react';
import { Icon } from "@iconify/react";
import { Form, TextField, Label, Input, FieldError, Button } from '@heroui/react';
import { MdHealthAndSafety } from 'react-icons/md';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const RegisterPage = () => {
     const { register, handleSubmit, formState: { errors } } = useForm();
          const handleRegisterFunc = async(data) => {
               const { name, email, photo, password } = data;
               const { data: res, error } = await authClient.signUp.email({
                    name:name,
                    email: email,
                    photo:photo,
                    password: password,
                    callbackURL: '/'
               });
               if (error) {
                    toast.error(error.message)
               }
               if (res) {
                    toast.success("Register successfull !")
               }
          }
          const googleSignIn = async () => {
               try {
                    await authClient.signIn.social({
                         provider: "google",
                         callbackURL: '/login'
                    });
               } catch (error) {
                    console.error("Google Sign-In Error:", error);
                    alert("Google login failed. Please try again.");
               }
          }
     return (
          <div className='min-h-screen '>
               <Form onSubmit={handleSubmit(handleRegisterFunc)} className="max-w-2xl mx-auto my-20 space-y-4 rounded-lg border border-border bg-surface p-10">
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
                         <Input className="rounded-md border-border/60" placeholder="Enter your name" {...register("name", { required: true })} />
                         {errors.name && <p className='text-red-500'>This field is required</p>}
                    </TextField>
                    <TextField>
                         <Label className="text-sm font-medium">Email</Label>
                         <Input className="rounded-md border-border/60" placeholder="Enter your email" {...register("email", { required: true })} />
                         {errors.email && <p className='text-red-500'>This field is required</p>}
                         <FieldError className="text-xs" />
                    </TextField>
                    <TextField>
                         <Label className="text-sm font-medium">Photo Url</Label>
                         <Input className="rounded-md border-border/60" placeholder="Psste your photo url"/>
                         <FieldError className="text-xs" />
                    </TextField>
                    <TextField>
                         <Label className="text-sm font-medium">Password</Label>
                         <Input className="rounded-md border-border/60" placeholder="Give a password for security" {...register("password", { required: true })} />
                         {errors.password && <p className='text-red-500'>This field is required</p>}
                         <FieldError className="text-xs" />
                    </TextField>
                    <Button type="submit" className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold w-full'>
                         Register
                    </Button>
                    <div class="relative flex py-1 items-center">
                         <div class="grow border-t border-gray-300"></div>
                         <span class="shrink mx-4 text-gray-400">OR</span>
                         <div class="grow border-t border-gray-300"></div>
                    </div>
                    <Button onClick={googleSignIn} className="w-full rounded-md bg-white hover:bg-gray-100 border text-black" >
                         <Icon icon="devicon:google" />
                         Sign Up with Google
                    </Button>
                    <div className='flex justify-center text-sm items-center gap-3'>
                         <p className='text-gray-400'>Already have an account?</p>
                         <Link href={'/auth/register'}><p className='text-red-500'>Login</p></Link>
                    </div>
               </Form>
          </div>
     );
};

export default RegisterPage;