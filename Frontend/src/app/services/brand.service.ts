import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { BrandModel } from '../models/brandModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<ListResponseModel<BrandModel>>{
    let newPath = GlobalConstants.apiUrl + "brands/getall";
    return this.httpClient.get<ListResponseModel<BrandModel>>(newPath);
  }

  getById(Id: number): Observable<SingleResponseModel<BrandModel>>{
    return this.httpClient.get<SingleResponseModel<BrandModel>>(GlobalConstants.apiUrl + "brands/getbyid?id=" + Id);
  }

  add(brand: BrandModel) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "brands/add", brand);
  }

  update(brand: BrandModel) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "brands/update", brand);
  }

}
