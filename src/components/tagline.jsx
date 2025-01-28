import React from "react";

import {FiClock, FiMapPin, FiMail, FiFacebook, FiInstagram, FiTwitter, FiPhone} from '../assets/icons/vander'
import {RiTwitterXLine} from "react-icons/ri";

export default function Tagline(){
    return(
        <>
        <div className="tagline bg-slate-900">
            <div className="container relative">                
                <div className="grid grid-cols-1">
                    <div className="flex items-center justify-between">
                        <ul className="list-none space-x-2">
                            <li className="inline-flex items-center">
                                <FiClock className="text-red-500 size-5"></FiClock>
                                <span className="ms-2 text-slate-300 text-base">Mon-Sat: 9am to 6pm</span>
                            </li>
                            <li className="inline-flex items-center ms-2">
                                <FiMapPin className="text-red-500 size-5"></FiMapPin>
                                <span className="ms-2 text-slate-300 text-base">4544 Sheppard Avenue East
Unit  #231 Scarborough 
M1S 1V2</span>
                            </li>
                        </ul>

                        <ul className="list-none">
                            <li className="inline-flex items-center">
                                <FiMail className="text-red-500 size-5">info@travelworth.ca</FiMail>
                                <a href="mailto:info@travelworth.ca " className="ms-2 text-slate-300 hover:text-slate-200 text-base">info@travelworth.ca</a>
                            </li>
                            <li className="inline-flex items-center ms-2">
                                <ul className="list-none space-x-3">
                                    <li className="inline-flex mb-0"><a href="" className="text-slate-300 hover:text-red-500"><FiFacebook className="size-5 align-middle" title="facebook"></FiFacebook></a></li>
                                    <li className="inline-flex ms-2 mb-0"><a href="" className="text-slate-300 hover:text-red-500"><FiInstagram className="size-5 align-middle" title="instagram"></FiInstagram></a></li>
                                    <li className="inline-flex ms-2 mb-0"><a href="#!" className="text-slate-300 hover:text-red-500"><RiTwitterXLine className="size-5 align-middle" title="twitter"></RiTwitterXLine></a></li>
                                    <li className="inline-flex ms-2 mb-0"><a href="tel:+14167543833" className="text-slate-300 hover:text-red-500"><FiPhone className="size-5 align-middle" title="phone">4167543833</FiPhone></a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}