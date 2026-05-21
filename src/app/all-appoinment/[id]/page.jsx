"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import ModalForm from "@/app/components/ModalForm";

export default function DoctorDetailsPage() {
     const { id } = useParams();
     const [doctor, setDoctor] = useState(null);
     const [loading, setLoading] = useState(true);

     

     useEffect(() => {
          fetch(`http://localhost:5000/doctors`)
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#54bbb8]"></div>
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
          <div className="min-h-screen bg-gray-50/50 py-12 px-5 lg:px-8 flex items-center justify-center">
               <div className="max-w-7xl w-full bg-white rounded-3xl shadow-xl border border-gray-100/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">

                    <div className="md:col-span-5 bg-linear-to-b from-cyan-50/30 to-gray-50 relative min-h-87.5 md:min-h-full border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">

                         <div className="absolute inset-0 w-full h-full">
                              <Image
                                   src={doctor.image}
                                   alt={doctor.name}
                                   fill
                                   unoptimized
                                   className="object-cover transition-transform duration-500 hover:scale-105"
                                   priority
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
                         </div>

                         <div className="relative z-10 m-5 mt-auto self-start flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20">
                              <span className="text-amber-500 text-sm">⭐</span>
                              <span className="font-bold text-gray-800 text-sm">{doctor.rating}</span>
                              <span className="text-gray-500 text-xs">({doctor.totalReviews} Reviews)</span>
                         </div>
                    </div>

                    <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6">

                         <div>
                              <span className="text-[#54bbb8] font-semibold text-xs md:text-sm px-3 py-1 bg-cyan-50 rounded-full inline-block mb-2">
                                   {doctor.specialty}
                              </span>
                              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">{doctor.name}</h1>
                              <p className="text-gray-500 text-sm mt-1 font-medium">{doctor.education}</p>
                         </div>

                         <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100">
                              <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
                                   <span className="w-1 h-3.5 bg-[#54bbb8] rounded-full inline-block"></span>
                                   About Biography
                              </h3>
                              <p className="text-gray-600 leading-relaxed text-sm">
                                   {doctor.about || doctor.description}
                              </p>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex items-start gap-3 bg-gray-50/40 p-3 rounded-xl border border-gray-100/50">
                                   <span className="text-xl mt-0.5">🏥</span>
                                   <div>
                                        <h4 className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Chamber Hospital</h4>
                                        <p className="text-xs font-semibold text-gray-700 leading-tight mt-0.5">{doctor.hospital}</p>
                                        <p className="text-[11px] text-gray-500">{doctor.location}</p>
                                   </div>
                              </div>

                              <div className="flex items-start gap-3 bg-gray-50/40 p-3 rounded-xl border border-gray-100/50">
                                   <span className="text-xl mt-0.5">💼</span>
                                   <div>
                                        <h4 className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Experience & Fee</h4>
                                        <p className="text-xs font-semibold text-gray-700 mt-0.5">Experience: {doctor.experience}</p>
                                        <p className="text-sm font-bold text-gray-800 mt-0.5">Fee: ৳ {doctor.fee}</p>
                                   </div>
                              </div>
                         </div>

                         {doctor.specialties && (
                              <div>
                                   <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Specialized In</h4>
                                   <div className="flex flex-wrap gap-1.5">
                                        {doctor.specialties.map((spec, index) => (
                                             <span
                                                  key={index}
                                                  className="bg-[#c3f7f51c] text-[#54bbb8] font-medium text-xs px-3 py-1.5 rounded-lg border border-gray-100"
                                             >
                                                  🎯 {spec}
                                             </span>
                                        ))}
                                   </div>
                              </div>
                         )}

                         <div>
                              <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Chamber Availability</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                   {doctor.availability.map((slot, index) => (
                                        <div key={index} className="flex items-center gap-2.5 p-2.5 bg-[#c9f9f711] rounded-xl border border-[#54bbb8]/30">
                                             <span className="text-base">⏰</span>
                                             <div>
                                                  <p className="text-[10px] text-[#54bbb8] font-bold uppercase tracking-wider">Shift {index + 1}</p>
                                                  <p className="text-xs font-semibold text-gray-700">{slot}</p>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         <div className="pt-2">
                              
                              <ModalForm doctorName={doctor.name} doctorId={doctor.id}
                                   doctorFee={doctor.fee} />
                         </div>

                    </div>
               </div>
          </div>
     );
}