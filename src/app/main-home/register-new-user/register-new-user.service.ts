import { Injectable } from '@angular/core';
import { createAuthorizationHeader } from 'src/shared/utility';
import { IRegisterForm } from './registerModel';
import { HttpGeneralService } from 'src/shared/http-general.service';
import { CONFIG } from 'src/shared/config';
const RegisterUrl = CONFIG.baseUrls.login
@Injectable({
  providedIn: 'root'
})
export class RegisterNewUserService {

  constructor(private _http: HttpGeneralService) { }
  register(UserModel: IRegisterForm) {
    return this._http.post<any>(`${RegisterUrl}/Register`, UserModel)
  }
}
