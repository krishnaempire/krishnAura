// import React from 'react'

// const TermsConditon = () => {
//     return (
//         <>
//             <div className=' mt-[9rem] w-full'>
//                 <div className='w-[75%] m-auto' >
                    
//                     <p className='font-bold text-[2rem]'>Terms And Conditions</p>
//                     <div className='text-[1rem] flex flex-col gap-6 mt-[4rem] font-medium'>
//                         <p>
//                             Welcome to Krishna Aura! Before you proceed to explore our online store and avail of our services, we kindly ask you to read and understand the following terms and conditions carefully. By accessing our website and engaging with our services, you agree to comply with these terms and conditions in their entirety. If you do not agree with any part of these terms, please refrain from using our website.
//                         </p>
//                         <div>
//                             <p className='font-semibold'>Acceptance of Terms</p>
//                             <p>By using our website, you acknowledge that you have read, understood, and agreed to be bound by these terms and conditions, as well as our Privacy Policy. These terms constitute a legally binding agreement between you and Krishna Aura.
// </p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Use of Websit</p>
//                             <p>You agree to use our website for lawful purposes and in a manner consistent with all applicable laws and regulations. You further agree not to engage in any activity that may compromise the security or integrity of our website or interfere with the proper functioning of our services.</p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Intellectual Property</p>
//                             <p>All content, including but not limited to text, graphics, logos, images, and software, displayed on our website is the intellectual property of Krishna Aura or its licensors and is protected by copyright and other intellectual property laws. You agree not to reproduce, distribute, modify, or create derivative works of any content without our prior written consent.</p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Product Information</p>
//                             <p>While we strive to provide accurate and up-to-date information about our products, we do not warrant the accuracy, completeness, or reliability of any product descriptions or other content on our website. We reserve the right to correct any errors, inaccuracies, or omissions and to update information at any time without prior notice.
// </p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Pricing and Payment</p>
//                             <p>Prices for products listed on our website are subject to change without notice. We reserve the right to modify or discontinue any product at any time. Payment for purchases made on our website must be made using the payment methods specified at the time of purchase. By providing payment information, you represent and warrant that you have the legal right to use any payment method(s) used to make purchases.</p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Shipping and Delivery</p>
//                             <p>We aim to process and ship orders in a timely manner, but we do not guarantee specific delivery dates. Shipping costs and delivery times may vary depending on your location and the shipping method selected at checkout. We are not responsible for any delays or damages incurred during shipping.</p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'> Returns and Refunds</p>
//                             <p>Please review our Returns and Refunds Policy for information about returning products purchased from our website.</p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Limitation of Liability</p>
//                             <p>To the fullest extent permitted by law, Krishna Aura shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of our website or the products purchased from our website.
// </p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Governing Law</p>
//                             <p>These terms and conditions shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
// </p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>Changes to Term</p>
//                             <p>We reserve the right to update or modify these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting on our website. Your continued use of our website following the posting of any changes constitutes acceptance of those changes.
// </p>
//                         </div>
//                         <div>

//                             <p className='font-semibold'>If you have any questions or concerns about these terms and conditions, please contact us at [.........].

// Thank you for choosing Krishna Aura</p>
//                         </div>
//                     </div>

//                 </div>

//             </div>
//         </>
//     )
// }

// export default TermsConditon


import React from 'react';

