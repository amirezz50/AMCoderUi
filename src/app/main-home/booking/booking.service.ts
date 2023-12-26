import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';
const BookingUrl = CONFIG.baseUrls.Booking;
const SelectizeUrl = CONFIG.baseUrls.Selectize;

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private _http: HttpGeneralService) { }
  getAllSelectize(obj: any) {
    return this._http.post<any>(`${SelectizeUrl}/GetAllSelectize`, obj)
  }
  getAllBooking(id: number) {
    return this._http.get<any>(`${BookingUrl}/GetAllBooking/${id}`)
  }
  addBooking(obj: any) {
    return this._http.post<any>(`${BookingUrl}/CreateBooking`, obj)
  }
  updateBooking(row: any) {
    return this._http.update<any>(`${BookingUrl}/UpdateBooking`, row)
  }
  deleteBooking(row: any) {
    return this._http.delete<any>(`${BookingUrl}/DeleteBooking/${row.serial}`)
  }
  //------------------
  getAllBookingDetail(id: number) {
    return this._http.get<any>(`${BookingUrl}/GetAllBookingDetail/${id}`)
  }
  deleteBookingDetail(row: any) {
    return this._http.delete<any>(`${BookingUrl}/DeleteBookingDetail/${row.serial}`)
  }
  updateBookingDetail(row: any) {
    return this._http.update<any>(`${BookingUrl}/UpdateBookingDetail`, row)
  }
  // ------------------
  checkAvailableSlots(obj: any) {
    return this._http.post<any>(`${BookingUrl}/CheckAvailableSlots`, obj)
  }
}
