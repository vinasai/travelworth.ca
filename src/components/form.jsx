import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";

import { FiSearch, FiCalendar, FiUsers, FiPhone } from '../assets/icons/vander';

export default function Form() {
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());

    return (
        <div className="grid grid-cols-1">
            <form className="contact-box p-4 bg-white allign:items-center dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-700">
                <div className="registration-form text-dark text-center">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col items-center my-4">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white m-2">Contact Us</h2>
                            <div className="flex items-center justify-center space-x-2">
                                <FiPhone className="text-red-500" size={30} />
                                <span className="text-red-500 text-lg  font-bold">1. 416 .754 .3833</span>
                            </div>
                        </div>

                        {/* <div>
                            <label className="form-label font-medium text-slate-900 dark:text-white">Select Your Date:</label>
                            <div className="relative mt-2">
                                <FiCalendar className="size-[18px] absolute top-[10px] start-3 z-50"></FiCalendar>
                                <DatePicker className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                        </div> */}

                        {/* <div>
                            <label className="form-label font-medium text-slate-900 dark:text-white">Select Your Date:</label>
                            <div className="relative mt-2">
                                <FiCalendar className="size-[18px] absolute top-[10px] start-3 z-50"></FiCalendar>
                                <DatePicker className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" selected={startDate2} onChange={(date) => setStartDate2(date)} />
                            </div>
                        </div> */}

                        {/* <div>
                            <label className="form-label font-medium text-slate-900 dark:text-white">No. of person:</label>
                            <div className="relative mt-2">
                                <FiUsers className="size-[18px] absolute top-[10px] start-3"></FiUsers>
                                <select className="form-select w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                                    <option disabled defaultValue>No. of person</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div> */}

                        {/* <div className="lg:mt-[35px]">
                            <input type="submit" id="search-buy" name="search" className="py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full cursor-pointer" defaultValue="Search"/>
                        </div> */}
                    </div>
                </div>
            </form>
        </div>
    );
}
