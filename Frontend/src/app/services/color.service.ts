import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { ColorModel } from '../models/colorModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<ColorModel>> {
    return this.httpClient.get<ListResponseModel<ColorModel>>(GlobalConstants.apiUrl + "colors/getall");
  }

  getById(Id: number): Observable<SingleResponseModel<ColorModel>> {
    return this.httpClient.get<SingleResponseModel<ColorModel>>(GlobalConstants.apiUrl + "colors/getbyid?id="+Id);
  }

  add(color: ColorModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "colors/add", color);
  }

  update(color: ColorModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "colors/update", color);
  }

}
