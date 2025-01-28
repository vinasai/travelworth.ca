import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TinySlider from "tiny-slider-react";
import "tiny-slider/dist/tiny-slider.css";

const DestinationsByRegion = () => {
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState({}); // Store places for each destination by ID
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Fetch destinations and their places
  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/destinations`
      );
      setDestinations(res.data);

      // Fetch places for each destination
      res.data.forEach(async (destination) => {
        const placesRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/${destination._id}`
        );
        setPlaces((prevPlaces) => ({
          ...prevPlaces,
          [destination._id]: placesRes.data, // Store places for each destination
        }));
      });
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  const sliderSettings = {
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: false,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    controlsText: [
      '<i class="mdi mdi-chevron-left"></i>',
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

  // Filter destinations and places based on search query
  const filteredDestinations = destinations.filter((destination) => {
    // Check if the destination name matches the search query
    const destinationMatches = destination.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Check if any place within the destination matches the search query
    const placesForDestination = places[destination._id] || [];
    const placeMatches = placesForDestination.some((place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return destinationMatches || placeMatches;
  });

  return (
    <div className="container relative">
      <div className="grid grid-cols-1 pb-6 text-center">
        <h2 className="mb-3 md:text-5xl text-2xl md:leading-normal leading-normal font-semibold">
          Explore Destinations by Continent
        </h2>
        <p className="text-slate-400 max-w-full mx-auto text-lg">
          Ready to embark on an unforgettable journey? Discover the best
          destinations across the world, carefully categorized by continent.
          Whether you're seeking adventure, relaxation, or cultural experiences,
          we’ve got the perfect spots to suit your travel style and budget. Let
          us help you plan the trip of a lifetime with tailored recommendations
          from each corner of the globe!
        </p>
      </div>

      <section className="relative rounded-lg flex justify-center w-full mt-8">
        <form
          className="flex flex-col w-full max-w-[400px] sm:flex-row items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search a destination or place"
            className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003C74] text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto px-4 py-2 bg-[#003C74] text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            Search
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 relative mt-3">
        <div className="tiny-five-item">
          {filteredDestinations.map((destination) => (
            <div key={destination._id} className="mb-10">
              <h3 className="text-3xl font-semibold mb-4">
                {destination.name}
              </h3>
              <div className="grid grid-cols-1 relative mt-3">
                <div className="tiny-five-item">
                  {/* Check if places exist for this destination */}
                  {places[destination._id] &&
                  places[destination._id].length > 0 ? (
                    <TinySlider settings={sliderSettings}>
                      {places[destination._id].map((place) => (
                        <div key={place._id} className="p-2">
                          <DestinationCard
                            image={`${process.env.REACT_APP_BACKEND_URL}${
                              place.imageUrl || "/placeholder-image.jpg"
                            }`}
                            name={place.name}
                            overview={place.overview}
                            placeId={place._id}
                          />
                        </div>
                      ))}
                    </TinySlider>
                  ) : (
                    <p className="text-gray-500">
                      No places available for this destination.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DestinationCard = ({ image, name, overview, placeId }) => {
  return (
    <div className="tiny-slide">
      <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800 m-2">
        <img
          src={image}
          className="w-full h-72 object-cover scale-125 group-hover:scale-100 duration-500"
          alt={name}
        />
        <div className="absolute inset-0 bg-gradient-to-b to-slate-900 from-transparent opacity-0 group-hover:opacity-100 duration-500"></div>

        <div className="absolute p-4 top-0 bottom-0 start-0 h-full w-full flex flex-col justify-between">
          <h4 className="font-semibold text-lg truncate">{name}</h4>
          <Link
            to={`/places/${placeId}`}
            className="bg-white font-medium px-2 py-1 w-full text-center rounded text-indigo-900 hover:bg-indigo-900 hover:text-white text-sm duration-500"
          >
            View Destination
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationsByRegion;
