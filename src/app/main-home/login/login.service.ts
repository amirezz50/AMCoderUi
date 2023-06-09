import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpGeneralService } from 'src/shared/http-general.service';
import { catchError, finalize, map } from 'rxjs';
import { CONFIG } from 'src/shared/config';
import { createAuthorizationHeader } from 'src/shared/utility';
import { Router } from '@angular/router';
const LoginUrl = CONFIG.baseUrls.login
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //  isLoggin: boolean = false
  islogginNew: boolean = false
  userLinksCollection: any[] = []
  constructor(private _http: HttpClient,
    private HttpGeneralService: HttpGeneralService,
    private router: Router
  ) {
    localStorage.clear();
  }

  login(UserModel: any) {
    var headers = createAuthorizationHeader();
    return this._http.post<any>(`${LoginUrl}/Login`, UserModel, { headers: headers })
  }
  // checkIfLogged(): boolean {
  //   this.isLoggin = !!sessionStorage.getItem('currentUser');
  //   return this.isLoggin;
  // }
  isLoggin() {
    return !!localStorage.getItem('token')
  }

  clearCache() {
    // let visit = sessionStorage.getItem('CURRENT_VISIT_' + this.getPatientCode);
    localStorage.clear();
    sessionStorage.clear();
    // if (visit)
    // sessionStorage.setItem('CURRENT_VISIT_' + this.getPatientCode, visit);

    // if (this.notification) {
    //   clearInterval(this.notification);
    // }
    this.router.navigate(['/main-home/login']);
    //window.location.reload();
  }
  public userLinksCheck(url: string) {
    this.userLinksCollection = this.router.config
    let data = this.userLinksCollection.find(link => {
      if (url.includes(link.path)) {
        return url.includes(link.path)
      }
      else { return false };
    });
    return data
  }

}
