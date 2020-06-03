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

const User = mongoose.model("User", userSchema);

User.add = function (user, callback) {
  user.save(callback);
};

User.getById = function (id, callback) {
  let query = {
    _id: id
  };
  this.findById(query, callback);
};

User.getOne = function (e, callback) {
  let query = {email: e};
  this.findOne(query, callback);
};

module.exports = User;

console.log(module.exports);
