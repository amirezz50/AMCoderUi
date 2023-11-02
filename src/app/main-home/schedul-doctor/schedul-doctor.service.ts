import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';

const doctorUrl = CONFIG.baseUrls.Doctors
@Injectable({
  providedIn: 'root'
})
export class SchedulDoctorService {

  constructor(private _http: HttpGeneralService) { }
  getAllDoctors(Dashboard: any) {
    return this._http.post<any>(`${doctorUrl}/GetAllDoctors`, Dashboard)
  }
}
