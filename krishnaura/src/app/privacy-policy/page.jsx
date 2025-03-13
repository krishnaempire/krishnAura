import React from 'react';
import { Cinzel } from '@next/font/google';
import Link from 'next/link';

// Import the Cinzel font
const cinzel = Cinzel({
    subsets: ['latin'],
    weight: ['400', '700'], // Specify font weights
});

const PrivacyPolicy = () => {
    return (
        <>
            <div className={`${cinzel.className} mt-[9rem] w-full`}>
                <div className='w-[90%] m-auto'>

                    {/* Applying Cinzel font to "Privacy Policy" */}
                    <p className={`${cinzel.className} font-bold text-[2rem]`}>Privacy Policy</p>
                    <div className='text-[1rem] flex flex-col gap-5 mt-[4rem] font-medium'>
                        <p>
                        Your privacy is important to us. We collect and protect your data responsibly.
                            </p>
                        <div>
                            {/* Applying Cinzel font to "Information We Collect" */}
                            <p className={`${cinzel.className} font-bold`}> Information We Collect</p>
                            <p>
                            ✔ Personal Information – Name, email, phone, and address (for orders & communication).<br/>
                            ✔ Payment Details – Collected securely via trusted payment gateways.<br/>
                            ✔ Browsing Data – Cookies & analytics to improve your experience.
                            </p>
                        </div>
                        <div>
                            <p className='font-semibold'>How We Use Your Information</p>
                            <p>✔ To process orders and provide customer support.<br/>
                                ✔ To send updates, promotions, and offers (only if you subscribe).<br/>
                                ✔ To improve our website and shopping experience.<br/>
                                ✔ To comply with legal obligations and prevent fraud.</p>
                            {/*<span>Processing and fulfilling orders</span>
                            <span>Communicating with you about your orders and account</span>
                            <span>Providing customer support and resolving disputes</span>
                            <span>Improving our website and services</span>
                            <span>Sending promotional offers, newsletters, and marketing communications (with your consent)</span>*/}
                        </div>
                        <div>
                            <p className='font-bold'>How We Protect Your Data</p>
                            <p>
                            ✔ You can access, update, or delete your personal data by contacting us.<br/>
                            ✔ You can unsubscribe from marketing emails anytime.<br/>
                            </p>
                        </div>
                        <div>
                            <p className='font-semibold'>Third-Party Links</p>
                            <p>
                            ✔ Our website may have links to third-party sites (Instagram, payment providers, etc.).<br/>
                            ✔ We are not responsible for their privacy policies

                            </p>
                        </div>
                        <div>
                            <p className='font-semibold'>Your Rights</p>
                            <p>
                            ✔ You can access, update, or delete your personal data by contacting us.<br/>
                            ✔ You can unsubscribe from marketing emails anytime.

                            </p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='font-semibold'>Changes to This Privacy Policy</p>
                            <p>
                            We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting on our website. Your continued use of our website following the posting of any changes constitutes acceptance of those changes.
                            </p>
                            <span>If you have any questions or concerns about this Privacy Policy, please contact us at this email Id :- <Link href="https://mail.google.com/mail/u/0/?fs=1&to=support@impresiot.com&su=General+Support&body=Hi,+I+have+a+question...&tf=cm" target='_blank'>support@krishnaaura.com</Link></span>
                            {/*<span>Thank you for entrusting Krishna Aura with your personal information.</span>*/}
                        </div> 
                        {/* 
                        <div className='flex flex-col gap-3'>
                            <p className='font-semibold'>GENERAL TERMS</p>
                            <p>
                            If any part of this Terms of Use agreement is held or found to be invalid or unenforceable, that portion of the agreement will be construed as to be consistent with applicable law while the remaining portions of the agreement will remain in full force and effect. Any failure on our part to enforce any provision of this agreement will not be considered a waiver of our right to enforce such provision. Our rights under this agreement survive any transfer or termination of this agreement.
                            </p>
                            <span>YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE, UNDERSTAND THE TERMS OF USE, AND WILL BE BOUND BY THESE TERMS AND CONDITIONS. YOU FURTHER ACKNOWLEDGE THAT THESE TERMS OF USE TOGETHER WITH THE PRIVACY POLICY  REPRESENT THE COMPLETE AND EXCLUSIVE STATEMENT OF THE AGREEMENT BETWEEN US AND THAT IT SUPERSEDES ANY PROPOSAL OR PRIOR AGREEMENT ORAL OR WRITTEN, AND ANY OTHER COMMUNICATIONS BETWEEN US RELATING TO THE SUBJECT MATTER OF THIS AGREEMENT.</span>
                        </div> 
                        */}
                        {<div>
                            <p className='font-semibold'>Contact Us</p>
                            <p>
                            For privacy concerns, contact us at:- <br/><br/>
                            📧 Email: [support@krishnaaura.com]<br/>
                            📞 WhatsApp No. +91 8279351382<br/>
                            By using our website, you agree to our Privacy Policy.<br/><br/>

                            {/* As part of the Service, we may provide you with convenient links to third party website(s) (“Third Party Sites”) as well as content or items belonging to or originating from third parties (the “Third Party Applications, Software or Content”). These links are provided as a courtesy to Service subscribers. We have no control over Third Party Sites or Third Party Applications, Software or Content or the promotions, materials, information, goods or services available on these Third Party Sites or Third Party Applications, Software or Content. Such Third Party Sites and Third Party Applications, Software or Content are not investigated, monitored or checked for accuracy, appropriateness, or completeness, and we are not responsible for any Third Party Sites accessed through the Site or any Third Party Applications, Software or Content posted on, available through or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices or other policies of or contained in the Third Party Sites or the Third Party Applications, Software or Content. Inclusion of, linking to or permitting the use or installation of any Third Party Site or any Third Party Applications, Software or Content does not imply our approval or endorsement. If you decide to leave the Site and access the Third Party Sites or to use or install any Third Party Applications, Software or Content, you do so at your own risk and you should be aware that our terms and policies, including these Terms of Use, no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any Third Party Site to which you navigate from the Site or relating to any applications you use or install from the Third Party Site.
                            */}
                            </p>
                        </div>}

                    </div>

                </div>

            </div>
        </>
    );
};

export default PrivacyPolicy;
