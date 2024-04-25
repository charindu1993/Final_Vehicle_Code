import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import DataContext from "../store/store";
import Navbar from "./Navbar";

function Setup() {
  const ctx = useContext(DataContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [lname, setlName] = useState();
  const [data, setData] = useState();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const carData = JSON.parse(localStorage.getItem("carData"));

  useEffect(() => {
    setName(userData?.name);
    setEmail(userData?.email);
    setlName(userData?.lastName);
    setData(carData);
  }, [ctx]);
  const dataCar =
    data?.length >= 1 ? (
      data.map((data) => {
        return (
          <li>
            {data.data.make} {data.data.model}
          </li>
        );
      })
    ) : (
      <h6>No Car</h6>
    );
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
          <Navbar />
        </div>
        <div className="col-xl-10 mx-auto mt-2 remainder py-2">
          <div className="maincols">
            <div className="sidecol">
              <div className="info">
                <div className="infoline">
                  <h5> Full Name :</h5>
                  <h5 id="color">{name}</h5>
                  <div className="line"></div>
                </div>
                {/* <div className="infoline">
                  <h5> Last Name :</h5>
                  <h5 id="color">{lname}</h5>
                  <div className="line"></div>
                </div> */}
                <div className="infoline">
                  <h5>Email:</h5>
                  <h5 id="color">{email}</h5>
                </div>
              </div>
            </div>
            <div className="sidecol2">
              <div className="bform">
                <div className="infotitle">
                  <h5 className="mt-2" id="stitle">
                    total listed cars!{" "}
                  </h5>
                </div>
                <ul className="mt-2">{dataCar}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setup;
