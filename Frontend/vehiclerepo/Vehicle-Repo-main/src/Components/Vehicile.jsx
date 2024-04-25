import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import DataContext from "../store/store";
import Navbar from "./Navbar";
function Vehicile() {
  const navigate = useNavigate();
  const ctx = useContext(DataContext);
  const [cars, setCars] = useState(JSON.parse(localStorage.getItem("carData")));

  // useEffect(() => {
  //   setCars(ctx.carData);
  // }, [ctx]);
  let counter = 0;
  const show = (ind) => {
    counter += 1;
    let drop = document.getElementById(ind);
    if (counter === 1) {
      drop.style.visibility = "visible";
      counter -= 2;
    } else {
      drop.style.visibility = "hidden";
    }
  };

  const delx = async (id) => {
    // try {
    //   await axios.post(
    //     `https://vehicle-backend-final2.vercel.app/delete?id=${id}`,
    //     {
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
    //   alert("Car Deleted")
    //   const temp = cars.filter(c => c._id !== id)
    //   ctx.data([...temp])
    // } catch (err) {
    //   alert("Please Submit Again")
    // }
  };
  const toAdd = (id) => {
    ctx.setCar(id);
    navigate({
      pathname: "/Add",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };
  const toView = (id, car) => {
    // ctx.setCar(id);
    localStorage.setItem("selectedCar", JSON.stringify(car));
    navigate({
      pathname: "/Add",
      search: createSearchParams({
        id: id,
        mode: "view",
      }).toString(),
    });
  };
  const logoutH = () => {
    ctx.logout();
  };
  const data =
    cars.length > 0 &&
    cars.map((car, ind) => {
      return (
        <div className="box" id="mainbox" key={ind}>
          <h6>{`${car.data.make} ${car.data.model}`}</h6>
          <div className="carbox">
            <div className="c1">
              <img src={car.data.image_url} alt="" />
            </div>
            <div className="c2" key={ind}>
              <span
                onClick={() => {
                  show(ind);
                }}
              >
                -
              </span>
              <span
                onClick={() => {
                  show(ind);
                }}
              >
                -
              </span>
              <span
                onClick={() => {
                  show(ind);
                }}
              >
                -
              </span>
              <div className="dropbox" id={`${ind}`}>
                <p
                  onClick={() => {
                    toView(car.id, car);
                  }}
                >
                  View
                </p>
                {/* <p
                  onClick={() => {
                    toAdd(car.id);
                  }}
                >
                  Edit
                </p>
                <p
                  onClick={() => {
                    delx(car.id);
                  }}
                >
                  delete
                </p> */}
              </div>
            </div>
          </div>
        </div>
      );
    });
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
        <div
          className="col-xl-9 mx-auto"
          style={{ display: "flex", justifyContent: "end" }}
        >
          {/* <div className="add">
            <NavLink to="/Add">
              <img src="add.png" alt="" />
            </NavLink>
          </div> */}
        </div>

        <div className="col-xl-9 mx-auto cars mb-3">{data}</div>
      </div>
    </>
  );
}

export default Vehicile;
