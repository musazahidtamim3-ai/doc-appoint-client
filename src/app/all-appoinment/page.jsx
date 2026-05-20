import AllDoctors from '../components/AllDoctors';

const AllAppoinmentPage = async () => {
     const res = await fetch('http://localhost:3000/doctors.json')
     const doctors = await res.json()

     return (
          <div className='bg-white'>
               <div className='max-w-7xl mx-auto py-20 px-5 lg:px-0'>
                    <div className='text-center'>
                         <h1 className='text-4xl font-semibold pb-2'>All of Our <span className='text-[#54bbb8]'>Doctors</span></h1>
                         <p>Our all qualified and experienced doctors ready to help you</p>
                    </div>
                    <AllDoctors doctors={doctors} />


               </div>
          </div>
     );
};

export default AllAppoinmentPage;