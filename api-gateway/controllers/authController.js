/*
===============================================================================
; Title:  authController.js
; Author: Professor Krasso
; Date:   5/5/2020
; Modified By: Jeff Shepherd
; Description: auth controller
;==============================================================================
*/

"use strict";

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

exports.user_register = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  let newUser = new User.model({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  });

  User.add(newUser, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem registering the user.");
    }

    let token = jwt.sign({
      id: user._id
    }, config.web.secret, {
      expiresIn: 86400
    });

    res.status(200).send({
      auth: true,
      token: token
    });
  });

};

exports.user_token = function (req, res) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      auth: false,
      message: "No token provided"
    });
  }

  jwt.verify(token, config.web.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate token."
      });
    }

    User.getById(decoded.id, function (err, user) {
      if (err) {
        return res.status(500).send("There was a problem finding the user.");
      }
      if (!user) {
        return res.status(404).send("No user found.");
      }
      res.status(200).send(user);
    });

  });

};
