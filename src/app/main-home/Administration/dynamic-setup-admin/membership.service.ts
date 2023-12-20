import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';
const MemberShipUrl = CONFIG.baseUrls.MemberShip;

@Injectable({
  providedIn: 'root'
})
export class MembershipService  {

  constructor(private _http: HttpGeneralService) { }
  getAllMemberShip(id: number) {
    return this._http.get<any>(`${MemberShipUrl}/GetAllMemberShip/${id}`)
  }
  addMemberShip(obj: any) {
    return this._http.post<any>(`${MemberShipUrl}/AddMemberShip`, obj)
  }
  updateMemberShip(row: any) {
    return this._http.update<any>(`${MemberShipUrl}/UpdateMemberShip`, row)
  }
  deleteMemberShip(row: any) {
    return this._http.delete<any>(`${MemberShipUrl}/DeleteMemberShip/${row.serial}`)
  }

}
