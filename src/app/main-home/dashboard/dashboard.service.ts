import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';
const DashboardUrl = CONFIG.baseUrls.Dashboard;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpGeneralService) { }
  getAllDashboard(Dashboard: any) {
    return this._http.post<any>(`${DashboardUrl}/GetAllDashboard`, Dashboard)
  }}
