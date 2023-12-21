import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';
const UsersUrl = CONFIG.baseUrls.Users;
const EmailUrl = CONFIG.baseUrls.Email;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpGeneralService) { }
  getAllUsers(id: number) {
    return this._http.get<any>(`${UsersUrl}/GetAllUsers/${id}`)
  }
  addUsers(obj: any) {
    return this._http.post<any>(`${UsersUrl}/AddUser`, obj)
  }
  updateUsers(row: any) {
    return this._http.update<any>(`${UsersUrl}/UpdateUser`, row)
  }
  deleteUsers(row: any) {
    return this._http.delete<any>(`${UsersUrl}/DeleteUser/${row.userId}`)
  }

  // ------ Mail ----------
  sendMail(obj: any) {
    return this._http.post<any>(`${EmailUrl}/SendMail`, obj)
  }
}


export interface IUserDetails {
  userId?: number;
  fullName?: string;
  gender?: number;
  birthDate?: string;
  phoneNumber?: string;
  userType?: number;
  userRole?: number;
  confirmTOLogin?: number;
  email?: string;
}
