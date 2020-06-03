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

exports.user_login = function (req, res) {

  User.getOne(req.body.email, function (err, user) {

    if (err) return res.status(500).send("Error on server.");
    if (!user) return res.status(404).send("No user found.");

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null
      });
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

exports.user_logout = function (req, res) {
  res.status(200).send({
    auth: false,
    token: null
  });
};

exports.user_register = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  let newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email.trim()
  });

  User.add(newUser, (err, user) => {
    console.log(user);
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
