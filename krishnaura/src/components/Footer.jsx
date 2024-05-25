import KA from "../../public/KA.png"
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";


export default function Footer() {
  return (

    <section className="overflow-hidden bg-white w-full py-8">
      <div className="container  z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">

            <Link href="/" className="font-bold Link-inherit">
              <Image src={KA} alt="" className="md:w-[12rem] md:h-[5rem] w-[9rem] h-[4rem]" />
            </Link>
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap items-center">
              <li className="p-5">
                <Link className="font-medium text-gray-600 hover:text-gray-700" href="privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li className="p-5">
                <Link className="font-medium text-gray-600 hover:text-gray-700" href="/terms-condition">
                  Terms of Service
                </Link>
              </li>
              <li className="p-5">
                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                  Return Policy
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-auto p-8">
            <div className="-m-1.5 flex flex-wrap">
              
              <div className="w-auto p-1.5">
                <Link href="https://www.instagram.com/krishna_aura_">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                  <FaInstagram />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
