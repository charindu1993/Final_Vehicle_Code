const express = require("express");
const Router = express.Router();
const {
  login,
  getMileage,
  getVehicleData,
  updateVehicleData,
  updateDocData,
  getAllUser,
  deleteUser,
} = require("../controller");
const { verifyToken } = require("../jwt");
Router.post("/login", login);
Router.get("/getmileage", verifyToken, getMileage);
Router.get("/getusers", getAllUser);
Router.get("/getvehicledata/:userID", verifyToken, getVehicleData);
Router.put("/updatemaintenancedata/:vehID", verifyToken, updateVehicleData);
Router.put("/updatedocumentdata/:vehID", verifyToken, updateDocData);
Router.put("/deleteuser/:userID", deleteUser);
module.exports = Router;
