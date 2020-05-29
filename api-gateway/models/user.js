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
  const self = this;
  let query = {
    _id: id
  };
  self.findById(query, callback);
};

module.exports = User;

console.log(module.exports);
