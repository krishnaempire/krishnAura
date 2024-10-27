import KA from "../../public/KA.png"
import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (

    <section className="overflow-hidden bg-white w-full py-8">
      <div className="container  z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto flex items-center md:block p-8">

            <Link href="/" className="font-bold Link-inherit">
              <Image src={KA} alt="" className="md:w-[12rem] md:h-[5rem] w-[9rem] h-[4rem]" />
            </Link>
           
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
        </div>
      </div>
    </section>
  )
}
