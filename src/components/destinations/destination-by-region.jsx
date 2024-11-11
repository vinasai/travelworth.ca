import React from "react";
import { Link } from "react-router-dom";
import destinationData from "../../data/destinations-data.json";

import TinySlider from "tiny-slider-react";
import "tiny-slider/dist/tiny-slider.css";

export default function DestinationsByRegion() {
	const settings = {
		container: ".tiny-five-item",
		controls: true,
		mouseDrag: true,
		loop: true,
		rewind: true,
		autoplay: false,
		autoplayButtonOutput: false,
		autoplayTimeout: 3000,
		navPosition: "bottom",
		controlsText: [
			'<i class="mdi mdi-chevron-left "></i>',
			'<i class="mdi mdi-chevron-right"></i>',
		],
		nav: false,
		speed: 400,
		gutter: 0,
		responsive: {
			1025: {
				items: 5,
			},

			992: {
				items: 4,
			},

			767: {
				items: 3,
			},

			425: {
				items: 1,
			},
		},
	};

	return (
		<div className="container relative">
			<div className="grid grid-cols-1 pb-6 text-center">
				<h3 className="mb-3 md:text-5xl text-2xl md:leading-normal leading-normal font-semibold">
					Explore Destinations by Continents
				</h3>

				<p className="text-slate-400 max-w-full mx-auto">
					Ready to embark on an unforgettable journey? Discover the best
					destinations across the world, carefully categorized by continent.
					Whether you're seeking adventure, relaxation, or cultural experiences,
					we’ve got the perfect spots to suit your travel style and budget. Let
					us help you plan the trip of a lifetime with tailored recommendations
					from each corner of the globe!
				</p>

				<section className="relative rounded-lg flex justify-center w-full mt-8">
					<form className="flex flex-col w-full max-w-[400px] sm:flex-row items-center">
						<input
							type="text"
							placeholder="Search a destination"
							className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003C74]"
						/>
						<button
							// type="submit"
							className="mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto px-4 py-2 bg-[#003C74] text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Search
						</button>
					</form>
				</section>
			</div>

			<div className="grid grid-cols-1 relative mt-2">
				<div className="tiny-five-item">
					{Object.keys(destinationData.destinations).map((continent, index) => {
						return (
							<div key={index}>
								<div>
									<h5 className="mt-3 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
										{continent}
									</h5>

									<div className="grid grid-cols-1 relative mt-3">
										<div className="tiny-five-item">
											<TinySlider settings={settings}>
												{destinationData.destinations[continent].map(
													(country) => (
														<li key={country.country}>
															<DestinationSliderCard
																image={country.image}
																place={country.country}
																hotels={country.cities.join(", ")}
															/>
														</li>
													)
												)}
											</TinySlider>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export const DestinationSliderCard = ({ image, place, hotels }) => {
	return (
		<div className="tiny-slide">
			<div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800 m-2">
				<img
					src={image}
					className="w-full h-72 object-cover scale-125 group-hover:scale-100 duration-500"
					alt=""
				/>
				<div className="absolute inset-0 bg-gradient-to-b to-slate-900 from-transparent opacity-0 group-hover:opacity-100 duration-500"></div>
				<div className="absolute p-4 top-0 bottom-0 start-0 h-full w-full flex flex-col justify-between">
					<div>
						<Link
							to=""
							className="text-lg font-semibold text-indigo-900 hover:text-red-500 duration-500 ease-in-out"
						>
							{place}
						</Link>
						<p className="text-indigo-900/80 group-hover:text-white text-sm duration-500">
							{hotels}
						</p>
					</div>

					<div className="flex justify-end w-full mt-4">
						<a
							href="/destinations/paris"
							className="bg-white font-medium px-2 py-1 w-full text-center rounded text-indigo-900 hover:bg-indigo-900 hover:text-white text-sm duration-500"
						>
							View Destination
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
