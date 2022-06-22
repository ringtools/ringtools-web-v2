import { Injectable } from "@angular/core"
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router"
import { Observable } from "rxjs"
import { LnDataService } from "./ln-data.service"

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private lnData: LnDataService, private router: Router) {}

    canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.lnData.isAuthenticated()) {
            return true
        }

        return this.router.navigate(['/login'], { queryParams: { returnUrl: _state.url }})

    }
    canActivateChild(
        _childRoute: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.lnData.isAuthenticated()) {
            return true
        }

        return this.router.navigate(['/login'], { queryParams: { returnUrl: _state.url }})
    }
}
