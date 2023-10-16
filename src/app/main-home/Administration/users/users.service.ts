import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
}


export interface IUserDetails {
  fullName?: string;
  gender?: number;
  birthDate?: string;
  phoneNumber?: string;
  userType?: number;
  userRole?: number;
  confirm?: boolean;
}
