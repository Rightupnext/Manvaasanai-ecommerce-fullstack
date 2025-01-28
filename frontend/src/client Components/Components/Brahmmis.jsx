import React from 'react'
import brahmmis from "../../images/assets/brahmmis logo.png"

const Brahmmis = () => {
    return (
        <div className="bg-gray-50 font-[sans-serif] relative w-full shadow-lg shadow-green-600 mx-auto rounded overflow-hidden">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 flex flex-col justify-center items-center">
                    <div className="">
                        <img
                            src={brahmmis}
                            className="w-96 h-full object-cover border-8 rounded-lg"
                            alt="Brahmmis logo"
                        />
                    </div>
                </div>

                <div className="flex justify-center sm:justify-start md:justify-end items-center p-6 bg-gradient-to-b from-green-500 to-green-700 rounded-bl-[280px] w-full h-full">
                    <div className="text-center md:text-left">
                        <h6 className="text-sm font-bold text-white mt-4">
                            <span className='block text-start'>
                                தற்காத்துத் தற்கொண்டாற் பேணித் தகைசான்ற<br />
                                சொற்காத்துச் சோர்விலாள் பெண்.<br />
                            </span>
                            — திருவள்ளுவர்
                            <br />
                            <br />
                            விளக்கம்: தன்னை காத்து, தான் கொண்டவர்களை பாதுகாத்து, <br />
                            தகுதிக்குத் தகுதியாகச் சோர்வில்லாமல் இருப்பவளே பெண்.
                        </h6>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Brahmmis;
