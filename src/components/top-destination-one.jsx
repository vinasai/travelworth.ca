import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TinySlider from "tiny-slider-react";
import "tiny-slider/dist/tiny-slider.css";

export default function TopDestinationOne() {
  const [topDestinations, setTopDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopDestinations();
  }, []);

  const fetchTopDestinations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/destinations`
      );
      const topDestinations = response.data.filter(
        (dest) => dest.isTopDestination
      );
      setTopDestinations(topDestinations);
      setError(null);
    } catch (err) {
      setError("Failed to fetch top destinations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    container: ".tiny-five-item",
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
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
      1025: { items: 5 },
      992: { items: 4 },
      767: { items: 3 },
      425: { items: 1 },
    },
  };

  return (
    <div className="container relative">
      <div className="grid grid-cols-1 pb-8 text-center">
        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
          Top Destinations
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Planning for a trip? We will organize your trip with the best places
          and within the best budget!
        </p>
      </div>

      <div className="grid grid-cols-1 relative mt-6">
        {loading ? (
          <p>Loading top destinations...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="tiny-five-item">
            <TinySlider settings={settings}>
              {topDestinations.map((item, index) => (
                <div className="tiny-slide" key={index}>
                  <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800 m-2">
                    {item.imageUrl && (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}${item.imageUrl}`}
                        alt={item.name}
                        className="w-full h-72 object-cover scale-125 group-hover:scale-100 duration-500"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b to-slate-900 from-transparent opacity-0 group-hover:opacity-100 duration-500"></div>
                    <div className="absolute p-4 bottom-0 start-0">
                      <Link
                        to=""
                        className="text-lg font-medium text-white hover:text-red-500 duration-500 ease-in-out"
                      >
                        {item.name}
                      </Link>
                      <p className="text-white/70 group-hover:text-white text-sm duration-500">
                        {item.hotels} hotels available
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </TinySlider>
          </div>
        )}
      </div>
    </div>
  );
}
