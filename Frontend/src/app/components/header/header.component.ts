import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token:any=""
  isCartAny:boolean

  constructor(private localStorageService:LocalStorageService,
    private jwtHelperService:JwtHelperService) { }

  ngOnInit(): void {
    this.isCartAny=this.localStorageService.checkExistsOrNot("cart")
  }

  cartCount(){
    let cartLocal=this.localStorageService.get("cart")
    let parsedCart=(cartLocal)?JSON.parse(cartLocal):[]
    return parsedCart.length
  }

  getToken(){
    this.token=this.localStorageService.get("token")
    let uncodedToken=this.jwtHelperService.decodeToken(this.token)
  }

}
