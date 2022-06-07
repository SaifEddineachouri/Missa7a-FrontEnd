import { AuthService } from "./services/auth.service";
import { Injectable, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;

  constructor(private router: Router, private AuthService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.AuthService.getLoggedInUser().subscribe(
      (res: any) => {
        this.isLoggedIn = true;
      },
      (err: any) => {
        this.isLoggedIn = false;
      }
    );
    if (this.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
