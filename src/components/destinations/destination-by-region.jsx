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
			<div className="grid grid-cols-1 pb-8 text-center">
				<h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
					Destinations by Region
				</h3>

				<p className="text-slate-400 max-w-xl mx-auto">
					Planning for a trip? We will organize your trip with the best places
					and within best budget!
				</p>
			</div>

			<div className="grid grid-cols-1 relative mt-6">
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
				<div className="absolute p-4 bottom-0 start-0 w-full">
					<Link
						to=""
						className="text-lg font-medium text-white hover:text-red-500 duration-500 ease-in-out"
					>
						{place}
					</Link>
					<p className="text-white/70 group-hover:text-white text-sm duration-500">
						{hotels}
					</p>

					<div className="flex justify-end">
						<a
							href="/destinations/paris"
							className="bg-white font-medium px-2 py-1 rounded text-indigo-900 hover:bg-indigo-900 hover:text-white text-sm duration-500"
						>
							View Destination
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
