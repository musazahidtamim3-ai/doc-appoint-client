"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function DoctorDetailsPage() {
     const { id } = useParams();
     const [doctor, setDoctor] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          fetch(`http://localhost:3000/doctors.json`)
               .then((res) => res.json())
               .then((data) => {
                    const foundDoctor = data.find((doc) => doc.id === id);
                    setDoctor(foundDoctor);
                    setLoading(false);
               })
               .catch((err) => {
                    console.error("Error fetching doctor details:", err);
                    setLoading(false);
               });
     }, [id]);

     if (loading) {
          return (
               <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
               </div>
          );
     }

     if (!doctor) {
          return (
               <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-800">Doctor Not Found!</h2>
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-gray-50/50 py-10 px-5 lg:px-16">
               <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">


                    <div className="lg:col-span-1">
                         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
                              <div className="flex flex-col items-center text-center">
                                   {/* Image without Next.js built-in optimization to avoid 500 network timeout errors */}
                                   <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        height={200}
                                        width={200}
                                        className="w-36 h-36 rounded-full object-cover  border-3 border-[#54bbb8] mb-4"
                                   />
                                   <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
                                   <p className="text-[#54bbb8] font-semibold text-sm px-3 py-1 bg-cyan-50 rounded-full mt-1">
                                        {doctor.specialty}
                                   </p>
                                   <p className="text-gray-500 text-xs mt-2 font-medium">{doctor.education}</p>

                                   {/* Rating & Reviews */}
                                   <div className="flex items-center gap-1 mt-3 bg-amber-50 px-3 py-1 rounded-lg">
                                        <span className="text-amber-500 text-sm">⭐</span>
                                        <span className="font-bold text-gray-700 text-sm">{doctor.rating}</span>
                                        <span className="text-gray-400 text-xs">({doctor.totalReviews} Reviews)</span>
                                   </div>
                              </div>

                              <hr className="my-5 border-gray-100" />

                              <div className="space-y-4">
                                   <div className="flex items-start gap-3">
                                        <span className="text-xl">🏥</span>
                                        <div>
                                             <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider">Hospital</h4>
                                             <p className="text-sm font-semibold text-gray-700">{doctor.hospital}</p>
                                             <p className="text-xs text-gray-500">{doctor.location}</p>
                                        </div>
                                   </div>

                                   <div className="flex items-center gap-3">
                                        <span className="text-xl">💼</span>
                                        <div>
                                             <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider">Experience</h4>
                                             <p className="text-sm font-semibold text-gray-700">{doctor.experience}</p>
                                        </div>
                                   </div>

                                   <div className="flex items-center gap-3">
                                        <span className="text-xl">💵</span>
                                        <div>
                                             <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider">Consultation Fee</h4>
                                             <p className="text-base font-bold text-gray-800">৳ {doctor.fee}</p>
                                        </div>
                                   </div>
                              </div>

                              <Button className="mt-3 bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold w-full">
                                   Book Appointment Now
                              </Button>
                         </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">

                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                   <span className="w-1 h-5 bg-[#54bbb8] rounded-full inline-block"></span>
                                   About Biography
                              </h3>
                              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                   {doctor.about || doctor.description}
                              </p>
                         </div>

                         {doctor.specialties && (
                              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-[#54bbb8] rounded-full inline-block"></span>
                                        Specialized In
                                   </h3>
                                   <div className="flex flex-wrap gap-2">
                                        {doctor.specialties.map((spec, index) => (
                                             <span
                                                  key={index}
                                                  className="bg-[#c3f7f528] text-[#54bbb8] font-medium text-xs md:text-sm px-4 py-2 rounded-xl transition-colors cursor-default border border-gray-200/40"
                                             >
                                                  🎯 {spec}
                                             </span>
                                        ))}
                                   </div>
                              </div>
                         )}

                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                   <span className="w-1 h-5 bg-[#54bbb8] rounded-full inline-block"></span>
                                   Chamber Availability & Hours
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {doctor.availability.map((slot, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 bg-[#c9f9f722] rounded-xl border border-[#54bbb8]">
                                             <span className="text-xl">⏰</span>
                                             <div>
                                                  <p className="text-xs text-[#54bbb8] font-bold uppercase tracking-wider">Shift {index + 1}</p>
                                                  <p className="text-sm font-semibold text-gray-700 mt-0.5">{slot}</p>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {doctor.experienceHistory && (
                              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                                   <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-[#54bbb8] rounded-full inline-block"></span>
                                        Professional Experience History
                                   </h3>

                                   <div className="relative border-l-2 border-gray-100 pl-6 ml-2 space-y-6">
                                        {doctor.experienceHistory.map((history, index) => (
                                             <div key={index} className="relative">
                                                  {/* Timeline Dot Indicator */}
                                                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#54bbb8] border-4 border-white shadow-sm ring-4 ring-cyan-100/50"></span>

                                                  <span className="text-xs font-semibold text-[#54bbb8] bg-[#bff4f342] px-2.5 py-1 rounded-md">
                                                       {history.period}
                                                  </span>
                                                  <h4 className="text-base font-bold text-gray-800 mt-2">{history.role}</h4>
                                                  <p className="text-sm text-gray-500 mt-0.5">{history.institution}</p>
                                             </div>
                                        ))}
                                   </div>

                              </div>
                         )}

                    </div>
               </div>
          </div>
     );
}