import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { CarImageModel } from '../models/carImageModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<ListResponseModel<CarImageModel>>{
    let newPath = GlobalConstants.apiUrl + "carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImageModel>>(newPath);
  }

  getByCarId(carId: number) : Observable<ListResponseModel<CarImageModel>>{
    let newPath = GlobalConstants.apiUrl + "carimages/getimagesbycarid?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarImageModel>>(newPath);
  } 

}
