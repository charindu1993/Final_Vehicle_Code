const firestore = require("../firestore");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log(userEmail);
  try {
    await firestore
      .collection("users")
      .where("email", "==", userEmail)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return res.status(404).json({ message: "No User found" });
        }
        snapshot.forEach(async (doc) => {
          const { email, name, password } = doc.data();
          if (password !== userPassword) {
            res.status(401).json({ message: "Incorrect password" });
          } else {
            const userData = { ...doc.data() };
            delete userData.password;
            const token = jwt.sign(
              { userID: doc.id, email, name },
              process.env.JWT_SECRET
            );
            res.status(200).json({
              message: "Successfully logged in",
              userData: { userID: doc.id, token, ...userData },
            });
          }
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
        res.status(404).json({ message: "No user found" });
      });
  } catch (err) {
    res.status(401).json({ message: "Could not process request", err });
  }
};
const getMileage = async (req, res) => {
  const email = req.query.email;
  try {
    const vehicleDataCollection = firestore.collection("users");

    const snapshot = await vehicleDataCollection
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No documents found in collection" });
    } else {
      const vehicleDataList = [];

      snapshot.forEach((doc) => {
        if (!doc.data().totalMileage) {
          return res.status(404).json({ message: "No mileage Found" });
        } else {
          vehicleDataList.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });

      return res.json(vehicleDataList);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getVehicleData = async (req, res) => {
  const userID = req.params.userID;
  console.log(req.params);
  try {
    const vehicleDataCollection = firestore.collection("vehicle_data");

    const snapshot = await vehicleDataCollection
      .where("user_id", "==", userID)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No vehicles found in collection" });
    } else {
      const vehicleDataList = [];

      snapshot.forEach((doc) => {
        if (!doc.data()) {
          return res.status(404).json({ message: "No Vehicle Found" });
        } else {
          vehicleDataList.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });

      return res.json(vehicleDataList);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateVehicleData = async (req, res) => {
  const vehicleID = req.params.vehID;
  const { maintenanceType, km, days, amount, reminder, odemeter, date } =
    req.query;

  try {
    const vehicleDataCollection = firestore
      .collection("vehicle_data")
      .doc(vehicleID);
    const existingData = (await vehicleDataCollection.get()).data();

    let maintenanceData = [];

    if (existingData && existingData.maintenanceData) {
      maintenanceData = [...existingData.maintenanceData];
    }

    // Check if maintenanceType already exists in maintenanceData
    const existingMaintenanceIndex = maintenanceData.findIndex(
      (item) => item.maintenanceType === maintenanceType
    );

    if (existingMaintenanceIndex !== -1) {
      // If maintenanceType already exists, update the existing object
      maintenanceData[existingMaintenanceIndex] = {
        maintenanceType,
        km,
        days,
        amount,
        reminder,
        odemeter,
        date,
      };
    } else {
      // If maintenanceType doesn't exist, add a new object to the array
      maintenanceData.push({
        maintenanceType,
        km,
        days,
        amount,
        reminder,
        odemeter,
        date,
      });
    }

    await vehicleDataCollection.set({ maintenanceData }, { merge: true });

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateDocData = async (req, res) => {
  const vehicleID = req.params.vehID;
  const {
    documentationType,
    vehicleNo,
    documentNo,
    name,
    day,
    startDate,
    endDate,
    selectedValue,
  } = req.query;

  try {
    const vehicleDataCollection = firestore
      .collection("vehicle_data")
      .doc(vehicleID);
    const existingData = (await vehicleDataCollection.get()).data();

    let documentationData = [];

    if (existingData && existingData.documentationData) {
      documentationData = [...existingData.documentationData];
    }

    const existingDocumentationIndex = documentationData.findIndex(
      (item) => item.documentationType === documentationType
    );

    if (existingDocumentationIndex !== -1) {
      documentationData[existingDocumentationIndex] = {
        documentationType,
        vehicleNo,
        documentNo,
        name,
        day,
        startDate,
        endDate,
        selectedValue,
      };
    } else {
      documentationData.push({
        documentationType,
        vehicleNo,
        documentNo,
        name,
        day,
        startDate,
        endDate,
        selectedValue,
      });
    }

    await vehicleDataCollection.set({ documentationData }, { merge: true });

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userCollection = firestore.collection("users");

    const snapshot = await userCollection.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No Users found in collection" });
    } else {
      const userDataList = [];

      snapshot.forEach((doc) => {
        userDataList.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      return res.json(userDataList);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const documentRef = firestore.collection("users").doc(userID);

    await documentRef.delete();

    console.log("User successfully deleted!");
    res.status(200).json({ message: "User successfully deleted!" });
  } catch (error) {
    res.status(401).json({ message: "Failed to approve request", error });
    console.error("Error deleting document: ", error);
  }
};

module.exports = {
  getMileage,
  login,
  getVehicleData,
  updateVehicleData,
  updateDocData,
  getAllUser,
  deleteUser,
};
