import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SchedulDoctorService } from '../../schedul-doctor/schedul-doctor.service';
import { ToastrService } from 'ngx-toastr';
import { FinancialAdminService } from '../financial-admin.service';

@Component({
  selector: 'financial-doctor-fees',
  templateUrl: './financial-doctor-fees.component.html',
  styleUrls: ['./financial-doctor-fees.component.css']
})
export class FinancialDoctorFeesComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private _LaserDoctorsService: SchedulDoctorService,
    private _FinancialAdminService: FinancialAdminService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDoctors();
  }
  getDoctorFees() {
    if (!this.searchObj.docId) {
      this.toastr.error("Please Select Doctor");
      return;
    }
    if (this.searchObj.fromDate)
      this.searchObj.fromDate = new Date(this.searchObj.fromDate).toISOString();
    if (this.searchObj.toDate)
      this.searchObj.toDate = new Date(this.searchObj.toDate).toISOString();
    this._FinancialAdminService.getDoctorFees(this.searchObj)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.patients = res.data;
          } else if (Object.keys(res).length != 0) {
            this.toastr.error(res);
          }
        }
      )
  }



  doctorArr: any[] = [];
  patientArr: any[] = [];
  getDoctors() {
    this._LaserDoctorsService.getAllSelectize({})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.doctorArr = []
            this.doctorArr = res.data;
            // this.patientArr = res.data1;
          }
        }
      )
  }
  docId: any;
  patcode: any;
  searchObj: any = {}
  getCodeFromArray(ev: any, type: number) {
    if (ev && type == 1) {
      //doctor
      this.searchObj.docId = ev;
    }
    // else if (type == 2) {
    //   this.patcode = ev;
    // }
  }
  patients: any[] = [];
  selectedPatients: any[] = []; // Array to store selected patients
  doctorSelected: string = ''; // Store selected doctor

  selected(patient: any) {
    patient.isSelected = !patient.isSelected;
    this.calculateTotalPrice();
  }
  selectAllFlag: boolean = false;
  selectAll() {
    this.patients.forEach(element => {
      if (this.selectAllFlag) {
        element.isSelected = true
      } else {
        element.isSelected = false
      }
    });
    this.calculateTotalPrice()

  }
  // Function to calculate total price for the selected doctor
  calculateTotalPrice() {
    const selectedDoctorPatients = this.patients.filter(patient => patient.isSelected);
    return selectedDoctorPatients.reduce((total, patient) => total + patient.procedure_price, 0);
  }

}
