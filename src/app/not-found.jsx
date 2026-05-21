"use client"
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
     return (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
               <div className="max-w-md w-full text-center space-y-6">
                    <div className="flex justify-center">
                         <h1 className="text-9xl font-black text-[#54bbb8]/20 tracking-tighter select-none">
                              404
                         </h1>
                         
                    </div>

                    <div className="space-y-2">
                         <h2 className="text-xl font-bold text-gray-700 tracking-tight">
                              Oops! Page not found.
                         </h2>
                         <p className="text-sm text-gray-500 max-w-xs mx-auto">
                              The page you are looking for doesn't exist or has been moved to another URL.
                         </p>
                    </div>

                    {/* ব্যাক টু হোম বাটন */}
                    <div className="pt-4">
                         <Link
                              href="/"
                              className="inline-block px-8 py-2 bg-linear-to-r from-[#01cfbe] to-[#54bbb8] text-white font-bold rounded-xl shadow-lg shadow-[#54bbb8]/20 hover:opacity-90 cursor-pointer"
                         >
                              Back to Home
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default NotFound;