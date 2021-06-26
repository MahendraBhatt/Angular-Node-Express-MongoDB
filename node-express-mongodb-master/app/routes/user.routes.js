module.exports = app => {
  const userController = require("../controllers/user.controller.js");
  const auth = require("../middleware.js");

  var router = require("express").Router();
    
  router.post("/register", userController.registerNewUser);
  router.post("/login", userController.loginUser);

  app.use("/api/user", router);
};
