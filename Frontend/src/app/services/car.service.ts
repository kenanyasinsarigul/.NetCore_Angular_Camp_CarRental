import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { CarDetailModel } from '../models/carDetailModel';
import { CarModel } from '../models/carModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient:HttpClient) { }

  getAllDetail() : Observable<ListResponseModel<CarDetailModel>>{
    let newPath = GlobalConstants.apiUrl + "cars/getalldetail";
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

  add(car: CarDetailModel) : Observable<ResponseModel>{
    let newPath = GlobalConstants.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car: CarDetailModel) : Observable<ResponseModel>{
    let newPath = GlobalConstants.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  getByBrandId(brandId:number) : Observable<ListResponseModel<CarDetailModel>>{
    let newPath = GlobalConstants.apiUrl + "cars/getbybrand?id=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

  getByColor(colorId:number) : Observable<ListResponseModel<CarDetailModel>>{
    let newPath = GlobalConstants.apiUrl + "cars/getbycolor?id=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

  getByIdDetail(carId: number) : Observable<ListResponseModel<CarDetailModel>>{
    let newPath = GlobalConstants.apiUrl + "cars/getbyiddetail?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

  getById(Id: number) : Observable<SingleResponseModel<CarModel>>{
    let newPath = GlobalConstants.apiUrl + "cars/getbyid?id="+Id;
    return this.httpClient.get<SingleResponseModel<CarModel>>(newPath);
  }

  getByColorAndBrand(colorId:number, brandId:number) : Observable<ListResponseModel<CarDetailModel>>{
    let newPath = GlobalConstants.apiUrl + "cars/getbycolorandbrandid?colorId="+colorId+"&brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

}
