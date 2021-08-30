const db = require("../models");
const Rf = db.rf;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Rf
exports.create = (req, res) => {
  // Validate request
  if (!req.body.valveNo) {
    res.status(400).send({ message: "Valve No can not be empty!" });
    return;
  }

  // Create a Rf
  const rf = new Rf();

  for(var x in req.body){
    rf[x] = req.body[x];
  }

  // Save Rf in the database
  rf
    .save(rf)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rf."
      });
    });
};

// Retrieve all Rf from the database.
exports.findAll = (req, res) => {
  const { page, size, valveNo, sortBy, select, sortDirection } = req.query;
  let regex = new RegExp(valveNo,'i');

  var condition = valveNo
    ? {
      $or: [
        {valveNo: regex},{tagNo: regex},{valveSection: regex},{valveSerialNo: regex},
        {valveMake: regex},{valvePurchaseDate: regex},{valvePurchaseValue: regex}
      ]
    }
    : {};

  const sort = {};
  sort[sortBy] = sortDirection;
  var collation = { locale: "en" };
  const { limit, offset } = getPagination(page, size);

  Rf.paginate(condition, { offset, limit, sort, select, collation })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        rf: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rf."
      });
    });
};

// Find a single Rf with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rf.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Rf with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Rf with id=" + id });
    });
};

// Update a Rf by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Rf.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Rf with id=${id}. Maybe Rf was not found!`
        });
      } else res.send({ message: "Rf was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Rf with id=" + id
      });
    });
};

// Delete a Rf with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rf.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Rf with id=${id}. Maybe Rf was not found!`
        });
      } else {
        res.send({
          message: "Rf was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Rf with id=" + id
      });
    });
};

// Delete all Rf from the database.
exports.deleteAll = (req, res) => {
  Rf.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Rf were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rf."
      });
    });
};
