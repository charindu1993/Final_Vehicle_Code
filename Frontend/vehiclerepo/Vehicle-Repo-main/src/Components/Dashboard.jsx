import React, { useContext, useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import DataContext from "../store/store";
import Navbar from "./Navbar";
import axios from "axios";

function Dashboard() {
  const ctx = useContext(DataContext);
  const [dataSource, setDataSource] = useState();
  const [selectedCar, setselectedCar] = useState(
    JSON.parse(localStorage.getItem("selectedCar"))
  );
  const [vehicleReminder, setVehicleReminder] = useState([]);
  const [maintenanceReminder, setMaintenanceReminder] = useState([]);
  const [isVehicleChanged, setVehicleChanged] = useState();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const date = new Date().toLocaleDateString();

  useEffect(() => {
    async function Call() {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/getvehicledata/${userData.userID}`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        localStorage.setItem("carData", JSON.stringify(data));
        setDataSource(data);
        if (!selectedCar) {
          setselectedCar(data[0]);
        }
        localStorage.setItem("selectedCar", JSON.stringify(data[0]));
      } catch (err) {
        console.log("err", err);
        alert(err.response?.data?.message);
      }
    }

    Call();
  }, []);
  useEffect(() => {
    if (selectedCar?.data.documentationData?.length > 0) {
      const reminders = selectedCar.data.documentationData.filter((elem) => {
        const expireDay = elem.endDate.split("/")[1];
        return new Date().getDate() - expireDay <= 3;
      });
      setVehicleReminder(reminders);
    } else {
      setVehicleReminder([]);
    }
    if (selectedCar?.data.maintenanceData?.length > 0) {
      const reminder = selectedCar.data.maintenanceData.filter((elem) => {
        return userData.totalMileage < Number(elem.km);
      });
      setMaintenanceReminder(reminder);
    } else if (!userData.totalMileage) {
      setMaintenanceReminder([]);
    } else {
      setMaintenanceReminder([]);
    }
  }, [selectedCar]);

  // const data =dataSource&& dataSource.map((elem) => {
  const changeHandler = (ind) => {
    return ctx.setCar(ind);
  };

  const logoutH = () => {
    ctx.logout();
  };
  return (
    <>
      <div className="dashboard">
        <div className="nav">
          <img
            src="https://s3-alpha-sig.figma.com/img/faba/2752/6538bec34335abcad69571793b99bc1f?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GMEBYavZ26OzLiBgiZb-Z-qsIFQ6MyNbCqqTlQphlc4ih796FWdO6rGmCgZ~FNNfOB6BpRvhpmAMrOWOdKDYf8GeRqhNH8OwhYyyCnWVxobaFs4I3G2jjwDMa6IUV6OltQhDBfDkdzSgifAX2H458m1miUCWm~xEWyLzE4T95I2c2tMCwV0jBe~QgqBko6V~RtFftiUXHrjUHO2zsHhcdfF3KH4AkIVs~BB-3cIVGVcANyzSQB0tX25kLPXmZw~1oMzAK9Ec7yAmwIlpMPE94MlCByod2DkG24xq96GMPA2tG4vkGuPJqeYdJ6jiYaEq-4gxzVf0Z7SRqGcEuvpoWQ__"
            id="carimg"
            alt=""
          />
          <h4 id="color">VEHICLE MAINTAINENCE TRAckER</h4>
          <div className="navchild" onClick={logoutH}>
            <h4>LOGOUT</h4>
            <img src="sign.png" alt="" />
          </div>
        </div>
        <div className="col-xl-9 mx-auto mt-3 title ">
          <Navbar />{" "}
        </div>
        {dataSource?.length > 0 ? (
          <div className="side mt-1">
            <img src={selectedCar?.data.image_url} alt="" />
            {/* <NavDropdown title="Toyota Axio" id="collapsible-nav-dropdown"> */}
            <NavDropdown
              title={`${selectedCar?.data.make} ${selectedCar?.data.model}`}
              id="collapsible-nav-dropdown"
            >
              {dataSource?.length > 1 &&
                dataSource.map((elem, ind) => {
                  return (
                    elem.id !== selectedCar?.id && (
                      <NavDropdown.Item
                        onClick={() => {
                          setselectedCar(elem);
                          setVehicleReminder([]);
                          setVehicleChanged((prev) => !prev);
                          localStorage.setItem(
                            "selectedCar",
                            JSON.stringify(elem)
                          );
                        }}
                        key={ind}
                      >
                        <img
                          src={elem.data.image_url}
                          alt="React Bootstrap logo"
                          style={{
                            width: "45px",
                            height: "45px",
                            marginRight: "5px",
                          }}
                        />
                        {elem.data.make} {elem.data.model}
                      </NavDropdown.Item>
                    )
                  );
                })}
            </NavDropdown>
          </div>
        ) : (
          <h6> NO Cars</h6>
        )}
        <div className="col-xl-8 mx-auto spinners">
          <div className="sppinerz">
            <div className="sppiner">
              {maintenanceReminder?.length > 0 ? (
                <div className="side mt-1">
                  {/* <img src={selectedCar?.data.image_url} alt="" /> */}
                  {/* <NavDropdown title="Toyota Axio" id="collapsible-nav-dropdown"> */}
                  <NavDropdown
                    title={`VEHICLE MAINTENANCE REMINDERS`}
                    id="collapsible-nav-dropdown"
                  >
                    {maintenanceReminder?.length > 0 &&
                      maintenanceReminder.map((elem, ind) => {
                        return (
                          <NavDropdown.Item
                            // onClick={() => {
                            //   setselectedCar(elem);
                            //   localStorage.setItem(
                            //     "selectedCar",
                            //     JSON.stringify(elem)
                            //   );
                            // }}
                            key={ind}
                          >
                            {/* <img
                                src={elem.data.image_url}
                                alt="React Bootstrap logo"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  marginRight: "5px",
                                }}
                              /> */}
                            {elem.maintenanceType} exceeded Mileage
                          </NavDropdown.Item>
                        );
                      })}
                  </NavDropdown>
                </div>
              ) : (
                <h6> NO MAINTENANCE REMINDERS</h6>
              )}
            </div>
            <div className="sppiner">
              {/* <div className="spin">Is div m spinner dalna</div> */}
              {vehicleReminder?.length > 0 ? (
                <div className="side mt-1">
                  {/* <img src={selectedCar?.data.image_url} alt="" /> */}
                  {/* <NavDropdown title="Toyota Axio" id="collapsible-nav-dropdown"> */}
                  <NavDropdown
                    title={`VEHICLE DOCUMENTATION REMINDERS`}
                    id="collapsible-nav-dropdown"
                  >
                    {vehicleReminder?.length > 0 &&
                      vehicleReminder.map((elem, ind) => {
                        return (
                          <NavDropdown.Item
                            // onClick={() => {
                            //   setselectedCar(elem);
                            //   localStorage.setItem(
                            //     "selectedCar",
                            //     JSON.stringify(elem)
                            //   );
                            // }}
                            key={ind}
                          >
                            {/* <img
                                src={elem.data.image_url}
                                alt="React Bootstrap logo"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  marginRight: "5px",
                                }}
                              /> */}
                            {elem.documentationType} expires at {elem.endDate}
                          </NavDropdown.Item>
                        );
                      })}
                  </NavDropdown>
                </div>
              ) : (
                <h6> NO DOCUMENTATION REMINDERS</h6>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-9 mx-auto mt-3 details">
          <h5 className="text-center pt-2" id="color">
            recent month logs
          </h5>
          <div className="dhead">
            <div className="dhead2">
              <h5>total distance</h5>
              <h6 id="color2">lkr {userData?.totalMileage}</h6>
            </div>
            <div className="dhead2">
              <h5>service cost</h5>
              <h6 id="color2">100,005km</h6>
            </div>

            <div className="dhead2">
              <h5>date</h5>
              <h6 id="color2">{date}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
