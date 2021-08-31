import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  token: any;
  info: any[] = [];

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.token=this.localStorageService.get("token")
    let uncodedToken=this.jwtHelper.decodeToken(this.token)
    this.info=uncodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    if (this.info!==undefined) {
      if (this.info.includes("admin")) {
        return true
      } else {
        return false
      }
    } else {
      this.router.navigate(["/"])
      this.toastrService.error("Yetkiniz yok!")
      return false
    }
  }
  
}
