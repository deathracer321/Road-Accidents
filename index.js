require("dotenv").config();

const db = require("./firebase");

const express = require("express");
const app = express();
const PORT = process.env.SERVER_PORT || 3030;

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
      gpsLocationLat: req.query["gpsLocationLat"] || "default",
      gpsLocationLon: req.query["gpsLocationLon"] || "default",
      pressure: req.query["pressure"] || "default",
      groundClearance: req.query["groundClearance"] || "default",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      res.status(200).send({
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
