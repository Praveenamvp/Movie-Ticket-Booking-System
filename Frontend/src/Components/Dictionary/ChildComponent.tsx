// import React, { useState } from "react";
// import LocationDic from "../../Models/LocationDic";

// interface ChildProps {
//   locationData: any;
// }

// const ChildComponent: React.FC<ChildProps> = ({ locationData }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div className="child-location">
      
// {locationData.name}
//       {isOpen && locationData.locationChild && (
//         <div className="child-locations">
//           {locationData.locationChild.Object.Array().map((child: any) => (
//             <ChildComponent key={child.uid} locationData={child} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChildComponent;
