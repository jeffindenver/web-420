/*
===============================================================================
; Title:  user.js
; Author: Professor Krasso
; Date:   5/5/2020
; Modified By: Jeff Shepherd
; Description: user model
;==============================================================================
*/

"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

module.exports.add = function (user, callback) {
  user.save(callback);
};

module.exports.getById = function (id, callback) {
   let query = {
     _id: id
   };
   User.findById(query, callback);
 };

module.exports.model = mongoose.model("User", userSchema);


console.log(module.exports);
