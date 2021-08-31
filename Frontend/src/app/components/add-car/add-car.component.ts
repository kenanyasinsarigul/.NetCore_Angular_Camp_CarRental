import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from 'src/app/models/brandModel';
import { ColorModel } from 'src/app/models/colorModel';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carAddForm: FormGroup;
  colors: ColorModel[] = [];
  brands: BrandModel[] = [];
  modelYears: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrandList();
    this.getColorList();
    this.createModelYearArray();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      findeksScore: ["", [Validators.required, Validators.min(0), Validators.max(1901)]]
    });
  }

  get carFormControls() { return this.carAddForm.controls; }

  createModelYearArray() {
    let currentYear: number = new Date().getFullYear();
    for (let i = currentYear + 1; i >= 1950; i--) {
      this.modelYears.push(i);
    }
  }

  getColorList() {
    this.colorService.getAll().subscribe(response => {
      this.colors = response.data;
    });
  }

  getBrandList() {
    this.brandService.getAll().subscribe(response => {
      this.brands = response.data;
    })
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.modelYear = parseInt(carModel.modelYear);
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success("Araba başarıyla eklendi.");
        this.router.navigate(['/cars/']);
        this.toastrService.info("Araba sayfasına yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Araç Eklenemedi!");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız!");
    }

  }

}
