import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from "./navbar";
import Tagline from "./tagline";
import Footer from './footer';


const PlaceDetails = () => {
  const { placeId } = useParams(); // Get placeId from the route params
  const [placeDetails, setPlaceDetails] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const[CultureItems,setCulture] = useState([]);
  const[thingsToDoItems,setThingstodo] = useState([]);
  const[mustvisitplaceitems,setMustvisit] = useState([]);

  useEffect(() => {
    // Fetch Place Details
    const fetchPlaceDetails = async () => {
      try {
        const placeRes = await axios.get(`https://travelworth.ca/api/places/api/places/${placeId}`);
        setPlaceDetails(placeRes.data);
      } catch (err) {
        console.error('Error fetching place details:', err);
      }
    };

    // Fetch Food Items
    const fetchFoodItems = async () => {
      try {
        const foodRes = await axios.get(`https://travelworth.ca/api/food/${placeId}`);
        setFoodItems(foodRes.data);
      } catch (err) {
        console.error('Error fetching food items:', err);
      }
    };

       // Fetch Culture Items
       const fetchCultureItems = async () => {
        try {
          const CultureRes = await axios.get(`https://travelworth.ca/api/culture/${placeId}`);
          setCulture(CultureRes.data);
        } catch (err) {
          console.error('Error fetching Culture items:', err);
        }
      };

      const fetchThingstodo = async () => {
        try {
          const thingstodoRes = await axios.get(`https://travelworth.ca/api/thingsToDo/${placeId}`);
          setThingstodo(thingstodoRes.data);
        } catch (err) {
          console.error('Error fetching thingstodo items:', err);
        }
      };
      const fetchmustvisitplace = async () => {
        try {
          const mustvisitplaceRes = await axios.get(`https://travelworth.ca/api/mustvisit/${placeId}`);
          setMustvisit(mustvisitplaceRes.data);
        } catch (err) {
          console.error('Error fetching thingstodo items:', err);
        }
      };


    fetchmustvisitplace();
    fetchThingstodo();
    fetchCultureItems();
    fetchPlaceDetails();
    fetchFoodItems();
  }, [placeId]);


  
  if (!placeDetails) return <p>Loading...</p>;

  return (

    
<div >
   <Tagline/>
    <Navbar navclass="defaultscroll is-sticky tagline-height" navlight={true}
                       manuclass="justify-end nav-light"/>
<section
  className="relative md:pt-48 md:pb-40 py-36 table w-full items-center bg-top bg-no-repeat bg-cover"
  style={{
    backgroundImage: `url(https://travelworth.ca${placeDetails.imageUrl})`,
  }}
>
  <div className="absolute inset-0 bg-slate-900/50"></div> {/* Dark overlay */}
  <div className="container relative">
    <div className="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
      <div className="lg:col-span-8 md:col-span-7 md:order-1 order-2">
        <h5 className="text-2xl font-dancing text-white">#Destination</h5>
        <h4 className="font-bold text-white lg:leading-tight leading-tight text-6xl lg:text-8xl mb-6 mt-5">
          <div className="font-bold text-white lg:leading-tight leading-tight text-2xl lg:text-3xl mb-0 mt-5">
            Discover
          </div>
          {placeDetails.name}
        </h4>
        <p className="text-white text-xl max-w-xl [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          From iconic landmarks to charming streets, experience the heart of {placeDetails.name}.
        </p>
      </div>
    </div>
  </div>
</section>

    
    
    {/* Overview */}
    <div className='container relative'>
 
			<section>
    
				<div className="grid grid-cols-1 pb-8 text-center">

      
					<h3 className="mb-3 md:text-3xl mt-5 text-2xl md:leading-normal leading-normal font-semibold">
						Overview
					</h3>

					<p className="text-slate-700 max-w-full mx-auto">
          {placeDetails.overview || 'Explore the best food and drink experiences this place has to offer.'}
					</p>
				</div>
			</section>

      {/* Top Sights to Visit */}
      <section>
        <div className="grid grid-cols-1 relative mt-6">
        <div className="tiny-three-item">
        <div className="p-4 max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-7">Top Sights to Visit</h2>
          
        </div>

      
        {/* things to do Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mustvisitplaceitems.length > 0 ? (
            mustvisitplaceitems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {item.imageUrl && (
                  <img
                    src={`https://travelworth.ca${item.imageUrl}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description.slice(0, 100)}...</p>
                  <button
                    className="text-blue-500 mt-2 inline-block"
                    onClick={() => alert("You clicked Read More!")}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No mustvisitplaceitems items available for this place.</p>
          )}
        </div>
        </div>
        </div>
       
        </section>



      <div className="mb-12">
        {/* Description */}
          <h2 className="text-3xl font-bold text-center mb-4 mt-8">Things to do </h2>
          <p className="text-gray-700 mb-6">
            {placeDetails.toverview || 'Explore the best things to do experiences this place has to offer.'}
          </p>
        </div>
        {/* things to do Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {thingsToDoItems.length > 0 ? (
            thingsToDoItems.map((item) => (
              <div key={item._id} className="bg-white rounded-md shadow-lg overflow-hidden">
                {item.imageUrl && (
                  <img
                    src={`https://travelworth.ca${item.imageUrl}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}...</p>
                  
                </div>
              </div>
            ))
          ) : (
            <p>No things to do items available for this place.</p>
          )}
        </div>
       
  


{/* culture Items */}
      <div className="container mx-auto px-4 py-10">
      <section className="mb-12">
        {/* Description */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Culture & History </h2>
          <p className="text-gray-700 mb-6">
          {placeDetails.coverview || 'Explore the best Culture & History experiences this place has to offer.'}
          </p>
        </div>

        {/* culture Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {CultureItems.length > 0 ? (
            CultureItems.map((item) => (
              <div key={item._id} className="card border  shadow-lg rounded-lg">
                {item.imageUrl && (
                  <img
                    src={`https://travelworth.ca${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p >{item.description}</p>
                  
                </div>
                
              </div>
              
            ))
          ) : (
            <p>No Culture and history  available for this place.</p>
          )}
        </div>
        </section>
        </div>

      {/* Food & Drinks Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Description */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Food & Drinks </h2>
          <p className="text-gray-700 mb-6">
          {placeDetails.foverview || 'Explore the best food and drink experiences this place has to offer.'}
          </p>
        </div>
        {/* Food Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <div key={item._id} className="bg-white rounded-md shadow-lg overflow-hidden h-fit">
                {item.imageUrl && (
                  <img
                    src={`https://travelworth.ca${item.imageUrl}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}...</p>
                
                </div>
              </div>
            ))
          ) : (
            <p>No food items available for this place.</p>
          )}
        </div>
        
      </div>
      
    </div>
    <Footer/>
    </div>
 
    
    
   
  );
  
};


export default PlaceDetails;
