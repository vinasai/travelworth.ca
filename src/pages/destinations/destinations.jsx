import React, { useState } from "react";
import { Link } from "react-router-dom";

import Tagline from "../../../src/components/tagline";
import Navbar from "../../../src/components/navbar";
import TopDestinationOne from "../../../src/components/top-destination-one";
import Footer from "../../../src/components/footer";
import Switcher from "../../../src/components/switcher";

import "../../../node_modules/react-modal-video/scss/modal-video.scss";

import { packages } from "../../data/data";

import { FiMapPin } from "../../assets/icons/vander";

import DestinationsByRegion from "../../components/destinations/destination-by-region";

export default function ExploreDestinations() {
	return (
		<>
			<Tagline />
			<Navbar
				navclass="defaultscroll is-sticky tagline-height"
				navlight={true}
				manuclass="justify-end nav-light"
			/>
			<section className="relative md:pt-72 md:pb-60 py-36 table w-full items-center bg-[url('https://images.pexels.com/photos/3669288/pexels-photo-3669288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-top bg-no-repeat bg-cover">
				<div className="absolute inset-0 bg-slate-900/40"></div>
				<div className="container relative">
					<div className="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
						<div className="lg:col-span-8 md:col-span-7 md:order-1 order-2">
							<h5 className="text-2xl font-dancing text-white">
								#Destinations
							</h5>
							<h4 className="font-bold text-white lg:leading-tight leading-tight text-4xl lg:text-6xl mb-6 mt-5">
								Discover the Best Destinations Across the Globe
							</h4>
							<p className="text-white/70 text-xl max-w-xl">
								Uncover the World’s Most Breathtaking Destinations, From
								Sun-Kissed Shores to Snow-Capped Peaks, Tailored for Every
								Traveler’s Dream.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* <div className="container relative -mt-16 z-1"></div> */}

			<section className="relative md:pt-10 md:pb-16 pt-16 pb-16 overflow-hidden">
				<DestinationsByRegion />
			</section>

			<section className="relative md:py-24 pt-4 pb-16 overflow-hidden">
				<div className="container relative md:mt-24 mt-16">
					<div className="grid grid-cols-1 pb-8 text-center">
						<h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
							Our Best Selling Tours Packages
						</h3>

						<p className="text-slate-400 max-w-xl mx-auto">
							Planning for a trip? We will organize your trip with the best
							places and within best budget!
						</p>
					</div>

					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
						{packages.slice(0, 6).map((item, index) => {
							return (
								<div
									className="group rounded-md shadow dark:shadow-gray-700"
									key={index}
								>
									<div className="relative overflow-hidden rounded-t-md shadow dark:shadow-gray-700 mx-3 mt-3">
										<img
											src={item.image}
											className="scale-125 group-hover:scale-100 duration-500"
											alt=""
										/>
										{item.tagText && (
											<div className="absolute top-0 start-0 p-4">
												<span className="bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
													{item.tagText}
												</span>
											</div>
										)}

										<div className="absolute top-0 end-0 p-4">
											<Link
												to="#"
												className="size-8 inline-flex justify-center items-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-500 dark:focus:text-red-500 hover:text-red-500 dark:hover:text-red-500"
											>
												<i className="mdi mdi-heart text-[20px] align-middle"></i>
											</Link>
										</div>
									</div>

									<div className="p-4">
										<p className="flex items-center text-slate-400 font-medium mb-2">
											<FiMapPin className="text-red-500 size-4 me-1"></FiMapPin>{" "}
											{item.place}
										</p>
										<Link
											to={`/tour-detail-one/${item.id}`}
											className="text-lg font-medium hover:text-red-500 duration-500 ease-in-out"
										>
											{item.title}
										</Link>

										<div className="flex items-center mt-2">
											<span className="text-slate-400">Rating:</span>
											<ul className="text-lg font-medium text-amber-400 list-none ms-2 space-x-1">
												<li className="inline">
													<i className="mdi mdi-star align-middle"></i>
												</li>
												<li className="inline">
													<i className="mdi mdi-star align-middle"></i>
												</li>
												<li className="inline">
													<i className="mdi mdi-star align-middle"></i>
												</li>
												<li className="inline">
													<i className="mdi mdi-star align-middle"></i>
												</li>
												<li className="inline">
													<i className="mdi mdi-star align-middle"></i>
												</li>
												<li className="inline text-black dark:text-white text-sm">
													5.0(30)
												</li>
											</ul>
										</div>

										<div className="mt-4 pt-4 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
											<h5 className="text-lg font-medium text-red-500">
												$ 58 / Day
											</h5>

											<Link to="" className="text-slate-400 hover:text-red-500">
												Explore Now <i className="mdi mdi-arrow-right"></i>
											</Link>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="mt-6 text-center">
						<Link
							to="/grid-right-sidebar"
							className="text-slate-400 hover:text-red-500 inline-block"
						>
							See More Tours{" "}
							<i className="mdi mdi-arrow-right align-middle"></i>
						</Link>
					</div>
				</div>
			</section>

			<Footer />
			<Switcher />
		</>
	);
}

const destinationsList = {
	destinations: {
		Europe: [
			{ country: "France", cities: ["Paris"] },
			{ country: "Italy", cities: ["Rome", "Venice"] },
			{ country: "Spain", cities: ["Barcelona", "Madrid"] },
			{ country: "United Kingdom", cities: ["London"] },
			{ country: "Greece", cities: ["Athens", "Santorini"] },
			{ country: "Switzerland", cities: ["Zurich", "Lucerne"] },
			{ country: "Germany", cities: ["Berlin", "Munich"] },
			{ country: "Netherlands", cities: ["Amsterdam"] },
			{ country: "Portugal", cities: ["Lisbon"] },
			{ country: "Austria", cities: ["Vienna"] },
		],
		Asia: [
			{ country: "Japan", cities: ["Tokyo", "Kyoto"] },
			{ country: "Thailand", cities: ["Bangkok", "Phuket"] },
			{ country: "India", cities: ["Delhi", "Agra"] },
			{ country: "China", cities: ["Beijing", "Shanghai"] },
			{ country: "Indonesia", cities: ["Bali", "Jakarta"] },
			{ country: "Vietnam", cities: ["Ho Chi Minh City", "Hanoi"] },
			{ country: "Singapore", cities: ["Singapore City"] },
			{ country: "Malaysia", cities: ["Kuala Lumpur"] },
			{ country: "South Korea", cities: ["Seoul"] },
			{ country: "Nepal", cities: ["Kathmandu"] },
		],
		"North America": [
			{
				country: "USA",
				cities: ["New York City", "Los Angeles", "Las Vegas"],
			},
			{ country: "Canada", cities: ["Toronto", "Vancouver"] },
			{ country: "Mexico", cities: ["Mexico City", "Cancun"] },
			{ country: "Cuba", cities: ["Havana"] },
			{ country: "Jamaica", cities: ["Montego Bay", "Kingston"] },
			{ country: "Dominican Republic", cities: ["Punta Cana"] },
			{ country: "Bahamas", cities: ["Nassau"] },
			{ country: "Puerto Rico", cities: ["San Juan"] },
			{ country: "Costa Rica", cities: ["San José"] },
			{ country: "Belize", cities: ["Belize City"] },
		],
		"South America": [
			{ country: "Brazil", cities: ["Rio de Janeiro", "São Paulo"] },
			{ country: "Argentina", cities: ["Buenos Aires", "Mendoza"] },
			{ country: "Chile", cities: ["Santiago", "Valparaíso"] },
			{ country: "Peru", cities: ["Lima", "Cusco"] },
			{ country: "Colombia", cities: ["Bogotá", "Cartagena"] },
			{ country: "Ecuador", cities: ["Quito", "Galapagos Islands"] },
			{ country: "Uruguay", cities: ["Montevideo"] },
			{ country: "Bolivia", cities: ["La Paz"] },
			{ country: "Paraguay", cities: ["Asunción"] },
			{ country: "Venezuela", cities: ["Caracas"] },
		],
		Africa: [
			{ country: "South Africa", cities: ["Cape Town", "Johannesburg"] },
			{ country: "Morocco", cities: ["Marrakech", "Casablanca"] },
			{ country: "Egypt", cities: ["Cairo", "Luxor"] },
			{ country: "Kenya", cities: ["Nairobi", "Mombasa"] },
			{ country: "Tanzania", cities: ["Zanzibar", "Serengeti"] },
			{ country: "Nigeria", cities: ["Lagos", "Abuja"] },
			{ country: "Ethiopia", cities: ["Addis Ababa"] },
			{ country: "Ghana", cities: ["Accra"] },
			{ country: "Namibia", cities: ["Windhoek"] },
			{ country: "Botswana", cities: ["Gaborone"] },
		],
	},
};
