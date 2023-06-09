import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { getAuthorizationHeader } from 'src/shared/utility';
const UploadUrl = CONFIG.baseUrls.uploadSheet
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private _http: HttpClient) { }
  uploadSheet(sheetObj: any) {
    var headers = getAuthorizationHeader();
    return this._http.post<any>(`${UploadUrl}/Login`, sheetObj, { headers: headers })
  }
}
