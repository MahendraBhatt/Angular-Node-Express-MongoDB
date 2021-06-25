import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Rf } from 'src/app/models/rf.model';
import { RfService } from 'src/app/services/rf.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rf-list',
  templateUrl: './rf-list.component.html',
  styleUrls: ['./rf-list.component.css']
})

export class RfListComponent implements OnInit {

  rf: Rf[] = [];
  currentRf: Rf = {};
  currentIndex = -1;
  valveNo = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];
  sortBy = 'valveNo';
  reverseSort = false;
  select = '';

  constructor(private rfService: RfService) { }

  ngOnInit(): void {
    this.retrieveRfs();
  }

  sort(column: string): void {
    if(this.sortBy != column){
      this.reverseSort = false;
    } else {
      this.reverseSort = !this.reverseSort;
    }
    this.sortBy = column;
    this.retrieveRfs();
  }

  getRequestParams(searchValveNo: string, 
    page: number, pageSize: number, 
    sortBy: string, reverseSort: boolean, select: string): any {
    let params: any = {};

    if (searchValveNo) {
      params[`valveNo`] = searchValveNo;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    if (sortBy) {
      params[`sortBy`] = sortBy;
    }

    if (reverseSort) {
      params[`sortDirection`] = reverseSort == true ? 'desc' : 'asc';
    }

    if (select) {
      params[`select`] = select;
    }

    return params;
  }

  retrieveRfs(): void {
    const params = this.getRequestParams(this.valveNo, this.page, this.pageSize, this.sortBy, this.reverseSort, this.select);

    this.rfService.getAll(params)
      .subscribe(
        response => {
          const { rf, totalItems } = response;
          this.rf = rf;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveRfs();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveRfs();
  }

  refreshList(): void {
    this.retrieveRfs();
    this.currentRf = {};
    this.currentIndex = -1;
  }

  setActiveRf(rf: Rf, index: number): void {
    this.currentRf = rf;
    this.currentIndex = index;
  }

  // removeAllRfs(): void {
  //   this.rfService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.refreshList();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  deleteRf(id: any): void {
    if (confirm("Are you sure to delete ?")) {
      this.rfService.delete(id)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveRfs();
            //this.router.navigate(['/rfs']);
          },
          error => {
            console.log(error);
          });
    }
  }

  searchValveNo(): void {
    this.page = 1;
    this.retrieveRfs();
  }

  onFileChange(evt: any): void {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      var headerRow: any = data[0];
      var output = [];
      var a = ['valveNo',
        'tagNo',
        'valveSection',
        'valveSerialNo',
        'valveMake',
        'valvePurchaseDate',
        'valvePurchaseValue',
        'warrantyFinishDate',
        'serviceDueDate',
        'valveType',
        'emergencyShutDownValve',
        'ifBallValve',
        'ifButterflyValve',
        'valveTorque',
        'butterflyVaneMOC',
        'butterflyVaneMOCOther',
        'ifSafetyValve',
        'lineFluid',
        'serviceType',
        'lineSize',
        'valveSize',
        'flow',
        'inletPressure',
        'pressureDifference',
        'designPressure',
        'designTemp',
        'viscosity',
        'specificGravity',
        'molecularWeight',
        'actuatorShutoffPressure',
        'valveLiftPercentage',
        'valveNoise',
        'designCV',
        'calculatedCV',
        'bodyMOC',
        'bodyLining',
        'endConnection',
        'flangeRating',
        'valveModelNo',
        'trimSize',
        'trimType',
        'trimcCharacteristic',
        'trimMOC',
        'ballValveSeatMOC',
        'plugRingsMOC',
        'seatArrangement',
        'glandPacking',
        'bodyBonnetGasket',
        'valveBonnetType',
        'bellowSeal',
        'bellowSealMOC',
        'leakageClass',
        'leakageValueAllowed',
        'actuatorType',
        'actuatorModel',
        'fieldReversible',
        'actuatorTravel',
        'diaphragMaterial',
        'airPressureRequired',
        'springRange',
        'springMOC',
        'positionerType',
        'modelNoOfPositioner',
        'ePArea',
        'aFRMake',
        'aFRModel',
        'aFRFilterSize',
        'aFRFilterMOC',
        'positionerTransmitter',
        'positionTransmitterType',
        'positionTransmitterMake',
        'positionTransmitterModel',
        'positionTransmitterArea',
        'solenoidValveType',
        'solenoidValveMOC',
        'solenoidValveArea',
        'solenoidValveMake',
        'machNoExceeding',
        'velocityExceeding',
        'stelliting',
        'lapping',
        'nitriding',
        'iBR',
        'failSafeAction',
        'limitSwitch',
        'limitSwitchMake',
        'limitSwitchType',
        'lastServiceDate',
        'serviceReminder'];

      var rfService = this.rfService;
      data.forEach(function (d: any, i: any) {
        if (i > 0) {
          var rfd = new Rf();
          d.forEach(function (c: any, ci: any) {
            var excelColumn = headerRow[ci].replace(/ /g, '').toLowerCase().trim();
            if (a.filter(function (o) {
              return o.toLowerCase() == excelColumn;
            }).length == 0) {
              if (excelColumn == 'hazardousservice/corrosiveservice') {
                (rfd as any)['serviceType'] = c;
              } else if (excelColumn == 'valvelift%') {
                (rfd as any)['valveLiftPercentage'] = c;
              } else if (excelColumn == 'trimcharacteristic') {
                (rfd as any)['trimcCharacteristic'] = c;
              } else if (excelColumn == 'diaphragmmaterial') {
                (rfd as any)['diaphragMaterial'] = c;
              }
            } else {
              (rfd as any)[a[ci]] = c;
            }
          });
          if (rfd.valveNo != undefined) {
            rfService.findByValveNo(rfd.valveNo)
              .subscribe(
                data => {
                  if((data as any).totalItems > 0){ // update
                    rfService.update((data as any).rf[0].id, rfd)
                    .subscribe(
                      response => {
                        console.log('updated');
                      },
                      error => {
                        console.log(error);
                      });
                  } else { // insert
                    rfService.create(rfd)
                    .subscribe(
                      response => {
                        console.log('inserted');
                      },
                      error => {
                        console.log(error);
                      });
                  }
                },
                error => {
                  console.log(error);
                });
          }
        }
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
}