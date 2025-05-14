const Hero = () => {
    return (
        <>
            <div className="bg-[#E5EAF4] py-24 sm:py-32">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-center text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">Everything you need to deploy your app</p>

                    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                        {/* Slider */}
                        <div className="relative lg:col-span-2 lg:row-span-2">
                            <div className="absolute inset-px rounded-lg bg-white"></div>
                            <div className="relative flex h-full flex-col overflow-hidden ">
                                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Mobile friendly</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
                                </div>
                                <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                                    <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                                        <img className="size-full object-cover object-top" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
                        </div>

                        {/* small box */}
                        <div className="relative lg:col-span-1 lg:row-span-1 ">
                            <div className="absolute inset-px rounded-lg bg-white "></div>
                            <div className=" relative flex h-full overflow-hidden rounded-lg ">
                                <div className="flex flex-col justify-between px-8 py-8 sm:px-10 sm:pt-10 ">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
                                    <p className=" block max-w-lg w-2.5 text-sm/6 text-gray-600 max-lg:text-center">
                                        money
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                    <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 "></div>
                        </div>

                        {/* small box */}
                        <div className="relative lg:col-span-1 lg:row-span-1 ">
                            <div className="absolute inset-px rounded-lg bg-white "></div>
                            <div className=" relative flex h-full overflow-hidden rounded-lg ">
                                <div className="flex flex-col  px-8 py-8 sm:px-10 sm:pt-10 ">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
                                    <p className="mt-auto block max-w-lg w-2.5 text-sm/6 text-gray-600 max-lg:text-center">
                                        money
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 "></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;