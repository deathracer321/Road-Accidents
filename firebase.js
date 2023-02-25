const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("./admin.json")),
});
const db = admin.firestore();

module.exports = db;
