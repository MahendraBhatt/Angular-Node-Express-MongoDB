module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      valveNo: String,
      tagNo: String,
      valveSection: String,
      valveSerialNo: String,
      valveMake: String,
      valvePurchaseDate: String,
      valvePurchaseValue: String,
      warrantyFinishDate: String,
      serviceDueDate: String,
      valveType: String,
      emergencyShutDownValve: String,
      ifBallValve: String,
      ifButterflyValve: String,
      valveTorque: String,
      butterflyVaneMOC: String,
      butterflyVaneMOCOther: String,
      ifSafetyValve : String,   
      lineFluid: String,	
      serviceType: String, // hazardous , corosive
      lineSize: String, // in inch
      valveSize: String, // in inch
      flow: String, 
      inletPressure: String,
      pressureDifference: String,
      designPressure: String,
      designTemp: String,
      viscosity: String,
      specificGravity: String,
      molecularWeight : String,
      actuatorShutoffPressure: String,
      valveLiftPercentage: String,
      valveNoise: String,	
      designCV: String,
      calculatedCV: String,
      bodyMOC: String,
      bodyLining: String,
      endConnection: String,
      flangeRating: String,
      valveModelNo: String,
      trimSize: String,
      trimType: String,
      trimcCharacteristic: String, // 	Inline radio buttons
      trimMOC: String,
      ballValveSeatMOC: String,
      plugRingsMOC: String,
      seatArrangement: String,
      glandPacking: String, // 	Inline radio buttons
      bodyBonnetGasket: String,
      valveBonnetType: String,
      bellowSeal: String,
      bellowSealMOC: String,
      leakageClass: String,
      leakageValueAllowed: String,
      actuatorType: String,
      actuatorModel: String,
      fieldReversible: String,
      actuatorTravel: String,
      diaphragMaterial: String,
      airPressureRequired: String,
      springRange: String,
      springMOC: String,
      positionerType: String, //	Inline radio buttons
      modelNoOfPositioner : String,
      ePArea: String,
      aFRMake: String,
      aFRModel: String,
      aFRFilterSize: String,
      aFRFilterMOC: String,
      positionerTransmitter: String,
      positionTransmitterType: String,
      positionTransmitterMake: String,
      positionTransmitterModel: String,
      positionTransmitterArea: String,
      solenoidValveType: String,
      solenoidValveMOC: String,
      solenoidValveArea: String,
      solenoidValveMake: String,
      machNoExceeding: String,
      velocityExceeding: String,
      stelliting: String, //	Inline radio button
      lapping: String, //		Inline radio button
      nitriding: String, //	 	Inline radio button
      iBR: String, //		Inline radio Button
      failSafeAction: String,
      limitSwitch: String,
      limitSwitchMake: String,
      limitSwitchType: String,
      lastServiceDate: String, //	Yes /No
      serviceReminder: String // 	Yes/No
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Rf = mongoose.model("rf", schema);
  return Rf;
};