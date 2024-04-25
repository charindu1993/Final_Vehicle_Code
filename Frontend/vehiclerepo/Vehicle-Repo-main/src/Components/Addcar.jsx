import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import DataContext from "../store/store";
import Navbar from "./Navbar";

function Addcar() {
  const [make_ref, setMake] = useState();
  const [model_ref, setModel] = useState();
  const [year_ref, setYear] = useState();
  const [vehicle_no, setVehicle] = useState();
  const [chasis_no, setChasis] = useState();
  const [images, setImages] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id") ? queryParameters.get("id") : null;
  const view = queryParameters.get("mode") ? queryParameters.get("mode") : null;
  const ctx = useContext(DataContext);
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const maxNumber = 1;

  const onChange = (imageList) => {
    const newList = imageList.map((image) => ({ data_url: image.data_url }));
    setImages(newList);
  };
  const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
  useEffect(() => {
    setMake(id && selectedCar?.data.make);
    setModel(id && selectedCar?.data.model);
    setYear(id && selectedCar?.data.year);
    setVehicle(id && selectedCar?.data.vehicle_number);
    setChasis(id && selectedCar?.data.chassis_number);
    setSelectedValue(id && selectedCar?.data.fuel_type);
    setImages(id && [selectedCar?.data.image_url]);
  }, [id, ctx]);
  const onSubmit = async () => {
    const make = make_ref;
    const model = model_ref;
    const year = year_ref;
    const vehicleNo = vehicle_no;
    const chasisNo = chasis_no;
    const FuelType = selectedValue;
    if (
      !make ||
      !model ||
      !year ||
      !vehicleNo ||
      !chasisNo ||
      !FuelType ||
      images.length < 1
    ) {
      return alert("Please fill all the fields");
    }

    // try {
    //   const { data } = await axios.post(
    //     `https://vehicle-backend-final2.vercel.app/vehicle`,
    //     {
    //       make,
    //       model,
    //       year,
    //       vehicleNo,
    //       chasisNo,
    //       FuelType,
    //       images,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         auth_token: localStorage.getItem("access")
    //           ? `Bearer ${localStorage.getItem("access")}`
    //           : null,
    //       },
    //     }
    //   );
    //   alert(data.msg)
    // } catch (err) {
    //   alert(err.response.data.msg);
    // }
  };
  const onEdit = async () => {
    const make = make_ref;
    const model = model_ref;
    const year = year_ref;
    const vehicleNo = vehicle_no;
    const chasisNo = chasis_no;
    const FuelType = selectedValue;
    if (
      !make ||
      !model ||
      !year ||
      !vehicleNo ||
      !chasisNo ||
      !FuelType ||
      images.length < 1
    ) {
      return alert("Please fill all the fields");
    }

    try {
      await axios.post(
        `https://vehicle-backend-final2.vercel.app/update?id=${id}`,
        {
          make,
          model,
          year,
          vehicleNo,
          chasisNo,
          FuelType,
          images,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth_token: localStorage.getItem("access")
              ? `Bearer ${localStorage.getItem("access")}`
              : null,
          },
        }
      );
      alert("Data Submitted");
    } catch (err) {
      console.log(err);
      alert("Please Submit Again");
    }
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
          <h4 id="color">VEHICLE MAINTAINENCE TRACkER</h4>
          <div className="navchild" onClick={logoutH}>
            <h4>LOGOUT</h4>
            <img src="sign.png" alt="" />
          </div>
        </div>
        <div className="col-xl-9 mx-auto mt-3 title ">
          <Navbar />{" "}
        </div>
        <div className="col-xl-10 mx-auto mt-2 parent">
          <div className="col-xl-5 p1">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={make_ref}
                // onChange={(value) => {
                //   setMake(value.target.value);
                // }}
                disabled={view ? true : false}
                id="standard-basic"
                label="Make"
                variant="standard"
              />
              <TextField
                id="standard-basic"
                disabled={view ? true : false}
                // onChange={(value) => {
                //   setModel(value.target.value);
                // }}
                value={model_ref}
                label="Model"
                variant="standard"
              />
              <div
                style={{
                  width: "95%",
                  display: "flex",
                  gap: "5%",
                  color: "#1C85D0",
                }}
              >
                <TextField
                  id="standard-basic"
                  disabled={view ? true : false}
                  // onChange={(value) => {
                  //   setYear(value.target.value);
                  // }}
                  value={year_ref}
                  label="Year"
                  variant="standard"
                  style={{ width: "200px" }}
                />
                <TextField
                  // onChange={(value) => {
                  //   setVehicle(value.target.value);
                  // }}
                  disabled={view ? true : false}
                  value={vehicle_no}
                  id="standard-basic"
                  label="Vehicle No"
                  variant="standard"
                  style={{ width: "200px" }}
                />
              </div>
              <TextField
                // onChange={(value) => {
                //   setChasis(value.target.value);
                // }}
                value={chasis_no}
                id="standard-basic"
                disabled={view ? true : false}
                style={{ color: "#1C85D0" }}
                label="chasis No"
                variant="standard"
              />
            </Box>
            <FormControl
              className="mt-1 radios"
              style={{ padding: "5px" }}
              // onChange={handleRadioChange}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                Fuel Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValue}
                disabled={view ? true : false}
              >
                <FormControlLabel
                  id="lightblue"
                  value="Petrol"
                  control={<Radio />}
                  label="Petrol"
                  disabled={view ? true : false}
                />
                <FormControlLabel
                  id="lightblue"
                  value="Diesel"
                  control={<Radio />}
                  label="diesel"
                  disabled={view ? true : false}
                />
              </RadioGroup>
            </FormControl>
          </div>
          {!view && (
            <div className="btnparent">
              {id ? (
                <button id="subbtn" onClick={onEdit}>
                  Edit
                </button>
              ) : (
                <button id="subbtn" onClick={onSubmit}>
                  submit
                </button>
              )}
            </div>
          )}
          <div className="col-xl-5 p2">
            <div className="uploadhead">
              {/* <h5 className="pt-3">image upload</h5>
              <img src="upload.png" alt="" /> */}
              <p className="pt-4">File size:500kb</p>
            </div>
            <div
              className="imgsquare mt-1 "
              style={
                images?.length > 0
                  ? { height: "max-content" }
                  : {
                      width: " 160px",
                      height: " 160px",
                      border: "1px solid rgb(130, 95, 95)",
                    }
              }
            >
              {/* Yha image show hogy in this div */}
              {/* <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({ imageList, onImageRemove }) => (
                  // write your building UI
                  <div className="imgcont">
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="image-item"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={image["data_url"]} id="carpic" alt="" />
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading> */}
              <ImageUploading
                multiple
                value={images}
                // onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({ imageList, onImageRemove }) => (
                  // write your building UI
                  <div className="imgcont">
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="image-item "
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <img src={image} id="carpic" alt="" />
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            {/* Yh wo 2 buttons hain browse remove k */}
            {/* <ImageUploading
              multiple
              value={images}
              // onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper mt-2">
                  <button
                    type="button"
                    id="borwsebtn"
                    onClick={onImageUpload}
                    {...dragProps}
                    style={isDragging ? { color: "red" } : null}
                    disabled={view ? true : false}
                  >
                    Browse
                  </button>
                  &nbsp;
                  <button
                    onClick={onImageRemoveAll}
                    id="subbtn2"
                    style={{
                      width: "155px",
                      whiteSpace: "nowrap",
                      padding: "5px",
                    }}
                    disabled={view ? true : false}
                  >
                    Remove
                  </button>
                </div>
              )}
            </ImageUploading> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Addcar;
