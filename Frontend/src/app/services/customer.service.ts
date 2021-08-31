import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { CompanyModel } from '../models/companyModel';
import { CustomerModel } from '../models/customerModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  getAll() : Observable<ListResponseModel<CustomerModel>>{
    return this.httpClient.get<ListResponseModel<CustomerModel>>(GlobalConstants.apiUrl + "customers/getalldetail");
  }

  getById(id: number) : Observable<SingleResponseModel<CompanyModel>>{
    return this.httpClient.get<SingleResponseModel<CompanyModel>>(GlobalConstants.apiUrl + "customers/getbyid?id=" + id);
  }
  
  add(company: CompanyModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "customers/add", company);
  }

}
