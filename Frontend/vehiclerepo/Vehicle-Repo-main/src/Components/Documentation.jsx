import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataContext from "../store/store";
import axios from "axios";
import Navbar from "./Navbar";

function Documentation() {
  const [file, setFile] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("");
  const ctx = useContext(DataContext);
  const [title, setTitle] = useState("VEHICLE REVENUE LISCENE");
  const [vehicleNo, setVehicle] = useState();
  const [documentNo, setDocument] = useState();
  const [name, setName] = useState();
  const [day, setDay] = useState();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isUpdated, setisUpdated] = useState();

  const [selectedCar, setselectedCar] = useState(
    JSON.parse(localStorage.getItem("selectedCar"))
  );
  const [dataSource, setDataSource] = useState(
    JSON.parse(localStorage.getItem("carData"))
  );
  const [a, setA] = useState(true);
  useEffect(
    () => {
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
          setselectedCar(data[0]);
          localStorage.setItem("selectedCar", JSON.stringify(data[0]));
        } catch (err) {
          console.log("err", err);
          alert(err.response?.data?.message);
        }
      }
      setStartDate(new Date());
      Call();
      // setDataSource(selectedCar);
    },
    [isUpdated],
    []
  );
  // useEffect(() => {
  //   async function Call() {
  //     try {
  //       const { data } = await axios.get(
  //         `https://vehicle-backend-final2.vercel.app/getdoc?id=${ctx.selectedCar._id}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             auth_token: localStorage.getItem("access")
  //               ? `Bearer ${localStorage.getItem("access")}`
  //               : null,
  //           },
  //         }
  //       );

  //       setVehicle(data.vehicle.vehicleNo);
  //       setName(data.vehicle.name);
  //       setDocument(data.vehicle.documentNo);
  //       setSelectedValue(data.vehicle.reminders);
  //       setStartDate(data.vehicle.startDate);
  //       setEndDate(data.vehicle.endDate);
  //       setDay(data.vehicle.reminderDays);

  //       setA((prev) => !prev);
  //     } catch (err) {
  //       // alert("Please Submit the data");
  //       setVehicle();
  //       setName();
  //       setDocument();
  //       setSelectedValue();
  //       setStartDate(new Date());
  //       setEndDate(new Date());
  //       setDay();
  //       setA((prev) => !prev);
  //     }
  //   }
  //   ctx.selectedCar && Call();
  //   console.log(ctx.selectedCar);
  //   setDataSource(ctx.carData);
  // }, [ctx]);
  const changeHandler = (ind) => {
    return ctx.setCar(ind);
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const sendApi = async () => {
    if (
      !vehicleNo ||
      !documentNo ||
      !name ||
      !day ||
      !startDate ||
      !endDate ||
      !selectedValue ||
      !file
    ) {
      return alert("Fillout all the fields");
    }

    console.log(
      vehicleNo,
      documentNo,
      name,
      day,
      startDate,
      endDate,
      selectedValue,
      file
    );
    try {
      await axios.put(
        `http://localhost:8001/updatedocumentdata/${selectedCar.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          params: {
            documentationType: title.toLowerCase(),
            vehicleNo,
            documentNo,
            name,
            day,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            selectedValue,
          },
        }
      );
      alert("data Submitted");
      setisUpdated((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    // try {
    //   await axios.post(
    //     `https://vehicle-backend-final2.vercel.app/doc?id=${ctx.selectedCar._id}`,
    //     {
    //       vehicleNo,
    //       name,
    //       documentNo,
    //       startDate,
    //       endDate,
    //       reminders: selectedValue,
    //       reminderDays: day,
    //       file,
    //     },
    //     {
    //       headers: {
    //         // "Content-Type": "application/json",
    //         "Content-Type": "multipart/form-data",
    //         auth_token: localStorage.getItem("access")
    //           ? `Bearer ${localStorage.getItem("access")}`
    //           : null,
    //       },
    //     }
    //   );

    //   alert("data Submitted");
    //   window.location.reload();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // const user = (
  //   <img
  //     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdG690MSVD3174A5oyDnwT49s0_nr-seUkwoAvj1iKOQ&s"
  //     alt="React Bootstrap logo"
  //     style={{ width: "45px", height: "45px", marginRight: "5px" }}
  //   />
  // );
  // const icon = <FaCog size={24} />;
  const handlefile = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const getval = (event) => {
    setTitle(event.target.innerHTML);
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
        <div className="col-xl-9 mx-auto btnholder">
          <NavLink to="/Reminders">
            <button id="subbtn3" style={{ width: "220px", fontSize: "18px" }}>
              M A I N T E N A C E
            </button>
          </NavLink>
          <NavLink to="/Documentation">
            <button
              id="subbtn3"
              style={{ width: "220px", fontSize: "18px", color: "#CFCD95" }}
            >
              D O C U M E N T A T I O N
            </button>
          </NavLink>
        </div>
        <div className="col-xl-10 mx-auto mt-2 remainder py-2" key={a}>
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
          <div className="maincols ">
            <div className="sidecol ">
              <NavLink to="/Documentation" onClick={getval}>
                <h5 className="mt-2">VEHICLE REVENUE LISCENE</h5>
              </NavLink>
              <NavLink to="/VEHICLE_INSURANCE" onClick={getval}>
                <h5>VEHICLE INSURANCE</h5>
              </NavLink>
              <NavLink to="/ECO_TEST" onClick={getval}>
                <h5>ECO TEST</h5>
              </NavLink>
              <NavLink to="/VEHICLE_BOOK" onClick={getval}>
                <h5>VEHICLE BOOK</h5>
              </NavLink>
              <NavLink to="/DRIVEN_LISCENE" onClick={getval}>
                <h5>DRIVEN LISCENE</h5>
              </NavLink>
            </div>
            <div className="sidecol2">
              <div className="bform">
                <div className="formname">
                  <div className="z1 col-md-3"></div>
                  <div className="z2 col-md-9">
                    <h5
                      className="mt-2 text-center"
                      id="stitle"
                      style={{ marginLeft: "5px" }}
                    >
                      {title}
                    </h5>
                    <img src="fd.png" alt="" />
                  </div>
                </div>
                <div className="ffields">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "95%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {/* <div style={{ display: 'flex', gap: '5px' }}> */}

                    <TextField
                      value={vehicleNo}
                      onChange={(value) => setVehicle(value.target.value)}
                      id="standard-basic"
                      label="VEHICLE NO"
                      variant="standard"
                      style={{ width: "270px" }}
                    />
                    {/* </div> */}
                    {/* <div style={{ display: 'flex', gap: '5px' }}> */}

                    <TextField
                      value={name}
                      onChange={(value) => setName(value.target.value)}
                      id="standard-basic"
                      label="VEHICLE/ DOCUMENT OWNER NAME"
                      variant="standard"
                      style={{ width: "270px" }}
                    />
                    {/* </div> */}
                    {/* <div style={{ display: 'flex', gap: '5px' }}> */}

                    <TextField
                      value={documentNo}
                      onChange={(value) => setDocument(value.target.value)}
                      id="standard-basic"
                      style={{ color: "#1C85D0", width: "270px" }}
                      label="DOC REGISTERED NO"
                      variant="standard"
                    />
                    {/* </div> */}
                  </Box>
                  <FormControl className="rgs" onChange={handleRadioChange}>
                    {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      //   value={value}
                      //   onChange={handleChange}
                      id="rg"
                      value={selectedValue}
                    >
                      <FormControlLabel
                        id="rad"
                        value="whichever comes first"
                        control={<Radio />}
                        label="whichever comes first"
                      />
                      <FormControlLabel
                        value="no reminders"
                        control={<Radio />}
                        label="no reminders"
                      />
                    </RadioGroup>
                  </FormControl>
                  {/* <h5>Last service</h5> */}
                  <div style={{ display: "flex", gap: "73px" }}>
                    {/* <div style={{ display: 'flex', gap: '5px' }}>
                                            <TextField id="standard-basic" style={{ color: '#1C85D0', width: '100px' }} label="odometer" variant="standard" /><p className='pt-3'>KM</p>
                                        </div> */}
                    <div className="datediv">
                      <p className="dat">Issued date</p>

                      <DatePicker
                        className=""
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                    <div className="datediv">
                      <p className="dat">Expired date</p>

                      <DatePicker
                        className=""
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                      />
                    </div>
                  </div>
                  <div className="datediv">
                    <p className="dat">Reminder Before</p>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        marginTop: "-15px",
                      }}
                    >
                      <TextField
                        value={day}
                        onChange={(value) => setDay(value.target.value)}
                        id="standard-basic"
                        style={{
                          color: "#1C85D0",
                          width: "100px",
                          marginTop: "17px",
                        }}
                        variant="standard"
                      />
                      <p className="pt-3">Days</p>
                    </div>

                    {/* <DatePicker className='' selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                  </div>
                  {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Upload Your document</button> */}
                  <div className="uploadhead" style={{}}>
                    <h5 className="pt-3">Document upload</h5>
                    <img src="upload.png" alt="" />
                    <p className="pt-4">File size:500kb</p>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <input type="file" name="file" onChange={handlefile} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btnparent">
            <button id="subbtn" onClick={sendApi}>
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Documentation;
