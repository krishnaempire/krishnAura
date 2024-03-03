"use client"
const Card = () => {
  return (
    <>
      <div className='w-[22rem] h-[28rem] rounded-lgm   bg-gray-100'>
        <div className='w-full text-white text-center h-[18rem] bg-slate-500 rounded-lg overflow-hidden'>
            <img src="https://images.unsplash.com/photo-1682686580433-2af05ee670ad?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className='mx-4 mt-2'>
            <p className='font-bold text-[1.2rem] w-full'>kdwdjd cfkewj fcjwdkldjeey byrr how kese kyu jfio hello ho  h.</p>
            <div className='flex items-center mt-8'>
                <p className='text-red-500 font-semibold text-[1.1rem]'>-45% off</p>
                <div className='ml-2 rounded-[.9rem] h-[2.4rem] w-[14rem] bg-gray-200 flex items-center justify-evenly '>
                    <p className='text-[1.3rem] font-semibold'>&#8377;{` 499`}</p>
                    <p className='line-through opacity-60 font-medium'>M.R.P: {`800.00`}</p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Card
 