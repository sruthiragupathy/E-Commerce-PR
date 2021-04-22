const express = require("express");
const { findUserById, signupHandler, getUsersFromDatabase, loginHandler, formValidation } = require("../Controllers/user.js");
const router = express.Router();

router.param("userId", findUserById);
router.get("/users", getUsersFromDatabase);
router.post("/signup", signupHandler);
router.post("/login", loginHandler);

module.exports = router;
