import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { getAuthorizationHeader } from 'src/shared/utility';
const MedicalSheetUrl = CONFIG.baseUrls.MedicalSheet

@Injectable({
  providedIn: 'root'
})
export class TasksAutoMatchedService {

  constructor(private _http: HttpClient) { }
  getTasksAutoMatched(obj: any) {
    var headers = getAuthorizationHeader();
    let params = new HttpParams();
    params = params.append('sheetId', obj.sheetId);
    params = params.append('page', obj.page);
    params = params.append('pageSize', obj.pageSize);
    return this._http.get<any>(`${MedicalSheetUrl}/GetAuoMatched`, { headers: headers, params: params })
  }
}
