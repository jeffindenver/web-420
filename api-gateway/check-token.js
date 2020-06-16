/*
===============================================================================
; Title:  check-token.js
; Author: Professor Krasso
; Date:   6/16/2020
; Modified By: Jeff Shepherd
; Description: check token
;==============================================================================
*/

"use strict";

const jwt = require("jsonwebtoken");
const config = require("./config");

//Check the http header for a valid JSON web token
function checkToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided."
    });
  }

  jwt.verify(token, config.web.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate token."
      });
    }
    req.userId = decoded.id;
    next();
  });

}

module.exports = checkToken;
