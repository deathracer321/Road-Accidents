require("dotenv").config();

const db = require("./firebase");
var cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.SERVER_PORT || 3030;

app.use(cors());

//Another method to send data to server line 1
//const docRef = db.collection("users").doc("alovelace");

// ---------------get method starts here------------------
app.get("/iotdblink", function (req, res) {
  console.log("get method has run");

  //Another method to send data to server line 2 -- but ID not working
  // const sendData = async (req, res) => {
  //   await docRef
  //     .set({
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     })
  //     .then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // };

  // sendData();

  db.collection("users")
    .add({
      name: req.query["name"] || "Harish",
      emergencyContact: req.query["emergencyContact"] || "+91 9999999999",
      address: req.query["address"] || "no.1 abc street",
      gpsLocationLat: req.query["gpsLocationLat"] || "20",
      gpsLocationLon: req.query["gpsLocationLon"] || "20",
      pressure: req.query["pressure"] || "20",
      groundClearance: req.query["groundClearance"] || "20",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      res.status(200).send({
        name: req.query["name"],
        emergencyContact: req.query["emergencyContact"],
        address: req.query["address"],
        gpsLocationLatitude: req.query["gpsLocationLat"],
        gpsLocationLongitude: req.query["gpsLocationLon"],
        groundClearance: req.query["groundClearance"],
        pressure: req.query["pressure"],
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  // -----------get method ends here-----------
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
