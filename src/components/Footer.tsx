import { Home, Mail, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <>
            <footer className=" text-center text-surface/75  lg:text-left">
                <div className="mx-6 py-10 text-center md:text-left">
                    <div className="md:px-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h6 className="text-xl mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Help & Support
                            </h6>
                            <p className="mb-4 flex items-center justify-center md:justify-start">
                                <Home className="text-primary me-3 w-5 h-5 [&>svg]:h-5 [&>svg]:w-5"> </Home>
                                Ha Noi, Viet Nam
                            </p>
                            <p className="mb-4 flex items-center justify-center md:justify-start">
                                <Mail className="text-primary me-3 w-5 h-5 [&>svg]:h-5 [&>svg]:w-5"> </Mail>
                                <Link href="mailto:nguyenduythai17092005@gmail.com">nguyenduythai17092005@gmail.com</Link>
                            </p>
                            <p className="mb-5 flex items-center justify-center md:justify-start">
                                <Phone className="text-primary me-3 w-5 h-5 [&>svg]:h-5 [&>svg]:w-5"> </Phone>
                                <Link href="tel:0985486619">0985486619</Link>
                            </p>


                        </div>

                        <div>
                            <h6 className="text-xl mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                My account
                            </h6>
                            <p className="text-gray-500 hover:text-primary mb-4">
                                <Link href="/order">Order history</Link>
                            </p>
                            <p className="text-gray-500 hover:text-primary mb-4">
                                <Link href="/cart">Shopping cart</Link>
                            </p>
                            <p className="text-gray-500 hover:text-primary ">
                                <Link href="/contact">Help</Link>
                            </p>
                        </div>
                        <div>
                            <h6 className="text-xl mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Information
                            </h6>
                            <p className="text-gray-500 hover:text-primary mb-4">
                                <Link href="/contact">Contact</Link>
                            </p>
                            <div className="mb-5 flex items-center justify-center md:justify-start">
                                <Link href="https://www.facebook.com/thai.nguyenduy.52643/" className="text-gray-500 me-6 [&>svg]:h-4 [&>svg]:w-4">
                                    {/* facebook icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                    </svg>
                                </Link>
                                {/* gmail icon */}
                                <Link href="mailto:nguyenduythai17092005@gmail.com" className="text-gray-500 me-6 [&>svg]:h-4 [&>svg]:w-4 ">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                        <path
                                            d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                    </svg>

                                </Link>
                                <Link href="https://www.linkedin.com/in/thai-nguyen-duy-b828512b3/" className="text-gray-500 me-6 [&>svg]:h-4 [&>svg]:w-4">
                                    {/* linkedin icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                    </svg>
                                </Link>
                                <Link href="https://github.com/duythaidev" className="text-gray-500 [&>svg]:h-4 [&>svg]:w-4">
                                    {/* github icon */}

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 496 512">
                                        <path
                                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="">
                            <h6 className="text-xl mb-4 text-center md:text-end  font-semibold uppercase ">
                                Download app
                            </h6>
                            <p className="text-gray-500 text-center md:text-end">Try out our app for free</p>
                            <div className="flex flex-col md:ml-auto md:mr-0 mx-auto items-center md:items-end flex-shrink-0 ">
                                <Link href="https://github.com/duythaidev/kitchen-utensils-app-nativewind" className="bg-blue-600 my-3 inline-flex justify-center py-3 w-2/3 rounded-md text-white items-center focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 " viewBox="0 0 512 512">
                                        <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                                    </svg>
                                    <span className="ml-4 flex items-start flex-col leading-none">
                                        <span className="text-xs  mb-1">GET IT ON</span>
                                        <span className="title-font font-medium">Google Play</span>
                                    </span>
                                </Link>
                                <Link href="https://github.com/duythaidev/kitchen-utensils-app-nativewind" className="bg-blue-950 inline-flex justify-center py-3 w-2/3 rounded-md text-white items-center focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8" viewBox="0 0 305 305">
                                        <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                                        <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                                    </svg>
                                    <span className="ml-4 flex items-start flex-col leading-none">
                                        <span className="text-xs  mb-1">Download on the</span>
                                        <span className="title-font font-medium">App Store</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" p-6 text-center flex justify-between px-20 flex-wrap">
                    <p>© 2025. All rights reserved by Thai.</p>
                    <p className="font-semibold md:ml-auto md:mr-0 mx-auto items-center md:items-end flex-shrink-0">Download App</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;