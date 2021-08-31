import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  name: string = "";
  roles: any[] = [];
  token: any;
  isLogged: boolean = false;
  userId: number;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService
  ) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(GlobalConstants.apiUrl + "auth/login", loginModel);
  }

  register(registerModel: RegisterModel) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "auth/register", registerModel);
  }

  isAuthenticated(): boolean{
    return this.localStorageService.checkExistsOrNot("token");
  }

  userDetailFromToken() {
    this.token = this.localStorageService.get("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  roleCheck(roleList: string[]) {
    if (this.roles !== undefined) {
      roleList.forEach(role => {
        if (this.roles.includes(role)) {
          return true;
        } else {
          return false;
        }
      })
      return true;
    } else {
      return false;
    }
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }

  logout(){
    this.localStorageService.clean();
    this.onRefresh();
    this.router.navigateByUrl('/');
    this.toastrService.info(GlobalConstants.Messages.logoutSuccess);
  }



}
