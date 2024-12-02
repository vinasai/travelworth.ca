import React, { useState } from "react";
import { Link } from "react-router-dom";

const data = {
	thingsToDo: [
		{
			id: 1,
			name: "Visit Eiffel Tower",
			description:
				"Enjoy panoramic views of Paris from the top of this iconic structure.",
			image:
				"https://images.pexels.com/photos/3879160/pexels-photo-3879160.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
		{
			id: 2,
			name: "Boat Ride on the Seine",
			description:
				"Cruise along the Seine and see Paris from a unique perspective.",
			image:
				"https://images.pexels.com/photos/17856787/pexels-photo-17856787/free-photo-of-seine-river-in-paris.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
	],
	cultureHistory: [
		{
			title: "Louvre Museum",
			image:
				"https://images.pexels.com/photos/5101215/pexels-photo-5101215.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"As one of the largest and most visited museums in the world, the Louvre is home to over 35,000 pieces of art, including Leonardo da Vinci’s 'Mona Lisa' and the ancient Greek statue of 'Venus de Milo.' A visit to the Louvre offers an unparalleled opportunity to dive deep into the history of art, culture, and civilization.",
		},
		{
			title: "Notre-Dame Cathedral",
			image:
				"https://images.pexels.com/photos/5090479/pexels-photo-5090479.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"This gothic masterpiece, with its towering spires and intricate stained-glass windows, has stood as a symbol of Paris since the 12th century. Although it was damaged by a fire in 2019, the cathedral remains an iconic piece of French history and continues to attract millions of visitors every year.",
		},
		{
			title: "Versailles Palace",
			image:
				"https://images.pexels.com/photos/15190886/pexels-photo-15190886/free-photo-of-a-photo-of-a-cafe-with-tables-and-chairs.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"Located just outside Paris, the Palace of Versailles is a symbol of the opulence and grandeur of the French monarchy. Visitors can explore the magnificent Hall of Mirrors, the lush gardens, and the royal chambers, all of which tell the story of the reign of Louis XIV, also known as the Sun King.",
		},
		{
			title: "Sainte-Chapelle",
			image:
				"https://images.pexels.com/photos/13742843/pexels-photo-13742843.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"A hidden gem in the heart of Paris, Sainte-Chapelle is a stunning gothic chapel known for its towering stained-glass windows that depict biblical scenes in vivid color. Built in the 13th century to house Christian relics, it is considered one of the finest examples of French Gothic architecture.",
		},
		{
			title: "Pantheon",
			image:
				"https://images.pexels.com/photos/4452030/pexels-photo-4452030.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"Originally built as a church, the Panthéon now serves as a mausoleum for some of France's greatest intellectuals and leaders, such as Voltaire, Rousseau, Victor Hugo, and Marie Curie. It stands as a testament to the nation’s revolutionary ideals and its dedication to honor those who have shaped its history.",
		},
		{
			title: "The Latin Quarter",
			image:
				"https://images.pexels.com/photos/28937005/pexels-photo-28937005/free-photo-of-winged-victory-of-samothrace-in-louvre-museum.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"Steeped in academic and intellectual history, the Latin Quarter is home to the famous Sorbonne University and has been the center of Parisian scholarly life for centuries. It’s a place where philosophy, literature, and political thought flourished, with picturesque streets that have remained largely unchanged for hundreds of years.",
		},
		{
			title: "Arc de Triomphe",
			image:
				"https://images.pexels.com/photos/19407541/pexels-photo-19407541/free-photo-of-autumn-in-tuileries-garden.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"Commissioned by Napoleon Bonaparte after his victory at Austerlitz, the Arc de Triomphe stands proudly at the western end of the Champs-Élysées. The monument honors those who fought and died for France in the French Revolutionary and Napoleonic Wars. It offers a panoramic view of Paris from its rooftop.",
		},
		{
			title: "Musée d'Orsay",
			image:
				"https://images.pexels.com/photos/19395821/pexels-photo-19395821/free-photo-of-art-nouveau-sign-above-the-entrance-to-the-pere-lachaise-metro-station-in-paris.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"Housed in a former railway station, the Musée d'Orsay boasts one of the finest collections of Impressionist and Post-Impressionist masterpieces. Visitors can enjoy works by Monet, Van Gogh, Renoir, and Degas, which provide a glimpse into the artistic revolution that took place in the late 19th century.",
		},
		{
			title: "The Seine River",
			image:
				"https://images.pexels.com/photos/23229892/pexels-photo-23229892/free-photo-of-the-basilica-of-the-sacred-heart-of-montmartre-in-paris-france.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"The Seine is more than just a river that runs through Paris—it’s a living symbol of the city’s history and culture. Many of Paris' most iconic landmarks are built along its banks, including the Eiffel Tower, Notre-Dame Cathedral, and the Louvre. Taking a boat ride on the Seine offers a unique perspective on the city’s grand architecture and historical sites.",
		},
		{
			title: "Montmartre",
			image:
				"https://images.pexels.com/photos/17646158/pexels-photo-17646158/free-photo-of-paris-cityscape-with-eiffel-tower-behind.jpeg?auto=compress&cs=tinysrgb&w=800",
			description:
				"Known for its artistic history, Montmartre was once the home of some of the world’s most famous artists, including Picasso, Van Gogh, and Toulouse-Lautrec. The area is famous for its bohemian vibe, narrow cobblestone streets, and the beautiful Sacré-Cœur Basilica, which offers stunning views of the city.",
		},
	],
	foodDrinks: [
		{
			id: 1,
			name: "Croissant",
			description: "Taste the buttery, flaky, and delicious French pastry.",
			image:
				"https://images.pexels.com/photos/3993720/pexels-photo-3993720.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
		{
			id: 2,
			name: "French Wine",
			description:
				"Savor a glass of world-class French wine from various regions.",
			image:
				"https://images.pexels.com/photos/8531229/pexels-photo-8531229.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
	],
	cityTopSights: [
		{
			id: 1,
			name: "Eiffel Tower",
			description:
				"A wrought-iron lattice tower on the Champ de Mars, named after Gustave Eiffel.",
			image:
				"https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
		{
			id: 2,
			name: "Louvre Museum",
			description:
				"The world's largest museum and a historic monument in Paris, known for housing the Mona Lisa.",
			image:
				"https://images.pexels.com/photos/1460145/pexels-photo-1460145.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
		{
			id: 3,
			name: "Notre-Dame Cathedral",
			description:
				"A masterpiece of French Gothic architecture, known for its beautiful stained-glass windows.",
			image:
				"https://images.pexels.com/photos/1796725/pexels-photo-1796725.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
		{
			id: 4,
			name: "Montmartre",
			description:
				"A historic area on the hill of Paris known for its artistic history and the Sacré-Cœur Basilica.",
			image:
				"https://images.pexels.com/photos/2738173/pexels-photo-2738173.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
		{
			id: 5,
			name: "Champs-Élysées",
			description:
				"One of the most famous avenues in the world, stretching from the Arc de Triomphe to Place de la Concorde.",
			image:
				"https://images.pexels.com/photos/3073666/pexels-photo-3073666.jpeg?auto=compress&cs=tinysrgb&w=800",
		},
	],
};

export default function CityDestination() {
	const [selectedSight, setSelectedSight] = useState(null);

	const openModal = (sight) => {
		setSelectedSight(sight);
	};

	const closeModal = () => {
		setSelectedSight(null);
	};

	return (
		<div className="container relative">
			{/* Overview */}
			<section>
				<div className="grid grid-cols-1 pb-8 text-center">
					<h3 className="mb-3 md:text-3xl mt-5 text-2xl md:leading-normal leading-normal font-semibold">
						Overview
					</h3>

					<p className="text-slate-700 max-w-full mx-auto">
						Welcome to the mesmerizing realm of Paris, city where every
						cobblestone holds whispers of history and every avenue unfurls a
						tapestry of experiences. Each neighborhood is a world of its own, a
						unique chapter in this epic novel of art, culture, and life. From
						the bohemian spirit of Montmartre to the timeless elegance of the
						Latin Quarter and the ancient heartbeat of the Ile de la Cité, Paris
						city is a kaleidoscope of emotions waiting to be explored. It's not
						just a city; it's a realm where even the stones are storytellers,
						where every corner is a masterpiece, and where every bite is an ode
						to gastronomic delight, guided by the ingenious pastry maestro, Nina
						Metayer, awarded as the world's best pastry chef in 2023!
					</p>
				</div>
			</section>

			{/* Top Sights to Visit */}
			<section>
				<div className="grid grid-cols-1 relative mt-6">
					<div className="tiny-three-item">
						<div className="p-4 max-w-screen-lg mx-auto">
							<h2 className="text-3xl font-bold text-center mb-7">
								Top Sights to Visit in Paris
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
								{data.cityTopSights.map((sight) => (
									<div
										key={sight.id}
										className="bg-white rounded-lg shadow-lg overflow-hidden"
									>
										<img
											src={sight.image}
											alt={sight.name}
											className="w-full h-48 object-cover"
										/>
										<div className="p-4">
											<h2 className="text-2xl font-semibold mb-2">
												{sight.name}
											</h2>
											<p className="text-gray-600 text-sm">
												{sight.description.slice(0, 100)}...
											</p>
											<button
												onClick={() => openModal(sight)}
												className="text-blue-500 mt-2 inline-block"
											>
												Read More
											</button>
										</div>
									</div>
								))}
							</div>

							<CityReadMoreModal
								sight={selectedSight}
								closeModal={closeModal}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Things to Do */}
			<CommonCityGuide
				title="Things to Do"
				description="Paris, the City of Light, offers a wealth of unforgettable experiences for every type of traveler. Whether you’re marveling at iconic landmarks like the Eiffel Tower and the Louvre, exploring charming neighborhoods such as Montmartre, or cruising along the Seine River, Paris is brimming with captivating attractions. The city is a perfect blend of history, art, culture, and romance, offering visitors an array of things to do, from shopping along the Champs-Élysées to savoring world-class cuisine in bistros and cafés. With its timeless beauty and vibrant atmosphere, Paris is sure to leave a lasting impression on anyone who visits."
				items={data.thingsToDo}
			/>

			{/* Culture & History */}
			<div className="container mx-auto px-4 py-10">
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-6">Culture & History</h2>

					<p className="text-gray-700 mb-6">
						Paris is not only known for its modern elegance and romantic charm
						but also for its rich historical and cultural heritage that spans
						centuries. The city is a living museum, offering a glimpse into its
						past through awe-inspiring architecture, famous landmarks, and
						world-renowned museums. Here are some of the most significant
						cultural and historical attractions you should explore:
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
						{data.cultureHistory.map((item, index) => (
							<div key={index} className="card border  shadow-lg rounded-lg">
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-48 object-cover rounded-md mb-4"
								/>
								<div className="px-4 pb-4">
									<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
									<p>{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>

			{/* Food & Drinks */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="flex flex-col justify-center">
					<h2 className="text-3xl font-bold mb-4">Food & Drinks in Paris</h2>

					<p className="text-gray-700 mb-6">
						Paris is a paradise for food lovers, offering a rich tapestry of
						flavors that range from classic French cuisine to modern gastronomic
						delights. The city is renowned for its bakeries, where you can savor
						freshly baked croissants, baguettes, and delicate pastries like
						éclairs and macarons. Parisian cafés are the perfect spots to enjoy
						a café au lait and people-watch, while the vibrant bistros serve up
						iconic dishes such as coq au vin, escargots, and crème brûlée.
						Whether you're indulging in a decadent multi-course meal at a
						Michelin-starred restaurant or grabbing a quick bite at a local
						café, Paris promises a culinary experience that will delight your
						senses and leave you wanting more.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
					{data.foodDrinks.map((item) => (
						<div
							key={item.id}
							className="bg-white rounded-md shadow-lg overflow-hidden h-fit"
						>
							<img
								src={item.image}
								alt={item.name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h3 className="text-xl font-semibold mb-2">{item.name}</h3>
								<p className="text-sm text-gray-600">
									{item.description.slice(0, 100)}...
								</p>
								<button
									className="text-blue-500 mt-2 inline-block"
									onClick={() => alert("You clicked Read More!")}
								>
									Read More
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export const CityCard = ({ image, place, hotels }) => {
	return (
		<div className="tiny-slide">
			<div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800 m-2">
				<img
					src={image}
					className="w-full h-72 object-cover scale-125 group-hover:scale-100 duration-500"
					alt=""
				/>
				<div className="absolute inset-0 bg-gradient-to-b to-slate-900 from-transparent opacity-0 group-hover:opacity-100 duration-500"></div>
				<div className="absolute p-4 bottom-0 start-0">
					<Link
						to=""
						className="text-lg font-medium text-white hover:text-red-500 duration-500 ease-in-out"
					>
						{place}
					</Link>
					<p className="text-white/70 group-hover:text-white text-sm duration-500">
						{hotels}
					</p>
				</div>
			</div>
		</div>
	);
};

export const CityReadMoreModal = ({ sight, closeModal }) => {
	if (!sight) return null;

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-4 rounded-lg w-96 max-w-full relative">
				<button
					onClick={closeModal}
					className="absolute top-4 right-4 text-2xl bg-slate-300 px-3 leading-none rounded text-gray-500 hover:text-gray-800"
				>
					&times;
				</button>
				<h2 className="text-2xl font-semibold mb-4">{sight.name}</h2>
				<img
					src={sight.image}
					alt={sight.name}
					className="w-full h-64 object-cover rounded mb-4"
				/>
				<p className="text-gray-600">{sight.description}</p>
			</div>
		</div>
	);
};

export const CommonCityGuide = ({ title, description, items }) => {
	return (
		<div className="mb-12">
			<h2 className="text-3xl font-bold text-center mb-4 mt-8">{title}</h2>

			{description && <p className="text-gray-700 mb-6">{description}</p>}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{items.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-md shadow-lg overflow-hidden"
					>
						<img
							src={item.image}
							alt={item.name}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h3 className="text-xl font-semibold mb-2">{item.name}</h3>
							<p className="text-gray-600">
								{item.description.slice(0, 100)}...
							</p>
							<button
								className="text-blue-500 mt-2 inline-block"
								onClick={() => alert("You clicked Read More!")}
							>
								Read More
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
