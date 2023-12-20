import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SchedulDoctorService } from '../../schedul-doctor/schedul-doctor.service';

@Component({
  selector: 'financial-doctor-fees',
  templateUrl: './financial-doctor-fees.component.html',
  styleUrls: ['./financial-doctor-fees.component.css']
})
export class FinancialDoctorFeesComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private _LaserDoctorsService: SchedulDoctorService) { }

  ngOnInit(): void {
    this.getDoctors();
  }
  doctorArr: any[] = [];
  patientArr: any[] = [];
  getDoctors() {
    this._LaserDoctorsService.getAllDoctors({})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.doctorArr = []
            this.doctorArr = res.data;
            this.patientArr = res.data1;
          }
        }
      )
  }
  docId: any;
  patcode: any
  getCodeFromArray(ev: any, type: number) {
    if (type == 1) {
      //doctor
      this.docId = ev;
    }
    else if (type == 2) {
      this.patcode = ev;
    }
  }
  patients: any[] = [
    { patientCode: 'P001', isSelected: false, patientName: 'John Doe', serviceName: 'Consultation', reservationDate: '2023-10-12', patientPrice: 100, doctor: 'Doctor1' },
    { patientCode: 'P002', isSelected: false, patientName: 'Jane Smith', serviceName: 'Checkup', reservationDate: '2023-10-13', patientPrice: 120, doctor: 'Doctor1' },
    { patientCode: 'P003', isSelected: false, patientName: 'Alice Johnson', serviceName: 'Surgery', reservationDate: '2023-10-14', patientPrice: 500, doctor: 'Doctor2' },
    // Add more sample patient data
  ]; selectedPatients: any[] = []; // Array to store selected patients
  doctorSelected: string = ''; // Store selected doctor

  // Function to toggle patient selection
  // togglePatientSelection(patient: any) {
  //   if (this.selectedPatients.includes(patient)) {
  //     this.selectedPatients = this.selectedPatients.filter(p => p !== patient);
  //   } else {
  //     this.selectedPatients.push(patient);
  //   }
  // }
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
    return selectedDoctorPatients.reduce((total, patient) => total + patient.patientPrice, 0);
  }

}
