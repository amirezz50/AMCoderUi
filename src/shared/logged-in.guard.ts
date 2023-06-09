import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { LoginService } from 'src/app/main-home/login/login.service';


@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private _authService: LoginService, private router: Router) {
    }

    canActivate() {
        if (this._authService.isLoggin()) {
            return true;
        } else {
            this.router.navigate(['login'])
            return false;
        }

    }

    // checkLogin(url: string): boolean {
    //     if (url != 'login') {
    //         if (this._authService.checkIfLogged()) {
    //             return (this.CheckUrlAuthroze(url) !== undefined);
    //         } else {
    //             // Navigate to the login page with extras
    //             this.router.navigateByUrl('/login');
    //             return false;
    //         }
    //     }
    //     return false;
    //     // Store the attempted URL for redirecting
    //     //this.authService.redirectUrl = url;
    // }

    // CheckUrlAuthroze(url: string) {
    //     return this._authService.userLinksCheck(url);
    // }



}