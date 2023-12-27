import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';
const financialUrl=CONFIG.baseUrls.FinancialUrl;
@Injectable({
  providedIn: 'root'
})
export class FinancialAdminService {

  constructor(private _http: HttpGeneralService) { }
  getDoctorFees(obj: any) {
    return this._http.post<any>(`${financialUrl}/GetDoctorFees`, obj)
  }
}
