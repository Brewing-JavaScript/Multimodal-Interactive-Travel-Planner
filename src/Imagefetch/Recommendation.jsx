// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Recommendation = ({ latitude, longitude }) => {
//   const [attractions, setAttractions] = useState([]);

//   useEffect(() => {
//     const fetchAttractions = async () => {
//       try {
//         const response = await axios.get(
//           `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=tourist_attraction&key=YOUR_API_KEY`
//         );

//         const places = response.data.results;
//         const attractionsWithPhotos = await Promise.all(
//           places.map(async (place) => {
//             const photosResponse = await axios.get(
//               `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=photos&key=YOUR_API_KEY`
//             );

//             const photoRefs = photosResponse.data.result.photos;
//             const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRefs[0].photo_reference}&key=YOUR_API_KEY`;

//             return {
//               name: place.name,
//               vicinity: place.vicinity,
//               photoUrl: photoUrl,
//               rating: place.rating,
//               // You can add more details as needed
//             };
//           })
//         );

//         setAttractions(attractionsWithPhotos);
//       } catch (error) {
//         console.error('Error fetching attractions:', error);
//       }
//     };

//     fetchAttractions();
//   }, [latitude, longitude]);

//   return (
//     <div className="attractions-container">
//       {attractions.map((attraction, index) => (
//         <div className="attraction-card" key={index}>
//           <img src={attraction.photoUrl} alt={attraction.name} />
//           <div className="attraction-details">
//             <h2>{attraction.name}</h2>
//             <p>{attraction.vicinity}</p>
//             <p>Rating: {attraction.rating}</p>
//             {/* Add more details here */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Recommendation;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendation = ({ latitude, longitude }) => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(
          `https://api.foursquare.com/v2/venues/explore?client_id=PF132AI5S05EGWIPWACAKLQLVO04KA1CFA0VAKPZ4RIJDJDI&client_secret=MK5XLJ5RHX14RERAXFIXJK0WRIRP0TWYNXQWYCTKC43GWK5T&v=20220313&ll=${latitude},${longitude}&radius=5000&limit=10`
        );
console.log(response)
        // const venues = response.data.response.groups[0].items;
        // const attractionsData = venues.map((venue) => ({
        //   name: venue.venue.name,
        //   location: venue.venue.location,
        //   // You can add more details as needed
        // }));

        setAttractions(attractionsData);
      } catch (error) {
        console.error('Error fetching attractions:', error);
      }
    };

    fetchAttractions();
  }, [latitude, longitude]);

  return (
    <div className="attractions-container">
      {attractions.map((attraction, index) => (
        <div className="attraction-card" key={index}>
          <h2>{attraction.name}</h2>
          <p>Location: {attraction.location.address}</p>
          {/* Add more details here */}
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
