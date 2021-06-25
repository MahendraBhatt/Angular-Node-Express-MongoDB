module.exports = app => {
  const rf = require("../controllers/rf.controller.js");

  var router = require("express").Router();

  // Create a new Rf
  router.post("/", rf.create);

  // Retrieve all Rf
  router.get("/", rf.findAll);

  // Retrieve a single Rf with id
  router.get("/:id", rf.findOne);

  // Update a Rf with id
  router.put("/:id", rf.update);

  // Delete a Rf with id
  router.delete("/:id", rf.delete);

  // Create a new Rf
  router.delete("/", rf.deleteAll);

  app.use("/api/rf", router);
};
