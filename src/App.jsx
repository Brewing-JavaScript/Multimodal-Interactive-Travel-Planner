// // import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Recommendation from './Imagefetch/Recommendation'

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}

//       {/* <Recommendation/> */}
//     </>
//   )
// }

// export default App


// import React from 'react';
// import Recommendation from './Imagefetch/Recommendation';

// const App = () => {
//   // Example latitude and longitude for a location (e.g., New York City)
//   // const latitude = 40.7128;
//   // const longitude = -74.0060;

//   return (
//     <div className="App">
//       <h1>Nearby Tourist Attractions</h1>
//       <Recommendation latitude={40.7128} longitude={-74.0060} />
//     </div>
//   );
// };

// export default App;



// App.js
// import React from 'react';
// import RecommendedPlaces from './RecommendedPlaces/RecommendedPlaces';

// const App = () => {
//   // Example recommended places data
//   const recommendedPlaces = [
//     { name: 'Example Place 1', address: '123 Main St', image: 'https://example.com/image1.jpg' },
//     { name: 'Example Place 2', address: '456 Elm St', image: 'https://example.com/image2.jpg' },
//     // Add more recommended places as needed
//   ];

//   return (
//     <div className="app">
//       <h1>Recommended Places</h1>
//       <RecommendedPlaces recommendedPlaces={recommendedPlaces} />
//     </div>
//   );
// };

// export default App;
// App.js
import React from 'react';
import RecommendedPlaces from './RecommendedPlaces/RecommendedPlaces';

const App = () => {
  // Example recommended places data related to Taj Mahal
  const recommendedPlaces = [
    { name: 'Agra Fort', address: 'Rakabganj, Agra, Uttar Pradesh, India', image: 'https://example.com/agra_fort.jpg' },
    { name: 'Fatehpur Sikri', address: 'Fatehpur Sikri, Agra, Uttar Pradesh, India', image: 'https://example.com/fatehpur_sikri.jpg' },
    { name: 'Mehtab Bagh', address: 'Opposite Taj Mahal, Agra, Uttar Pradesh, India', image: 'https://example.com/mehtab_bagh.jpg' },
    // Add more recommended places as needed
  ];

  return (
    <div className="app">
      <h1 className="text-3xl font-bold mb-6">Recommended Places near Taj Mahal</h1>
      <RecommendedPlaces recommendedPlaces={recommendedPlaces} />
    </div>
  );
};

export default App;
