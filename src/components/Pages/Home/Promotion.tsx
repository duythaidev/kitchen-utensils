import React from "react";
import Image from "next/image";
import Link from "next/link";

const Promotion = () => {
  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">
              Tefal Easy Fry Silence Deluxe Air Fryer
            </span>

            <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              UP TO 30% OFF
            </h2>

            <p>
              The Tefal Easy Fry Silence Deluxe Air Fryer is a powerful and efficient air fryer that allows you to cook your favorite foods with ease and precision.
            </p>

            <Link
              href="/shop"
              className="inline-flex font-medium text-custom-sm text-white bg-blue-600 py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-800 mt-7.5"
            >
              Buy Now
            </Link>
          </div>

          <Image
            src="https://www.tefal.com.au/cdn/shop/files/01-TP-EY55JD-Jamie-Oliver-by-Tefal-Easy-Fry-Silence-Deluxe-Air-Fryer.webp?v=1747632504&width=800"
            alt="promo img"
            className="absolute bottom-0 right-4 lg:right-26 -z-1"
            width={350}
            height={500}
          />
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="https://www.tefal.com.au/cdn/shop/files/BL477BlenderforcePianoWhite.png?v=1746168855&width=800"
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
              width={241}
              height={241}
            />

            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                Tefal Blender
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                For your daily smoothies
              </h2>

              <p className="font-semibold text-custom-1 text-teal">
                Flat 20% off
              </p>

              <Link
                href="/shop"
                className="inline-flex font-medium text-custom-sm text-white bg-teal-600 py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-700 mt-9"
              >
                Grab Now
              </Link>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="https://www.tefal.com.au/cdn/shop/products/1.B5670222TefalSimplyCleanNon-StickFrypan20cmPackshot1.png?v=1746169370&width=600"
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
              width={200}
              height={200}
            />

            <div>
              <span className="block text-lg text-dark mb-1.5">
                Non-Stick Frypan
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Up to <span className="text-orange">40%</span> off
              </h2>

              <p className="max-w-[285px] text-custom-sm">
                The non-stick surface is easy to clean and easy to use.
              </p>

              <a
                href="/shop"
                className="inline-flex font-medium text-custom-sm text-white bg-orange-400 py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-500 mt-7.5"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
