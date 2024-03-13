// RecommendedPlaces.js
import React from 'react';

// const RecommendedPlaces = ({ recommendedPlaces }) => {
//   return (
//     <div className="recommended-places">
//       {recommendedPlaces.map((place, index) => (
//         <div key={index} className="card">
//           <img src={place.image} alt={place.name} /> {/* Image of the recommended place */}
//           <div className="card-details">
//             <h2>{place.name}</h2>
//             <p>{place.address}</p> {/* Address of the recommended place */}
//             {/* You can add more details like ratings, reviews, etc. */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecommendedPlaces;


// RecommendedPlaces.js
// import React from 'react';

// const RecommendedPlaces = ({ recommendedPlaces }) => {
//   const handleAddressClick = (address) => {
//     // Open a map when the address is clicked
//     window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
//   };

//   return (
//     <div className="recommended-places grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//       {recommendedPlaces.map((place, index) => (
//         <div key={index} className="card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleAddressClick(place.address)}>
//           <img src={place.image} alt={place.name} className="w-full h-48 object-cover object-center" /> {/* Image of the recommended place */}
//           <div className="card-details p-4">
//             <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
//             <p className="text-gray-600 cursor-pointer" onClick={() => handleAddressClick(place.address)}>{place.address}</p> {/* Address of the recommended place */}
//             {/* You can add more details like ratings, reviews, etc. */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecommendedPlaces;
// RecommendedPlaces.js
// import React from 'react';

// const RecommendedPlaces = ({ recommendedPlaces }) => {
//   const handleAddressClick = (address) => {
//     // Open a map when the address is clicked
//     window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
//   };

//   return (
//     <div className="recommended-places grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//       {recommendedPlaces.map((place, index) => (
//         <div key={index} className="card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleAddressClick(place.address)}>
//           <img src={place.image} alt={place.name} className="w-full h-48 object-cover object-center" /> {/* Image of the recommended place */}
//           <div className="card-details p-4">
//             <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
//             <p className="text-gray-600 cursor-pointer hover:underline" onClick={() => handleAddressClick(place.address)}>{place.address}</p> {/* Address of the recommended place */}
//             {/* You can add more details like ratings, reviews, etc. */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecommendedPlaces;

// RecommendedPlaces.js
// import React from 'react';

const RecommendedPlaces = ({ recommendedPlaces }) => {
  const handleAddressClick = (address) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="recommended-places grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {recommendedPlaces.map((place, index) => (
        <div key={index} className="card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleAddressClick(place.address)}>
          <img src={place.image} alt={place.name} className="w-full h-48 object-cover object-center rounded-t-lg" /> {/* Image of the recommended place */}
          <div className="card-details p-4">
            <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
            <p className="text-gray-600 cursor-pointer hover:underline" onClick={() => handleAddressClick(place.address)}>{place.address}</p> {/* Address of the recommended place */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500">Rating: {place.rating || "N/A"}</span> {/* Rating of the place */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Book Now</button> {/* Button to book the place */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedPlaces;



