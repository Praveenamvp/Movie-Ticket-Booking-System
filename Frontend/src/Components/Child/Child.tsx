import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { LuBadgeCheck } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { updateName, updateTicketState } from "../../Redux/Action";
import LocationDic from "../../Models/LocationDic";
import "../Child/Child.css"
interface LocationProps {
  locationData: LocationDic;
  passId: (uid: string, name: string) => void;
}

function Child({ locationData, passId }: LocationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [arrowOpen, setArrowOpen] = useState(true);
  const dispatch = useDispatch();
  const ticketBooking = useSelector((state: any) => state);

  const toggle = () => {
    setIsOpen(!isOpen);
    setArrowOpen(!arrowOpen);
  };

  const handleClick = (uid: string, name: string) => {
    dispatch(updateTicketState(true));
    dispatch(updateName(name));
    passId(uid, name);
  };

  const fetchId = (uid: string, name: string) => {
    passId(uid, name);
  };

  return (
    <div className="location-data">
      <div className="location">
        {ticketBooking.name === locationData.name && ticketBooking.filterTickIcon ? (
          <div>
            <LuBadgeCheck className="clicked-icon" />
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="location-name"
          onClick={() => handleClick(locationData.uid, locationData.name)}
        >
          {locationData.name}
        </div>
        <div onClick={toggle}>
          {arrowOpen ? (
            <RiArrowDownSLine
              style={{ position: "relative", top: "4px", fontSize: "18px" }}
            />
          ) : (
            <RiArrowRightSLine
              style={{ position: "relative", top: "4px", fontSize: "18px" }}
            />
          )}
        </div>
      </div>

      {isOpen &&
        (locationData.locationChild ?? []).map(
          (location: LocationDic, index: number) => (
            <Child key={index} locationData={location} passId={fetchId} />
          )
        )}
    </div>
  );
}

export default Child;
