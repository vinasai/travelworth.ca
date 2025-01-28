import React from "react";
// import { useParams } from "react-router-dom";

import Tagline from "../../../src/components/tagline";
import Navbar from "../../../src/components/navbar";
import Footer from "../../../src/components/footer";
import Switcher from "../../../src/components/switcher";

import "../../../node_modules/react-modal-video/scss/modal-video.scss";

import CityDestinationContent from "../../components/destinations/city-destination";

const ExploreDestinations = () => {
	// const { city } = useParams();

	return (
		<div>
			<Tagline />
			<Navbar
				navclass="defaultscroll is-sticky tagline-height"
				navlight={true}
				manuclass="justify-end nav-light"
			/>

			<section className="relative md:pt-48 md:pb-40 py-36 table w-full items-center bg-[url('https://images.pexels.com/photos/1446624/pexels-photo-1446624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=850&dpr=2')] bg-top bg-no-repeat bg-cover">
				<div className="absolute inset-0 bg-slate-900/40"></div>
				<div className="container relative">
					<div className="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
						<div className="lg:col-span-8 md:col-span-7 md:order-1 order-2">
							<h5 className="text-2xl font-dancing text-white">#Destination</h5>
							<h4 className="font-bold text-white lg:leading-tight leading-tight text-6xl lg:text-8xl mb-6 mt-5">
								<div className="font-bold text-white lg:leading-tight leading-tight text-2xl lg:text-3xl mb-0 mt-5">
									Discover
								</div>
								Paris
							</h4>
							<p className="text-white text-xl max-w-xl [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
								From iconic landmarks to charming streets, experience the heart
								of France.
							</p>
						</div>
					</div>
				</div>
			</section>

			

			<Footer />
			<Switcher />
		</div>
	);
};

export default ExploreDestinations;
