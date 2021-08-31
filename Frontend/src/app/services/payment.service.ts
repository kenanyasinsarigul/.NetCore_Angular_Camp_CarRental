import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/globalConstants';
import { CartItemModel } from '../models/cartItemModel';
import { CartItemsModel } from '../models/cartItemsModel';
import { PaymentModel } from '../models/paymentModel';
import { RentalModel } from '../models/rentalModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  carts: any[] = [];

  constructor(private httpClient:HttpClient) { }

  add(payment:PaymentModel) : Observable<ResponseModel>{
    let newPath = GlobalConstants.apiUrl + "payments/add"
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }

  addToCart(rental:RentalModel){
    let cartItem = new CartItemModel();
    cartItem.rental = rental;
    CartItemsModel.push(cartItem);
    this.carts = CartItemsModel;
    localStorage['cart'] = JSON.stringify(this.carts);
  }

  listCart(): CartItemModel[]{
    return CartItemsModel;
  }

}
