import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = React.createContext({
  userData: {},
  carData: [],
  selectedCar: {},
  setCar() {},
  apiCall() {},
  logout() {},
});

export const DataContextProvider = (props) => {
  const [userData, setUserData] = useState();
  const [carData, setCarData] = useState([]);
  const [selectedCar, setselectedCar] = useState();
  const [callCall, setCall] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(userData);
  //   async function Call() {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:8001/getvehicledata/${userData.userID}`,

  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${userData.token}`,
  //           },
  //         }
  //       );
  //       setCarData(data);
  //       setselectedCar(data[0]);
  //     } catch (err) {
  //       alert(err);
  //     }
  //   }
  //   // localStorage.getItem("isLoggedIn") &&
  //   //   localStorage.getItem("access") &&
  //   Call();

  //   // return () => {};
  // }, [callCall]);
  const setApiCall = ({ userData }) => {
    // setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));

    // setCall((prev) => !prev);
  };
  const setCar = (ind) => {
    setselectedCar(carData.filter((car) => car._id === ind)[0]);
  };
  const Setlogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    localStorage.removeItem("carData");
    localStorage.removeItem("selectedCar");
    navigate("/login");
  };
  const updatedData = (arr) => {
    setCarData(arr);
  };
  return (
    <DataContext.Provider
      value={{
        carData: carData?.length > 0 && [...carData],
        userData: userData,
        selectedCar: selectedCar,
        setCar: setCar,
        apiCall: setApiCall,
        logout: Setlogout,
        data: updatedData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataContext;
