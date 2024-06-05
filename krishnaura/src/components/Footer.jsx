import KA from "../../public/KA.png"
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";


export default function Footer() {
  return (

    <section className="overflow-hidden bg-white w-full py-8">
      <div className="container  z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto flex items-center md:block p-8">

            <Link href="/" className="font-bold Link-inherit">
              <Image src={KA} alt="" className="md:w-[12rem] md:h-[5rem] w-[9rem] h-[4rem]" />
            </Link>
            <div className="md:hidden w-auto p-8 relative left-[9rem]">
              <div className="-m-1.5 flex flex-wrap">

                <div className="w-auto flex gap-[1rem] p-1.5 relative right-[1rem]">
                  <Link href="https://www.instagram.com/krishna_aura_">
                    <div className="flex md:h-8 md:w-8 h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <FaInstagram />
                    </div>
                  </Link>
                  <div className="flex md:h-8 md:w-8 h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <FaWhatsapp />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto  p-8">
            <ul className="-m-5 flex flex-wrap items-center justify-center">
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
                <Link href={"/return-policy"} className="font-medium text-gray-600 hover:text-gray-700">
                  Return Policy
                </Link>
              </li>
              <li className="p-5">
                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex w-auto p-8">
            <div className="-m-1.5 flex flex-wrap">

              <div className="w-auto flex flex-col gap-[1rem] p-1.5">
                <Link href="https://www.instagram.com/krishna_aura_">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <FaInstagram />
                  </div>
                </Link>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                  <FaWhatsapp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
