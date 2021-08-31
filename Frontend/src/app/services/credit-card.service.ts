import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { CreditCardModel } from '../models/creditCardModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient: HttpClient) { }

  add(creditCard: CreditCardModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "usercreditcards/add", creditCard);
  }

  getallById(id: number): Observable<ListResponseModel<CreditCardModel>> {
    return this.httpClient.get<ListResponseModel<CreditCardModel>>(GlobalConstants.apiUrl + "usercreditcards/getallbyid?id=" + id);
  }

}
