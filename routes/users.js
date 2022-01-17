const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

//GET USERS
userRoutes.route("/users").get(async function (req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection("users")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching users!");
       } else {
          res.json(result);
        }
      });
  });

// POST USERS
userRoutes.route("/users").post(function (req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        name: req.body.name,
        last_name: req.body.lastName,
        password: req.body.password
    };
  
    dbConnect
      .collection("users")
      .insertOne(matchDocument, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting user!");
        } else {
          console.log(`Added a new user with id ${result.insertedId}`);
          res.status(204).send();
        }
      });
  });

module.exports = userRoutes;
