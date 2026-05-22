import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import { MdDomainVerification, MdOutlineCollectionsBookmark } from "react-icons/md";
import { TbClockHour2 } from "react-icons/tb";
import Featured from "./components/Featured";
import Choose from "./components/Choose";
import Feedback from "./components/Feedback";
export const metadata = {
  title: "Doc Appoint | Home",
  description: "A platform to book doctor appointment",
}
export default function Home() {
  const users = [
    {
      id: 1,
      image: "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb",
      name: "John Doe",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5",
      name: "Kate Wilson",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1615109398623-88346a601842",
      name: "Emily Chen",
    },
    {
      id: 4,
      image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
      name: "Michael Brown",
    },
    {
      id: 5,
      image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
      name: "Olivia Davis",
    },
  ];
  return (
    <div className="bg-[#c5f6f439]">
      <div className="max-w-7xl mx-auto pt-10 px-5 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div>
            <div className="flex gap-2 items-center pb-5">
              <div className="flex flex-col gap-6">
                {/* Basic avatar group */}
                <div className="flex -space-x-2">
                  {users.slice(0, 3).map((user) => (
                    <Avatar key={user.id} className=" h-7 w-7 ring-2 ring-background">
                      <Avatar.Image alt={user.name} src={user.image} />
                      <Avatar.Fallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar>
                  ))}
                </div>

              </div>
              <p className="font-medium">Trusted by 10,000+ Patients</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold pb-2">Your Health,</h1>
            <h1 className="text-3xl md:text-5xl font-semibold bg-linear-to-r from-[#01cfbe] to-[#54bbb8] bg-clip-text text-transparent pb-5">Our First Priority</h1>
            <p className="text-sm md:text-md max-w-150 text-gray-500 pb-5">Book appoinments with trusted doctors online. Quick, easy and secure healthcare for you and your family.</p>
            <div className='flex gap-3'>
              <Button className='bg-linear-to-r from-[#01cfbe] to-[#54bbb8]  text-white rounded-md font-semibold'>Book Appoinment</Button>
              <Button className='bg-transparent text-[#54bbb8] border border-[#54bbb8] rounded-md font-semibold' >Learn More</Button>
            </div>
            <div className="flex items-center gap-3 py-5">
              <div className="flex items-center gap-2">
                <MdDomainVerification className="text-[#54bbb8]" />
                <p className="text-sm md:text-md">Verified Doctors</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineCollectionsBookmark className="text-[#54bbb8]" />
                <p className="text-sm md:text-md">Easy Booking</p>
              </div>
              <div className="flex items-center gap-2">
                <TbClockHour2 className="text-[#54bbb8]" />
                <p className="text-sm md:text-md">24/7 Support</p>
              </div>
            </div>
          </div>
          <div>
            <Image src='/doctor-home-01.png' alt="Doctor Image" className="h-75 lg:h-120 w-90 lg:w-190" height={2000} width={2000}></Image>
          </div>
        </div>
        
      </div>
      <Featured />
      <Choose />
      <Feedback/>
    </div>
  );
}
