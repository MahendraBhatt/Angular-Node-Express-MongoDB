module.exports = app => {
  const userController = require("../controllers/user.controller.js");
  const auth = require("../middleware.js");

  var router = require("express").Router();
    
  router.post("/register", userController.registerNewUser);
  router.post("/login", userController.loginUser);
  router.post("/forgotPassword", userController.forgotPassword);
  router.post("/setPassword", auth, userController.setPassword);

  app.use("/api/user", router);
};
