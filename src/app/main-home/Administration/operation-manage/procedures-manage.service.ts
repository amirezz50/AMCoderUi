import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';
const ProceduresUrl = CONFIG.baseUrls.OperationManage;

@Injectable({
  providedIn: 'root'
})
export class ProceduresManageService {


  constructor(private _http: HttpGeneralService) { }
  getAllProcedures(id: number) {
    return this._http.get<any>(`${ProceduresUrl}/GetAllProcedures/${id}`)
  }
  addProcedures(obj: any) {
    return this._http.post<any>(`${ProceduresUrl}/AddProcedures`, obj)
  }
  updateProcedures(row: any) {
    return this._http.update<any>(`${ProceduresUrl}/UpdateProcedures`, row)
  }
  deleteProcedures(row: any) {
    return this._http.delete<any>(`${ProceduresUrl}/DeleteProcedures/${row.serial}`)
  }
}
