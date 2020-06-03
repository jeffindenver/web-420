/*
===============================================================================
; Title:  api-catalog.js
; Author: Professor Krasso
; Date:   5/5/2020
; Modified By: Jeff Shepherd
; Description: API routes
;==============================================================================
*/

"use strict";

const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");

router.post("/auth/login", auth_controller.user_login);
router.post("/auth/register", auth_controller.user_register);
router.get("/auth/token", auth_controller.user_token);
router.get("/auth/logout", auth_controller.user_logout);

module.exports = router;
