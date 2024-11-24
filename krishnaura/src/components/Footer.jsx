import KA from "../../public/KA.png"
import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (

    // <section className="overflow-hidden bg-[#1A2A6C] w-full py-8">
    //   <div className="container  z-10 mx-auto px-4">
    //     <div className="-m-8 flex flex-wrap items-center justify-between">
    //       <div className="w-auto flex items-center md:block p-8">

    //         <Link href="/" className="font-bold Link-inherit">
    //           <Image src={KA} alt="" className="md:w-[12rem] md:h-[5rem] w-[9rem] h-[4rem]" />
    //         </Link>
           
    //       </div>
    //       <div className="w-auto  p-8">
    //         <ul className="-m-5 flex flex-wrap items-center justify-center">
    //           <li className="p-5">
    //             <Link className="font-medium text-[#F4E1D2] hover:text-[#F4E1D2]" href="privacy-policy">
    //               Privacy Policy
    //             </Link>
    //           </li>
    //           <li className="p-5">
    //             <Link className="font-medium text-[#F4E1D2] hover:text-Black-700" href="/terms-condition">
    //               Terms of Service
    //             </Link>
    //           </li>
    //           <li className="p-5">
    //             <Link href={"/return-policy"} className="font-medium text-[#F4E1D2] hover:text-Black-700">
    //               Return Policy
    //             </Link>
    //           </li>
    //           <li className="p-5">
    //             <a className="font-medium text-[#F4E1D2] hover:text-Black-700" href="#">
    //               Contact Us
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="relative h-auto w-full  pt-8">
    <div className="bg-white rounded-b-[2rem] mb-[4rem] z-10 relative">
      <div className="container py-8 px-4">
        {/* Top section content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold">Krishnaura</p>
            {/* <p>Showcase Your Brand</p> */}
            {/* <p>Tech Sphere</p> */}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
          <Link href="privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms-condition" className="hover:underline">Terms & Condition</Link>
          <Link href={"/return-policy"} className="hover:underline">Return Policy</Link>
          {/* <Link href="#" className="hover:underline">Refund & Cancellation Policy</Link> */}
        </div>
        </div>
      </div>
    </div>
    <div className="bg-blue-900 text-white py-4 pt-[4rem] z-0 absolute inset-x-0 bottom-0">
      <div className="container text-[.9rem] sm:text-[1rem] mx-auto px-4 text-center">
        <p className="mb-2">&copy; 2024 Kirshnaura. All rights reserved.</p>
      </div>
    </div>
  </div>
  )
}
