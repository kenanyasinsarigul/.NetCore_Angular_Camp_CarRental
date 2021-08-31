import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { FindexModel } from '../models/findexModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  constructor(private httpClient:HttpClient) { }

  add(findexModel: FindexModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "findex/add", findexModel);
  }

  getByUserId(id: number): Observable<SingleResponseModel<FindexModel>>{
    return this.httpClient.get<SingleResponseModel<FindexModel>>(GlobalConstants.apiUrl + "findex/getbyuserid?id=" + id);
  }
}
