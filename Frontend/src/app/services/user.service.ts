import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserInfoModel } from '../models/userInfoModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getByEmail(email: string): Observable<SingleResponseModel<UserModel>> {
    return this.httpClient.get<SingleResponseModel<UserModel>>(GlobalConstants.apiUrl + "users/getbyemail?email=" + email);
  }

  getInfo(id: number): Observable<ListResponseModel<UserInfoModel>> {
    return this.httpClient.get<ListResponseModel<UserInfoModel>>(GlobalConstants.apiUrl + "users/userclaims?user=" + id);
  }

  getById(id: number): Observable<SingleResponseModel<UserModel>> {
    return this.httpClient.get<SingleResponseModel<UserModel>>(GlobalConstants.apiUrl + "users/getbyid?id=" + id);
  }

  update(user: UserModel, password: string ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + 'users/update', {user, password});
  }

}
