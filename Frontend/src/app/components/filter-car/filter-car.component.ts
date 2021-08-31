import { Component, OnInit } from '@angular/core';
import { BrandModel } from 'src/app/models/brandModel';
import { ColorModel } from 'src/app/models/colorModel';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter-car',
  templateUrl: './filter-car.component.html',
  styleUrls: ['./filter-car.component.css']
})
export class FilterCarComponent implements OnInit {

  colors: ColorModel[] = [];
  brands: BrandModel[] = [];
  filterColor: number;
  filterBrand: number;
  selectedColor:number;
  selectedBrand:number;

  constructor(private colorService:ColorService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getAll().subscribe(response => {
      this.brands = response.data;
    });
  }

  getColors (){
    this.colorService.getAll().subscribe(response => {
      this.colors = response.data;
    });
  }

  getSelectedColor(colorId: number){
    if (this.filterColor == colorId) {
      return true;
    }
    return false;
  }

  getSelectedBrand(brandId: number){
    if(this.filterBrand == brandId){
      return true;
    }
    return false;
  }

  setSelectedColor(colorId: number){
    this.selectedColor = colorId;
  }

  setSelectedBrand(brandId: number){
    this.selectedBrand = brandId;
  }

}
