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

let User = require("../models/user");

exports.user_register = function (req, res) {
  res.send("Not implemented: User registration POST");
};

exports.user_token = function (req, res) {
  res.send("Not implemented: User token lookup GET");
};
