import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rf } from 'src/app/models/rf.model';
import { RfService } from 'src/app/services/rf.service';

@Component({
  selector: 'app-add-rf',
  templateUrl: './add-rf.component.html',
  styleUrls: ['./add-rf.component.css']
})
export class AddRfComponent implements OnInit {
  submitted = false;
  message = '';
  id = '';
  rfForm = new FormGroup({});
  error = '';

  constructor(private rfService: RfService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.message = '';
    this.id = '';

    this.rfForm = this.formBuilder.group({
      valveNo: ['', Validators.required],
      tagNo: [''],
      valveSection: [''],
      valveSerialNo: [''],
      valveMake: [''],
      valvePurchaseDate: [''],
      valvePurchaseValue: [''],
      warrantyFinishDate: [''],
      serviceDueDate: [''],
      valveType: [''],
      emergencyShutDownValve: [''],
      ifBallValve: [''],
      ifButterflyValve: [''],
      valveTorque: [''],
      butterflyVaneMOC: [''],
      butterflyVaneMOCOther: [''],
      ifSafetyValve: [''],
      setPressure: [''],
      overPressure: [''],
      backPressure: [''],
      relievingPressure: [''],
      lineFluid: [''],
      serviceType: [''], // hazardous , corosive
      lineSize: [''], // in inch
      valveSize: [''], // in inch
      flow1: [''],
      flow1Unit: [''],
      flow2: [''],
      flow2Unit: [''],
      flow3: [''],
      flow3Unit: [''],
      inletPressure1: [''],
      inletPressure2: [''],
      inletPressure3: [''],
      pressureDifference: [''],
      designPressure: [''],
      designPressureUnit: [''],
      designTemp: [''],
      designTempUnit: [''],
      viscosity: [''],
      viscosityUnit: [''],
      specificGravity: [''],
      molecularWeight: [''],
      actuatorShutoffPressure: [''],
      actuatorShutoffPressureUnit: [''],
      valveLiftPercentage1: [''],
      valveLiftPercentage2: [''],
      valveLiftPercentage3: [''],
      valveNoise: [''],
      designCV: [''],
      calculatedCV1: [''],
      calculatedCV2: [''],
      calculatedCV3: [''],
      bodyMOC: [''],
      bodyLining: [''],
      endConnection: [''],
      flangeRating: [''],
      valveModelNo: [''],
      trimSize: [''],
      trimSizeUnit: [''],
      trimType: [''],
      trimcCharacteristic: [''], // 	Inline radio buttons
      trimMOC: [''],
      ballValveSeatMOC: [''],
      plugRingsMOC: [''],
      seatArrangement: [''],
      glandPacking: [''], // 	Inline radio buttons
      bodyBonnetGasket: [''],
      valveBonnetType: [''],
      bellowSeal: [''],
      bellowSealMOC: [''],
      leakageClass: [''],
      leakageValueAllowed: [''],
      actuatorType: [''],
      actuatorModel: [''],
      fieldReversible: [''],
      actuatorTravel: [''],
      diaphragMaterial: [''],
      airPressureRequired: [''],
      airPressureRequiredUnit: [''],
      springRange: [''],
      springMOC: [''],
      positionerType: [''], //	Inline radio buttons
      modelNoOfPositioner: [''],
      ePArea: [''],
      aFRMake: [''],
      aFRModel: [''],
      aFRFilterSize: [''],
      aFRFilterMOC: [''],
      positionerTransmitter: [''],
      positionTransmitterType: [''],
      positionTransmitterMake: [''],
      positionTransmitterModel: [''],
      positionTransmitterArea: [''],
      solenoidValveType: [''],
      solenoidValveMOC: [''],
      solenoidValveArea: [''],
      solenoidValveMake: [''],
      machNoExceeding: [''],
      velocityExceeding: [''],
      stelliting: [''], //	Inline radio button
      lapping: [''], //		Inline radio button
      nitriding: [''], //	 	Inline radio button
      iBR: [''], //		Inline radio Button
      failSafeAction: [''],
      limitSwitch: [''],
      limitSwitchMake: [''],
      limitSwitchType: [''],
      lastServiceDate: [''], //	Yes /No
      serviceReminder: [''], // 	Yes/No,
      serviceReminderDate: [''] // 	Yes/No,
    });

    if (this.route.snapshot.params.id != undefined) {
      this.id = this.route.snapshot.params.id;
      this.getRf(this.id);
    }

  }

  get f() { return this.rfForm.controls; }

  // changeButterflyVaneMOC(e: any): void {
  //   this.rfForm.get('butterflyVaneMOC')!.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  getRf(id: string): void {
    this.rfService.get(id)
      .subscribe(
        data => {
          var data1: any = data;
          for (var x in this.rfForm.controls) {
            this.rfForm.get(x)!.setValue(data1[x]);
          }
        },
        error => {
          console.log(error);
        });
  }

  saveRf(): void {
    this.submitted = true;

    if (this.rfForm.invalid) {
      return;
    }
    if (this.id == '') {
      this.rfService.create(this.rfForm.value)
        .subscribe(
          response => {
            this.submitted = false;
            this.router.navigate(['/rf'], { queryParams: { m: 'a' } });
          },
          error => {
            this.error = error.message;
            console.log(error);
          });
    } else {
      this.rfService.update(this.id, this.rfForm.value)
        .subscribe(
          response => {
            this.submitted = false;
            this.router.navigate(['/rf'], { queryParams: { m: 'u' } });
            this.message = response.message ? response.message : 'This rf was updated successfully!';
          },
          error => {
            this.error = error.message;
            console.log(error);
          });
    }
  }

  newRf(): void {
    this.submitted = false;
    //this.rf = Object.assign({}, this.rfo);
  }
}
