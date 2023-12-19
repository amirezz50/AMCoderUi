import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CONFIG } from "./config";
import * as Utilty from "./utility";
import { Observable, catchError, finalize, map, of as observableOf } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HandleErrorService } from "./handel-error";
const url = CONFIG.baseUrls.localhost
@Injectable()
export class HttpGeneralService {

  constructor(
    private _http: HttpClient,
    private _toast: ToastrService,
    private _handleError: HandleErrorService) {

  }
  post<T>(cofirtUrl: string, entity?: any): any {
    let obj = {}
    let headers = Utilty.getAuthorizationHeader();
    let body = JSON.stringify(entity);
    return this._http.post(`${cofirtUrl}`, body, { headers: headers })
  }
  update<T>(cofirtUrl: string, entity?: any): any {
    let obj = {}
    let headers = Utilty.getAuthorizationHeader();
    let body = JSON.stringify(entity);
    return this._http.put(`${cofirtUrl}`, body, { headers: headers })
  }
  delete<T>(cofirtUrl: string, entity?: any): any {
    let obj = {}
    let headers = Utilty.getAuthorizationHeader();
    return this._http.delete(`${cofirtUrl}`, { headers: headers })
  }
  get<T>(cofirtUrl?: string, id?: number): any {
    let obj = {}
    let headers = Utilty.getAuthorizationHeader();
    return this._http.get(`${cofirtUrl}`, { headers: headers }).pipe(
      map((response: any) => {
        let temp = <any>response;
        return temp;
      }),
      catchError(this._handleError.catchBadResponse),
      finalize(() => console.log(".....[[[close loder]]].....")));
  }

}
