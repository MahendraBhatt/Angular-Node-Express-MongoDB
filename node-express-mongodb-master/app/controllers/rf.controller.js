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
  const rf = new Rf({
    valveNo: req.body.valveNo,
    tagNo: req.body.tagNo,
    valveSection: req.body.valveSection,
    valveSerialNo: req.body.valveSerialNo,
    valveMake: req.body.valveMake,
    valvePurchaseDate: req.body.valvePurchaseDate,
    valvePurchaseValue: req.body.valvePurchaseValue,
    warrantyFinishDate: req.body.warrantyFinishDate,
    serviceDueDate: req.body.serviceDueDate,
    valveType: req.body.valveType,
    emergencyShutDownValve: req.body.emergencyShutDownValve,
    ifBallValve: req.body.ifBallValve,
    ifButterflyValve: req.body.ifButterflyValve,
    valveTorque: req.body.valveTorque,
    butterflyVaneMOC: req.body.butterflyVaneMOC,
    ifSafetyValve: req.body.ifSafetyValve,
    lineFluid: req.body.lineFluid,
    serviceType: req.body.serviceType,
    lineSize: req.body.lineSize,
    valveSize: req.body.valveSize,
    flow: req.body.flow,
    inletPressure: req.body.inletPressure,
    pressureDifference: req.body.pressureDifference,
    designPressure: req.body.designPressure,
    designTemp: req.body.designTemp,
    viscosity: req.body.viscosity,
    specificGravity: req.body.specificGravity,
    molecularWeight: req.body.molecularWeight,
    actuatorShutoffPressure: req.body.actuatorShutoffPressure,
    valveLiftPercentage: req.body.valveLiftPercentage,
    valveNoise: req.body.valveNoise,
    designCV: req.body.designCV,
    calculatedCV: req.body.calculatedCV,
    bodyMOC: req.body.bodyMOC,
    bodyLining: req.body.bodyLining,
    endConnection: req.body.endConnection,
    flangeRating: req.body.flangeRating,
    valveModelNo: req.body.valveModelNo,
    trimSize: req.body.trimSize,
    trimType: req.body.trimType,
    trimcCharacteristic: req.body.trimcCharacteristic,
    trimMOC: req.body.trimMOC,
    ballValveSeatMOC: req.body.ballValveSeatMOC,
    plugRingsMOC: req.body.plugRingsMOC,
    seatArrangement: req.body.seatArrangement,
    glandPacking: req.body.glandPacking,
    bodyBonnetGasket: req.body.bodyBonnetGasket,
    valveBonnetType: req.body.valveBonnetType,
    bellowSeal: req.body.bellowSeal,
    bellowSealMOC: req.body.bellowSealMOC,
    leakageClass: req.body.leakageClass,
    leakageValueAllowed: req.body.leakageValueAllowed,
    actuatorType: req.body.actuatorType,
    actuatorModel: req.body.actuatorModel,
    fieldReversible: req.body.fieldReversible,
    actuatorTravel: req.body.actuatorTravel,
    diaphragMaterial: req.body.diaphragMaterial,
    airPressureRequired: req.body.airPressureRequired,
    springRange: req.body.springRange,
    springMOC: req.body.springMOC,
    positionerType: req.body.positionerType,
    modelNoOfPositioner: req.body.modelNoOfPositioner,
    ePArea: req.body.ePArea,
    aFRMake: req.body.aFRMake,
    aFRModel: req.body.aFRModel,
    aFRFilterSize: req.body.aFRFilterSize,
    aFRFilterMOC: req.body.aFRFilterMOC,
    positionerTransmitter: req.body.positionerTransmitter,
    positionTransmitterType: req.body.positionTransmitterType,
    positionTransmitterMake: req.body.positionTransmitterMake,
    positionTransmitterModel: req.body.positionTransmitterModel,
    positionTransmitterArea: req.body.positionTransmitterArea,
    solenoidValveType: req.body.solenoidValveType,
    solenoidValveMOC: req.body.solenoidValveMOC,
    solenoidValveArea: req.body.solenoidValveArea,
    solenoidValveMake: req.body.solenoidValveMake,
    machNoExceeding: req.body.machNoExceeding,
    velocityExceeding: req.body.velocityExceeding,
    stelliting: req.body.stelliting,
    lapping: req.body.lapping,
    nitriding: req.body.nitriding,
    iBR: req.body.iBR,
    failSafeAction: req.body.failSafeAction,
    limitSwitch: req.body.limitSwitch,
    limitSwitchMake: req.body.limitSwitchMake,
    limitSwitchType: req.body.limitSwitchType,
    lastServiceDate: req.body.lastServiceDate,
    serviceReminder: req.body.serviceReminder
  });

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