const TermsCondition = () => {
    return (
        <>
            <div className="mt-[9rem] w-full bg-gradient-to-b from-[#fdf8e3] to-[#f5e6c8] py-12">
                <div className='w-[80%] md:w-[80%] m-auto bg-white shadow-xl p-12 border-t-[5px] border-[#d4af37]'>

                    {/* Heading */}
                    <h1 className="text-5xl font-serif font-bold text-center text-[#704214] border-b-2 border-[#d4af37] pb-4 tracking-wide">
                        Terms of Use
                    </h1>

                    {/* Introduction */}
                    <p className='text-gray-800 text-lg text-center italic mt-6 leading-relaxed'>
                        Welcome to <span className="font-semibold text-[#8b5e3c]">Krishna Aura!</span>
                        These Terms of Use govern your access and use of our website.
                        By continuing to browse, you agree to these terms.
                    </p>

                    <div className='text-[1rem] flex flex-col gap-6 mt-[4rem] font-medium'>

                        {/* General Terms */}
                        <div className='p-5 border-l-4 border-[#a1783e] bg-[#fcf5e3] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-600 mr-2">⚖</span> General Terms</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>Krishna Aura provides Laddoo Gopal dresses, divine accessories, and related products.</li>
                                <li>By placing an order, you confirm that you are at least 18 years old or have parental permission.</li>
                                <li>We reserve the right to update these terms at any time.</li>
                            </ul>
                        </div>


                        {/* Use of Our Website */}
                        <div className='p-5 border-l-4 border-[#a1783e] bg-[#f9ebd2] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-green-600 mr-2">🌐</span> Use of Our Website</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>You may browse, shop, and interact with our content for personal use only.</li>
                                <li>Do not misuse our site, including hacking or unauthorized access.</li>
                                <li>Copying, reproducing, or selling our content is prohibited without permission.</li>
                            </ul>
                        </div>

                        {/* Limitation of Liability */}
                        <div className='p-5 border-l-4 border-[#e6c37f] bg-[#f7e3c0] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-purple-600 mr-2">🔏</span>Limitation of Liability</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>Krishna Aura is not responsible for indirect, incidental, or consequential damages arising from website use.
                                </li>
                                <li>We do not guarantee uninterrupted or error-free access to our website.</li>
                            </ul>
                        </div>

                        {/* Account & User Responsibilities */}
                        <div className='p-5 border-l-4 border-[#a1783e] bg-[#f6e1c1] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-yellow-600 mr-2">🔐</span> Account & User Responsibilities</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>You are responsible for keeping your account details secure.</li>
                                <li>False or misleading information may result in account suspension.</li>
                            </ul>
                        </div>

                        {/* Product Information and Pricng */}
                        <div className='p-5 border-l-4 border-[#b86f50] bg-[#f3d7b0] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-yellow-600 mr-2">🔐</span> Product Information and Pricng</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>We strive for accuracy in product descriptions, but slight variations may occur.</li>
                                <li>Prices are listed in ₹(Ruppees) and are subject to change without notice.</li>
                                <li>Discounts and offers are time-sensitive and may have additional conditions.</li>
                            </ul>
                        </div>

                        {/* Privacy & Data Protection */}
                        <div className='p-5 border-l-4 border-[#8d6234] bg-[#E9CDA2] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-purple-600 mr-2">🔏</span> Privacy & Data Protection</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>Your personal information is handled as per our <span className='text-blue-700 underline cursor-pointer'>Privacy Policy</span>.</li>
                                <li>By using our site, you consent to data collection.</li>
                            </ul>
                        </div>

                        {/* Orders & Payments */}
                        <div className='p-5 border-l-4 border-[#d1ab89] bg-[#E4C8A3] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-red-600 mr-2">💳</span> Orders & Payments</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>Placing an order means you agree to pay the listed price.</li>
                                <li>We accept all major payment methods.</li>
                                <li>Orders may be cancelled due to stock issues or suspected fraud.</li>
                            </ul>
                        </div>

                        {/* Shipping & Delivery */}
                        <div className='p-5 border-l-4 border-[#e6c37f] bg-[#E0B885] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-indigo-600 mr-2">🚚</span> Shipping & Delivery</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>Orders are processed within 2 bussiness days.</li>
                                <li>We are not responsible for lost or stolen packages.</li>
                            </ul>
                        </div>

                        {/* Return, Refund & Cancellation Policy */}
                        <div className='p-5 border-l-4 border-[#d1ab89] bg-[#D1B084] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-indigo-600 mr-2">🚚</span>Return, Refund & Cancellation Policy</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>Returns and refunds are only applicable as per our [Refund & Return Policy].</li>
                                <li>Cancellations can be made before order shipment. Once shipped, the order cannot be cancelled.</li>
                                <li>Refunds (if applicable) will be processed within 48 working hours to the original payment method after the product is recieved and verified.</li>

                            </ul>
                        </div>

                        {/* Intellectual Property Rights */}
                        <div className='p-5 border-l-4 border-[#e6c37f] bg-[#CDAB7E] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-purple-600 mr-2">🔏</span> Intellectual Property Rights</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>All website content, including images, designs, text, and logos, is owned by Krishna Aura.</li>
                                <li>Unauthorized use, modification, or reproduction is strictly prohibited.</li>
                            </ul>
                        </div>

                        

                        {/* Governing Law */}
                        <div className='p-5 border-l-4 border-[#8d6234] bg-[#D1B283] shadow-md rounded-md'>
                            <p className='font-bold text-xl flex items-center text-[#8b5e3c]'><span className="text-gray-600 mr-2">⚖</span> Governing Law & Dispute Resolution</p>
                            <ul className='list-disc list-inside text-gray-800 mt-2'>
                                <li>These terms are governed by the laws of India/Uttar Pradesh.</li>
                                <li>Disputes should be resolved amicably before legal action.</li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className='w-[60%] mx-auto p-3 text-center border-l-8 border-[#9c6b3e] bg-[#f5e3cc] text-[#6a4128] shadow-md rounded-2xl mt-6'>

                            <p className='text-lg font-semibold text-gray-800'>Have questions? Contact us at</p>
                            <p className='text-blue-600 font-bold mt-2'>support@krishnaaura.com</p>
                            <p></p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TermsCondition;
