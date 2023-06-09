import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, of as observableOf } from "rxjs";

@Injectable()
export class HandleErrorService {
    constructor(private _toast: ToastrService) { }

    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {

        let err = <HttpErrorResponse>errorResponse;
        let emsg;
        if (err.error instanceof Error) {
            emsg = err.error.message;
        } else {
            if (err.status == 0) {
                emsg = `Backend returned code ${err.status}, body was: ${err.message}`;
            } else {
                emsg = `Backend returned code ${err.status} (${err.statusText}), body was: ${err.error ? err.error.value : err.message}`;
            }
        }
        this._toast.error(emsg, "Error", { closeButton: true });
        return observableOf();
    }
}