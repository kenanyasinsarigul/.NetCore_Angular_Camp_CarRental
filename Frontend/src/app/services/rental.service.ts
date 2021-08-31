import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetailModel } from '../models/rentalDetailModel';
import { RentalModel } from '../models/rentalModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<ListResponseModel<RentalDetailModel>> {
    let newPath = GlobalConstants.apiUrl + "rentals/getalldetail";
    return this.httpClient.get<ListResponseModel<RentalDetailModel>>(newPath);
  }

  getByCarId(carId:number) : Observable<SingleResponseModel<RentalDetailModel>>{
    let newPath = GlobalConstants.apiUrl + "rentals/getbycarid?id="+carId;
    return this.httpClient.get<SingleResponseModel<RentalDetailModel>>(newPath);
  }

  add(rental: RentalModel) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "rentals/add", rental);
  }

}
