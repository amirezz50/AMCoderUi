import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';
const ReviewUrl = CONFIG.baseUrls.Review;

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private _http: HttpGeneralService) { }
  getAllReview(id: number) {
    return this._http.get<any>(`${ReviewUrl}/GetAllReview/${id}`)
  }
  addReview(obj: any[]) {
    return this._http.post<any>(`${ReviewUrl}/AddReview`, obj)
  }
  updateReview(row: any[]) {
    return this._http.update<any>(`${ReviewUrl}/UpdateReview`, row)
  }
  deleteReview(row: any) {
    return this._http.delete<any>(`${ReviewUrl}/DeleteReview/${row.serial}`)
  }
}
