import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { getAuthorizationHeader } from 'src/shared/utility';
const MedicalSheetUrl = CONFIG.baseUrls.MedicalSheet

@Injectable({
  providedIn: 'root'
})
export class SheetOfHospitalService {
  constructor(private _http: HttpClient) { }
  getMedicalSheets(pagination: any) {
    var headers = getAuthorizationHeader();
    let params = new HttpParams();
    params = params.append('page', pagination.page);
    params = params.append('pageSize', pagination.pageSize);
    return this._http.get<any>(`${MedicalSheetUrl}/GetMedicalSheets`, { headers: headers, params: params })
  }
  getMedicalTask(obj: any) {
    var headers = getAuthorizationHeader();
    let params = new HttpParams();
    params = params.append('sheetId', obj.sheetId);
    params = params.append('page', 1);
    params = params.append('pageSize', 3);
    return this._http.get<any>(`${MedicalSheetUrl}/GetMedicalTasks`, { headers: headers, params: params })
  }
}
