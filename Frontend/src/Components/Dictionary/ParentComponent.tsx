// import React, { useEffect, useState } from "react";
// import LocationService from "../../Services/LocationService";
// import LocationDic from "../../Models/LocationDic";
// import ChildComponent from "./ChildComponent";



// function ParentComponent() {
//   var [locations, setLocations] = useState<LocationDic[]>([]);
//   var [data, setData] = useState<any[]>([]);


//   useEffect(() => {
//     fetchLocations();
//   }, []);
//   const fetchLocations = async () => {
//     try {
//       const locationsData = await LocationService.fetchAllLocations();
//       setLocations(locationsData);
//       const valuesArray = Object.values(locationsData)
//       setData(valuesArray);
//       data=valuesArray;
//       locations=locationsData;
//       console.log(valuesArray);
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//     }
//   };
//   return (
//     <div className="location-data">
        
//       {data.map((location: any,index) => (
//         <div className="location" key={location.uid}>
//           <div key={index}>
//                 <ChildComponent locationData={location} />
//               </div>
//         </div>
      
//       ))}
//     </div>
//   );
// }

// export default ParentComponent;
