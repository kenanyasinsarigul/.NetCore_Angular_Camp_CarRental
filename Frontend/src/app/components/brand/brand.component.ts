import { Component, OnInit } from '@angular/core';
import { BrandModel } from 'src/app/models/brandModel';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:BrandModel[]=[]
  currentBrand:BrandModel
  dataLoaded=false
  filterText:string=""

  constructor(private brandService:BrandService,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getAll().subscribe(response=>{
      this.brands=response.data
      this.dataLoaded=true
    })
  }

  setCurrentBrand(brand:BrandModel){
    this.currentBrand=brand
  }

  getCurrentBrandClass(brand: BrandModel){
    if (brand==this.currentBrand) {
      return "list-group-item list-group-item-action list-group-item-info active"
    }else{
      return "list-group-item list-group-item-action list-group-item-info"
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item list-group-item-action list-group-item-success active";
    }else{
      return "list-group-item list-group-item-action list-group-item-success";
    }
  }

}
