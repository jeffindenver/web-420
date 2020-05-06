/*
===============================================================================
; Title:  config.js
; Author: Professor Krasso
; Date:   5/5/2020
; Modified By: Jeff Shepherd
; Description: config file
;==============================================================================
*/
let config = {};
config.web = {};
config.web.port = process.env.PORT || "3000";
config.web.secret = "topsecret";
module.exports = config;
