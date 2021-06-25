import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Rf } from 'src/app/models/rf.model';
import { RfService } from 'src/app/services/rf.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-rf',
  templateUrl: './add-rf.component.html',
  styleUrls: ['./add-rf.component.css']
})
export class AddRfComponent implements OnInit {
  
  rfo: Rf = {
    valveNo: '',
    tagNo: '',
    valveSection: '',
    valveSerialNo: '',
    valveMake: '',
    valvePurchaseDate: '',
    valvePurchaseValue: '',
    warrantyFinishDate: '',
    serviceDueDate: '',
    valveType: '',
    emergencyShutDownValve: '',
    ifBallValve: '',
    ifButterflyValve: '',
    valveTorque: '',
    butterflyVaneMOC: '',
    butterflyVaneMOCOther: '',
    ifSafetyValve: '',
    lineFluid: '',
    serviceType: '', // hazardous , corosive
    lineSize: '', // in inch
    valveSize: '', // in inch
    flow: '',
    inletPressure: '',
    pressureDifference: '',
    designPressure: '',
    designTemp: '',
    viscosity: '',
    specificGravity: '',
    molecularWeight: '',
    actuatorShutoffPressure: '',
    valveLiftPercentage: '',
    valveNoise: '',
    designCV: '',
    calculatedCV: '',
    bodyMOC: '',
    bodyLining: '',
    endConnection: '',
    flangeRating: '',
    valveModelNo: '',
    trimSize: '',
    trimType: '',
    trimcCharacteristic: '', // 	Inline radio buttons
    trimMOC: '',
    ballValveSeatMOC: '',
    plugRingsMOC: '',
    seatArrangement: '',
    glandPacking: '', // 	Inline radio buttons
    bodyBonnetGasket: '',
    valveBonnetType: '',
    bellowSeal: '',
    bellowSealMOC: '',
    leakageClass: '',
    leakageValueAllowed: '',
    actuatorType: '',
    actuatorModel: '',
    fieldReversible: '',
    actuatorTravel: '',
    diaphragMaterial: '',
    airPressureRequired: '',
    springRange: '',
    springMOC: '',
    positionerType: '', //	Inline radio buttons
    modelNoOfPositioner: '',
    ePArea: '',
    aFRMake: '',
    aFRModel: '',
    aFRFilterSize: '',
    aFRFilterMOC: '',
    positionerTransmitter: '',
    positionTransmitterType: '',
    positionTransmitterMake: '',
    positionTransmitterModel: '',
    positionTransmitterArea: '',
    solenoidValveType: '',
    solenoidValveMOC: '',
    solenoidValveArea: '',
    solenoidValveMake: '',
    machNoExceeding: '',
    velocityExceeding: '',
    stelliting: '', //	Inline radio button
    lapping: '', //		Inline radio button
    nitriding: '', //	 	Inline radio button
    iBR: '', //		Inline radio Button
    failSafeAction: '',
    limitSwitch: '',
    limitSwitchMake: '',
    limitSwitchType: '',
    lastServiceDate: '', //	Yes /No
    serviceReminder: '' // 	Yes/No,
  };
  submitted = false;
  message = '';
  id = '';
  rf = Object.assign({}, this.rfo);

  constructor(private rfService: RfService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.id = '';
    if (this.route.snapshot.params.id != undefined) {
      this.id = this.route.snapshot.params.id;
      this.getRf(this.id);
    }
  }

  getRf(id: string): void {
    this.rfService.get(id)
      .subscribe(
        data => {
          this.rf = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveRf(): void {
     if (this.id == '') {
      this.rfService.create(this.rf)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.router.navigate(['/rf'], { queryParams: { m : 'a' }});
          },
          error => {
            console.log(error);
          });
    } else {
      this.rfService.update(this.id, this.rf)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.router.navigate(['/rf'], { queryParams: { m : 'u' }});
            this.message = response.message ? response.message : 'This rf was updated successfully!';
          },
          error => {
            console.log(error);
          });
    }
  }

  newRf(): void {
    this.submitted = false;
    this.rf = Object.assign({}, this.rfo);
  }

}
