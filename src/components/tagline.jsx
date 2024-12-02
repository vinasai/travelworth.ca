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
                                <FiClock className="text-red-500 size-4"></FiClock>
                                <span className="ms-2 text-slate-300">Mon-Sat: 9am to 6pm</span>
                            </li>
                            <li className="inline-flex items-center ms-2">
                                <FiMapPin className="text-red-500 size-4"></FiMapPin>
                                <span className="ms-2 text-slate-300">4544 Sheppard Ave E Unit 231</span>
                            </li>
                        </ul>

                        <ul className="list-none">
                            <li className="inline-flex items-center">
                                <FiMail className="text-red-500 size-4"></FiMail>
                                <a href="mailto:info@flyplaces.ca" className="ms-2 text-slate-300 hover:text-slate-200">info@flyplaces.ca</a>
                            </li>
                            <li className="inline-flex items-center ms-2">
                                <ul className="list-none space-x-3">
                                    <li className="inline-flex mb-0"><a href="#!" className="text-slate-300 hover:text-red-500"><FiFacebook className="size-4 align-middle" title="facebook"></FiFacebook></a></li>
                                    <li className="inline-flex ms-2 mb-0"><a href="#!" className="text-slate-300 hover:text-red-500"><FiInstagram className="size-4 align-middle" title="instagram"></FiInstagram></a></li>
                                    <li className="inline-flex ms-2 mb-0"><a href="#!" className="text-slate-300 hover:text-red-500"><RiTwitterXLine className="size-4 align-middle" title="twitter"></RiTwitterXLine></a></li>
                                    <li className="inline-flex ms-2 mb-0"><a href="tel:416-754-3833" className="text-slate-300 hover:text-red-500"><FiPhone className="size-4 align-middle" title="phone"></FiPhone></a></li>
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