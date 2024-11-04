import React, {useState} from 'react';

import Tagline from "../../components/tagline";
import Navbar from "../../components/navbar";
import Form from '../../components/form';
import TopDestinationOne from '../../components/top-destination-one';
import About from '../../components/about';
import Client from '../../components/client';
import Blogs from '../../components/blogs';
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';

import ModalVideo from 'react-modal-video';
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import familyVideo from '../../assets/videos/family.mp4';
import {FiPhone} from "../../assets/icons/vander";

export default function Index() {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Tagline/>
            <Navbar navclass="defaultscroll is-sticky tagline-height" navlight={true}
                    manuclass="justify-end nav-light"/>


            <section className="relative md:pt-72 md:pb-60 py-36 table w-full items-center">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={familyVideo}
                    autoPlay
                    loop
                    muted
                />
                {/*<div className="absolute inset-0 bg-slate-900/40"></div>*/}
                <div className="container relative">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
                        <div className="lg:col-span-8 md:col-span-7 md:order-1 order-2">
                            <h5 className="text-3xl font-dancing text-white">Beauty of Discovers</h5>
                            <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5">
                                Let's Leave The Road, <br/> And Take The Travosy
                            </h4>
                            <p className="text-white/70 text-xl max-w-xl pb-6">
                                Planning for a trip? We will organize your trip with the best places and within best
                                budget!
                            </p>
                            <button
                                className="call-us-button flex flex-row bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white m-2 ">Call Us  |  </h2>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <FiPhone className="text-red-500 pt-1" size={30}/>
                                    <a href="tel:4167543833" className="text-red-500 text-2xl font-bold pt-2">
                                        416 .754 .3833
                                    </a>
                                </div>
                            </button>
                        </div>

                        {/* <div className="lg:col-span-4 md:col-span-5 md:text-center md:order-2 order-1">
                        <Link to="#!" onClick={() => setOpen(true)} className="lightbox lg:h-24 h-20 lg:w-24 w-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white hover:bg-red-500 text-red-500 hover:text-white duration-500 ease-in-out mx-auto">
                            <i className="mdi mdi-play inline-flex items-center justify-center text-3xl"></i>
                        </Link>
                    </div> */}
                    {/*<ModalVideo channel="youtube" youtube={{ mute: 0, autoplay: 0 }} isOpen={isOpen} videoId="S_CGed6E610" onClose={() => setOpen(false)}/>*/}
                </div>
            </div>
        </section>

            <div className="container relative -mt-16 z-1">
                <Form/>
            </div>

            <section className="relative md:py-24 py-16 overflow-hidden">
                <TopDestinationOne/>

                {/* Rest of your sections */}
                <About/>
                <Client/>
                <Blogs/>
            </section>

            <Footer/>
            <Switcher/>
        </>
    )
}
