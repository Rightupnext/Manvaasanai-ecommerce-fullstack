import React from 'react';
import { IoMdClock } from "react-icons/io";
import { MdAssistantDirection } from "react-icons/md";
import { IoIosCall } from "react-icons/io";

export default function Intro() {
    return (
        <section className="py-10 text-white w-screen ">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Easy Reached</h1>
                </div>
                <div className="flex flex-wrap justify-center space-y-6 sm:space-y-0 sm:space-x-6">
                    {/* Working Hours */}
                    <div className="group w-72 h-40 cursor-pointer flex justify-center">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white p-6 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl rounded-lg">
                            <span className="absolute top-6 left-[1.15rem] z-0 h-12 w-12 rounded-full bg-green-500 transition-all duration-300 group-hover:scale-[15]"></span>
                            <div className="relative z-10 flex flex-col space-y-2 w-full">
                                <IoMdClock className="text-4xl text-white transition-all duration-300" />
                                <strong className="text-lg text-gray-800 group-hover:text-white">Today 10:00 am - 7:00 pm</strong>
                                <p className="text-sm text-gray-500 group-hover:text-white">Working Hours</p>
                            </div>
                        </div>
                    </div>

                    {/* Get Directions */}
                    <div className="group w-72 h-40 cursor-pointer flex justify-center">
                        <a
                            href=" https://g.co/kgs/tJPon3R "
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white p-6 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl rounded-lg no-underline"
                        >
                            <span className="absolute top-6 left-[1.15rem] z-0 h-12 w-12 rounded-full bg-green-500 transition-all duration-300 group-hover:scale-[15]"></span>
                            <div className="relative z-10 flex flex-col space-y-2 w-full">
                                <MdAssistantDirection className="text-4xl text-white transition-all duration-300" />
                                <strong className="text-lg text-gray-800 group-hover:text-white">Coimbatore</strong>
                                <p className="text-sm text-gray-500 group-hover:text-white">Get Directions</p>
                            </div>
                        </a>
                    </div>


                    {/* Call Online */}
                    <div className="group w-72 h-40 cursor-pointer flex justify-center  rounded-xl border-green-500">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white p-6 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl rounded-lg">
                            <span className="absolute top-6 left-[1.15rem] z-0 h-12 w-12 rounded-full bg-green-500 transition-all duration-300 group-hover:scale-[15]"></span>
                            <div className="relative z-10 flex flex-col space-y-2 w-full">
                                <IoIosCall className="text-4xl text-white transition-all duration-300" />
                                <a href="tel:+918870566255" className="text-lg text-gray-800 group-hover:text-white no-underline">
                                    +91 88705 66255
                                </a>
                                <p className="text-sm text-gray-500 group-hover:text-white">Call Online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
