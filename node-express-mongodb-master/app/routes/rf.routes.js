module.exports = app => {
  const rf = require("../controllers/rf.controller.js");
  const auth = require("../middleware.js");

  var router = require("express").Router();

  // Create a new Rf
  router.post("/", auth, rf.create);

  // Retrieve all Rf
  router.get("/", auth, rf.findAll);

  // Retrieve a single Rf with id
  router.get("/:id", auth, rf.findOne);

  // Update a Rf with id
  router.put("/:id", auth, rf.update);

  // Delete a Rf with id
  router.delete("/:id", auth, rf.delete);

  // Create a new Rf
  router.delete("/", auth, rf.deleteAll);

  app.use("/api/rf", auth, router);
};
