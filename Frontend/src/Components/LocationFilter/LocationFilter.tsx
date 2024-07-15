import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineCloseSquare } from "react-icons/ai";
import LocationService from "../../Services/LocationService";
import Child from "../Child/Child";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLocationName,
  updateLocationUID,
  updateModelState,
  updateTicketState,
} from "../../Redux/Action";
import LocationDic from "../../Models/LocationDic";
import "../LocationFilter/LocationFilter.css"

function LandingFilterComponent() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [locations, setLocations] = useState<LocationDic[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const ticketBooking = useSelector((state: any) => state);
  const [locationName, setLocationName] = useState<string>(
    ticketBooking.filterLocationName
  );
  const [locationUID, setLocationUID] = useState<string>(
    ticketBooking.filterLocationUID
  );

  const fetchLocations = async () => {
    try {
      const locationsData = await LocationService.fetchAllLocations();
      setLocations(locationsData);
      console.log(locationsData);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const closeModal = () => {
    dispatch(updateLocationUID(locationUID));
    dispatch(updateLocationName(locationName));
    dispatch(updateModelState(false));
  };

  const setState = () => {
    setLocationName("");
    setLocationUID("");
    dispatch(updateTicketState(false));
  };

  const handleSearch = (searchData: string) => {
    const filtered = locations.filter((location: LocationDic) =>
      location.name.toLowerCase().includes(searchData.toLowerCase())
    );
    setLocations(filtered);
    setSearchValue(searchData);
  };

  const fetchId = (uid: string, name: string) => {
    setIsButtonDisabled(false);
    setLocationName(name);
    setLocationUID(uid);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    const filtered = locations.filter((location: LocationDic) =>
      location.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setLocations(filtered);
  }, [searchValue]);

  return (
    <div>
      <Modal
        isOpen={ticketBooking.modelState}
        onRequestClose={closeModal}
        contentLabel="Popup Content"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "40%",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 0,
          },
        }}
      >
        <div>
          <input
            type="text"
            id="searchInput"
            value={searchValue}
            placeholder=" 🔍 Enter search term"
            style={{ width: "90%" }}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <i onClick={closeModal}>
            <AiOutlineCloseSquare className="model-close" />
          </i>
        </div>

        <div>
          <h2>Locations</h2>
          <div>
            {locations.map((location: LocationDic, index) => (
              <div key={index}>
                <Child locationData={location} passId={fetchId} />
              </div>
            ))}
          </div>
          <br />
          <div className="filter-model-button">
            <button
              className={isButtonDisabled ? "disabled-button" : "model-button"}
              onClick={setState}
            >
              Reset
            </button>
            <button
              className={isButtonDisabled ? "disabled-button" : "model-button"}
              onClick={closeModal}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LandingFilterComponent;
